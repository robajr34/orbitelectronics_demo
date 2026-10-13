import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Orders | Orbit Electronics",
};

export default function OrdersPage() {
  const orders = [
    { 
      id: "ORD-2026-1042", 
      date: "Oct 02, 2026", 
      amount: 65000, 
      status: "Delivered",
      items: [
        { name: "Orbit 55\" QLED 4K Smart TV", qty: 1 }
      ]
    },
    { 
      id: "ORD-2025-9931", 
      date: "Nov 15, 2025", 
      amount: 45000, 
      status: "Delivered",
      items: [
        { name: "Orbit 9kg Front Load Washing Machine", qty: 1 }
      ]
    },
    { 
      id: "ORD-2024-4022", 
      date: "Jun 10, 2024", 
      amount: 110000, 
      status: "Delivered",
      items: [
        { name: "Orbit 500L French Door Refrigerator", qty: 1 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
      <p className="text-text-muted">View and manage your past purchases.</p>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-bold">{order.id}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium bg-success-soft text-success`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-text-muted mb-4">Ordered on {order.date}</div>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm">
                    {item.qty}x <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-3 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
              <div className="text-xl font-bold">{order.amount.toLocaleString()} ETB</div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none">Invoice</Button>
                <Button className="flex-1 md:flex-none">Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
