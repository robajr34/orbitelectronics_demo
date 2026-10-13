import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Wrench, MapPin, Search } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-surface-strong overflow-hidden flex items-center justify-center">
        {/* Abstract background elements to replace the missing image */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Technology Designed for <br className="hidden sm:block" />
            <span className="text-primary">Better Living.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-text-muted">
            Discover our premium range of smart electronics and home appliances. Built for performance, designed for life.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto h-12 px-8 text-base">
              <Link href="/products">
                Explore Products
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-12 px-8 text-base bg-surface/50 backdrop-blur-sm">
              <Link href="/stores">
                <MapPin className="mr-2 h-5 w-5" />
                Find a Store
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group relative rounded-xl bg-surface-muted p-6 transition-all hover:shadow-md hover:bg-surface-strong flex flex-col items-center justify-center text-center aspect-square">
              {/* Fake image placeholder since we don't have real images yet */}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <span className="text-primary font-bold text-xl">{category.name[0]}</span>
              </div>
              <h3 className="font-semibold text-foreground text-sm">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl bg-primary text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white opacity-10 rounded-full blur-[40px]"></div>
          <div className="z-10 relative">
            <h2 className="text-3xl font-bold mb-4">Upgrade Your Home</h2>
            <p className="text-primary-soft text-lg max-w-md">Save on selected smart appliances this season. Experience the future of home comfort.</p>
          </div>
          <div className="z-10 relative shrink-0">
            <Button variant="secondary" size="lg" asChild className="font-semibold bg-white text-primary hover:bg-surface">
              <Link href="/promotions">View Offers <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Featured Products</h2>
          <Link href="/products" className="text-primary font-medium hover:underline hidden sm:block">View all products</Link>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Orbit */}
      <section className="bg-surface border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Official Warranty</h3>
              <p className="text-text-muted max-w-sm">Enjoy peace of mind with our comprehensive nationwide warranty on all products.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-6">
                <Wrench className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Installation</h3>
              <p className="text-text-muted max-w-sm">Expert installation by certified technicians to ensure your appliances work perfectly.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-primary-soft text-primary flex items-center justify-center mb-6">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nationwide Service</h3>
              <p className="text-text-muted max-w-sm">Access to our dedicated service centers and customer support across Ethiopia.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-center">
        <h2 className="text-2xl font-bold mb-8">Need help with your product?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild><Link href="/support/service">Request Service</Link></Button>
          <Button variant="outline" asChild><Link href="/support/warranty">Check Warranty</Link></Button>
          <Button variant="outline" asChild><Link href="/support/troubleshooting">Troubleshooting</Link></Button>
          <Button variant="outline" asChild><Link href="/contact">Contact Support</Link></Button>
        </div>
      </section>

    </div>
  );
}
