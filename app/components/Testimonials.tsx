const TESTIMONIALS = [
  {
    quote:
      "The hall comfortably fit our entire guest list, and the staff helped us plan the layout down to the last table.",
    name: "Anjali R.",
    event: "Wedding, 2025",
  },
  {
    quote:
      "Our families stayed right on site at the guest house, which made the whole weekend so much easier to coordinate.",
    name: "Vikram & Meera S.",
    event: "Reception, 2025",
  },
  {
    quote:
      "Booking online was simple and the team followed up the same day to confirm everything.",
    name: "Deepak N.",
    event: "Engagement, 2026",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28"
    >
      <div className="text-center max-w-xl mx-auto">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
          From Our Guests
        </p>
        <h2 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
          Testimonials
        </h2>
        <div className="ornament-rule mx-auto mt-5 w-32" />
        <p className="mt-4 text-sm text-ink/40">
          Sample reviews — replace with real guest feedback once collected.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="border border-gold/30 bg-paper-deep/50 px-6 py-8 flex flex-col"
          >
            <blockquote className="font-display text-xl text-ink/80 leading-snug flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 pt-4 border-t border-maroon/10">
              <p className="font-medium text-maroon-deep">{t.name}</p>
              <p className="text-sm text-ink/50">{t.event}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
