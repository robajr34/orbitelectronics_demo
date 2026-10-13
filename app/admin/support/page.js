"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Headphones,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle2,
  User,
  MessageSquare,
  ShieldCheck,
  Wrench,
  BookOpen,
  X,
  Send,
  Lock,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminSupportPage() {
  const {
    supportTickets,
    createTicket,
    updateTicket,
    addTicketNote,
    customers,
  } = useAdminStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Selected ticket for side drawer / modal
  const [activeTicket, setActiveTicket] = useState(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Create Ticket Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState({
    subject: "",
    customerId: "CUST-001",
    category: "Technical Setup",
    priority: "Medium",
    assignee: "Tewodros Kassahun",
  });

  const staffMembers = [
    "Tewodros Kassahun",
    "Yonas Gebre",
    "Meron Assefa",
    "Solomon Tsegaye",
    "Helen Mengistu",
  ];

  const filteredTickets = supportTickets.filter((t) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      t.id.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      t.assignee.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  function handleCreateTicket(e) {
    e.preventDefault();
    if (!newTicketForm.subject.trim()) {
      toast.error("Please enter a ticket subject.");
      return;
    }
    const cust = customers.find((c) => c.id === newTicketForm.customerId);
    createTicket({
      subject: newTicketForm.subject.trim(),
      customerId: newTicketForm.customerId,
      customerName: cust ? cust.name : "Retail Customer",
      category: newTicketForm.category,
      priority: newTicketForm.priority,
      assignee: newTicketForm.assignee,
    });
    setCreateModalOpen(false);
    setNewTicketForm({
      subject: "",
      customerId: "CUST-001",
      category: "Technical Setup",
      priority: "Medium",
      assignee: "Tewodros Kassahun",
    });
  }

  function handleAddNote(e) {
    e.preventDefault();
    if (!newNoteText.trim() || !activeTicket) return;
    addTicketNote(activeTicket.id, newNoteText.trim());
    // Update local activeTicket state
    const updated = supportTickets.find((t) => t.id === activeTicket.id);
    if (updated) {
      setActiveTicket({
        ...updated,
        internalNotes: [
          ...(updated.internalNotes || []),
          {
            id: `note_${Date.now()}`,
            author: "Staff (Acting)",
            text: newNoteText.trim(),
            timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          },
        ],
      });
    }
    setNewNoteText("");
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Customer Support & Helpdesk
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Ticketing triage, engineer assignment, appliance troubleshooting, and internal staff notes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/support/warranties">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <ShieldCheck className="h-4 w-4 text-primary" /> Warranties
            </Button>
          </Link>
          <Link href="/admin/support/repairs">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Wrench className="h-4 w-4 text-warning" /> Repairs
            </Button>
          </Link>
          <Link href="/admin/support/kb">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <BookOpen className="h-4 w-4 text-foreground" /> Knowledge Base
            </Button>
          </Link>
          <Button size="sm" onClick={() => setCreateModalOpen(true)} className="gap-1.5 text-xs shadow-xs">
            <Plus className="h-4 w-4" /> New Ticket
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by subject, ID, customer, or assignee..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting">Waiting</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">Ticket ID</th>
                <th className="px-6 py-3 font-semibold">Subject & Issue</th>
                <th className="px-6 py-3 font-semibold">Customer</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Priority</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Assignee</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-muted">
                    No support tickets match the filters.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setActiveTicket(t)}
                    className="hover:bg-surface-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-3.5 font-mono font-bold text-foreground">{t.id}</td>
                    <td className="px-6 py-3.5 max-w-xs">
                      <div className="font-semibold text-foreground truncate">{t.subject}</div>
                      <div className="text-[11px] text-text-muted">
                        Updated: {t.updatedAt?.slice(0, 16).replace("T", " ")}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-medium text-foreground">{t.customerName}</td>
                    <td className="px-6 py-3.5 text-text-muted">{t.category}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          t.priority === "Urgent"
                            ? "bg-danger-soft text-danger animate-pulse"
                            : t.priority === "High"
                            ? "bg-warning-soft text-warning"
                            : t.priority === "Medium"
                            ? "bg-primary-soft text-primary"
                            : "bg-surface-muted text-text-muted"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          t.status === "Open"
                            ? "bg-warning-soft text-warning"
                            : t.status === "In Progress"
                            ? "bg-primary-soft text-primary"
                            : t.status === "Resolved"
                            ? "bg-success-soft text-success"
                            : "bg-surface-muted text-text-muted"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-foreground font-medium">{t.assignee}</td>
                    <td className="px-6 py-3.5 text-right">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Detail & Internal Notes Drawer */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs">
          <div className="h-full w-full max-w-lg bg-surface border-l border-border shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between border-b border-border p-4 px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-foreground">{activeTicket.id}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        activeTicket.priority === "Urgent"
                          ? "bg-danger-soft text-danger"
                          : "bg-warning-soft text-warning"
                      }`}
                    >
                      {activeTicket.priority}
                    </span>
                  </div>
                  <h3 className="mt-1 font-semibold text-sm text-foreground line-clamp-1">{activeTicket.subject}</h3>
                </div>
                <button
                  onClick={() => setActiveTicket(null)}
                  className="p-1 rounded-lg text-text-muted hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Triage Controls */}
              <div className="p-6 border-b border-border bg-surface-muted/30 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-text-muted block mb-1">Status</label>
                  <select
                    value={activeTicket.status}
                    onChange={(e) => {
                      const newSt = e.target.value;
                      updateTicket(activeTicket.id, { status: newSt });
                      setActiveTicket({ ...activeTicket, status: newSt });
                    }}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 text-foreground font-semibold focus:border-primary focus:outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-text-muted block mb-1">Assigned Agent</label>
                  <select
                    value={activeTicket.assignee}
                    onChange={(e) => {
                      const newAss = e.target.value;
                      updateTicket(activeTicket.id, { assignee: newAss });
                      setActiveTicket({ ...activeTicket, assignee: newAss });
                    }}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-1.5 text-foreground focus:border-primary focus:outline-none"
                  >
                    {staffMembers.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Link and Info */}
              <div className="p-6 border-b border-border space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Customer:</span>
                  <Link href={`/admin/customers/${activeTicket.customerId}`} className="font-semibold text-primary hover:underline">
                    {activeTicket.customerName}
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">Category:</span>
                  <span className="font-medium text-foreground">{activeTicket.category}</span>
                </div>
              </div>

              {/* Module E25: Internal Staff Notes Thread */}
              <div className="p-6 space-y-4 max-h-[35vh] overflow-y-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Lock className="h-3.5 w-3.5 text-warning" />
                  <span>Internal Staff Notes (Invisible to Customer)</span>
                </div>

                {(!activeTicket.internalNotes || activeTicket.internalNotes.length === 0) ? (
                  <p className="text-xs text-text-muted italic">No internal collaboration notes logged yet.</p>
                ) : (
                  activeTicket.internalNotes.map((note) => (
                    <div key={note.id} className="rounded-lg bg-surface-muted p-3 text-xs space-y-1 border border-border">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{note.author}</span>
                        <span className="text-[10px] text-text-faint">{note.timestamp}</span>
                      </div>
                      <p className="text-text-muted leading-relaxed">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Note Input */}
            <form onSubmit={handleAddNote} className="p-4 border-t border-border bg-surface flex gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add confidential technician note..."
                className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              <Button size="sm" type="submit" className="gap-1 text-xs">
                <Send className="h-3 w-3" /> Add Note
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">Create Support Ticket</h2>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Subject / Issue Summary *</label>
                <input
                  type="text"
                  value={newTicketForm.subject}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, subject: e.target.value })}
                  placeholder="e.g. AC unit compressor vibrating loudly"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Customer</label>
                <select
                  value={newTicketForm.customerId}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, customerId: e.target.value })}
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
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={newTicketForm.category}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, category: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Technical Setup">Technical Setup</option>
                    <option value="Appliance Maintenance">Appliance Maintenance</option>
                    <option value="Warranty & Registration">Warranty & Registration</option>
                    <option value="Service Request">Service Request</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Priority</label>
                  <select
                    value={newTicketForm.priority}
                    onChange={(e) => setNewTicketForm({ ...newTicketForm, priority: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Assignee</label>
                <select
                  value={newTicketForm.assignee}
                  onChange={(e) => setNewTicketForm({ ...newTicketForm, assignee: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  {staffMembers.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Create Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
