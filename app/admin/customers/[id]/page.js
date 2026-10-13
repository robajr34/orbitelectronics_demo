"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingCart,
  ShieldCheck,
  Clock,
  Tag,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params?.id;

  const { customers, orders, warranties, toggleCustomerTag } = useAdminStore();

  const customer = customers.find((c) => c.id === customerId);

  // Customer's orders
  const customerOrders = useMemo(
    () => orders.filter((o) => o.customerId === customerId),
    [orders, customerId]
  );

  // Customer's registered warranties
  const customerWarranties = useMemo(
    () => warranties.filter((w) => w.customerId === customerId),
    [warranties, customerId]
  );

  // Derive metrics
  const eligibleOrders = customerOrders.filter(
    (o) => o.paymentStatus === "Paid" && o.fulfillmentStatus !== "Cancelled"
  );
  const lifetimeSpend = eligibleOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const aov = eligibleOrders.length > 0 ? Math.round(lifetimeSpend / eligibleOrders.length) : 0;
  const lastPurchaseDate = customerOrders[0]?.date?.slice(0, 10) || "N/A";

  if (!customer) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Customer Not Found</h2>
        <Link href="/admin/customers">
          <Button variant="outline" size="sm">Back to Directory</Button>
        </Link>
      </div>
    );
  }

  // Simulated activity log
  const activityLogs = [
    { type: "Order Placed", time: "2 days ago", details: `Completed order #${customerOrders[0]?.id || "ORD-2026-8910"}` },
    { type: "Account Login", time: "3 days ago", details: "Signed in via Telebirr SuperApp SSO (simulated)" },
    { type: "Warranty Registered", time: "1 week ago", details: "Registered serial number for Orbit appliance" },
    { type: "Account Creation", time: customer.registeredDate, details: "Profile registered in Addis Ababa flagship store" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/customers">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{customer.name}</h1>
              <span className="font-mono text-xs text-text-muted">({customer.id})</span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Customer since {customer.registeredDate} &bull; {customer.city || "Addis Ababa"}
            </p>
          </div>
        </div>

        {/* Tag actions */}
        <div className="flex items-center gap-2">
          {(customer.tags || []).map((t) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                t === "VIP"
                  ? "bg-primary-soft text-primary"
                  : t === "Repeat Customer"
                  ? "bg-success-soft text-success"
                  : "bg-surface-muted text-text-muted"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Lifetime Spend</div>
          <div className="mt-2 text-2xl font-bold text-primary">{lifetimeSpend.toLocaleString()} ETB</div>
          <div className="mt-1 text-xs text-text-muted">Across {customerOrders.length} total orders</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Average Order Value</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{aov.toLocaleString()} ETB</div>
          <div className="mt-1 text-xs text-text-muted">Calculated per eligible order</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Total Purchases</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{customerOrders.length}</div>
          <div className="mt-1 text-xs text-text-muted">Last order: {lastPurchaseDate}</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Registered Warranties</div>
          <div className="mt-2 text-2xl font-bold text-success">{customerWarranties.length}</div>
          <div className="mt-1 text-xs text-text-muted">Under active coverage</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 cols): Order History & Warranties */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order History */}
          <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Order & Purchase History</h2>
              <span className="text-xs text-text-muted">{customerOrders.length} orders recorded</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Order ID</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Items</th>
                    <th className="px-6 py-3 font-semibold text-right">Amount</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {customerOrders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-text-muted">
                        No orders placed by this customer yet.
                      </td>
                    </tr>
                  ) : (
                    customerOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-surface-muted/30">
                        <td className="px-6 py-3.5 font-bold text-foreground">
                          <Link href={`/admin/orders/${o.id}`} className="hover:text-primary hover:underline">
                            {o.id}
                          </Link>
                        </td>
                        <td className="px-6 py-3.5 text-text-muted">{o.date?.slice(0, 10)}</td>
                        <td className="px-6 py-3.5">
                          <span className="font-medium text-foreground">{o.items?.length || 0} appliance(s)</span>
                          <div className="text-[11px] text-text-muted truncate max-w-[150px]">
                            {o.items?.[0]?.name}
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-right font-bold text-foreground">
                          {o.grandTotal.toLocaleString()} ETB
                        </td>
                        <td className="px-6 py-3.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              o.fulfillmentStatus === "Delivered"
                                ? "bg-success-soft text-success"
                                : o.fulfillmentStatus === "Cancelled"
                                ? "bg-danger-soft text-danger"
                                : "bg-warning-soft text-warning"
                            }`}
                          >
                            {o.fulfillmentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <Link href={`/admin/orders/${o.id}`}>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Inspect
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

          {/* Registered Warranties */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Registered Appliance Warranties
              </h2>
              <Link href="/admin/support/warranties" className="text-xs text-primary hover:underline font-medium">
                View All Warranties
              </Link>
            </div>

            <div className="space-y-3">
              {customerWarranties.length === 0 ? (
                <div className="py-6 text-center text-xs text-text-muted">
                  No registered warranty certificates for this account.
                </div>
              ) : (
                customerWarranties.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-lg border border-border bg-surface-muted/30 p-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-foreground">{w.productName}</div>
                      <div className="text-[11px] text-text-muted font-mono mt-0.5">
                        SN: {w.serialNumber} &bull; Expires: {w.expirationDate}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        w.status === "Active"
                          ? "bg-success-soft text-success"
                          : w.status === "Expiring Soon"
                          ? "bg-warning-soft text-warning"
                          : "bg-surface-muted text-text-muted"
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details & Simulated Activity Log */}
        <div className="space-y-6">
          {/* Contact Details */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Contact & Billing Profile
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-text-muted block">Email Address:</span>
                <span className="font-medium text-foreground">{customer.email}</span>
              </div>
              <div>
                <span className="text-text-muted block">Phone Number:</span>
                <span className="font-medium text-foreground">{customer.phone}</span>
              </div>
              <div>
                <span className="text-text-muted block">Delivery Address:</span>
                <div className="flex items-start gap-1.5 mt-0.5 text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-text-faint shrink-0 mt-0.5" />
                  <span>{customer.address}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <span className="text-text-muted block">Customer Notes:</span>
                <p className="mt-1 text-text-muted leading-relaxed italic bg-surface-muted/60 p-2.5 rounded-lg border border-border">
                  {customer.notes || "No specific customer preferences noted."}
                </p>
              </div>
            </div>
          </div>

          {/* Module D19: Simulated Customer Activity Log */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Simulated Activity Log
              </h2>
            </div>
            <div className="space-y-3">
              {activityLogs.map((log, i) => (
                <div key={i} className="text-xs space-y-0.5 border-l-2 border-primary/40 pl-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{log.type}</span>
                    <span className="text-[10px] text-text-faint">{log.time}</span>
                  </div>
                  <p className="text-[11px] text-text-muted">{log.details}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-border text-[10px] text-text-faint">
              * Event streams are simulated locally for admin testing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
