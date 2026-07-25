import Link from "next/link";
import PhotoFrame from "./PhotoFrame";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="fade-in-up text-center lg:text-left">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
            Est. for your celebrations
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-maroon-deep mt-3 leading-[1.05]">
            N L Marriage Hall &amp; Guest House
          </h1>
          <div className="ornament-rule mx-auto lg:mx-0 mt-6 w-48" />
          <p className="mt-6 text-lg text-ink/70 max-w-md mx-auto lg:mx-0">
            A spacious hall and comfortable guest house for weddings,
            receptions, and every celebration in between — with room for
            your out-of-town family to stay.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/book"
              className="rounded-md bg-maroon text-paper font-medium px-8 py-3
                         tracking-wide hover:bg-maroon-deep transition-colors"
            >
              Book Your Date
            </Link>
            <a
              href="#gallery"
              className="rounded-md border border-maroon/30 text-maroon-deep font-medium px-8 py-3
                         tracking-wide hover:bg-maroon/5 transition-colors"
            >
              View Gallery
            </a>
          </div>
        </div>

        <div className="fade-in-up grid grid-cols-2 gap-4">
          <PhotoFrame label="Main Hall" variant="maroon" className="aspect-[4/5] col-span-1" />
          <div className="grid gap-4">
            <PhotoFrame label="Guest Rooms" variant="gold" className="aspect-square" />
            <PhotoFrame label="Evening Setup" variant="teal" className="aspect-square" />
          </div>
        </div>
      </div>
    </section>
  );
}
