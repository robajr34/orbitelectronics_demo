import Link from "next/link";
import { Package, ShieldCheck, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Welcome back, John!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-4">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1">3 Orders</h3>
          <p className="text-sm text-text-muted mb-4">View your recent purchases</p>
          <Button variant="outline" asChild className="w-full mt-auto">
            <Link href="/account/orders">View Orders</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-success-soft text-success flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1">2 Registered Products</h3>
          <p className="text-sm text-text-muted mb-4">Manage warranties and manuals</p>
          <Button variant="outline" asChild className="w-full mt-auto">
            <Link href="/account/products">My Products</Link>
          </Button>
        </div>
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-info-soft text-info flex items-center justify-center mb-4">
            <Ticket className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg mb-1">0 Open Tickets</h3>
          <p className="text-sm text-text-muted mb-4">Get help with your products</p>
          <Button variant="outline" asChild className="w-full mt-auto">
            <Link href="/support">Get Support</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link href="/account/orders" className="text-primary text-sm font-medium hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted uppercase border-b border-border">
              <tr>
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-4 font-medium">ORD-2026-1042</td>
                <td className="py-4 text-text-muted">Oct 02, 2026</td>
                <td className="py-4"><span className="text-success font-medium bg-success-soft px-2 py-1 rounded text-xs">Delivered</span></td>
                <td className="py-4 font-medium">65,000 ETB</td>
              </tr>
              <tr>
                <td className="py-4 font-medium">ORD-2025-9931</td>
                <td className="py-4 text-text-muted">Nov 15, 2025</td>
                <td className="py-4"><span className="text-success font-medium bg-success-soft px-2 py-1 rounded text-xs">Delivered</span></td>
                <td className="py-4 font-medium">45,000 ETB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
