import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-24 text-center">
      <div className="fade-in-up max-w-2xl">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
          Est. for your celebrations
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold text-maroon-deep mt-3">
          N L Marriage Hall &amp; Guest House
        </h1>
        <div className="ornament-rule mx-auto mt-6 w-48" />
        <p className="mt-6 text-lg text-ink/70">
          A spacious hall and comfortable guest house for weddings,
          receptions, and every celebration in between.
        </p>
        <Link
          href="/book"
          className="inline-block mt-10 rounded-md bg-maroon text-paper font-medium px-8 py-3
                     tracking-wide hover:bg-maroon-deep transition-colors"
        >
          Book Your Date
        </Link>
      </div>
    </main>
  );
}
