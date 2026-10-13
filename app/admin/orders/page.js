"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  XCircle,
  FileText,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);

  // Status counts for tabs
  const statusCounts = useMemo(() => {
    const counts = { All: orders.length, Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
    orders.forEach((o) => {
      if (counts[o.fulfillmentStatus] !== undefined) {
        counts[o.fulfillmentStatus]++;
      }
    });
    return counts;
  }, [orders]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((o) => o.fulfillmentStatus === statusFilter);
    }

    if (paymentFilter !== "All") {
      result = result.filter((o) => o.paymentStatus === paymentFilter);
    }

    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === "date") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      } else if (sortField === "grandTotal") {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [orders, searchQuery, statusFilter, paymentFilter, sortField, sortAsc]);

  // Bulk selection handlers
  function toggleSelectAll() {
    if (selectedOrderIds.length === filteredOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    }
  }

  function toggleSelectOrder(id) {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter((item) => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  }

  function handleBulkStatus(newStatus) {
    if (selectedOrderIds.length === 0) return;
    selectedOrderIds.forEach((id) => {
      updateOrderStatus(id, newStatus);
    });
    toast.success(`Updated ${selectedOrderIds.length} orders to "${newStatus}"`);
    setSelectedOrderIds([]);
  }

  // Export CSV
  function exportOrdersCsv() {
    if (filteredOrders.length === 0) {
      toast.error("No orders to export.");
      return;
    }
    const headers = ["Order ID", "Customer Name", "Email", "Date", "Items Count", "Total (ETB)", "Payment Status", "Fulfillment Status", "Carrier"];
    const rows = filteredOrders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      o.date ? o.date.slice(0, 10) : "",
      o.items ? o.items.length : 0,
      o.grandTotal,
      o.paymentStatus,
      o.fulfillmentStatus,
      `"${o.carrier || "N/A"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orbit_orders_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredOrders.length} orders to CSV.`);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Order Management</h1>
          <p className="text-xs text-text-muted mt-1">
            Fulfillment pipeline, courier tracking, customer invoicing, and returns processing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/admin/orders/returns">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <RotateCcw className="h-4 w-4 text-warning" /> Returns Queue
            </Button>
          </Link>
          <Button size="sm" variant="outline" onClick={exportOrdersCsv} className="gap-1.5 text-xs">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex overflow-x-auto border-b border-border gap-2 pb-px">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setStatusFilter(tab);
              setSelectedOrderIds([]);
            }}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              statusFilter === tab
                ? "border-primary text-primary font-bold"
                : "border-transparent text-text-muted hover:text-foreground"
            }`}
          >
            <span>{tab}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                statusFilter === tab
                  ? "bg-primary-soft text-primary"
                  : "bg-surface-muted text-text-muted"
              }`}
            >
              {statusCounts[tab] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, customer name, email, or tracking number..."
              className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-text-muted">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="rounded-lg border border-border bg-surface px-2.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="All">All Payment States</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-text-muted">Sort:</span>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="rounded-lg border border-border bg-surface px-2.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="date">Date</option>
                <option value="grandTotal">Amount</option>
              </select>
              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="p-2 rounded-lg border border-border hover:bg-surface-muted"
                title="Toggle sort direction"
              >
                <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedOrderIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-primary-soft/40 border border-primary/20 px-3 py-2">
            <span className="text-xs font-semibold text-primary">
              {selectedOrderIds.length} order(s) selected
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-muted">Set status to:</span>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleBulkStatus("Processing")}>
                Processing
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleBulkStatus("Shipped")}>
                Shipped
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleBulkStatus("Delivered")}>
                Delivered
              </Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs text-text-muted" onClick={() => setSelectedOrderIds([])}>
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-4 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Total Amount</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
                <th className="px-4 py-3 font-semibold">Fulfillment</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-text-muted">
                    No orders match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrderIds.includes(order.id);
                  return (
                    <tr
                      key={order.id}
                      className={`hover:bg-surface-muted/50 transition-colors ${
                        isSelected ? "bg-primary-soft/20" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOrder(order.id)}
                          className="rounded border-border"
                        />
                      </td>
                      <td className="px-4 py-3.5 font-bold text-foreground">
                        <Link href={`/admin/orders/${order.id}`} className="hover:text-primary hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-foreground">{order.customerName}</div>
                        <div className="text-[11px] text-text-muted">{order.customerEmail}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="font-medium text-foreground">
                          {order.items ? order.items.length : 0} item(s)
                        </span>
                        <div className="text-[11px] text-text-muted truncate max-w-[140px]">
                          {order.items && order.items[0] ? order.items[0].name : ""}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-text-muted">
                        {order.date ? order.date.slice(0, 10) : "-"}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-foreground">
                        {order.grandTotal.toLocaleString()} ETB
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            order.paymentStatus === "Paid"
                              ? "bg-success-soft text-success"
                              : order.paymentStatus === "Pending"
                              ? "bg-warning-soft text-warning"
                              : "bg-danger-soft text-danger"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            order.fulfillmentStatus === "Delivered"
                              ? "bg-success-soft text-success"
                              : order.fulfillmentStatus === "Shipped"
                              ? "bg-primary-soft text-primary"
                              : order.fulfillmentStatus === "Processing"
                              ? "bg-warning-soft text-warning"
                              : order.fulfillmentStatus === "Cancelled"
                              ? "bg-danger-soft text-danger"
                              : "bg-surface-muted text-text-muted"
                          }`}
                        >
                          {order.fulfillmentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right space-x-1">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <Eye className="h-3 w-3 mr-1" /> View
                          </Button>
                        </Link>
                        <Link href={`/admin/orders/${order.id}/invoice`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs" title="Print Invoice">
                            <FileText className="h-3 w-3" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 border-t border-border bg-surface-muted/30 flex items-center justify-between text-xs text-text-muted">
          <span>Showing {filteredOrders.length} of {orders.length} total orders</span>
          <span>Payment settlements simulated via local state</span>
        </div>
      </div>
    </div>
  );
}
