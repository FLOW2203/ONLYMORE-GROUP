import React from "react";

type Flow = {
  code: string;
  name: string;
  role: string;
};

type Props = {
  title: string;
  lead?: string;
  flows?: Flow[];
  variant?: "teal" | "gold";
};

const DEFAULT_FLOWS_FR: Flow[] = [
  {
    code: "01",
    name: "Club SAS",
    role: "Accord de franchise CROWNIUM. Gouvernance SAS, contrôle majoritaire club conservé (inspiration Bundesliga 50+1).",
  },
  {
    code: "02",
    name: "SCIC supporters",
    role: "Coopérative des supporters. Capital mutualiste, micro-dividendes, aucun transfert d'actions du club.",
  },
  {
    code: "03",
    name: "COLHYBRI commerce",
    role: "Tissu commerçant local. Digitalisation du caffè sospeso napolitain. Effet multiplicateur x2.5 sur la dépense locale.",
  },
  {
    code: "04",
    name: "ONLYMORE FINANCE",
    role: "Interface bancaire intragroupe. IOBSP ORIAS, exemption L.511-7 CMF. Crédit Lombard, capital patient.",
  },
  {
    code: "05",
    name: "DOJUKU SHINGI",
    role: "Base de pratique et pédagogie intergénérationnelle. Licensing Pay for Play, IP valorisée par PLUMAYA.",
  },
];

export default function FlowsGrid({
  title,
  lead,
  flows,
  variant = "teal",
}: Props) {
  const items = flows || DEFAULT_FLOWS_FR;
  const accent = variant === "gold" ? "text-gold border-gold/40" : "text-teal-light border-teal/40";
  return (
    <section className="py-16 lg:py-24 bg-deep-black border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl text-warm-white mb-4">{title}</h2>
        {lead ? (
          <p className="font-body text-base md:text-lg text-warm-white/60 max-w-3xl mb-10 leading-relaxed">
            {lead}
          </p>
        ) : null}
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((f) => (
            <li key={f.code} className="border border-white/10 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-mono text-sm border rounded px-2 py-0.5 ${accent}`}>{f.code}</span>
                <h3 className="font-display text-lg text-warm-white">{f.name}</h3>
              </div>
              <p className="font-body text-sm text-warm-white/65 leading-relaxed">{f.role}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export { DEFAULT_FLOWS_FR };

export const DEFAULT_FLOWS_EN: Flow[] = [
  {
    code: "01",
    name: "Club SAS",
    role: "CROWNIUM franchise agreement. SAS governance, club majority control retained (Bundesliga 50+1 inspiration).",
  },
  {
    code: "02",
    name: "SCIC supporters",
    role: "Supporter cooperative. Mutualist capital, micro-dividends, no transfer of club shares.",
  },
  {
    code: "03",
    name: "COLHYBRI commerce",
    role: "Local merchant tissue. Digitalization of the Neapolitan caffe sospeso. 2.5x multiplier on local spend.",
  },
  {
    code: "04",
    name: "ONLYMORE FINANCE",
    role: "Intragroup banking interface. IOBSP ORIAS, L.511-7 CMF exemption. Lombard credit, patient capital.",
  },
  {
    code: "05",
    name: "DOJUKU SHINGI",
    role: "Practice base and intergenerational pedagogy. Pay for Play licensing, IP valorized by PLUMAYA.",
  },
];
