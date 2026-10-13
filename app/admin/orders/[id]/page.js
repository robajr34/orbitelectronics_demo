"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  RotateCcw,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Package,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { toast } from "sonner";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id;

  const { orders, updateOrderStatus, updatePaymentStatus, cancelOrder, shipments } = useAdminStore();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("Customer requested cancellation");

  const order = orders.find((o) => o.id === orderId);
  const shipment = shipments.find((s) => s.orderId === orderId);

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Order Not Found</h2>
        <p className="text-xs text-text-muted">No record found matching identifier &ldquo;{orderId}&rdquo;.</p>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const stages = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentStageIndex = stages.indexOf(order.fulfillmentStatus);

  function handleAdvanceStatus() {
    if (order.fulfillmentStatus === "Pending") {
      updateOrderStatus(order.id, "Processing");
    } else if (order.fulfillmentStatus === "Processing") {
      updateOrderStatus(order.id, "Shipped");
    } else if (order.fulfillmentStatus === "Shipped") {
      updateOrderStatus(order.id, "Delivered");
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">{order.id}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  order.fulfillmentStatus === "Delivered"
                    ? "bg-success-soft text-success"
                    : order.fulfillmentStatus === "Cancelled"
                    ? "bg-danger-soft text-danger"
                    : "bg-warning-soft text-warning"
                }`}
              >
                {order.fulfillmentStatus}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  order.paymentStatus === "Paid"
                    ? "bg-success-soft text-success"
                    : "bg-warning-soft text-warning"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Placed on {order.date ? new Date(order.date).toLocaleString() : "N/A"} via {order.paymentMethod}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/admin/orders/${order.id}/invoice`}>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Printer className="h-4 w-4" /> Print Invoice
            </Button>
          </Link>
          {order.fulfillmentStatus !== "Cancelled" && order.fulfillmentStatus !== "Delivered" && (
            <Button
              size="sm"
              variant="destructive"
              className="text-xs"
              onClick={() => setCancelModalOpen(true)}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      {/* Visual Status Pipeline */}
      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground">Fulfillment Status Pipeline</h2>
          {order.fulfillmentStatus !== "Delivered" && order.fulfillmentStatus !== "Cancelled" && (
            <Button size="sm" onClick={handleAdvanceStatus} className="text-xs gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {order.fulfillmentStatus === "Pending"
                ? "Advance to Processing"
                : order.fulfillmentStatus === "Processing"
                ? "Dispatch & Mark Shipped"
                : "Confirm Delivery"}
            </Button>
          )}
        </div>

        {order.fulfillmentStatus === "Cancelled" ? (
          <div className="rounded-lg bg-danger-soft p-4 text-xs text-danger font-medium flex items-center gap-2">
            <XCircle className="h-4 w-4 shrink-0" />
            <span>This order was cancelled and payment reversed. No further fulfillment actions permitted.</span>
          </div>
        ) : (
          <div className="relative flex items-center justify-between pt-2">
            <div className="absolute left-6 right-6 top-6 h-0.5 bg-surface-strong -z-0" />
            <div
              className="absolute left-6 top-6 h-0.5 bg-primary transition-all duration-300 -z-0"
              style={{
                width: `${Math.max(0, (currentStageIndex / (stages.length - 1)) * 90)}%`,
              }}
            />

            {stages.map((stage, idx) => {
              const isDone = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stage} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                      isDone
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-surface text-text-muted"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs ${
                      isCurrent
                        ? "font-bold text-foreground"
                        : isDone
                        ? "font-medium text-text-muted"
                        : "text-text-faint"
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Order Items & Financial Summary (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Purchased Appliances & Lines</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-muted text-text-muted uppercase text-[11px]">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Item & Details</th>
                    <th className="px-6 py-3 font-semibold">SKU</th>
                    <th className="px-6 py-3 font-semibold text-right">Price</th>
                    <th className="px-6 py-3 font-semibold text-center">Qty</th>
                    <th className="px-6 py-3 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(order.items || []).map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-muted/30">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">{item.name}</div>
                        <div className="text-[11px] text-text-muted">Standard Warranty Included</div>
                      </td>
                      <td className="px-6 py-4 text-text-muted font-mono">{item.sku}</td>
                      <td className="px-6 py-4 text-right">{item.price.toLocaleString()} ETB</td>
                      <td className="px-6 py-4 text-center font-bold">{item.quantity}</td>
                      <td className="px-6 py-4 text-right font-bold text-foreground">
                        {(item.total || item.price * item.quantity).toLocaleString()} ETB
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Breakdown */}
            <div className="p-6 border-t border-border bg-surface-muted/20">
              <div className="max-w-xs ml-auto space-y-2 text-xs">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal:</span>
                  <span>{order.subtotal.toLocaleString()} ETB</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount Applied:</span>
                    <span>-{order.discountAmount.toLocaleString()} ETB</span>
                  </div>
                )}
                <div className="flex justify-between text-text-muted">
                  <span>VAT (15%):</span>
                  <span>{order.taxAmount.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Express Delivery:</span>
                  <span>{order.shippingAmount.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border text-sm font-bold text-foreground">
                  <span>Grand Total:</span>
                  <span className="text-primary">{order.grandTotal.toLocaleString()} ETB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Tracking Timeline */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Shipment & Carrier Tracking</h2>
              </div>
              <span className="text-[11px] font-mono bg-surface-muted px-2 py-0.5 rounded border border-border">
                {order.trackingNumber || "Pending Courier Number"}
              </span>
            </div>

            <div className="rounded-lg bg-surface-muted/40 p-3 mb-4 text-xs text-text-muted flex items-center justify-between">
              <div>
                <span className="font-semibold text-foreground">Carrier:</span> {order.carrier || "Orbit Fleet"}
              </div>
              <div>
                <span className="font-semibold text-foreground">Delivery Method:</span> Doorstep White-Glove
              </div>
            </div>

            {shipment && shipment.events && (
              <div className="space-y-4 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {shipment.events.map((evt, i) => (
                  <div key={i} className="relative pl-3">
                    <span className="absolute -left-[19px] top-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-surface" />
                    <div className="text-xs font-semibold text-foreground">{evt.description}</div>
                    <div className="text-[11px] text-text-muted flex items-center gap-2 mt-0.5">
                      <span>{evt.location}</span> &bull; <span>{evt.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-border text-[11px] text-text-faint">
              * Notice: Carrier status updates and tracking timestamps are generated by the prototype client state engine.
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details, Delivery Address & Internal Notes */}
        <div className="space-y-6">
          {/* Customer Summary Card */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-primary" /> Customer Information
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-text-muted block">Full Name:</span>
                <span className="font-semibold text-foreground">{order.customerName}</span>
              </div>
              <div>
                <span className="text-text-muted block">Email:</span>
                <a href={`mailto:${order.customerEmail}`} className="text-primary hover:underline">
                  {order.customerEmail}
                </a>
              </div>
              <div>
                <span className="text-text-muted block">Phone:</span>
                <span className="font-medium text-foreground">{order.customerPhone}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <span className="text-text-muted block">Delivery Address:</span>
                <div className="flex items-start gap-1.5 mt-1 text-foreground">
                  <MapPin className="h-3.5 w-3.5 text-text-faint shrink-0 mt-0.5" />
                  <span>{order.deliveryAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Special Handling Notes
            </h2>
            <p className="text-xs leading-relaxed text-text-muted bg-surface-muted/60 p-3 rounded-lg border border-border">
              {order.notes || "No special delivery instructions provided for this order."}
            </p>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={cancelModalOpen}
        title={`Cancel Order ${order.id}?`}
        message="Cancelling this order will mark the fulfillment state as Cancelled, reverse payment settlement, and update the executive revenue metrics. Proceed?"
        confirmLabel="Confirm Cancellation"
        variant="danger"
        onConfirm={() => {
          cancelOrder(order.id, cancelReason);
          setCancelModalOpen(false);
        }}
        onCancel={() => setCancelModalOpen(false)}
      />
    </div>
  );
}
