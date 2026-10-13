"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Flag,
  Search,
  Filter,
  MessageSquare,
  Package,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";

export default function AdminReviewsPage() {
  const { reviews, moderateReview } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = reviews.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.customerName.toLowerCase().includes(q) ||
      r.productName.toLowerCase().includes(q) ||
      r.comment.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "All" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/marketing">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Product Review Moderation
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Customer sentiment monitoring, feedback verification, spam protection, and publishing approvals.
            </p>
          </div>
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
            placeholder="Search reviews by customer, product, or feedback keyword..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {["All", "Pending", "Approved", "Rejected"].map((st) => (
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

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface py-12 text-center text-xs text-text-muted">
            No reviews match the selected filter.
          </div>
        ) : (
          filtered.map((rev) => (
            <div
              key={rev.id}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm space-y-3 hover:border-primary transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{rev.customerName}</span>
                  <span className="text-text-muted">&bull;</span>
                  <span className="text-xs text-primary font-medium">{rev.productName}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center text-warning">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < rev.rating ? "fill-warning text-warning" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      rev.status === "Approved"
                        ? "bg-success-soft text-success"
                        : rev.status === "Rejected"
                        ? "bg-danger-soft text-danger"
                        : "bg-warning-soft text-warning"
                    }`}
                  >
                    {rev.status}
                  </span>
                  <span className="text-[11px] text-text-faint">{rev.date}</span>
                </div>
              </div>

              <div>
                {rev.title && <h3 className="font-semibold text-xs text-foreground mb-1">{rev.title}</h3>}
                <p className="text-xs text-text-muted leading-relaxed bg-surface-muted/30 p-3 rounded-lg border border-border">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                {rev.status !== "Approved" && (
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-success hover:bg-success/90 text-white gap-1"
                    onClick={() => moderateReview(rev.id, "Approved")}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                  </Button>
                )}
                {rev.status !== "Rejected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-danger hover:bg-danger-soft gap-1"
                    onClick={() => moderateReview(rev.id, "Rejected")}
                  >
                    <XCircle className="h-3.5 w-3.5" /> Reject
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
