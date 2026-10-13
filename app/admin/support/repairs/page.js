"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  ArrowLeft,
  Plus,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  X,
  ChevronRight,
  Package,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminRepairsPage() {
  const { repairs, updateRepairStatus, createRepair, customers, products } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    customerId: customers[0]?.id || "",
    appliance: "Orbit 1.5 Ton Inverter Split AC",
    serialNumber: "SN-ORB-AC-18-0012",
    issue: "",
    technician: "Solomon Tsegaye (Senior HVAC)",
    appointmentDate: new Date().toISOString().slice(0, 10) + " 14:00",
    partsNeeded: "",
  });

  const statuses = [
    "Requested",
    "Scheduled",
    "Diagnosing",
    "Awaiting Parts",
    "In Repair",
    "Completed",
  ];

  const technicians = [
    "Solomon Tsegaye (Senior HVAC)",
    "Mulugeta Wolde (Refrigeration Specialist)",
    "Biniam T. (Electronics & Audio)",
    "Yonas Gebre (General Appliances)",
  ];

  function handleCreateSubmit(e) {
    e.preventDefault();
    if (!form.issue.trim()) {
      toast.error("Please describe the appliance issue.");
      return;
    }
    const cust = customers.find((c) => c.id === form.customerId);
    createRepair({
      customerId: form.customerId,
      customerName: cust ? cust.name : "Retail Customer",
      appliance: form.appliance,
      serialNumber: form.serialNumber,
      issue: form.issue.trim(),
      technician: form.technician,
      appointmentDate: form.appointmentDate,
      partsNeeded: form.partsNeeded ? form.partsNeeded.split(",").map((s) => s.trim()) : [],
    });
    setModalOpen(false);
    setForm({
      customerId: customers[0]?.id || "",
      appliance: "Orbit 1.5 Ton Inverter Split AC",
      serialNumber: "SN-ORB-AC-18-0012",
      issue: "",
      technician: "Solomon Tsegaye (Senior HVAC)",
      appointmentDate: new Date().toISOString().slice(0, 10) + " 14:00",
      partsNeeded: "",
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
              Appliance Repair & Service Board
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Field technician dispatch, diagnostic tracking, spare parts allocation, and job completion.
            </p>
          </div>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="gap-1.5 shadow-xs text-xs">
          <Plus className="h-4 w-4" /> Book Service Job
        </Button>
      </div>

      {/* Kanban / Workflow Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statuses.map((status) => {
          const itemsInStatus = repairs.filter((r) => r.status === status);
          return (
            <div
              key={status}
              className="rounded-xl border border-border bg-surface-muted/40 p-3 flex flex-col min-h-[500px]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                <span className="font-bold text-xs text-foreground uppercase tracking-wider">{status}</span>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-text-muted border border-border">
                  {itemsInStatus.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {itemsInStatus.length === 0 ? (
                  <div className="h-24 flex items-center justify-center border border-dashed border-border rounded-lg text-[11px] text-text-faint">
                    No jobs in {status}
                  </div>
                ) : (
                  itemsInStatus.map((rep) => {
                    const currentIndex = statuses.indexOf(rep.status);
                    const nextStatus = statuses[currentIndex + 1];

                    return (
                      <div
                        key={rep.id}
                        className="rounded-lg border border-border bg-surface p-3 shadow-xs space-y-2 hover:border-primary transition-colors text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[11px] text-primary">{rep.id}</span>
                          <span className="text-[10px] text-text-faint">{rep.appointmentDate?.slice(0, 10)}</span>
                        </div>

                        <div>
                          <div className="font-semibold text-foreground text-xs">{rep.appliance}</div>
                          <div className="text-[11px] text-text-muted font-medium">{rep.customerName}</div>
                        </div>

                        <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed bg-surface-muted/40 p-1.5 rounded">
                          {rep.issue}
                        </p>

                        <div className="text-[10px] text-text-faint space-y-0.5">
                          <div><span className="font-semibold text-text-muted">Tech:</span> {rep.technician}</div>
                          {rep.partsNeeded && rep.partsNeeded.length > 0 && (
                            <div className="text-warning flex items-center gap-1">
                              <Package className="h-3 w-3" />
                              <span>{rep.partsNeeded.join(", ")}</span>
                            </div>
                          )}
                        </div>

                        {nextStatus && (
                          <div className="pt-2 border-t border-border flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-[10px] text-primary hover:bg-primary-soft px-2"
                              onClick={() => updateRepairStatus(rep.id, nextStatus)}
                            >
                              Move to {nextStatus} <ChevronRight className="h-3 w-3 ml-0.5" />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Book Service Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Book Appliance Service Visit</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Customer</label>
                <select
                  value={form.customerId}
                  onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Appliance Name & Model</label>
                <input
                  type="text"
                  value={form.appliance}
                  onChange={(e) => setForm({ ...form, appliance: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Serial Number</label>
                <input
                  type="text"
                  value={form.serialNumber}
                  onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Issue Description *</label>
                <textarea
                  rows={2}
                  value={form.issue}
                  onChange={(e) => setForm({ ...form, issue: e.target.value })}
                  placeholder="Describe failure symptoms, error codes, or customer complaint..."
                  className="w-full rounded-lg border border-border bg-surface p-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Assign Technician</label>
                  <select
                    value={form.technician}
                    onChange={(e) => setForm({ ...form, technician: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {technicians.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Appointment Date</label>
                  <input
                    type="text"
                    value={form.appointmentDate}
                    onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Required Spare Parts (Optional)</label>
                <input
                  type="text"
                  value={form.partsNeeded}
                  onChange={(e) => setForm({ ...form, partsNeeded: e.target.value })}
                  placeholder="e.g. Inverter capacitor, R32 gas canister"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Dispatch Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
