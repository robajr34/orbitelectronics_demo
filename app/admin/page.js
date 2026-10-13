"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CreditCard,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  Plus,
  Tag,
  ArrowRight,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  RotateCcw,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAdminStore } from "@/lib/adminStore";
import {
  calculateFinancials,
  calculateOrderStatuses,
  calculateCategorySales,
  calculateInventoryMetrics,
  getSimulatedConversionData,
  calculateTimePeriodRevenue,
} from "@/lib/calculations";
import { StatCard } from "@/components/admin/StatCard";
import { Button } from "@/components/ui/button";

const DONUT_COLORS = ["#0b6bcb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#3b82f6"];

export default function AdminDashboardPage() {
  const { products, orders, returns, auditLogs, currentRole } = useAdminStore();
  const [revenuePeriod, setRevenuePeriod] = useState("month"); // 'day', 'week', 'month', 'year'

  // Derived financials
  const financials = useMemo(() => calculateFinancials(orders, returns), [orders, returns]);
  const orderStatuses = useMemo(() => calculateOrderStatuses(orders), [orders]);
  const categorySales = useMemo(() => calculateCategorySales(orders, products), [orders, products]);
  const inventoryMetrics = useMemo(() => calculateInventoryMetrics(products), [products]);
  const conversionData = useMemo(() => getSimulatedConversionData(financials.eligibleOrdersCount), [financials]);

  // Revenue chart data for selected time frame
  const revenueChartData = useMemo(
    () => calculateTimePeriodRevenue(orders, revenuePeriod),
    [orders, revenuePeriod]
  );

  // Order volume bar chart data
  const orderVolumeData = useMemo(
    () => [
      { status: "Pending", count: orderStatuses.Pending, fill: "#f59e0b" },
      { status: "Processing", count: orderStatuses.Processing, fill: "#3b82f6" },
      { status: "Shipped", count: orderStatuses.Shipped, fill: "#8b5cf6" },
      { status: "Delivered", count: orderStatuses.Delivered, fill: "#10b981" },
      { status: "Cancelled", count: orderStatuses.Cancelled, fill: "#ef4444" },
    ],
    [orderStatuses]
  );

  // Low stock products
  const lowStockItems = useMemo(
    () => products.filter((p) => p.stock <= (p.lowStockThreshold || 10)),
    [products]
  );

  // Best selling products derived from orders
  const bestSellers = useMemo(() => {
    const itemMap = {};
    orders
      .filter((o) => o.paymentStatus === "Paid" && o.fulfillmentStatus !== "Cancelled")
      .forEach((o) => {
        (o.items || []).forEach((item) => {
          if (!itemMap[item.productId]) {
            itemMap[item.productId] = {
              id: item.productId,
              name: item.name,
              sku: item.sku,
              quantity: 0,
              revenue: 0,
            };
          }
          itemMap[item.productId].quantity += item.quantity || 1;
          itemMap[item.productId].revenue += item.total || (item.price * item.quantity);
        });
      });
    return Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 4);
  }, [orders]);

  // Recent 5 orders
  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-border bg-gradient-to-r from-surface to-surface-muted p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">
              Admin Portal
            </span>
            <span className="text-xs text-text-muted">&bull; Acting as {currentRole}</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Executive Analytics & Retail Health
          </h1>
          <p className="mt-1 text-xs text-text-muted">
            Real-time sales performance, inventory turnover, and fulfillment indicators for Orbit Electronics Flagship.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link href="/admin/products">
            <Button size="sm" className="gap-1.5 shadow-xs">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </Link>
          <Link href="/admin/marketing">
            <Button variant="outline" size="sm" className="gap-1.5 bg-surface">
              <Tag className="h-4 w-4 text-primary" /> Create Coupon
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" size="sm" className="gap-1.5 bg-surface">
              <ShoppingCart className="h-4 w-4 text-foreground" /> View Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Gross Revenue"
          value={`${financials.grossRevenue.toLocaleString()} ETB`}
          change="+14.2%"
          trend="up"
          period="vs prior 30d"
          icon={CreditCard}
          tooltip="Sum of all completed and processing paid orders excluding refunds and cancellations"
        />
        <StatCard
          title="Net Revenue"
          value={`${financials.netRevenue.toLocaleString()} ETB`}
          change="+12.8%"
          trend="up"
          period="after refunds"
          icon={TrendingUp}
          tooltip="Gross revenue minus authorized refunds and return credits"
        />
        <StatCard
          title="Total Orders"
          value={financials.totalOrdersCount}
          change="+8.6%"
          trend="up"
          period="100% tracked"
          icon={ShoppingCart}
          subtitle={`${orderStatuses.Delivered} Delivered &bull; ${orderStatuses.Processing} Processing`}
        />
        <StatCard
          title="Average Order Value"
          value={`${financials.averageOrderValue.toLocaleString()} ETB`}
          change="+5.1%"
          trend="up"
          period="per checkout"
          icon={Activity}
          tooltip="Eligible gross sales divided by eligible order volume"
        />
        <StatCard
          title="Units Sold"
          value={financials.totalUnitsSold}
          change="+18.4%"
          trend="up"
          period="appliances"
          icon={Package}
          subtitle="Across all major lines"
        />
        <StatCard
          title="Low-Stock Alerts"
          value={inventoryMetrics.lowStockCount}
          change={inventoryMetrics.lowStockCount > 0 ? "Requires restock" : "Healthy"}
          trend={inventoryMetrics.lowStockCount > 0 ? "down" : "up"}
          period="items <= threshold"
          icon={AlertTriangle}
          tooltip="Products where current available stock is below configured reorder threshold"
        />
      </div>

      {/* Charts Grid: Gross Revenue Tracker + Order Volume */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        {/* Module A1: Gross Revenue Tracker */}
        <div className="col-span-1 lg:col-span-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 gap-3 border-b border-border mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-foreground">Gross Revenue Tracker</h2>
                <span className="rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-success">
                  +14.2% YoY
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Period comparison with previous equivalent timeline
              </p>
            </div>

            {/* Timeframe switch */}
            <div className="flex items-center rounded-lg border border-border bg-surface-muted p-0.5">
              {[
                { id: "day", label: "Day" },
                { id: "week", label: "Week" },
                { id: "month", label: "Month" },
                { id: "year", label: "Year" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setRevenuePeriod(t.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    revenuePeriod === t.id
                      ? "bg-surface text-foreground font-semibold shadow-xs"
                      : "text-text-muted hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(val) => [`${Number(val).toLocaleString()} ETB`, ""]}
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    borderRadius: "10px",
                    boxShadow: "var(--shadow-md)",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", paddingBottom: "10px" }}
                />
                <Line
                  name="Current Period (ETB)"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "var(--surface)" }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  name="Previous Equivalent Period"
                  type="monotone"
                  dataKey="previousRevenue"
                  stroke="var(--text-faint)"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Module A2: Order Volume Analytics */}
        <div className="col-span-1 lg:col-span-3 rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">Order Volume Pipeline</h2>
                <p className="text-xs text-text-muted mt-0.5">Order distribution across fulfillment lifecycle</p>
              </div>
              <Link href="/admin/orders" className="text-xs font-medium text-primary hover:underline">
                View Queue
              </Link>
            </div>

            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderVolumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="status" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                    {orderVolumeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Module A4: Conversion Rate Monitor */}
          <div className="mt-4 rounded-lg border border-border bg-surface-muted/50 p-3.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-foreground">Simulated Conversion Rate</span>
              <span className="text-xs font-bold text-primary">{conversionData.conversionRate}</span>
            </div>
            <div className="w-full bg-surface-strong h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, parseFloat(conversionData.conversionRate) * 12)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-text-muted">
              <span>{conversionData.simulatedVisitors.toLocaleString()} Store Visitors</span>
              <span>{conversionData.eligibleOrdersCount} Completed Orders</span>
            </div>
            <div className="mt-1 text-[10px] text-text-faint italic">{conversionData.note}</div>
          </div>
        </div>
      </div>

      {/* Second Row: Category Sales Donut + Top Selling Products + Low Stock */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Module A5: Top-Selling Categories Donut Chart */}
        <div className="col-span-1 lg:col-span-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Category Sales Share</h2>
              <p className="text-xs text-text-muted mt-0.5">Revenue distribution across appliance segments</p>
            </div>
            <Layers className="h-4 w-4 text-text-muted" />
          </div>

          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySales}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {categorySales.map((entry, index) => (
                    <Cell key={`cat-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${Number(val).toLocaleString()} ETB`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 mt-2">
            {categorySales.map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: DONUT_COLORS[idx % DONUT_COLORS.length] }}
                  />
                  <span className="text-foreground font-medium">{cat.name}</span>
                </div>
                <span className="text-text-muted font-semibold">{cat.value.toLocaleString()} ETB</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="col-span-1 lg:col-span-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Best-Selling Appliances</h2>
              <p className="text-xs text-text-muted mt-0.5">Top revenue contributors this cycle</p>
            </div>
            <Link href="/admin/products" className="text-xs font-medium text-primary hover:underline">
              All Products
            </Link>
          </div>

          <div className="divide-y divide-border">
            {bestSellers.length === 0 ? (
              <div className="py-8 text-center text-xs text-text-muted">No sales recorded yet.</div>
            ) : (
              bestSellers.map((item, idx) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-bold text-foreground">
                      #{idx + 1}
                    </span>
                    <div className="truncate">
                      <div className="font-medium text-xs text-foreground truncate">{item.name}</div>
                      <div className="text-[11px] text-text-muted">{item.sku} &bull; {item.quantity} units sold</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-semibold text-xs text-foreground">{item.revenue.toLocaleString()} ETB</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Alerts & Quick Restock */}
        <div className="col-span-1 lg:col-span-4 rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Low-Stock Watchlist</h2>
              <p className="text-xs text-text-muted mt-0.5">Appliances near replenishment trigger</p>
            </div>
            <Link href="/admin/inventory" className="text-xs font-medium text-danger hover:underline">
              Inventory Table
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-success flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> All inventory levels healthy.
              </div>
            ) : (
              lowStockItems.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border border-border bg-surface-muted/40 p-3 flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-foreground truncate">{p.name}</div>
                    <div className="text-[11px] text-text-muted">
                      SKU: {p.sku} &bull; Reorder Level: {p.lowStockThreshold}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="inline-flex items-center rounded-md bg-warning-soft px-2 py-0.5 text-xs font-bold text-warning">
                      {p.stock} units
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <Link href="/admin/inventory">
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                <Package className="h-3.5 w-3.5" /> Manage All Stock & CSV Import
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders & Live Audit Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Recent Orders Queue Preview */}
        <div className="col-span-1 lg:col-span-8 rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">Recent Orders</h2>
              <p className="text-xs text-text-muted mt-0.5">Latest customer transactions and shipping states</p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
                View Full Queue <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted text-text-muted uppercase text-[11px]">
                <tr>
                  <th className="px-6 py-3 font-semibold">Order ID</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Total Amount</th>
                  <th className="px-6 py-3 font-semibold">Payment</th>
                  <th className="px-6 py-3 font-semibold">Fulfillment</th>
                  <th className="px-6 py-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-muted/50 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-foreground">
                      <Link href={`/admin/orders/${order.id}`} className="hover:text-primary hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-3.5 text-foreground">{order.customerName}</td>
                    <td className="px-6 py-3.5 text-text-muted">
                      {order.date ? order.date.slice(0, 10) : "-"}
                    </td>
                    <td className="px-6 py-3.5 font-bold text-foreground">
                      {order.grandTotal.toLocaleString()} ETB
                    </td>
                    <td className="px-6 py-3.5">
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
                    <td className="px-6 py-3.5">
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
                    <td className="px-6 py-3.5 text-right">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Inspect
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live System Audit Trail Stream */}
        <div className="col-span-1 lg:col-span-4 rounded-xl border border-border bg-surface p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">Administrative Activity</h2>
                <p className="text-xs text-text-muted mt-0.5">Live security and mutation audit trail</p>
              </div>
              <Link href="/admin/audit" className="text-xs font-medium text-primary hover:underline">
                All Logs
              </Link>
            </div>

            <div className="space-y-3">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="text-xs space-y-1 rounded-lg border border-border bg-surface-muted/30 p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{log.action}</span>
                    <span className="text-[10px] text-text-faint">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-text-muted truncate">{log.details}</p>
                  <div className="flex items-center gap-2 pt-0.5 text-[10px] text-text-faint">
                    <span>{log.actor}</span>
                    <span>&bull;</span>
                    <span className="text-primary font-medium">{log.resource}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <Link href="/admin/audit">
              <Button variant="ghost" size="sm" className="w-full text-xs text-text-muted hover:text-foreground">
                View Comprehensive Audit Trail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
