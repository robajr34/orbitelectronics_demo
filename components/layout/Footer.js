import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Cpu } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/orbit_electronics/",
    icon: faInstagram,
    color: "hover:text-pink-500",
    bg: "hover:bg-pink-50 dark:hover:bg-pink-950/30",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@orbitelectronics?is_from_webapp=1&sender_device=pc",
    icon: faTiktok,
    color: "hover:text-foreground",
    bg: "hover:bg-surface-strong",
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/orbitelectronicscompany/",
    icon: faFacebook,
    color: "hover:text-blue-600",
    bg: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
  },
];

const contactItems = [
  {
    label: "info@orbitelectronics.et",
    href: "mailto:info@orbitelectronics.et",
    icon: faEnvelope,
  },
  {
    label: "+251 11 156 7890",
    href: "tel:+251111567890",
    icon: faPhone,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Top: Brand + Social + Contact */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-10 border-b border-border">
          {/* Brand blurb */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tighter text-foreground">ORBIT</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Premium electronics & home appliances. Built for performance, designed for Ethiopian living.
            </p>
          </div>

          {/* Social + Contact */}
          <div className="flex flex-col gap-6">
            {/* Social icons */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-faint mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon, color, bg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-xl
                      border border-border text-text-muted
                      transition-all duration-200
                      ${color} ${bg}
                      hover:border-transparent hover:shadow-md hover:-translate-y-0.5
                    `}
                  >
                    <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-text-faint mb-3">
                Contact Us
              </p>
              <div className="flex flex-col gap-2">
                {contactItems.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2.5 text-sm text-text-muted hover:text-primary transition-colors group"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
                    </span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 pt-10">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">TVs</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Refrigerators</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Washing Machines</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Air Conditioners</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Warranty</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Service & Repair</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Register Product</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Press</a></li>
              <li><Link href="/contact" className="text-sm text-text-muted hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary transition-colors">Terms of Service</a></li>
              <li><Link href="/admin" className="text-sm font-bold text-primary hover:underline">Admin Dashboard</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-text-faint">
            &copy; {new Date().getFullYear()} ORBIT Electronics. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-text-faint transition-colors ${color}`}
              >
                <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
