"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Package, ShoppingCart, Users, Headphones, ArrowRight } from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";

export function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { products, orders, customers, supportTickets } = useAdminStore();

  const handleClose = React.useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);



  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const matchingProducts = cleanQ
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(cleanQ) ||
            p.sku.toLowerCase().includes(cleanQ) ||
            (p.model && p.model.toLowerCase().includes(cleanQ))
        )
        .slice(0, 4)
    : [];

  const matchingOrders = cleanQ
    ? orders
        .filter(
          (o) =>
            o.id.toLowerCase().includes(cleanQ) ||
            o.customerName.toLowerCase().includes(cleanQ) ||
            (o.trackingNumber && o.trackingNumber.toLowerCase().includes(cleanQ))
        )
        .slice(0, 4)
    : [];

  const matchingCustomers = cleanQ
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(cleanQ) ||
            c.email.toLowerCase().includes(cleanQ) ||
            c.phone.includes(cleanQ)
        )
        .slice(0, 4)
    : [];

  const matchingTickets = cleanQ
    ? supportTickets
        .filter(
          (t) =>
            t.id.toLowerCase().includes(cleanQ) ||
            t.subject.toLowerCase().includes(cleanQ) ||
            t.customerName.toLowerCase().includes(cleanQ)
        )
        .slice(0, 4)
    : [];

  const hasResults =
    matchingProducts.length > 0 ||
    matchingOrders.length > 0 ||
    matchingCustomers.length > 0 ||
    matchingTickets.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-text-muted mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products by SKU, orders by ID, customers, or tickets..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-text-muted focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-text-muted hover:text-foreground mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <span className="hidden sm:inline-block rounded border border-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
            ESC to close
          </span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!cleanQ && (
            <div className="py-8 text-center">
              <p className="text-sm text-text-muted">Type anything to quickly locate items across all store modules.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setQuery("QLED")}
                  className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-foreground hover:border-primary"
                >
                  &ldquo;QLED&rdquo;
                </button>
                <button
                  onClick={() => setQuery("ORD-2026")}
                  className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-foreground hover:border-primary"
                >
                  &ldquo;ORD-2026&rdquo;
                </button>
                <button
                  onClick={() => setQuery("Abebe")}
                  className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-foreground hover:border-primary"
                >
                  &ldquo;Abebe&rdquo;
                </button>
                <button
                  onClick={() => setQuery("Refrigerator")}
                  className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-foreground hover:border-primary"
                >
                  &ldquo;Refrigerator&rdquo;
                </button>
              </div>
            </div>
          )}

          {cleanQ && !hasResults && (
            <div className="py-8 text-center">
              <p className="text-sm text-text-muted">No records found matching &ldquo;{query}&rdquo;.</p>
            </div>
          )}

          {matchingProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                <Package className="h-3.5 w-3.5 text-primary" /> Products ({matchingProducts.length})
              </div>
              <div className="space-y-1">
                {matchingProducts.map((p) => (
                  <Link
                    key={p.id}
                    href="/admin/products"
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg p-2.5 text-sm hover:bg-surface-muted transition-colors"
                  >
                    <div>
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="ml-2 text-xs text-text-muted">({p.sku})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">{p.price.toLocaleString()} ETB</span>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                <ShoppingCart className="h-3.5 w-3.5 text-primary" /> Orders ({matchingOrders.length})
              </div>
              <div className="space-y-1">
                {matchingOrders.map((o) => (
                  <Link
                    key={o.id}
                    href={`/admin/orders/${o.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg p-2.5 text-sm hover:bg-surface-muted transition-colors"
                  >
                    <div>
                      <span className="font-medium text-foreground">{o.id}</span>
                      <span className="ml-2 text-xs text-text-muted">&bull; {o.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-surface-muted font-medium">
                        {o.fulfillmentStatus}
                      </span>
                      <span className="font-semibold text-foreground">
                        {o.grandTotal.toLocaleString()} ETB
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingCustomers.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                <Users className="h-3.5 w-3.5 text-primary" /> Customers ({matchingCustomers.length})
              </div>
              <div className="space-y-1">
                {matchingCustomers.map((c) => (
                  <Link
                    key={c.id}
                    href={`/admin/customers/${c.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg p-2.5 text-sm hover:bg-surface-muted transition-colors"
                  >
                    <div>
                      <span className="font-medium text-foreground">{c.name}</span>
                      <span className="ml-2 text-xs text-text-muted">{c.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted">{c.phone}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchingTickets.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                <Headphones className="h-3.5 w-3.5 text-primary" /> Support Tickets ({matchingTickets.length})
              </div>
              <div className="space-y-1">
                {matchingTickets.map((t) => (
                  <Link
                    key={t.id}
                    href="/admin/support"
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg p-2.5 text-sm hover:bg-surface-muted transition-colors"
                  >
                    <div>
                      <span className="font-medium text-foreground">{t.id}</span>
                      <span className="ml-2 text-xs text-text-muted">&bull; {t.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-warning">{t.priority}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
