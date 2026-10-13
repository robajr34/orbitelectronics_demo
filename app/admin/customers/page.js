"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Tag,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Plus,
  Shield,
  Star,
  Clock,
  Eye,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { calculateCustomerMetrics } from "@/lib/calculations";
import { Button } from "@/components/ui/button";

export default function AdminCustomersPage() {
  const { customers, orders, toggleCustomerTag } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("All");

  // Dynamically enrich customers with lifetime spend and order count
  const enrichedCustomers = useMemo(
    () => calculateCustomerMetrics(customers, orders),
    [customers, orders]
  );

  const filteredCustomers = useMemo(() => {
    return enrichedCustomers.filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.city && c.city.toLowerCase().includes(q));

      const matchesTag = tagFilter === "All" || (c.tags || []).includes(tagFilter);

      return matchesSearch && matchesTag;
    });
  }, [enrichedCustomers, searchQuery, tagFilter]);

  const allTags = ["All", "VIP", "Repeat Customer", "New Customer", "At Risk"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Customer Relationship Management
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Customer profiles, order frequency, lifetime value calculations, and segmentation tags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/settings">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Shield className="h-4 w-4 text-primary" /> Role Permissions
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Total Registered Accounts</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{customers.length}</div>
          <div className="mt-1 text-xs text-text-muted">Verified buyer profiles</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-primary tracking-wider">VIP Customers</div>
          <div className="mt-2 text-2xl font-bold text-primary">
            {customers.filter((c) => (c.tags || []).includes("VIP")).length}
          </div>
          <div className="mt-1 text-xs text-text-muted">High lifetime value segment</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-success tracking-wider">Repeat Buyers</div>
          <div className="mt-2 text-2xl font-bold text-success">
            {enrichedCustomers.filter((c) => c.orderCount > 1).length}
          </div>
          <div className="mt-1 text-xs text-text-muted">&gt;1 completed purchases</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-warning tracking-wider">At-Risk Segment</div>
          <div className="mt-2 text-2xl font-bold text-warning">
            {customers.filter((c) => (c.tags || []).includes("At Risk")).length}
          </div>
          <div className="mt-1 text-xs text-text-muted">Requiring re-engagement</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, phone, or address..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                tagFilter === tag
                  ? "bg-primary text-white font-semibold"
                  : "bg-surface-muted text-text-muted hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">Customer</th>
                <th className="px-6 py-3 font-semibold">Contact & Location</th>
                <th className="px-6 py-3 font-semibold text-center">Orders</th>
                <th className="px-6 py-3 font-semibold text-right">Lifetime Spend</th>
                <th className="px-6 py-3 font-semibold text-right">AOV</th>
                <th className="px-6 py-3 font-semibold">Segment Tags</th>
                <th className="px-6 py-3 font-semibold">Joined Date</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-muted">
                    No customers match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <Link href={`/admin/customers/${c.id}`} className="hover:underline">
                        <div className="font-semibold text-foreground">{c.name}</div>
                        <div className="text-[11px] font-mono text-text-muted">{c.id}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 space-y-0.5">
                      <div className="text-foreground">{c.email}</div>
                      <div className="text-[11px] text-text-muted">{c.phone}</div>
                    </td>
                    <td className="px-6 py-3.5 text-center font-bold text-foreground">
                      {c.orderCount}
                    </td>
                    <td className="px-6 py-3.5 text-right font-bold text-primary">
                      {c.lifetimeSpend.toLocaleString()} ETB
                    </td>
                    <td className="px-6 py-3.5 text-right font-medium text-foreground">
                      {c.aov.toLocaleString()} ETB
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {(c.tags || []).map((t) => (
                          <button
                            key={t}
                            onClick={() => toggleCustomerTag(c.id, t)}
                            title="Click to toggle tag"
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-transform hover:scale-105 ${
                              t === "VIP"
                                ? "bg-primary-soft text-primary"
                                : t === "Repeat Customer"
                                ? "bg-success-soft text-success"
                                : t === "At Risk"
                                ? "bg-danger-soft text-danger"
                                : "bg-surface-muted text-text-muted"
                            }`}
                          >
                            {t} &times;
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            const available = ["VIP", "Repeat Customer", "New Customer", "At Risk"].filter(
                              (cand) => !(c.tags || []).includes(cand)
                            );
                            if (available.length > 0) toggleCustomerTag(c.id, available[0]);
                          }}
                          className="rounded-full border border-dashed border-border px-1.5 py-0.5 text-[10px] text-text-muted hover:text-foreground"
                          title="Add tag"
                        >
                          + tag
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-text-muted">
                      {c.registeredDate}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link href={`/admin/customers/${c.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <Eye className="h-3 w-3 mr-1" /> Profile
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
