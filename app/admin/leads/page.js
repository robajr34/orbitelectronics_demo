"use client";

import React, { useState } from "react";
import {
  Building2,
  Plus,
  ArrowRight,
  DollarSign,
  Phone,
  User,
  X,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([
    { id: "LD-001", name: "Commercial Bank of Ethiopia", contact: "Biniam T.", product: "10x Orbit 55\" QLED", status: "Quotation", value: 650000 },
    { id: "LD-002", name: "Elilly International Hotel", contact: "Meron S.", product: "50x 1.5 Ton AC", status: "New", value: 2600000 },
    { id: "LD-003", name: "Addis Ababa University", contact: "Dr. Yonas", product: "20x French Door Refrigerators", status: "Contacted", value: 2200000 },
    { id: "LD-004", name: "Ethiopian Airlines Cargo Hub", contact: "Capt. Alazar", product: "8x 2.5 Ton Tower AC", status: "Won", value: 736000 },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    product: "",
    value: 500000,
    status: "New",
  });

  const stages = ["New", "Contacted", "Quotation", "Won"];
  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0);

  function advanceLead(id) {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const idx = stages.indexOf(l.status);
          const next = stages[Math.min(stages.length - 1, idx + 1)];
          toast.success(`Lead moved to ${next}`);
          return { ...l, status: next };
        }
        return l;
      })
    );
  }

  function handleCreateLead(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.product.trim()) {
      toast.error("Company name and product requirements are required.");
      return;
    }
    const newId = `LD-00${leads.length + 1}`;
    setLeads([
      ...leads,
      {
        id: newId,
        name: form.name.trim(),
        contact: form.contact.trim() || "Procurement Desk",
        product: form.product.trim(),
        value: Number(form.value) || 0,
        status: form.status,
      },
    ]);
    toast.success(`B2B Lead "${form.name}" created.`);
    setModalOpen(false);
    setForm({
      name: "",
      contact: "",
      product: "",
      value: 500000,
      status: "New",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            B2B Commercial Sales Pipeline
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Institutional sales, hotel contract furnishing, corporate tenders, and bulk electronics quotes.
          </p>
        </div>

        <Button size="sm" onClick={() => setModalOpen(true)} className="gap-1.5 shadow-xs text-xs">
          <Plus className="h-4 w-4" /> Add Corporate Lead
        </Button>
      </div>

      {/* Pipeline Summary Bar */}
      <div className="rounded-xl border border-border bg-surface p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Total Pipeline Value</div>
          <div className="mt-1 text-2xl font-bold text-primary">{totalPipeline.toLocaleString()} ETB</div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div><span className="font-bold text-foreground">{leads.length}</span> active corporate deals</div>
          <div><span className="font-bold text-success">{leads.filter((l) => l.status === "Won").length}</span> contracts won</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((st) => {
          const items = leads.filter((l) => l.status === st);
          const stageTotal = items.reduce((sum, i) => sum + i.value, 0);

          return (
            <div key={st} className="bg-surface-muted/50 rounded-xl p-4 border border-border flex flex-col min-h-[420px]">
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                <div>
                  <h3 className="font-bold text-xs text-foreground uppercase tracking-wider">{st}</h3>
                  <div className="text-[10px] text-text-muted mt-0.5">{stageTotal.toLocaleString()} ETB</div>
                </div>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-text-muted border border-border">
                  {items.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="h-20 flex items-center justify-center border border-dashed border-border rounded-lg text-[11px] text-text-faint">
                    No deals in {st}
                  </div>
                ) : (
                  items.map((lead) => {
                    const isWon = lead.status === "Won";
                    return (
                      <div
                        key={lead.id}
                        className="bg-surface p-3.5 rounded-lg border border-border shadow-xs hover:border-primary transition-all space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-text-faint">{lead.id}</span>
                          <span className="font-bold text-xs text-primary">{lead.value.toLocaleString()} ETB</span>
                        </div>
                        <div className="font-semibold text-foreground">{lead.name}</div>
                        <div className="text-[11px] text-text-muted">Contact: {lead.contact}</div>
                        <div className="text-[11px] text-text-muted bg-surface-muted/60 p-1.5 rounded">
                          {lead.product}
                        </div>

                        {!isWon && (
                          <div className="pt-2 border-t border-border flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 text-[10px] text-primary hover:bg-primary-soft px-2"
                              onClick={() => advanceLead(lead.id)}
                            >
                              Advance Stage <ArrowRight className="h-3 w-3 ml-1" />
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

      {/* Add Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Add Corporate B2B Lead</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Company / Organization *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Radisson Blu Hotel"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Contact Person</label>
                <input
                  type="text"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="e.g. Solomon K. (Procurement)"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Appliance Requirements *</label>
                <input
                  type="text"
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  placeholder="e.g. 25x 55&quot; Smart TVs + Mounting Brackets"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Deal Value (ETB)</label>
                  <input
                    type="number"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Stage</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {stages.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save Deal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
