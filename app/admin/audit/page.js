"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ScrollText,
  Search,
  Filter,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminAuditPage() {
  const { auditLogs } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredLogs = auditLogs.filter((log) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      log.action.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q) ||
      log.resource.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q);

    const matchesRole = roleFilter === "All" || log.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  function exportAuditCsv() {
    const headers = ["Audit ID", "Timestamp", "Actor", "Role", "Action", "Resource", "Details", "Status"];
    const rows = filteredLogs.map((l) => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.actor}"`,
      `"${l.role}"`,
      `"${l.action}"`,
      `"${l.resource}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      l.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orbit_audit_trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Audit trail exported to CSV.");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            System Audit Trail & Compliance Log
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Immutable log of state mutations, pricing modifications, inventory adjustments, and status transitions.
          </p>
        </div>

        <Button size="sm" variant="outline" onClick={exportAuditCsv} className="gap-1.5 text-xs">
          <Download className="h-4 w-4" /> Export Audit Log
        </Button>
      </div>

      {/* Security Disclaimer Banner */}
      <div className="rounded-xl border border-border bg-surface-muted/40 p-4 flex items-start gap-3 text-xs text-text-muted">
        <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-foreground">Governance Architecture Disclaimer:</span> These audit trail records are dynamically recorded by the prototype client state engine whenever administrative actions occur. Production enterprise governance requires write-once, tamper-evident audit database sinks.
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
            placeholder="Search action, actor, resource, or mutation detail..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-xs text-text-muted">Role Filter:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Support Agent">Support Agent</option>
            <option value="Warehouse Staff">Warehouse Staff</option>
            <option value="Content Editor">Content Editor</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">Audit ID</th>
                <th className="px-6 py-3 font-semibold">Timestamp</th>
                <th className="px-6 py-3 font-semibold">Actor & Role</th>
                <th className="px-6 py-3 font-semibold">Action Performed</th>
                <th className="px-6 py-3 font-semibold">Target Resource</th>
                <th className="px-6 py-3 font-semibold">Mutation Details</th>
                <th className="px-6 py-3 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-text-muted">
                    No audit records match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="px-6 py-3.5 font-mono font-bold text-foreground">
                      {log.id}
                    </td>
                    <td className="px-6 py-3.5 text-text-muted whitespace-nowrap font-mono text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="font-semibold text-foreground">{log.actor}</div>
                      <div className="text-[11px] text-primary font-medium">{log.role}</div>
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-foreground">
                      {log.action}
                    </td>
                    <td className="px-6 py-3.5 font-mono text-text-muted">
                      {log.resource}
                    </td>
                    <td className="px-6 py-3.5 max-w-xs text-text-muted leading-relaxed">
                      {log.details}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success bg-success-soft px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3 w-3" /> {log.status}
                      </span>
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
