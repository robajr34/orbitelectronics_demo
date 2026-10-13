"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  DollarSign,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { toast } from "sonner";

export default function AdminReturnsPage() {
  const { returns, updateReturnStatus } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeModal, setActiveModal] = useState(null); // { type: 'approve' | 'reject', returnItem: ... }

  const filteredReturns = returns.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function handleAction(returnItem, action) {
    if (action === "Reviewed") {
      updateReturnStatus(returnItem.id, "Reviewed", "Marked as inspected by support supervisor.");
    } else if (action === "Approve") {
      setActiveModal({ type: "approve", item: returnItem });
    } else if (action === "Reject") {
      setActiveModal({ type: "reject", item: returnItem });
    }
  }

  function confirmModalAction() {
    if (!activeModal) return;
    if (activeModal.type === "approve") {
      updateReturnStatus(
        activeModal.item.id,
        "Approved",
        `Refund of ${activeModal.item.refundAmount.toLocaleString()} ETB authorized by admin.`
      );
    } else if (activeModal.type === "reject") {
      updateReturnStatus(
        activeModal.item.id,
        "Rejected",
        "Return rejected following technician physical evaluation."
      );
    }
    setActiveModal(null);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Returns & Exchanges Queue
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Appliance return requests, warranty claims, exchange approvals, and refund authorizations.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Gateway Disclaimer Banner */}
      <div className="rounded-xl border border-warning/30 bg-warning-soft/40 p-4 flex items-start gap-3 text-xs text-warning">
        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Integration Architecture Notice:</span> Approving returns updates customer balances and revenue metrics in this client prototype. Real monetary credit reversals require connecting a live Payment Gateway webhook (e.g. Telebirr API, CBE Birr API, or card acquiring gateway).
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search return ID, customer, order reference, or appliance..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {["All", "Requested", "Reviewed", "Approved", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
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

      {/* Returns Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">Return ID</th>
                <th className="px-6 py-3 font-semibold">Order Ref</th>
                <th className="px-6 py-3 font-semibold">Customer</th>
                <th className="px-6 py-3 font-semibold">Product & SKU</th>
                <th className="px-6 py-3 font-semibold">Reason</th>
                <th className="px-6 py-3 font-semibold">Refund Amount</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReturns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-muted">
                    No return requests matching the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredReturns.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground font-mono">{item.id}</td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${item.orderId}`} className="text-primary hover:underline font-medium">
                        {item.orderId}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">{item.customerName}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{item.productName}</div>
                      <div className="text-[11px] text-text-muted">{item.sku}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs text-text-muted leading-relaxed">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      {item.refundAmount > 0 ? `${item.refundAmount.toLocaleString()} ETB` : "Exchange (0 ETB)"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          item.status === "Approved"
                            ? "bg-success-soft text-success"
                            : item.status === "Reviewed"
                            ? "bg-primary-soft text-primary"
                            : item.status === "Rejected"
                            ? "bg-danger-soft text-danger"
                            : "bg-warning-soft text-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                      {item.status === "Requested" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleAction(item, "Reviewed")}
                        >
                          Mark Reviewed
                        </Button>
                      )}
                      {item.status !== "Approved" && item.status !== "Rejected" && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="h-7 text-xs bg-success hover:bg-success/90"
                            onClick={() => handleAction(item, "Approve")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs text-danger hover:bg-danger-soft"
                            onClick={() => handleAction(item, "Reject")}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!activeModal}
        title={activeModal?.type === "approve" ? "Authorize Return & Refund?" : "Reject Return Request?"}
        message={
          activeModal?.type === "approve"
            ? `Are you sure you want to approve return #${activeModal?.item?.id} and authorize a simulated refund of ${activeModal?.item?.refundAmount?.toLocaleString()} ETB?`
            : `Are you sure you want to reject return #${activeModal?.item?.id}? This action will notify the customer.`
        }
        confirmLabel={activeModal?.type === "approve" ? "Approve Return" : "Reject Return"}
        variant={activeModal?.type === "approve" ? "default" : "danger"}
        onConfirm={confirmModalAction}
        onCancel={() => setActiveModal(null)}
      />
    </div>
  );
}
