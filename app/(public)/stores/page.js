import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Stores | Orbit Electronics",
};

export default function StoresPage() {
  const stores = [
    { name: "Orbit Flagship - Bole", address: "Bole Road, Next to Friendship Bldg, Addis Ababa", phone: "+251 11 661 2345", hours: "Mon-Sat: 9AM - 8PM", services: ["Sales", "Service Center"] },
    { name: "Orbit - Piassa", address: "Churchill Ave, Piassa, Addis Ababa", phone: "+251 11 156 7890", hours: "Mon-Sat: 9AM - 7PM", services: ["Sales"] },
    { name: "Orbit Authorized - Adama", address: "Main Road, Adama", phone: "+251 22 111 2233", hours: "Mon-Sat: 8:30AM - 6:30PM", services: ["Sales", "Drop-off Point"] },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Find a Store</h1>
        <div className="relative">
          <input type="text" placeholder="Search by city or area..." className="w-full rounded-md border border-border bg-surface px-4 py-3 text-sm focus:border-primary focus:outline-none shadow-sm" />
        </div>
        
        <div className="flex flex-col gap-4 mt-4 h-[600px] overflow-y-auto pr-2">
          {stores.map((store, i) => (
            <div key={i} className="rounded-xl border border-border bg-surface p-5 hover:border-primary transition-colors cursor-pointer">
              <h3 className="font-bold text-lg mb-2 text-primary">{store.name}</h3>
              <div className="space-y-2 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> {store.address}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" /> {store.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" /> {store.hours}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                {store.services.map(s => (
                  <span key={s} className="px-2 py-1 bg-surface-muted text-xs rounded font-medium text-foreground">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-2/3 h-[400px] md:h-auto bg-surface-strong rounded-xl border border-border flex items-center justify-center relative overflow-hidden">
        {/* Placeholder Map */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="text-center z-10">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-2 opacity-50" />
          <p className="text-text-muted font-medium">Interactive Map View</p>
        </div>
      </div>
    </div>
  );
}
