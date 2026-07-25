"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const inputClasses =
  "w-full rounded-md border border-maroon/20 bg-paper px-4 py-2.5 text-ink placeholder:text-ink/40 " +
  "focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors";

const labelClasses = "block text-sm font-medium text-maroon-deep mb-1.5";

export default function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Incorrect email or password.");
      setSubmitting(false);
      return;
    }

    router.refresh();
    router.push(redirectTo);
  }

  return (
    <div className="fade-in-up relative mx-auto w-full max-w-sm">
      <div className="border border-gold/50 bg-paper-deep/60 px-6 py-10 sm:px-10 sm:py-12">
        <div className="text-center mb-8">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
            N L Marriage Hall
          </p>
          <h1 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
            Admin Login
          </h1>
          <div className="ornament-rule mx-auto mt-5 w-32" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={inputClasses}
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
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
