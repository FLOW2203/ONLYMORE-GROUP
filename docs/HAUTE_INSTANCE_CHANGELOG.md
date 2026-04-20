# haute-instance-v1, changelog

Branche : `claude/haute-instance-v1-NAk3y`
Date : 19-20 avril 2026
Statut : 24 commits, build vert a chaque etape, pret pour review a froid

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

## Phase 4, blog + analytics

| # | Commit | Objet |
|---|--------|-------|
| 15 | e332064 | feat(insights): blog 3 articles fondateurs |
| 16 | 7806c54 | chore(ops): Plausible + OG + email/changelog docs |

## Addendum referencement SEO + GEO

| # | Commit | Objet |
|---|--------|-------|
| 17 | 688de0b | feat(seo+geo): doctrine v2 dans Schema.org + llms.txt (cellule ESS, labels, contest) |
| 18 | 0bb0ed4 | feat(seo+geo): sitemap xhtml:link hreflang x25 + llms-full.txt + ai-plugin.json |
| 19 | 25b9777 | feat(og): OG images dynamiques Edge (root + about + philosophy + investisseurs + press) |
| 20 | 26cacb6 | feat(geo): corpus /docs Markdown (doctrine-v2, ess-industrial-cell, five-flows, labels, index) |

## Filler legal pre-immatriculation

| # | Commit | Objet |
|---|--------|-------|
| 21 | 20af216 | chore(legal): fill placeholders with pre-incorporation values + transition doc |

## Addendum labels territoriaux et concours

| # | Commit | Objet |
|---|--------|-------|
| 22 | 8dd5d19 | feat(labels): 2 twin territorial labels pages + FlowsGrid shared component |
| 23 | 0110705 | feat(concours): GOAT AME CITY 2026 page + manifesto form + API + activation TODO |
| 24 | c02c820 | chore(nav): Header dropdown + Footer column + homepage teaser + philosophy/impact links |

## Nouvelles routes publiees (25 locales chacune, sauf indication)

Homepage et pages existantes conservees :
- /[locale], /[locale]/filiales, /[locale]/impact, /[locale]/equipe,
  /[locale]/investisseurs, /[locale]/contact, /[locale]/colhybri,
  /[locale]/crownium, /[locale]/dojuku-shingi, /[locale]/onlymore-finance,
  /[locale]/plumaya

Nouvelles pages institutionnelles :
- /[locale]/about
- /[locale]/philosophy
- /[locale]/press
- /[locale]/regulatory
- /[locale]/accessibility
- /[locale]/legal/{mentions,privacy,terms,cookies}
- /[locale]/insights (+ 3 articles)
- /[locale]/labels/colhybri-city
- /[locale]/labels/goat-ame-city
- /[locale]/concours
- /api/concours/engage (API Route, stub Supabase/Turnstile)

## Placeholders, etat final

Les 5 placeholders legaux ont ete remplis avec valeurs
pre-immatriculation (voir `docs/LEGAL_TRANSITION.md` pour la migration
post-Kbis) :

- SIREN : "en cours d'attribution"
- Capital : "en cours de constitution"
- RCS : "en cours d'inscription au RCS de Nîmes"
- Adresse : "Rodilhan (30230), Occitanie, France"
- Directeur de la publication : "Florent Gibert"

Reste a fournir :
- `{{CALENDLY_URL}}` via `NEXT_PUBLIC_CALENDLY_URL` (fallback en dur sur le string litteral "{{CALENDLY_URL}}" dans InvestorsPage)

## Variables d'environnement Vercel a configurer

Actives des aujourd'hui pour faire fonctionner le site tel quel :
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/florent-onlymore/30min
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=onlymore.group
NEXT_PUBLIC_PLAUSIBLE_SRC=https://plausible.io/js/script.tagged-events.outbound-links.js
```

A ajouter en session dediee pour activer le formulaire /concours en prod
(voir `docs/GOAT_AME_CITY_ACTIVATION_TODO.md`) :
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
TURNSTILE_SITEKEY=
TURNSTILE_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Tant que ces 8 vars Supabase/Turnstile/Upstash ne sont pas ajoutees, la
route `/api/concours/engage` tourne en mode stub : validation Zod OK,
rate-limit in-memory 5/h/IP, console.log, reponse `{success: true,
todo: "wire Supabase + Turnstile in next session"}`.

## Actions externes recommandees avant merge main

- [ ] Configurer email institutionnel @onlymore.group (voir docs/EMAIL_SETUP.md)
- [ ] Verifier Google Search Console + Bing Webmaster (voir docs/SEARCH_CONSOLE_SETUP.md)
- [ ] Creer le compte Plausible pour le domaine onlymore.group
- [ ] Creer ou recuperer l'URL Calendly rencontre investisseur 30 min
- [ ] Generer le kit presse PDF (skill pdf + onlymore-designer)
- [ ] Relecture native EN du contenu FR+EN par un relecteur tiers
- [ ] Lancer un audit axe-core plus Pa11y et mettre a jour /[locale]/accessibility
- [ ] Activer Supabase + Turnstile + Upstash pour /concours (voir docs/GOAT_AME_CITY_ACTIVATION_TODO.md)

## Metriques de completude visees

- Lighthouse Performance mobile >= 90
- Lighthouse Accessibility >= 95
- Lighthouse Best Practices >= 95
- Lighthouse SEO = 100
- securityheaders.com = A+ (configure en commit 2)
- Mozilla Observatory = A+ (idem)
- Rich Results Test : Organization, WebSite, LocalBusiness, ItemList,
  CreativeWork x2 (labels), Event (Detroit), Article x3 (insights) valides

## Points laisses en TODO documentes

- GitHub Actions Lighthouse CI : verification manuelle pour l'instant,
  automatisation CI reportee (voir docs/SEARCH_CONSOLE_SETUP.md)
- MDX natif pour /insights : commit 15 a utilise des Block[] TypeScript,
  swap vers @next/mdx possible sans casser les URLs
- Activation complete du formulaire /concours : Supabase + Turnstile +
  Upstash Redis + leaderboard public + cron refresh (voir
  `docs/GOAT_AME_CITY_ACTIVATION_TODO.md` pour le playbook 10 sections)
- Migration post-Kbis : remplacement des valeurs "en cours de
  constitution" par les numeros officiels SIREN/RCS/capital (voir
  `docs/LEGAL_TRANSITION.md` pour les find/replace exacts)
- OG images dynamiques : cablees pour 5 pages cles (root, about,
  philosophy, investisseurs, press). Extension aux 15 autres pages
  institutionnelles possible en session dediee
