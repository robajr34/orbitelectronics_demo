import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";

export const metadata = {
  title: "Promotions | Orbit Electronics",
};

export default function PromotionsPage() {
  const promotedProducts = products.filter(p => p.discount > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Current Promotions</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Upgrade your home with our latest deals on premium electronics and smart appliances.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        {promotedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
