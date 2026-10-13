import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";

export function ProductCard({ product }) {
  // Determine badge
  let badge = null;
  if (product.discount > 0) {
    badge = `SALE -${product.discount}%`;
  } else if (product.availability === "New") {
    badge = "NEW";
  } else if (product.rating >= 4.8 && product.reviews > 100) {
    badge = "BEST SELLER";
  }

  // Determine brand (Orbit is the default brand for this demo)
  const brand = product.brand || "ORBIT";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary">
      {/* Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-surface-muted">
        <div className="flex h-full w-full items-center justify-center p-6 transition-transform duration-300 ease-in-out group-hover:scale-105">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
        
        {/* Badges */}
        {badge && (
          <div className="absolute left-3 top-3 z-10 rounded bg-foreground px-2 py-1 text-[10px] font-bold tracking-wider text-background">
            {badge}
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-text-muted shadow-sm backdrop-blur-md transition-colors hover:bg-surface hover:text-danger focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        {/* Brand */}
        <div className="mb-1 text-[11px] font-bold tracking-widest text-text-muted uppercase">
          {brand}
        </div>
        
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
          <Link href={`/products/${product.id}`} className="focus:outline-none">
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>
        
        {/* Description / Spec highlight */}
        <p className="mb-4 line-clamp-2 text-xs text-text-muted">
          {product.description || product.features?.join(" • ") || "Premium electronics designed for modern living."}
        </p>

        {/* Bottom Section (pushed to bottom) */}
        <div className="mt-auto flex flex-col gap-3">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-accent">
              <Star className="h-3.5 w-3.5 fill-current" />
            </div>
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <span className="font-semibold text-foreground">{product.rating}</span>
              <span>·</span>
              <span>{product.reviews} reviews</span>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-lg font-bold text-foreground">
              {product.price.toLocaleString()} ETB
            </span>
            {product.previousPrice && (
              <span className="mb-0.5 text-xs text-text-faint line-through">
                {product.previousPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* CTA */}
          <div className="relative z-10 mt-2">
            <Button className="w-full font-medium" variant="secondary" asChild>
              <Link href={`/products/${product.id}`}>
                View Product
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
