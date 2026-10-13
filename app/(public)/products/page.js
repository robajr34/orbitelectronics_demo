import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { Filter, Search } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata = {
  title: "Products",
  description: "Browse our premium electronics and home appliances.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5" /> Filters
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-foreground mb-3">Categories</h4>
              <ul className="space-y-2">
                {categories.map(c => (
                  <li key={c.id}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-sm text-text-muted hover:text-foreground">{c.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-sm text-foreground mb-3">Price Range</h4>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full rounded-md border border-border bg-surface px-3 py-1 text-sm focus:border-primary focus:outline-none" />
                <span className="text-text-muted">-</span>
                <input type="number" placeholder="Max" className="w-full rounded-md border border-border bg-surface px-3 py-1 text-sm focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-sm text-foreground mb-3">Availability</h4>
              <ul className="space-y-2">
                <li>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary h-4 w-4" defaultChecked />
                    <span className="text-sm text-text-muted hover:text-foreground">In Stock</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Search products..." className="w-full rounded-md border border-border bg-surface pl-9 pr-4 py-2 text-sm focus:border-primary focus:outline-none" />
            </div>
            <select className="rounded-md border border-border bg-surface px-4 py-2 text-sm focus:border-primary focus:outline-none">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
