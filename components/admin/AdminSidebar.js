"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  RotateCcw,
  Building2,
  Package,
  Boxes,
  Users,
  Headphones,
  ShieldCheck,
  Wrench,
  BookOpen,
  Tag,
  Sliders,
  Star,
  ScrollText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RotateCw,
  Cpu,
  Home,
  Menu,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { ConfirmationModal } from "./ConfirmationModal";

export function AdminSidebar({ isMobileOpen, onMobileClose, isCollapsed, onToggleCollapse }) {
  const pathname = usePathname();
  const [showResetModal, setShowResetModal] = useState(false);
  const {
    orders,
    products,
    supportTickets,
    currentRole,
    resetDemoData,
  } = useAdminStore();

  const pendingOrdersCount = orders.filter((o) => o.fulfillmentStatus === "Pending" || o.fulfillmentStatus === "Processing").length;
  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockThreshold || 10)).length;
  const openTicketsCount = supportTickets.filter((t) => t.status === "Open" || t.status === "In Progress").length;

  const navGroups = [
    {
      group: "Overview",
      items: [
        { label: "Home", href: "/", icon: Home },
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      group: "Commerce & Sales",
      items: [
        { label: "Orders Queue", href: "/admin/orders", icon: ShoppingCart, badge: pendingOrdersCount, badgeColor: "bg-warning-soft text-warning" },
        { label: "Returns & Exchanges", href: "/admin/orders/returns", icon: RotateCcw },
        { label: "B2B Leads", href: "/admin/leads", icon: Building2 },
      ],
    },
    {
      group: "Catalog & Stock",
      items: [
        { label: "Products Catalog", href: "/admin/products", icon: Package },
        { label: "Stock & Alerts", href: "/admin/inventory", icon: Boxes, badge: lowStockCount, badgeColor: "bg-danger-soft text-danger" },
      ],
    },
    {
      group: "CRM & Customers",
      items: [
        { label: "Customer Directory", href: "/admin/customers", icon: Users },
      ],
    },
    {
      group: "Support & Services",
      items: [
        { label: "Helpdesk Tickets", href: "/admin/support", icon: Headphones, badge: openTicketsCount, badgeColor: "bg-primary-soft text-primary" },
        { label: "Warranty Registry", href: "/admin/support/warranties", icon: ShieldCheck },
        { label: "Repairs & Service", href: "/admin/support/repairs", icon: Wrench },
        { label: "Knowledge Base", href: "/admin/support/kb", icon: BookOpen },
      ],
    },
    {
      group: "Marketing & Content",
      items: [
        { label: "Coupons & Promos", href: "/admin/marketing", icon: Tag },
        { label: "Homepage CMS", href: "/admin/marketing/content", icon: Sliders },
        { label: "Review Moderation", href: "/admin/marketing/reviews", icon: Star },
      ],
    },
    {
      group: "Governance",
      items: [
        { label: "System Audit Trail", href: "/admin/audit", icon: ScrollText },
        { label: "Store Settings & RBAC", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  function isActive(href) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-surface border-r border-border select-none">
      {/* Brand & Workspace Identity */}
      <div>
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm font-bold">
              <Cpu className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm tracking-tight text-foreground truncate">
                  ORBIT ADMIN
                </span>
                <span className="text-[11px] text-text-muted truncate">
                  Electronics HQ
                </span>
              </div>
            )}
          </Link>
          {/* Desktop: collapse toggle */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-muted hover:text-foreground hover:bg-surface-muted"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
          {/* Mobile: close/hamburger toggle inside sidebar header */}
          <button
            onClick={onMobileClose}
            className="flex md:hidden h-7 w-7 items-center justify-center rounded-md border border-border text-text-muted hover:text-foreground hover:bg-surface-muted"
            title="Close navigation"
            aria-label="Close navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Current Active Role Indicator */}
        {!isCollapsed && (
          <div className="mx-3 mt-3 px-3 py-1.5 rounded-lg bg-surface-muted border border-border flex items-center justify-between">
            <span className="text-[11px] font-medium text-text-muted">Simulated Role:</span>
            <span className="text-[11px] font-semibold text-primary">{currentRole}</span>
          </div>
        )}

        {/* Nav list */}
        <nav className="space-y-4 px-3 py-4 overflow-y-auto max-h-[calc(100vh-14rem)]">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-text-faint">
                  {grp.group}
                </div>
              )}
              {grp.items.map((item) => {
                const isHomeLink = item.href === "/";
                const active = !isHomeLink && isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                    title={isCollapsed ? item.label : undefined}
                    className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "bg-primary-soft text-primary-strong font-semibold shadow-xs"
                        : isHomeLink
                        ? "text-text-muted hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                        : "text-foreground hover:bg-surface-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`h-4 w-4 shrink-0 ${
                        active
                          ? "text-primary"
                          : isHomeLink
                          ? "text-emerald-500 group-hover:text-emerald-600"
                          : "text-text-muted group-hover:text-foreground"
                      }`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                      <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${item.badgeColor || "bg-primary-soft text-primary"}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-border space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-text-muted hover:bg-surface-muted hover:text-foreground transition-colors"
          title="Open customer storefront in a new tab"
        >
          <div className="flex items-center gap-2 truncate">
            <ExternalLink className="h-4 w-4 shrink-0 text-text-faint" />
            {!isCollapsed && <span>View Storefront</span>}
          </div>
        </Link>

        <button
          onClick={() => setShowResetModal(true)}
          className="w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-danger hover:bg-danger-soft transition-colors"
          title="Restore seed data"
        >
          <div className="flex items-center gap-2 truncate">
            <RotateCw className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>Reset Demo Data</span>}
          </div>
        </button>
      </div>

      <ConfirmationModal
        isOpen={showResetModal}
        title="Reset Demo Dataset?"
        message="This will reset all products, orders, customers, tickets, coupons, and inventory to their initial factory seed state and clear local storage. Proceed?"
        confirmLabel="Reset Everything"
        variant="danger"
        onConfirm={() => {
          resetDemoData();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface transform transition-transform duration-200 md:hidden shadow-2xl ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
