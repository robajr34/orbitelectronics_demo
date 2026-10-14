import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Check, Info, ShieldCheck, MapPin, Share2, Heart, Scale, Phone } from "lucide-react";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/3] w-full rounded-2xl bg-surface-muted flex items-center justify-center relative overflow-hidden border border-border">
            <span className="text-text-muted">Main Image: {product.name}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`aspect-square rounded-xl bg-surface-muted flex items-center justify-center border cursor-pointer hover:border-primary transition-colors ${i === 1 ? 'border-primary ring-1 ring-primary' : 'border-border'}`}>
                <span className="text-xs text-text-faint">Thumb {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-primary font-medium">{product.subCategory}</span>
            <span className="text-text-faint">&bull;</span>
            <span className="text-sm text-text-muted">Model: {product.model}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex items-center">
              <span className="font-bold text-lg text-foreground mr-1">{product.rating}</span>
              <div className="flex text-accent">
                {/* Star icons placeholder */}
                ★★★★★
              </div>
              <a href="#reviews" className="ml-2 text-sm text-text-muted hover:text-primary transition-colors hover:underline">({product.reviews} reviews)</a>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-bold text-foreground">{product.price.toLocaleString()} ETB</span>
            {product.previousPrice && (
              <>
                <span className="text-lg text-text-muted line-through mb-1">{product.previousPrice.toLocaleString()} ETB</span>
                <span className="text-sm font-bold text-danger bg-danger-soft px-2 py-1 rounded mb-1">-{product.discount}%</span>
              </>
            )}
          </div>

          <p className="text-text-muted text-lg mb-8">{product.description}</p>

          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-2 text-success font-medium">
              <Check className="h-5 w-5" />
              {product.availability}
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <ShieldCheck className="h-5 w-5" />
              {product.specs.Warranty}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="flex-1 text-base h-14 border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              variant="ghost"
              asChild
            >
              <Link href="/stores#store-location">
                <MapPin className="mr-2 h-5 w-5" />
                Where to Buy
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="flex-1 text-base h-14" asChild>
              <Link href="/stores">
                Find Our Store
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-border">
            <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-foreground transition-colors">
              <Heart className="h-5 w-5" /> Add to Wishlist
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-foreground transition-colors">
              <Scale className="h-5 w-5" /> Compare
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-foreground transition-colors">
              <Share2 className="h-5 w-5" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Tabs / Specifications */}
      <div className="mt-24">
        <div className="border-b border-border flex gap-8">
          <button className="border-b-2 border-primary py-4 px-2 font-medium text-primary">Specifications</button>
          <button className="border-b-2 border-transparent py-4 px-2 font-medium text-text-muted hover:text-foreground">Features</button>
          <button className="border-b-2 border-transparent py-4 px-2 font-medium text-text-muted hover:text-foreground">Reviews</button>
          <button className="border-b-2 border-transparent py-4 px-2 font-medium text-text-muted hover:text-foreground">Support</button>
        </div>
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Technical Specifications</h3>
            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex grid grid-cols-3 p-4 bg-surface even:bg-surface-muted transition-colors">
                  <span className="font-medium text-text-muted col-span-1">{key}</span>
                  <span className="text-foreground font-medium col-span-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Key Features</h3>
            <ul className="space-y-4">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{feature}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
