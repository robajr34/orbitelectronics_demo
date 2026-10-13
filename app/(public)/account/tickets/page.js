import { Button } from "@/components/ui/button";

export const metadata = { title: "My Tickets | Orbit Electronics" };

export default function MyTicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
        <Button>New Ticket</Button>
      </div>
      
      <div className="rounded-xl border border-border bg-surface p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <h3 className="text-lg font-bold mb-2">No Open Tickets</h3>
        <p className="text-text-muted mb-4 max-w-md">You don&apos;t have any active support tickets. If you need help with a product, you can open a new one.</p>
        <Button variant="outline">Browse FAQs</Button>
      </div>
    </div>
  );
}
