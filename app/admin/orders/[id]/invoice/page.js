"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Printer, ShieldCheck, Cpu } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";

export default function OrderInvoicePage() {
  const params = useParams();
  const orderId = params?.id;
  const { orders, storeSettings } = useAdminStore();

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Invoice Not Found</h2>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="space-y-6">
      {/* Action Bar (hidden in print) */}
      <div className="flex items-center justify-between print:hidden">
        <Link href={`/admin/orders/${order.id}`}>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ArrowLeft className="h-4 w-4" /> Back to Order
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted hidden sm:inline">
            Use browser print dialog to save as PDF or print on paper.
          </span>
          <Button size="sm" onClick={handlePrint} className="gap-1.5 text-xs">
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Invoice Sheet */}
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-white p-8 sm:p-12 text-slate-800 shadow-lg print:border-none print:shadow-none print:p-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
              <Cpu className="h-6 w-6" />
              <span>ORBIT ELECTRONICS</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 space-y-0.5">
              <p className="font-semibold text-slate-700">{storeSettings.companyName}</p>
              <p>{storeSettings.address}</p>
              <p>TIN: 0049281734 &bull; VAT Reg: 9918234-ET</p>
              <p>Support: {storeSettings.supportPhone} | {storeSettings.supportEmail}</p>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="text-2xl font-black text-slate-900 tracking-tight">TAX INVOICE</div>
            <div className="mt-2 text-xs text-slate-500 space-y-1">
              <p><span className="font-semibold text-slate-700">Invoice #:</span> INV-{order.id.replace("ORD-", "")}</p>
              <p><span className="font-semibold text-slate-700">Order Ref:</span> {order.id}</p>
              <p><span className="font-semibold text-slate-700">Date:</span> {order.date ? order.date.slice(0, 10) : new Date().toISOString().slice(0, 10)}</p>
              <p><span className="font-semibold text-slate-700">Payment:</span> {order.paymentMethod} ({order.paymentStatus})</p>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">BILLED TO / DELIVER TO</span>
            <div className="mt-2 text-slate-800 space-y-1">
              <p className="font-bold text-sm text-slate-900">{order.customerName}</p>
              <p>{order.deliveryAddress}</p>
              <p>Phone: {order.customerPhone}</p>
              <p>Email: {order.customerEmail}</p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">LOGISTICS & FULFILLMENT</span>
            <div className="mt-2 text-slate-800 space-y-1">
              <p><span className="font-semibold">Carrier:</span> {order.carrier || "Orbit Fleet Delivery"}</p>
              <p><span className="font-semibold">Tracking #:</span> {order.trackingNumber || "N/A"}</p>
              <p><span className="font-semibold">Fulfillment State:</span> {order.fulfillmentStatus}</p>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden my-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Appliance Item & Description</th>
                <th className="p-3">SKU</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Total (ETB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {(order.items || []).map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 text-slate-400">{idx + 1}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500">Official Orbit Manufacturer Guarantee</div>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{item.sku}</td>
                  <td className="p-3 text-right">{item.price.toLocaleString()}</td>
                  <td className="p-3 text-center font-bold">{item.quantity}</td>
                  <td className="p-3 text-right font-bold text-slate-900">
                    {(item.total || item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div className="flex justify-end my-6">
          <div className="w-full max-w-xs space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{order.subtotal.toLocaleString()} ETB</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Promotional Discount:</span>
                <span>-{order.discountAmount.toLocaleString()} ETB</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>VAT (15% Included):</span>
              <span>{order.taxAmount.toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between">
              <span>White-Glove Delivery:</span>
              <span>{order.shippingAmount.toLocaleString()} ETB</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-300 text-sm font-black text-slate-900">
              <span>Total Paid:</span>
              <span className="text-blue-600">{order.grandTotal.toLocaleString()} ETB</span>
            </div>
          </div>
        </div>

        {/* Warranty and Terms Notice */}
        <div className="mt-8 border-t border-slate-200 pt-6 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>Orbit Electronics Official Warranty Protocol</span>
          </div>
          <p className="leading-relaxed">
            All major household appliances (TVs, Refrigerators, AC units, Washing Machines) are covered by manufacturer warranty. Keep this stamped tax invoice as proof of purchase. For technical service or warranty claims, contact the Orbit Helpdesk at {storeSettings.supportPhone}.
          </p>
          <p className="italic text-[10px] text-slate-400">
            * Generated via Orbit Electronics Administration Portal. Electronic settlement verified.
          </p>
        </div>
      </div>
    </div>
  );
}
