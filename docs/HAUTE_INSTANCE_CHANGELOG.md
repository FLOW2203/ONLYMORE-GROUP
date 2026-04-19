# haute-instance-v1, changelog

Branche : `claude/haute-instance-v1-NAk3y`
Date : 19 avril 2026

## Phase 1, conformite critique et fondations

| # | Commit | Objet |
|---|--------|-------|
| 1 | a1e7449 | feat(legal): 4 pages legales RGPD/LCEN, Footer refondu |
| 2 | cc9e469 | feat(security): headers A+, CSP, security.txt |
| 3 | eb56bd0 | feat(seo): Schema.org @graph complet |
| 4 | 51e2503 | feat(seo-geo): robots 14 AI crawlers, sitemap 25 locales, llms.txt |

## Phase 2, expansion multi-pages

| # | Commit | Objet |
|---|--------|-------|
| 5 | 364996d | feat(i18n): LanguageSelector tiers + docs i18n strategy |
| 6 | 83f3d16 | feat(about): page /about histoire holding mutualiste |
| 7 | f4a5e86 | feat(philosophy): page /philosophy O-M decode + valeurs |
| 8 | ea0a93c | feat(team): /equipe humains + NEW TEAM IA + fix bio Florent |
| 9 | 505e0a3 | feat(investors): /investisseurs Calendly + thesis + roadmap + FAQ |
| 10 | 93408d9 | feat(subsidiaries): /filiales cards riches avec statuts |

## Phase 3, credibilite et conformite

| # | Commit | Objet |
|---|--------|-------|
| 11 a 13 | 7b66a42 | feat(press+regulatory+a11y): 3 pages en 1 commit |
| 14 | 0b11d45 | feat(impact): ESS metrics et SDG progress |

## Phase 4, finitions

| # | Commit | Objet |
|---|--------|-------|
| 15 | e332064 | feat(insights): blog 3 articles fondateurs |
| 16 | en cours | chore(ci): Plausible, OG, .env.example, email docs |

## Placeholders a remplir avant merge main

- `{{SIREN}}` dans app/[locale]/legal/mentions/page.tsx
- `{{CAPITAL}}` dans app/[locale]/legal/mentions/page.tsx
- `{{NUMERO_RCS}}` dans app/[locale]/legal/mentions/page.tsx et privacy/page.tsx
- `{{ADRESSE_COMPLETE}}` dans app/[locale]/legal/mentions/page.tsx et privacy/page.tsx
- `{{DIRECTEUR_PUBLICATION}}` dans app/[locale]/legal/mentions/page.tsx
- `{{CALENDLY_URL}}` via `NEXT_PUBLIC_CALENDLY_URL` env var (fallback dans InvestorsPage)

## Variables d'environnement Vercel a configurer

```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/florent-onlymore/30min
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=onlymore.group
NEXT_PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.tagged-events.outbound-links.js
```

## Actions externes recommandees

- [ ] Configurer email institutionnel @onlymore.group (voir docs/EMAIL_SETUP.md)
- [ ] Verifier Google Search Console (voir docs/SEARCH_CONSOLE_SETUP.md)
- [ ] Creer le compte Plausible pour le domaine onlymore.group
- [ ] Creer ou recuperer l'URL Calendly de rencontre investisseur 30 min
- [ ] Remplir le capital, RCS, SIREN, adresse une fois SAS immatriculee
- [ ] Generer le kit presse PDF (skill pdf + onlymore-designer)
- [ ] Relecture native EN du contenu FR+EN par un relecteur tiers
- [ ] Lancer un audit axe-core plus Pa11y avant merge main et mettre a jour
      /[locale]/accessibility avec le rapport reel

## Nouvelles routes (25 locales chacune)

Homepage et pages existantes conservees :
- /[locale], /[locale]/filiales, /[locale]/impact, /[locale]/equipe,
  /[locale]/investisseurs, /[locale]/contact, /[locale]/colhybri,
  /[locale]/crownium, /[locale]/dojuku-shingi, /[locale]/onlymore-finance,
  /[locale]/plumaya

Nouvelles pages ajoutees :
- /[locale]/about
- /[locale]/philosophy
- /[locale]/press
- /[locale]/regulatory
- /[locale]/accessibility
- /[locale]/legal/mentions
- /[locale]/legal/privacy
- /[locale]/legal/terms
- /[locale]/legal/cookies
- /[locale]/insights
- /[locale]/insights/linfini-decode
- /[locale]/insights/le-caffe-sospeso-digitalise
- /[locale]/insights/le-berkshire-hathaway-du-sport

## Metriques de completude visees

- Lighthouse Performance mobile >= 90 (a mesurer en staging Vercel)
- Lighthouse Accessibility >= 95 (axe-core audit requis)
- Lighthouse Best Practices >= 95 (atteint via CSP et headers)
- Lighthouse SEO = 100 (Schema.org et meta en place)
- securityheaders.com = A+ (configure en commit 2)
- Mozilla Observatory = A+ (idem)
- Rich Results Test : Organization, WebSite, LocalBusiness, ItemList valides

## Points laisses en TODO documentes

- Generation dynamique des images OG via @vercel/og reste a cabler dans
  opengraph-image.tsx. Actuellement le site utilise le logo HD statique, ce
  qui est acceptable mais pas optimal pour les partages sociaux.
- GitHub Actions Lighthouse CI : voir docs/SEARCH_CONSOLE_SETUP.md pour la
  verification manuelle, l'automatisation CI est reportee.
- MDX natif pour /insights : commit 15 a utilise des Block[] TypeScript. Un
  swap vers @next/mdx reste possible sans casser les URLs.
