import { Button } from "@/components/ui/button";

export const metadata = { title: "Contact Us | Orbit Electronics" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 w-full text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Contact Support</h1>
      <p className="text-text-muted mb-8">We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.</p>

      <form className="space-y-6 text-left max-w-xl mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input type="text" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <textarea rows={5} className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus:border-primary focus:outline-none"></textarea>
        </div>
        <Button className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
