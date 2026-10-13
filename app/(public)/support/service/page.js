"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wrench, Calendar, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RequestServicePage() {
  const [step, setStep] = useState(1);
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 w-full text-center">
        <div className="h-24 w-24 rounded-full bg-success-soft text-success flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Service Request Received</h1>
        <p className="text-lg text-text-muted mb-6">Your request ID is <span className="font-bold text-foreground">#SR-2026-892</span></p>
        <p className="text-text-muted mb-8">
          We have received your service request. A technician will contact you shortly to confirm the appointment time.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/account">Go to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/account/tickets">Track Request</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Request Repair Service</h1>
        <p className="text-text-muted max-w-xl mx-auto">
          Our certified technicians are ready to help. Fill out the form below to request a repair service for your Orbit product.
        </p>
      </div>

      <div className="flex items-center justify-center mb-8 gap-2 text-sm font-medium">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-text-muted'}`}>
          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 1 ? 'bg-primary' : 'bg-surface-strong text-text-muted'}`}>1</span> Product
        </div>
        <div className="w-12 h-px bg-border"></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-text-muted'}`}>
          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 2 ? 'bg-primary' : 'bg-surface-strong text-text-muted'}`}>2</span> Details
        </div>
        <div className="w-12 h-px bg-border"></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-text-muted'}`}>
          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs text-white ${step >= 3 ? 'bg-primary' : 'bg-surface-strong text-text-muted'}`}>3</span> Schedule
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface p-6 md:p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold mb-4">Select Product</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-surface-muted">
                <input type="radio" name="product" className="text-primary focus:ring-primary h-4 w-4" defaultChecked />
                <div>
                  <div className="font-medium">Orbit 55&quot; QLED 4K Smart TV</div>
                  <div className="text-xs text-text-muted">SN: SN-849201 • Warranty Active</div>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input type="radio" name="product" className="text-primary focus:ring-primary h-4 w-4" />
                <div>
                  <div className="font-medium">Other Product (Not Registered)</div>
                  <div className="text-xs text-text-muted">Enter serial number manually</div>
                </div>
              </label>
            </div>
            <div className="pt-4 flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold mb-4">Issue Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Category</label>
                <select className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none">
                  <option>Power / Won&apos;t turn on</option>
                  <option>Display / Picture Issue</option>
                  <option>Audio / Sound Issue</option>
                  <option>Connectivity / Wi-Fi</option>
                  <option>Physical Damage</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Describe the problem</label>
                <textarea rows={4} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" placeholder="Please provide details about what is happening..."></textarea>
              </div>
            </div>
            <div className="pt-4 flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button type="button" onClick={() => setStep(3)}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-xl font-bold mb-4">Contact & Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" defaultValue="+251 91 123 4567" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Service Address</label>
                <input type="text" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" defaultValue="Bole Road, Addis Ababa" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Date</label>
                <input type="date" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div className="pt-4 flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
