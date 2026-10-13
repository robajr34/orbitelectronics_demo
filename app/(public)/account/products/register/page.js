"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Upload } from "lucide-react";
import Link from "next/link";

export default function RegisterProductPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 shadow-sm flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-full bg-success-soft text-success flex items-center justify-center mb-6">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Product Successfully Registered</h2>
        <p className="text-text-muted mb-8 max-w-md">
          Your product has been registered. Your official warranty is now active.
        </p>
        <div className="w-full max-w-md bg-surface-muted rounded-lg p-4 mb-8 text-left">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-text-muted">Warranty Status:</div>
            <div className="font-bold text-success">ACTIVE</div>
            <div className="text-text-muted">Warranty Start:</div>
            <div className="font-medium">Oct 06, 2026</div>
            <div className="text-text-muted">Warranty End:</div>
            <div className="font-medium">Oct 06, 2028</div>
          </div>
        </div>
        <Button asChild>
          <Link href="/account/products">View My Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Register a Product</h1>
      <p className="text-text-muted">Register your Orbit product to activate your warranty and access support faster.</p>

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface p-6 shadow-sm space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Name / Model</label>
            <input required type="text" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" placeholder="e.g. Orbit 55 QLED TV" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Serial Number</label>
            <input required type="text" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" placeholder="Located on the back or bottom" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Purchase Date</label>
            <input required type="date" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Purchase Location (Store)</label>
            <input required type="text" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" placeholder="e.g. Orbit Store Addis Ababa" />
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-border">
          <label className="text-sm font-medium">Upload Receipt (Optional)</label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-surface-muted transition-colors cursor-pointer">
            <Upload className="h-8 w-8 text-text-muted mb-2" />
            <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
            <p className="text-xs text-text-muted mt-1">SVG, PNG, JPG or PDF (max. 5MB)</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Registering..." : "Register Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
