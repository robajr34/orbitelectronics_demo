import { MapPin, Phone, Clock } from "lucide-react";

export const metadata = {
  title: "Stores | Orbit Electronics",
};

export default function StoresPage() {
  const stores = [
    {
      name: "Orbit - Piassa",
      address: "Churchill Ave, Piassa, Addis Ababa",
      phone: "+251 11 156 7890",
      hours: "Mon-Sat: 9AM - 7PM",
      services: ["Sales"],
    },
  ];

  return (
    <div id="store-location" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar — store list */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Find a Store</h1>

        <div className="flex flex-col gap-4 mt-2">
          {stores.map((store, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-primary bg-primary-soft p-5 shadow-md"
            >
              <h3 className="font-bold text-lg mb-3 text-primary">{store.name}</h3>
              <div className="space-y-2 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  {store.address}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {store.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  {store.hours}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                {store.services.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 bg-primary text-white text-xs rounded-full font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map embed */}
      <div className="w-full md:w-2/3 rounded-2xl border border-border overflow-hidden shadow-md min-h-[400px] md:min-h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d533.0236474898869!2d38.74998164462958!3d9.030838432526066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f1330babc7%3A0x4a372dee26f71226!2sTomoca%20Coffee!5e1!3m2!1sen!2set!4v1791881242164!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block", minHeight: "400px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Orbit Electronics — Piassa Store Location"
        />
      </div>
    </div>
  );
}

