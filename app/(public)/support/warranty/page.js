"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function WarrantyCheckPage() {
  const [serial, setSerial] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, result

  const handleCheck = (e) => {
    e.preventDefault();
    if (!serial) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("result");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 w-full text-center">
      <div className="h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mx-auto mb-6">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-4">Check Warranty Status</h1>
      <p className="text-text-muted mb-8">
        Enter your product&apos;s serial number to check its current warranty status and available service options.
      </p>

      <form onSubmit={handleCheck} className="flex max-w-md mx-auto mb-12">
        <input 
          type="text" 
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="Enter Serial Number (e.g. SN-849201)" 
          className="flex-1 rounded-l-md border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none" 
        />
        <Button type="submit" className="rounded-l-none h-auto px-6" disabled={status === "loading"}>
          {status === "loading" ? "Checking..." : "Check"}
        </Button>
      </form>

      {status === "result" && (
        <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden text-left animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-border flex items-start justify-between">
            <div>
              <div className="text-xs text-text-muted mb-1">Orbit 55&quot; QLED 4K Smart TV</div>
              <h3 className="text-xl font-bold">SN: {serial}</h3>
            </div>
            <div className="bg-success-soft text-success px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" /> ACTIVE
            </div>
          </div>
          <div className="p-6 bg-surface-muted grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-text-muted mb-1">Purchase Date</div>
              <div className="font-medium">October 2, 2026</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">Warranty Expiration</div>
              <div className="font-medium">October 2, 2028</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">Coverage Remaining</div>
              <div className="font-medium">726 Days</div>
            </div>
            <div>
              <div className="text-text-muted mb-1">Service Type</div>
              <div className="font-medium">On-Site Service</div>
            </div>
          </div>
          <div className="p-6 border-t border-border flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/support/troubleshooting">Troubleshooting</Link>
            </Button>
            <Button asChild>
              <Link href="/support/service">Request Service</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
