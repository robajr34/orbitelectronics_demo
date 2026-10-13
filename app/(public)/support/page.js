import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Wrench, Search, Phone, FileText } from "lucide-react";

export const metadata = {
  title: "Support | Orbit Electronics",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">How can we help you?</h1>
        <div className="relative mt-8 shadow-sm">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search for manuals, troubleshooting, or product support..." className="w-full rounded-full border border-border bg-surface pl-12 pr-4 py-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/support/warranty" className="rounded-xl border border-border bg-surface p-6 text-center hover:shadow-md transition-shadow group">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Warranty Check</h3>
          <p className="text-sm text-text-muted">Verify your product&apos;s warranty status and coverage details.</p>
        </Link>
        <Link href="/support/service" className="rounded-xl border border-border bg-surface p-6 text-center hover:shadow-md transition-shadow group">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Wrench className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Request Repair</h3>
          <p className="text-sm text-text-muted">Schedule a repair with our certified technicians.</p>
        </Link>
        <Link href="/support/troubleshooting" className="rounded-xl border border-border bg-surface p-6 text-center hover:shadow-md transition-shadow group">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Troubleshooting</h3>
          <p className="text-sm text-text-muted">Step-by-step guides to resolve common product issues.</p>
        </Link>
        <Link href="/contact" className="rounded-xl border border-border bg-surface p-6 text-center hover:shadow-md transition-shadow group">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Phone className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p className="text-sm text-text-muted">Get in touch with our customer service team directly.</p>
        </Link>
      </div>
    </div>
  );
}
