"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { EventType } from "@/types/booking";

const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: "wedding", label: "Wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "reception", label: "Reception" },
  { value: "birthday", label: "Birthday" },
  { value: "corporate", label: "Corporate Event" },
  { value: "other", label: "Other" },
];

const inputClasses =
  "w-full rounded-md border border-maroon/20 bg-paper px-4 py-2.5 text-ink placeholder:text-ink/40 " +
  "focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors";

const labelClasses = "block text-sm font-medium text-maroon-deep mb-1.5";

export default function BookingForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      full_name: String(formData.get("full_name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      event_type: String(formData.get("event_type") ?? "other"),
      event_date: String(formData.get("event_date") ?? ""),
      guests: Number(formData.get("guests") ?? 0),
      special_requests:
        String(formData.get("special_requests") ?? "").trim() || null,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      router.push(`/book/success?id=${data.id}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="fade-in-up relative mx-auto w-full max-w-xl">
      {/* Card */}
      <div className="relative border border-gold/50 bg-paper-deep/60 px-6 py-10 sm:px-10 sm:py-12 shadow-[0_1px_0_0_rgba(201,151,43,0.3)]">
        {/* Corner ornaments */}
        <CornerOrnament className="absolute -left-px -top-px" />
        <CornerOrnament className="absolute -right-px -top-px scale-x-[-1]" />
        <CornerOrnament className="absolute -left-px -bottom-px scale-y-[-1]" />
        <CornerOrnament className="absolute -right-px -bottom-px scale-x-[-1] scale-y-[-1]" />

        <div className="text-center mb-8">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
            N L Marriage Hall &amp; Guest House
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-maroon-deep mt-2">
            Reserve Your Date
          </h1>
          <div className="ornament-rule mx-auto mt-5 w-40" />
          <p className="mt-5 text-ink/70">
            Share a few details and our team will confirm availability with
            you by phone or email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="full_name" className={labelClasses}>
              Full name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              autoComplete="name"
              className={inputClasses}
              placeholder="e.g. Priya Sharma"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inputClasses}
                placeholder="10-digit mobile number"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClasses}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="event_type" className={labelClasses}>
                Event type
              </label>
              <select
                id="event_type"
                name="event_type"
                required
                defaultValue=""
                className={inputClasses}
              >
                <option value="" disabled>
                  Select an event
                </option>
                {EVENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="event_date" className={labelClasses}>
                Event date
              </label>
              <input
                id="event_date"
                name="event_date"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="guests" className={labelClasses}>
              Number of guests
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              required
              className={inputClasses}
              placeholder="e.g. 250"
            />
          </div>

          <div>
            <label htmlFor="special_requests" className={labelClasses}>
              Special requests{" "}
              <span className="text-ink/40 font-normal">(optional)</span>
            </label>
            <textarea
              id="special_requests"
              name="special_requests"
              rows={4}
              className={inputClasses}
              placeholder="Decor preferences, catering needs, accessibility, etc."
            />
          </div>

          {error && (
            <p className="text-sm text-maroon-deep bg-maroon/5 border border-maroon/20 rounded-md px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-maroon text-paper font-medium py-3 tracking-wide
                       hover:bg-maroon-deep transition-colors disabled:opacity-60
                       disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting request…" : "Submit Booking Request"}
          </button>

          <p className="text-center text-xs text-ink/50">
            This confirms nothing yet — our team reviews every request and
            follows up to finalize your booking.
          </p>
        </form>
      </div>
    </div>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="28"
      height="28"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 2 L2 20 M2 2 L20 2"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M2 2 Q 2 16 16 16"
        stroke="var(--color-gold)"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <circle cx="2" cy="2" r="2.5" fill="var(--color-gold)" />
    </svg>
  );
}
