"use client";

import { useState } from "react";
import Link from "next/link";
import { PROFILS, Profil } from "@/lib/tunnel";

interface Props {
  locale: string;
  kw?: string;
  src?: string;
  u?: string;
}

const AVEC_CLUB: Profil[] = ["Supporter", "Dirigeant de club", "Élu"];

export default function CercleForm({ locale, kw, src, u }: Props) {
  const [profil, setProfil] = useState<Profil | "">("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [club, setClub] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [next, setNext] = useState<{ path: string; label: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/cercle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, email, profil, club, consent, website, kw, src, u }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setNext({ path: data.path, label: data.label });
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setState("error");
    }
  }

  if (state === "done" && next) {
    return (
      <div className="rounded-2xl border border-teal/40 bg-teal/10 p-8">
        <h2 className="font-display text-3xl font-bold mb-4">Bienvenue dans le Cercle, {prenom} 💪</h2>
        <p className="text-lg text-neutral-gray mb-6">
          Tu viens de sortir de la file. Ton chemin continue ici :
        </p>
        <Link
          href={`/${locale}${next.path}`}
          className="inline-block rounded-full bg-gold px-6 py-3 font-semibold text-deep-black hover:bg-gold-light"
        >
          {next.label} &rarr;
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset>
        <legend className="mb-3 font-semibold">Tu es plutôt :</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PROFILS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setProfil(p)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                profil === p ? "border-gold bg-gold/15" : "border-white/15 hover:border-white/40"
              }`}
              aria-pressed={profil === p}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1 block font-semibold">Prénom</span>
        <input
          required
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3"
          autoComplete="given-name"
        />
      </label>

      <label className="block">
        <span className="mb-1 block font-semibold">E-mail</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3"
          autoComplete="email"
        />
      </label>

      {profil && AVEC_CLUB.includes(profil) && (
        <label className="block">
          <span className="mb-1 block font-semibold">Ton club (facultatif)</span>
          <input
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-transparent px-4 py-3"
          />
        </label>
      )}

      {/* Pot de miel anti-robots */}
      <input
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
        name="website"
      />

      <label className="flex items-start gap-3 text-sm text-neutral-gray">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
          required
        />
        <span>
          J&apos;accepte qu&apos;ONLYMORE Group conserve mon prénom et mon e-mail pour m&apos;envoyer des
          informations sur sa communauté. Désinscription possible à tout moment.{" "}
          <Link href={`/${locale}/legal/privacy`} className="text-teal hover:underline">
            Politique de confidentialité
          </Link>
        </span>
      </label>

      {state === "error" && <p className="text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={!profil || state === "sending"}
        className="rounded-full bg-gold px-8 py-3 font-semibold text-deep-black hover:bg-gold-light disabled:opacity-50"
      >
        {state === "sending" ? "Un instant…" : "Rejoindre le Cercle"}
      </button>
    </form>
  );
}
