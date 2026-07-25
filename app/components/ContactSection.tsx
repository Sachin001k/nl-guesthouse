// Replace these with the real details before launch.
const CONTACT = {
  address: "N L Marriage Hall & Guest House, Your City, State, PIN",
  phone: "+91 00000 00000",
  email: "bookings@nlmarriagehall.example",
  hours: "Open daily, 9:00 AM – 8:00 PM",
  mapQuery: "Marriage Hall",
};

export default function ContactSection() {
  return (
    <section id="contact" className="bg-paper-deep/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
            Visit or Reach Us
          </h2>
          <div className="ornament-rule mx-auto mt-5 w-32" />
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-8 items-stretch">
          <div className="border border-gold/30 bg-paper px-6 py-8 sm:px-10 sm:py-10">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm tracking-wide uppercase text-gold">
                  Address
                </dt>
                <dd className="mt-1 text-ink/80">{CONTACT.address}</dd>
              </div>
              <div>
                <dt className="text-sm tracking-wide uppercase text-gold">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                    className="text-ink/80 hover:text-maroon-deep transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm tracking-wide uppercase text-gold">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-ink/80 hover:text-maroon-deep transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm tracking-wide uppercase text-gold">
                  Hours
                </dt>
                <dd className="mt-1 text-ink/80">{CONTACT.hours}</dd>
              </div>
            </dl>
          </div>

          <div className="border border-gold/30 overflow-hidden min-h-[320px]">
            <iframe
              title="Location map"
              className="w-full h-full min-h-[320px] grayscale-[15%]"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                CONTACT.mapQuery
              )}&output=embed`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
