"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Shield,
  UserCheck,
  Check,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationCenter } from "./NotificationCenter";
import { GlobalSearchModal } from "./GlobalSearchModal";

export function AdminHeader({ onMobileMenuClick }) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const { currentRole, setCurrentRole, roles } = useAdminStore();

  function getBreadcrumb() {
    if (pathname === "/admin") return "Executive Overview";
    if (pathname.startsWith("/admin/orders/returns")) return "Orders / Returns & Exchanges";
    if (pathname.startsWith("/admin/orders")) return "Orders & Fulfillment";
    if (pathname.startsWith("/admin/products")) return "Product Catalog";
    if (pathname.startsWith("/admin/inventory")) return "Stock & Inventory Alerts";
    if (pathname.startsWith("/admin/customers")) return "Customer CRM";
    if (pathname.startsWith("/admin/support/warranties")) return "Support / Warranty Registry";
    if (pathname.startsWith("/admin/support/repairs")) return "Support / Appliance Repairs";
    if (pathname.startsWith("/admin/support/kb")) return "Support / Knowledge Base";
    if (pathname.startsWith("/admin/support")) return "Helpdesk & Customer Support";
    if (pathname.startsWith("/admin/marketing/content")) return "Marketing / Homepage CMS";
    if (pathname.startsWith("/admin/marketing/reviews")) return "Marketing / Review Moderation";
    if (pathname.startsWith("/admin/marketing")) return "Marketing & Coupons";
    if (pathname.startsWith("/admin/audit")) return "System Audit Trail";
    if (pathname.startsWith("/admin/settings")) return "Store Settings & RBAC";
    if (pathname.startsWith("/admin/leads")) return "Sales Leads (B2B)";
    return "Admin Dashboard";
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted hover:text-foreground md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <span className="text-xs font-medium text-text-muted">Orbit Admin</span>
          <h1 className="text-sm sm:text-base font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
            {getBreadcrumb()}
          </h1>
        </div>
      </div>

      {/* Center/Right controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Search bar trigger button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface-muted/60 px-3 py-1.5 text-xs text-text-muted hover:border-primary hover:text-foreground transition-all"
        >
          <Search className="h-3.5 w-3.5 text-text-muted" />
          <span className="hidden sm:inline">Quick Search...</span>
          <kbd className="hidden sm:inline-block rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-text-faint">
            ⌘K
          </kbd>
        </button>

        {/* Role Switcher dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-surface-muted transition-colors"
            title="Switch Simulated Admin Role"
          >
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="hidden md:inline">{currentRole}</span>
          </button>

          {roleMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-surface p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100"
              onMouseLeave={() => setRoleMenuOpen(false)}
            >
              <div className="px-2 py-1.5 text-[11px] font-semibold text-text-faint uppercase tracking-wider border-b border-border mb-1">
                Simulate Staff Role
              </div>
              {roles.map((r) => {
                const isSelected = r.name === currentRole;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.name);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-left transition-colors ${
                      isSelected
                        ? "bg-primary-soft text-primary font-semibold"
                        : "text-foreground hover:bg-surface-muted"
                    }`}
                  >
                    <span>{r.name}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                );
              })}
              <div className="mt-1 pt-1.5 px-2 border-t border-border text-[10px] text-text-muted">
                Frontend role simulation (Prototype)
              </div>
            </div>
          )}
        </div>

        {/* Notification center */}
        <NotificationCenter />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Admin user avatar */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs shadow-xs">
            OA
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-semibold text-foreground leading-tight">Orbit Admin</span>
            <span className="text-[10px] text-success font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Live Demo
            </span>
          </div>
        </div>
      </div>

      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
}
