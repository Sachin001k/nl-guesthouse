import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink/50">
        <p>
          &copy; {new Date().getFullYear()} N L Marriage Hall &amp; Guest
          House.
        </p>
        <div className="flex items-center gap-6">
          <a href="#events" className="hover:text-maroon-deep transition-colors">
            Events
          </a>
          <a href="#gallery" className="hover:text-maroon-deep transition-colors">
            Gallery
          </a>
          <a href="#contact" className="hover:text-maroon-deep transition-colors">
            Contact
          </a>
          <Link href="/login" className="hover:text-maroon-deep transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
