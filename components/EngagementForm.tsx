"use client";

import { useState } from "react";
import { z } from "zod";

const ISO_COUNTRIES: { code: string; nameFr: string; nameEn: string }[] = [
  { code: "FR", nameFr: "France", nameEn: "France" },
  { code: "US", nameFr: "Etats-Unis", nameEn: "United States" },
  { code: "CA", nameFr: "Canada", nameEn: "Canada" },
  { code: "GB", nameFr: "Royaume-Uni", nameEn: "United Kingdom" },
  { code: "IE", nameFr: "Irlande", nameEn: "Ireland" },
  { code: "BE", nameFr: "Belgique", nameEn: "Belgium" },
  { code: "LU", nameFr: "Luxembourg", nameEn: "Luxembourg" },
  { code: "CH", nameFr: "Suisse", nameEn: "Switzerland" },
  { code: "DE", nameFr: "Allemagne", nameEn: "Germany" },
  { code: "IT", nameFr: "Italie", nameEn: "Italy" },
  { code: "ES", nameFr: "Espagne", nameEn: "Spain" },
  { code: "PT", nameFr: "Portugal", nameEn: "Portugal" },
  { code: "NL", nameFr: "Pays-Bas", nameEn: "Netherlands" },
  { code: "AU", nameFr: "Australie", nameEn: "Australia" },
  { code: "NZ", nameFr: "Nouvelle-Zelande", nameEn: "New Zealand" },
  { code: "OTHER", nameFr: "Autre", nameEn: "Other" },
];

export const EngagementSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  rgpd: z.literal(true),
});

type Props = { locale: "fr" | "en" };

type Status = "idle" | "submitting" | "success" | "error";

export default function EngagementForm({ locale }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const isEn = locale === "en";

  const labels = {
    email: isEn ? "Email" : "Adresse e-mail",
    firstName: isEn ? "First name" : "Prenom",
    city: isEn ? "City" : "Ville",
    country: isEn ? "Country" : "Pays",
    rgpd: isEn
      ? "I accept that my email will only be used to receive contest updates from ONLYMORE Group. I can unsubscribe at any time."
      : "J'accepte que mon email soit utilise uniquement pour recevoir les mises a jour du concours ONLYMORE Group. Je peux me desinscrire a tout moment.",
    submit: isEn ? "Sign the manifesto" : "Signer le manifeste",
    submitting: isEn ? "Sending..." : "Envoi...",
    success: isEn
      ? "Manifesto signed. Your city has earned a point. We will reach out with contest updates."
      : "Manifeste signe. Votre ville a gagne un point. Nous reviendrons vers vous avec les mises a jour du concours.",
    error: isEn
      ? "Something went wrong. Please check the form and try again."
      : "Une erreur s'est produite. Merci de verifier le formulaire et de reessayer.",
    countryPlaceholder: isEn ? "Select a country" : "Choisir un pays",
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: String(data.get("email") || "").trim(),
      firstName: String(data.get("firstName") || "").trim(),
      city: String(data.get("city") || "").trim(),
      country: String(data.get("country") || "").trim(),
      rgpd: data.get("rgpd") === "on",
    };
    const parsed = EngagementSchema.safeParse(payload);
    if (!parsed.success) {
      setError(labels.error);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/concours/engage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setError(labels.error);
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError(labels.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-gold/40 bg-gold/5 rounded-lg p-6 font-body text-warm-white"
      >
        <p className="text-base leading-relaxed">{labels.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 font-body">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2 text-sm text-warm-white/70">
          <span>{labels.firstName}</span>
          <input
            type="text"
            name="firstName"
            required
            minLength={2}
            className="px-3 py-2 rounded-md bg-white/5 border border-white/15 text-warm-white focus:outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-warm-white/70">
          <span>{labels.email}</span>
          <input
            type="email"
            name="email"
            required
            className="px-3 py-2 rounded-md bg-white/5 border border-white/15 text-warm-white focus:outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-warm-white/70">
          <span>{labels.city}</span>
          <input
            type="text"
            name="city"
            required
            minLength={2}
            autoComplete="address-level2"
            className="px-3 py-2 rounded-md bg-white/5 border border-white/15 text-warm-white focus:outline-none focus:border-gold"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-warm-white/70">
          <span>{labels.country}</span>
          <select
            name="country"
            required
            defaultValue=""
            className="px-3 py-2 rounded-md bg-white/5 border border-white/15 text-warm-white focus:outline-none focus:border-gold"
          >
            <option value="" disabled>
              {labels.countryPlaceholder}
            </option>
            {ISO_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {isEn ? c.nameEn : c.nameFr}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-warm-white/70">
        <input
          type="checkbox"
          name="rgpd"
          required
          className="mt-1 w-4 h-4 accent-gold"
        />
        <span className="leading-relaxed">{labels.rgpd}</span>
      </label>

      {error ? (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-block px-6 py-3 bg-gold text-deep-black font-body font-medium hover:bg-gold/90 transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
