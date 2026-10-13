import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ShieldCheck, Wrench, MapPin, Search,
  Tv2, Refrigerator, WashingMachine, Wind, Smartphone,
  ChefHat, Music4, Package
} from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  // Map category slugs to icons, colors, and accent gradients
  const categoryMeta = {
    "tvs":              { Icon: Tv2,           gradient: "from-blue-600 to-blue-400",    bg: "bg-blue-50 dark:bg-blue-950/40",      ring: "ring-blue-200 dark:ring-blue-800",  text: "text-blue-600 dark:text-blue-400" },
    "refrigerators":    { Icon: Refrigerator,   gradient: "from-cyan-600 to-cyan-400",    bg: "bg-cyan-50 dark:bg-cyan-950/40",      ring: "ring-cyan-200 dark:ring-cyan-800",  text: "text-cyan-600 dark:text-cyan-400" },
    "washing-machines": { Icon: WashingMachine,  gradient: "from-indigo-600 to-indigo-400",bg: "bg-indigo-50 dark:bg-indigo-950/40",  ring: "ring-indigo-200",                  text: "text-indigo-600 dark:text-indigo-400" },
    "air-conditioners": { Icon: Wind,            gradient: "from-sky-600 to-sky-400",      bg: "bg-sky-50 dark:bg-sky-950/40",        ring: "ring-sky-200 dark:ring-sky-800",    text: "text-sky-600 dark:text-sky-400" },
    "smartphones":      { Icon: Smartphone,      gradient: "from-violet-600 to-violet-400",bg: "bg-violet-50 dark:bg-violet-950/40",  ring: "ring-violet-200",                  text: "text-violet-600 dark:text-violet-400" },
    "kitchen":          { Icon: ChefHat,         gradient: "from-orange-500 to-amber-400", bg: "bg-orange-50 dark:bg-orange-950/40",  ring: "ring-orange-200",                  text: "text-orange-500 dark:text-orange-400" },
    "audio":            { Icon: Music4,           gradient: "from-rose-600 to-pink-400",    bg: "bg-rose-50 dark:bg-rose-950/40",      ring: "ring-rose-200 dark:ring-rose-800",  text: "text-rose-600 dark:text-rose-400" },
    "small-appliances": { Icon: Package,          gradient: "from-emerald-600 to-teal-400", bg: "bg-emerald-50 dark:bg-emerald-950/40",ring: "ring-emerald-200",                 text: "text-emerald-600 dark:text-emerald-400" },
  };

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

      {/* ── Shop by Category ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-1">Browse Range</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Shop by Category</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            All products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Scrollable row of category cards */}
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth">
          {categories.map((cat) => {
            const meta = categoryMeta[cat.slug] || {
              Icon: Package,
              gradient: "from-slate-600 to-slate-400",
              bg: "bg-slate-50 dark:bg-slate-900/40",
              ring: "ring-slate-200",
              text: "text-slate-600",
            };
            const { Icon, gradient, bg, ring, text } = meta;
            const count = products.filter(
              (p) => p.categoryId === cat.id || p.categoryId === cat.slug
            ).length;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className={`
                  group relative flex-none w-40 sm:w-44 snap-start
                  rounded-2xl border border-border overflow-hidden
                  ${bg} ring-1 ${ring}
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                `}
              >
                {/* Top gradient strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

                <div className="flex flex-col items-center p-5 pt-4 gap-3">
                  {/* Icon container */}
                  <div
                    className={`
                      flex h-16 w-16 items-center justify-center rounded-2xl
                      bg-gradient-to-br ${gradient} shadow-lg
                      transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                    `}
                  >
                    <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Category name */}
                  <div className="text-center">
                    <p className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </p>
                    {count > 0 && (
                      <p className={`mt-0.5 text-[11px] font-semibold ${text}`}>
                        {count} product{count !== 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  {/* Shop arrow */}
                  <span
                    className={`
                      inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide
                      ${text} opacity-0 group-hover:opacity-100
                      transition-all duration-200 -translate-y-1 group-hover:translate-y-0
                    `}
                  >
                    Shop now <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-5 flex sm:hidden justify-center">
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-full border border-border px-5 py-2 text-sm font-semibold text-text-muted hover:bg-surface-muted transition-colors"
          >
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
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
