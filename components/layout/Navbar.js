import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-primary-strong">ORBIT</span>
          </Link>
          <div className="hidden md:flex md:gap-6">
            <Link href="/products" className="text-sm font-medium text-text-muted transition-colors hover:text-foreground">Products</Link>
            <Link href="/promotions" className="text-sm font-medium text-text-muted transition-colors hover:text-foreground">Promotions</Link>
            <Link href="/support" className="text-sm font-medium text-text-muted transition-colors hover:text-foreground">Support</Link>
            <Link href="/stores" className="text-sm font-medium text-text-muted transition-colors hover:text-foreground">Stores</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-primary/90 transition-all"
          >
            <span>Admin Dashboard</span>
          </Link>
          <button className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <button className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface-muted hover:text-foreground md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>

      </div>
    </nav>
  );
}
