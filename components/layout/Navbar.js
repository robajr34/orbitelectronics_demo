"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X, Cpu, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Promotions", href: "/promotions" },
  { label: "Support", href: "/support" },
  { label: "Stores", href: "/stores" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter text-foreground">
                ORBIT
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary-soft"
                      : "text-text-muted hover:text-foreground hover:bg-surface-muted"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-primary-strong transition-all"
            >
              Admin Dashboard
            </Link>
            <button
              className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/account"
              className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-all hover:bg-surface-muted hover:text-foreground"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className="transition-transform duration-200"
                style={{ transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-surface px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary-soft text-primary font-semibold"
                    : "text-foreground hover:bg-surface-muted"
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4 text-text-faint" />
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-border mt-2">
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-strong transition-colors"
              >
                <Cpu className="h-4 w-4" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
