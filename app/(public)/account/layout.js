import { Package, ShieldCheck, Ticket, User, LogOut } from "lucide-react";
import Link from "next/link";

export default function AccountLayout({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="h-12 w-12 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-xl">
              JD
            </div>
            <div>
              <h3 className="font-semibold text-foreground">John Doe</h3>
              <p className="text-sm text-text-muted">john.doe@example.com</p>
            </div>
          </div>
          <nav className="space-y-1">
            <Link href="/account" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-primary-soft text-primary-strong">
              <User className="h-5 w-5" /> Dashboard
            </Link>
            <Link href="/account/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-surface-muted">
              <Package className="h-5 w-5 text-text-muted" /> My Orders
            </Link>
            <Link href="/account/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-surface-muted">
              <ShieldCheck className="h-5 w-5 text-text-muted" /> My Products & Warranty
            </Link>
            <Link href="/account/tickets" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-foreground hover:bg-surface-muted">
              <Ticket className="h-5 w-5 text-text-muted" /> Support Tickets
            </Link>
            <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-danger hover:bg-danger-soft w-full text-left mt-4">
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
