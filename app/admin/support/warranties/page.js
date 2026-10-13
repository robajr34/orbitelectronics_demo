"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2,
  X,
  FileCheck,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminWarrantiesPage() {
  const { warranties, registerWarranty, products, customers } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    serialNumber: "",
    productId: products[0]?.id || "",
    customerId: customers[0]?.id || "",
    purchaseDate: new Date().toISOString().slice(0, 10),
    durationMonths: 24,
  });

  // Calculate dynamic expiration & status helper
  function computeStatus(expDateStr) {
    const today = new Date();
    const exp = new Date(expDateStr);
    const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays <= 30) return "Expiring Soon";
    return "Active";
  }

  const enrichedWarranties = warranties.map((w) => ({
    ...w,
    calculatedStatus: computeStatus(w.expirationDate),
  }));

  const filtered = enrichedWarranties.filter((w) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      w.serialNumber.toLowerCase().includes(q) ||
      w.productName.toLowerCase().includes(q) ||
      w.customerName.toLowerCase().includes(q) ||
      (w.orderId && w.orderId.toLowerCase().includes(q));

    const matchesStatus = statusFilter === "All" || w.calculatedStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!form.serialNumber.trim()) {
      toast.error("Serial number is required.");
      return;
    }

    const prod = products.find((p) => p.id === form.productId);
    const cust = customers.find((c) => c.id === form.customerId);

    // Compute expiration
    const pDate = new Date(form.purchaseDate);
    const expDate = new Date(pDate);
    expDate.setMonth(expDate.getMonth() + Number(form.durationMonths));

    registerWarranty({
      serialNumber: form.serialNumber.trim().toUpperCase(),
      productId: form.productId,
      productName: prod ? prod.name : "Orbit Electronic Appliance",
      customerId: form.customerId,
      customerName: cust ? cust.name : "Retail Customer",
      orderId: "ORD-2026-MANUAL",
      purchaseDate: form.purchaseDate,
      durationMonths: Number(form.durationMonths),
      expirationDate: expDate.toISOString().slice(0, 10),
    });

    setModalOpen(false);
    setForm({
      serialNumber: "",
      productId: products[0]?.id || "",
      customerId: customers[0]?.id || "",
      purchaseDate: new Date().toISOString().slice(0, 10),
      durationMonths: 24,
    });
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/support">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Appliance Warranty Registry
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Verified serial numbers, guarantee duration, and automated expiration monitoring.
            </p>
          </div>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="gap-1.5 shadow-xs text-xs">
          <Plus className="h-4 w-4" /> Register New Warranty
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-success tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Active Guarantees
          </div>
          <div className="mt-2 text-2xl font-bold text-success">
            {enrichedWarranties.filter((w) => w.calculatedStatus === "Active").length}
          </div>
          <div className="mt-1 text-xs text-text-muted">Full manufacturer coverage</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-warning tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" /> Expiring Soon (&le; 30 Days)
          </div>
          <div className="mt-2 text-2xl font-bold text-warning">
            {enrichedWarranties.filter((w) => w.calculatedStatus === "Expiring Soon").length}
          </div>
          <div className="mt-1 text-xs text-text-muted">Eligible for extended warranty upsell</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> Expired Warranties
          </div>
          <div className="mt-2 text-2xl font-bold text-text-muted">
            {enrichedWarranties.filter((w) => w.calculatedStatus === "Expired").length}
          </div>
          <div className="mt-1 text-xs text-text-muted">Paid service rate applies</div>
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
            placeholder="Search by serial number (SN), appliance name, customer, or order..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {["All", "Active", "Expiring Soon", "Expired"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === st
                  ? "bg-primary text-white font-semibold"
                  : "bg-surface-muted text-text-muted hover:text-foreground"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Warranties Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">Serial Number (SN)</th>
                <th className="px-6 py-3 font-semibold">Appliance & Model</th>
                <th className="px-6 py-3 font-semibold">Customer</th>
                <th className="px-6 py-3 font-semibold">Purchase Date</th>
                <th className="px-6 py-3 font-semibold text-center">Duration</th>
                <th className="px-6 py-3 font-semibold">Expiration Date</th>
                <th className="px-6 py-3 font-semibold">Calculated Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted">
                    No warranty registrations match the criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((w) => (
                  <tr key={w.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono font-bold text-foreground">
                      {w.serialNumber}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-foreground">{w.productName}</div>
                      <div className="text-[11px] text-text-muted">{w.orderId}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <Link href={`/admin/customers/${w.customerId}`} className="font-medium text-primary hover:underline">
                        {w.customerName}
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 text-text-muted">{w.purchaseDate}</td>
                    <td className="px-6 py-3.5 text-center font-semibold text-foreground">
                      {w.durationMonths} Mo
                    </td>
                    <td className="px-6 py-3.5 font-medium text-foreground">{w.expirationDate}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          w.calculatedStatus === "Active"
                            ? "bg-success-soft text-success"
                            : w.calculatedStatus === "Expiring Soon"
                            ? "bg-warning-soft text-warning animate-pulse"
                            : "bg-surface-muted text-text-muted"
                        }`}
                      >
                        {w.calculatedStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Warranty Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Register Appliance Warranty</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Factory Serial Number *</label>
                <input
                  type="text"
                  value={form.serialNumber}
                  onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                  placeholder="e.g. SN-ORB-QLED-889104"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Appliance Product</label>
                <select
                  value={form.productId}
                  onChange={(e) => setForm({ ...form, productId: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Registered Customer</label>
                <select
                  value={form.customerId}
                  onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Purchase Date</label>
                  <input
                    type="date"
                    value={form.purchaseDate}
                    onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Warranty Duration</label>
                  <select
                    value={form.durationMonths}
                    onChange={(e) => setForm({ ...form, durationMonths: Number(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value={12}>1 Year (12 Mo)</option>
                    <option value={24}>2 Years (24 Mo)</option>
                    <option value={36}>3 Years (36 Mo)</option>
                    <option value={60}>5 Years (60 Mo)</option>
                    <option value={120}>10 Years (Compressor)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save Guarantee Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
