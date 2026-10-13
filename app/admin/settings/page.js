"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Store,
  DollarSign,
  Percent,
  RotateCw,
  Check,
  AlertTriangle,
  Lock,
  Save,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const {
    storeSettings,
    updateSettings,
    roles,
    currentRole,
    setCurrentRole,
    updateRolePermissions,
    resetDemoData,
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState("store"); // 'store' | 'rbac'
  const [form, setForm] = useState({ ...storeSettings });
  const [showResetModal, setShowResetModal] = useState(false);

  function handleSaveStoreSettings(e) {
    e.preventDefault();
    updateSettings(form);
  }

  const modules = [
    { id: "analytics", label: "Executive Analytics" },
    { id: "orders", label: "Order Management" },
    { id: "products", label: "Product Catalog" },
    { id: "inventory", label: "Inventory & Stock" },
    { id: "customers", label: "Customer CRM" },
    { id: "support", label: "Helpdesk & Service" },
    { id: "marketing", label: "Marketing & Promos" },
    { id: "settings", label: "System Settings" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            System Settings & Access Governance
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Store identity configuration, currency, tax rates, and role-based access control matrix (RBAC).
          </p>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setShowResetModal(true)}
          className="gap-1.5 text-xs shadow-xs"
        >
          <RotateCw className="h-4 w-4" /> Reset Demo Data
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-4">
        <button
          onClick={() => setActiveTab("store")}
          className={`pb-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "store"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-foreground"
          }`}
        >
          <Store className="h-3.5 w-3.5" /> Store Identity & Regional
        </button>
        <button
          onClick={() => setActiveTab("rbac")}
          className={`pb-2 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === "rbac"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-foreground"
          }`}
        >
          <Shield className="h-3.5 w-3.5" /> Role-Based Permissions (RBAC)
        </button>
      </div>

      {/* Store Identity Tab */}
      {activeTab === "store" && (
        <form onSubmit={handleSaveStoreSettings} className="space-y-6">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-semibold text-foreground border-b border-border pb-3">
              Store Profile & Contact Configuration
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Store Front Display Name</label>
                <input
                  type="text"
                  value={form.storeName}
                  onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Legal Company Entity</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Support Hotline</label>
                <input
                  type="text"
                  value={form.supportPhone}
                  onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Official Admin Email</label>
                <input
                  type="email"
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Flagship Warehouse & Store Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-semibold text-foreground border-b border-border pb-3">
              Regional & Financial Conventions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Operating Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="ETB">ETB (Ethiopian Birr)</option>
                  <option value="USD">USD (US Dollar)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Standard VAT Rate (%)</label>
                <input
                  type="number"
                  value={form.taxRate}
                  onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Timezone</label>
                <input
                  type="text"
                  value={form.timezone}
                  onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button size="sm" type="submit" className="gap-1.5 text-xs shadow-xs">
              <Save className="h-4 w-4" /> Save Store Configuration
            </Button>
          </div>
        </form>
      )}

      {/* Module D18: Role-Based Access Control (RBAC) Tab */}
      {activeTab === "rbac" && (
        <div className="space-y-6">
          {/* Security Disclaimer Banner */}
          <div className="rounded-xl border border-warning/30 bg-warning-soft/30 p-4 flex items-start gap-3 text-xs text-warning">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Security Architecture Notice:</span> This role-based permissions matrix simulates UI visibility and access rules for demo purposes. Production security requires cryptographic authentication and server-side authorization middleware on all API endpoints.
            </div>
          </div>

          {/* Active Role Selector */}
          <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-foreground">Simulate Active Admin Role:</span>
              <p className="text-[11px] text-text-muted mt-0.5">
                Switch role to test how other staff members experience the interface.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.name)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    currentRole === r.name
                      ? "bg-primary text-white shadow-xs"
                      : "bg-surface-muted text-text-muted hover:text-foreground"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* RBAC Matrix Table */}
          <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Role Permissions Matrix</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Granular view and edit capability permissions mapped across modules.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Store Module</th>
                    {roles.map((r) => (
                      <th key={r.id} className="px-4 py-3 font-semibold text-center">
                        <div>{r.name}</div>
                        <div className="text-[10px] font-normal text-text-faint">{r.userCount} users</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {modules.map((mod) => (
                    <tr key={mod.id} className="hover:bg-surface-muted/30">
                      <td className="px-6 py-3.5 font-semibold text-foreground">
                        {mod.label}
                      </td>
                      {roles.map((role) => {
                        const perm = role.permissions?.[mod.id] || {};
                        const canView = perm.view !== false;
                        const canEdit = perm.edit || perm.create || perm.adjust || perm.assign || perm.publish;

                        return (
                          <td key={role.id} className="px-4 py-3.5 text-center">
                            <span
                              className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                canEdit
                                  ? "bg-success-soft text-success"
                                  : canView
                                  ? "bg-primary-soft text-primary"
                                  : "bg-surface-muted text-text-muted"
                              }`}
                            >
                              {canEdit ? "Full Access" : canView ? "View Only" : "No Access"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Reset */}
      <ConfirmationModal
        isOpen={showResetModal}
        title="Reset Demo Dataset?"
        message="This will clear your local storage and restore all products, orders, customers, tickets, coupons, and inventory to their factory seed state. Proceed?"
        confirmLabel="Reset Everything"
        variant="danger"
        onConfirm={() => {
          resetDemoData();
          setShowResetModal(false);
          setForm({ ...storeSettings });
        }}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
}
