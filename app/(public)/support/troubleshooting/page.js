import { FileText } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Troubleshooting | Orbit Electronics" };

export default function TroubleshootingPage() {
  const categories = [
    { name: "TVs", articles: ["TV won't turn on", "No picture or black screen", "Remote not working", "Wi-Fi won't connect"] },
    { name: "Refrigerators", articles: ["Not cooling properly", "Too much ice buildup", "Strange noises", "Water leakage"] },
    { name: "Washing Machines", articles: ["Won't start cycle", "Doesn't drain water", "Excessive vibration", "Door won't open"] }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 w-full">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Troubleshooting Guides</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map(category => (
          <div key={category.name} className="border border-border rounded-xl p-6 bg-surface">
            <h2 className="text-xl font-bold mb-4 text-primary">{category.name}</h2>
            <ul className="space-y-3">
              {category.articles.map(article => (
                <li key={article}>
                  <Link href="#" className="flex items-start gap-2 text-sm text-text-muted hover:text-primary transition-colors">
                    <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                    {article}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
