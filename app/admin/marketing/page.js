"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Send,
  AlertTriangle,
  Sliders,
  Star,
  Layers,
  X,
  Play,
  RotateCcw,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { toast } from "sonner";

export default function AdminMarketingPage() {
  const {
    coupons,
    createCoupon,
    toggleCoupon,
    deleteCoupon,
    campaigns,
    createCampaign,
    simulateSendCampaign,
    categories,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState("coupons"); // 'coupons' | 'campaigns'
  const [searchQuery, setSearchQuery] = useState("");

  // Coupon Creation Modal
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    type: "percentage",
    value: 10,
    minOrderValue: 25000,
    maxDiscount: 10000,
    usageLimit: 200,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "2026-12-31",
    applicableCategory: "all",
    description: "",
  });

  // Coupon Validation Simulator
  const [simCode, setSimCode] = useState("ORBITWELCOME10");
  const [simOrderVal, setSimOrderVal] = useState("35000");
  const [simResult, setSimResult] = useState(null);

  // Email Campaign Modal & Send Confirmation
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [newCampaignForm, setNewCampaignForm] = useState({
    title: "",
    targetSegment: "All Active Customers",
    subject: "",
    recipientsCount: 2400,
  });
  const [sendCampaignId, setSendCampaignId] = useState(null);

  function handleCreateCouponSubmit(e) {
    e.preventDefault();
    if (!couponForm.code.trim()) {
      toast.error("Coupon code is required.");
      return;
    }
    const cleanCode = couponForm.code.trim().toUpperCase();
    if (coupons.some((c) => c.code === cleanCode)) {
      toast.error(`Coupon code "${cleanCode}" already exists.`);
      return;
    }

    createCoupon({
      ...couponForm,
      code: cleanCode,
      value: Number(couponForm.value),
      minOrderValue: Number(couponForm.minOrderValue),
      maxDiscount: Number(couponForm.maxDiscount),
      usageLimit: Number(couponForm.usageLimit),
    });

    setCouponModalOpen(false);
    setCouponForm({
      code: "",
      type: "percentage",
      value: 10,
      minOrderValue: 25000,
      maxDiscount: 10000,
      usageLimit: 200,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: "2026-12-31",
      applicableCategory: "all",
      description: "",
    });
  }

  // Simulate coupon against mock order
  function runCouponSimulation() {
    const code = simCode.trim().toUpperCase();
    const val = Number(simOrderVal) || 0;
    const found = coupons.find((c) => c.code === code);

    if (!found) {
      setSimResult({ valid: false, message: `Coupon "${code}" not found or invalid.` });
      return;
    }
    if (!found.isActive) {
      setSimResult({ valid: false, message: `Coupon "${code}" is currently deactivated.` });
      return;
    }
    if (val < found.minOrderValue) {
      setSimResult({
        valid: false,
        message: `Minimum order value not met. Cart must be at least ${found.minOrderValue.toLocaleString()} ETB.`,
      });
      return;
    }

    let discount = 0;
    if (found.type === "percentage") {
      discount = Math.min((val * found.value) / 100, found.maxDiscount || Infinity);
    } else {
      discount = found.value;
    }

    const finalVal = Math.max(0, val - discount);
    setSimResult({
      valid: true,
      discount,
      finalTotal: finalVal,
      message: `Coupon successfully applied! Saves ${discount.toLocaleString()} ETB.`,
    });
  }

  function handleCreateCampaignSubmit(e) {
    e.preventDefault();
    if (!newCampaignForm.title.trim() || !newCampaignForm.subject.trim()) {
      toast.error("Campaign title and subject are required.");
      return;
    }
    createCampaign(newCampaignForm);
    setCampaignModalOpen(false);
    setNewCampaignForm({
      title: "",
      targetSegment: "All Active Customers",
      subject: "",
      recipientsCount: 2400,
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Marketing, Promotions & Campaigns
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Build discount vouchers, execute promotional broadcasts, and manage homepage merchandising.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/marketing/content">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Sliders className="h-4 w-4 text-primary" /> Homepage CMS
            </Button>
          </Link>
          <Link href="/admin/marketing/reviews">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Star className="h-4 w-4 text-warning" /> Reviews Moderation
            </Button>
          </Link>
          {activeTab === "coupons" ? (
            <Button size="sm" onClick={() => setCouponModalOpen(true)} className="gap-1.5 shadow-xs text-xs">
              <Plus className="h-4 w-4" /> New Coupon
            </Button>
          ) : (
            <Button size="sm" onClick={() => setCampaignModalOpen(true)} className="gap-1.5 shadow-xs text-xs">
              <Plus className="h-4 w-4" /> Draft Campaign
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-4">
        <button
          onClick={() => setActiveTab("coupons")}
          className={`pb-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "coupons"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-foreground"
          }`}
        >
          <Tag className="h-3.5 w-3.5" /> Discount Coupons ({coupons.length})
        </button>
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`pb-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "campaigns"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-foreground"
          }`}
        >
          <Mail className="h-3.5 w-3.5" /> Email Campaigns ({campaigns.length})
        </button>
      </div>

      {/* Module F26: Coupons Tab */}
      {activeTab === "coupons" && (
        <div className="space-y-6">
          {/* Coupon Validation Simulator */}
          <div className="rounded-xl border border-primary/30 bg-primary-soft/20 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Play className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Coupon Rules Simulator & Checkout Test
              </h2>
            </div>
            <p className="text-xs text-text-muted mb-4">
              Simulate coupon redemption against checkout amounts and minimum thresholds in real time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-text-muted block mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={simCode}
                  onChange={(e) => setSimCode(e.target.value)}
                  placeholder="ORBITWELCOME10"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-mono uppercase text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-text-muted block mb-1">Cart Total (ETB)</label>
                <input
                  type="number"
                  value={simOrderVal}
                  onChange={(e) => setSimOrderVal(e.target.value)}
                  placeholder="35000"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <Button size="sm" onClick={runCouponSimulation} className="w-full text-xs">
                  Validate Coupon
                </Button>
              </div>
            </div>

            {simResult && (
              <div
                className={`mt-3 rounded-lg p-3 text-xs flex items-center justify-between border ${
                  simResult.valid
                    ? "bg-success-soft border-success/30 text-success"
                    : "bg-danger-soft border-danger/30 text-danger"
                }`}
              >
                <span>{simResult.message}</span>
                {simResult.valid && (
                  <span className="font-bold">
                    Payable: {simResult.finalTotal.toLocaleString()} ETB
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Coupons Table */}
          <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Coupon Code</th>
                    <th className="px-6 py-3 font-semibold">Discount Type</th>
                    <th className="px-6 py-3 font-semibold text-right">Value</th>
                    <th className="px-6 py-3 font-semibold text-right">Min Order</th>
                    <th className="px-6 py-3 font-semibold text-center">Usage Limit</th>
                    <th className="px-6 py-3 font-semibold">Valid Period</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {coupons.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-foreground">
                        {c.code}
                      </td>
                      <td className="px-6 py-4 capitalize text-text-muted">
                        {c.type} discount
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-foreground">
                        {c.type === "percentage" ? `${c.value}%` : `${c.value.toLocaleString()} ETB`}
                      </td>
                      <td className="px-6 py-4 text-right text-text-muted font-medium">
                        {c.minOrderValue.toLocaleString()} ETB
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-foreground">{c.usedCount}</span> / {c.usageLimit}
                      </td>
                      <td className="px-6 py-4 text-text-muted">
                        {c.startDate} to {c.endDate}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            c.isActive
                              ? "bg-success-soft text-success"
                              : "bg-surface-muted text-text-muted"
                          }`}
                        >
                          {c.isActive ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => toggleCoupon(c.id)}
                        >
                          {c.isActive ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-danger hover:bg-danger-soft"
                          onClick={() => deleteCoupon(c.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Module F28: Email Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-warning/30 bg-warning-soft/30 p-4 flex items-start gap-3 text-xs text-warning">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Email Integration Notice:</span> Marketing broadcasts are local client simulations. Connecting real SMTP or providers (e.g. SendGrid, Mailchimp, Postmark) requires backend microservices.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="rounded-xl border border-border bg-surface p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-primary transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-primary-soft text-primary px-2 py-0.5 text-[10px] font-bold">
                      {camp.targetSegment}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        camp.status === "Sent"
                          ? "bg-success-soft text-success"
                          : "bg-surface-muted text-text-muted"
                      }`}
                    >
                      {camp.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-foreground">{camp.title}</h3>
                  <p className="mt-1 text-xs text-text-muted italic leading-relaxed">
                    &ldquo;{camp.subject}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-border space-y-2 text-xs">
                  <div className="flex justify-between text-text-muted">
                    <span>Recipients:</span>
                    <span className="font-bold text-foreground">{camp.recipientsCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Simulated Open Rate:</span>
                    <span className="font-bold text-primary">{camp.openRate}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Simulated Click Rate:</span>
                    <span className="font-bold text-success">{camp.clickRate}</span>
                  </div>

                  {camp.status === "Draft" ? (
                    <Button
                      size="sm"
                      onClick={() => setSendCampaignId(camp.id)}
                      className="w-full mt-3 gap-1.5 text-xs"
                    >
                      <Send className="h-3 w-3" /> Simulate Broadcast Send
                    </Button>
                  ) : (
                    <div className="pt-2 text-[11px] text-text-faint text-center">
                      Dispatched on {camp.sentDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Coupon Modal */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Create Discount Coupon</h2>
              <button onClick={() => setCouponModalOpen(false)} className="p-1 text-text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCouponSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Coupon Promo Code *</label>
                <input
                  type="text"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  placeholder="e.g. FLASH2026"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono uppercase text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Discount Type</label>
                  <select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (ETB)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Discount Value *</label>
                  <input
                    type="number"
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Min Order Value (ETB)</label>
                  <input
                    type="number"
                    value={couponForm.minOrderValue}
                    onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Usage Limit (Claims)</label>
                  <input
                    type="number"
                    value={couponForm.usageLimit}
                    onChange={(e) => setCouponForm({ ...couponForm, usageLimit: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Applicable Category</label>
                <select
                  value={couponForm.applicableCategory}
                  onChange={(e) => setCouponForm({ ...couponForm, applicableCategory: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="all">All Appliances</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setCouponModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save Coupon
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {campaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Draft Email Campaign</h2>
              <button onClick={() => setCampaignModalOpen(false)} className="p-1 text-text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaignSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Campaign Internal Name *</label>
                <input
                  type="text"
                  value={newCampaignForm.title}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, title: e.target.value })}
                  placeholder="e.g. End of Year Tech Clearance"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Target Recipient Segment</label>
                <select
                  value={newCampaignForm.targetSegment}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, targetSegment: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="All Active Customers">All Active Customers</option>
                  <option value="VIP Customers">VIP High-Spend Customers</option>
                  <option value="AC & Fridge Buyers">AC & Fridge Owners</option>
                  <option value="At-Risk Customers">At-Risk Inactive Customers</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Subject Line *</label>
                <input
                  type="text"
                  value={newCampaignForm.subject}
                  onChange={(e) => setNewCampaignForm({ ...newCampaignForm, subject: e.target.value })}
                  placeholder="Exclusive Offers: Up to 15,000 ETB Off Flagship TVs"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setCampaignModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save Draft
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Send Simulation Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!sendCampaignId}
        title="Simulate Campaign Dispatch?"
        message="This will mark the email campaign as Sent, simulate recipient open and click engagement rates, and record an audit log. No real emails will be delivered."
        confirmLabel="Simulate Send"
        variant="default"
        onConfirm={() => {
          simulateSendCampaign(sendCampaignId);
          setSendCampaignId(null);
        }}
        onCancel={() => setSendCampaignId(null)}
      />
    </div>
  );
}
