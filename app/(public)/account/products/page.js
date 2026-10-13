import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "My Products | Orbit Electronics",
};

export default function MyProductsPage() {
  const myProducts = products.slice(0, 2); // Mock: user owns first two products

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Products</h1>
        <Button asChild>
          <Link href="/account/products/register">Register Product</Link>
        </Button>
      </div>
      <p className="text-text-muted">Manage your registered appliances and their warranties.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myProducts.map((product) => (
          <div key={product.id} className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm flex flex-col">
            <div className="p-6 border-b border-border flex items-center gap-6">
              <div className="w-20 h-20 bg-surface-muted rounded-lg flex items-center justify-center text-xs text-text-muted shrink-0">
                Image
              </div>
              <div>
                <h3 className="font-bold text-foreground">{product.name}</h3>
                <p className="text-sm text-text-muted">Model: {product.model}</p>
                <p className="text-sm text-text-muted mt-1">SN: ORB-882910</p>
              </div>
            </div>
            <div className="p-4 bg-success-soft border-b border-border flex items-center justify-between text-success px-6">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <ShieldCheck className="h-5 w-5" /> Warranty Active
              </div>
              <div className="text-xs font-medium">Valid until Oct 2028</div>
            </div>
            <div className="p-4 px-6 flex justify-between bg-surface-muted/50 mt-auto">
              <Button variant="outline" size="sm" asChild>
                <Link href="/support/troubleshooting">Manuals & Guides</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/support/service">Request Service</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
