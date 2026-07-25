"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 border-b border-gold/30 bg-paper/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold text-maroon-deep">
          N L Marriage Hall
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ink/70 hover:text-maroon-deep transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <Link
          href="/book"
          className="rounded-md bg-maroon text-paper text-sm font-medium px-5 py-2.5 hover:bg-maroon-deep transition-colors"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}