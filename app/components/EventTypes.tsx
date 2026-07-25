import Link from "next/link";
import PhotoFrame from "./PhotoFrame";

const EVENTS = [
  {
    label: "Weddings",
    variant: "maroon" as const,
    description:
      "Full-day hire with space for baraat, mandap, and a seated reception for up to 500 guests.",
  },
  {
    label: "Engagements",
    variant: "gold" as const,
    description:
      "An intimate setup for ring ceremonies and family gatherings, with flexible seating layouts.",
  },
  {
    label: "Receptions",
    variant: "teal" as const,
    description:
      "Evening-ready lighting and a dance floor, catering-friendly kitchen access included.",
  },
  {
    label: "Birthdays",
    variant: "gold" as const,
    description:
      "From milestone birthdays to first ones — decor-friendly space sized to your guest list.",
  },
];

export default function EventTypes() {
  return (
    <section id="events" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-28">
      <div className="text-center max-w-xl mx-auto">
        <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
          What We Host
        </p>
        <h2 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
          An Occasion for Every Milestone
        </h2>
        <div className="ornament-rule mx-auto mt-5 w-32" />
      </div>

      <div className="mt-14 grid sm:grid-cols-2 gap-8">
        {EVENTS.map((event) => (
          <div key={event.label} className="group">
            <PhotoFrame
              label={event.label}
              variant={event.variant}
              className="aspect-[16/10]"
            />
            <h3 className="font-display text-2xl font-semibold text-maroon-deep mt-4">
              {event.label}
            </h3>
            <p className="mt-2 text-ink/70">{event.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/book"
          className="inline-block rounded-md bg-maroon text-paper font-medium px-8 py-3
                     tracking-wide hover:bg-maroon-deep transition-colors"
        >
          Check Availability
        </Link>
      </div>
    </section>
  );
}
