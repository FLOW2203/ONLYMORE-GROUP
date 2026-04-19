# I18n strategy, ONLYMORE Group

## Decision
On conserve la stack i18n maison existante (TranslationContext + getTranslations)
plutot que migrer vers next-intl.

### Justification
- Elle fonctionne deja sur 25 locales en production
- Zero dependance externe
- Toutes les pages et composants ont deja leurs t() cables
- Un swap vers next-intl imposerait de reecrire chaque appel t() et la middleware
- Le cout-benefice ne le justifie pas pour une holding, on privilegie la stabilite

### Trade-offs acceptes
- Pas de plural ICU natif (a ajouter si un besoin metier apparait)
- Pas de validation de cles typee au build (a remplacer par un test unitaire si necessaire)
- Le fallback locale non trouve retourne la cle brute (visible en dev, corrige par tests E2E)

## Tiers de langues

### T1 — Francais et anglais
- FR est la langue native, source de verite
- EN est obligatoire et doit etre relu par un natif avant merge main

### T2 — 23 langues additionnelles
- es, pt, de, it, nl, ar, zh, ja, ko, ru, tr, pl, hi, id, vi, th, sv, da, no, fi, el, ro, cs
- Traduites par moteur, non relues
- Fallback systematique vers EN pour toute cle manquante (getNestedValue retourne la cle sinon)
- Pages legales affichent le contenu FR par defaut si la cle locale est absente

## hreflang

- Emis par `buildPageMetadata` dans `lib/seo.ts`
- Toutes les 25 locales listees dans la balise `alternates.languages`
- Canonical pointe vers la version locale courante
- Locales RTL : `ar` uniquement, gere via `isRtl()` dans le layout

## Audit TODO avant go-live T2

- [ ] Relecture EN par un natif (contenu legal + homepage + investor landing)
- [ ] Verifier hreflang via Merkle Schema Markup Validator
- [ ] Tester `dir="rtl"` sur les pages longues arabes (ar)
- [ ] Valider le rendu typographique CJK (zh, ja, ko) avec les polices actuelles
- [ ] Ajouter un test Playwright couvrant le LanguageSelector

## Si migration next-intl un jour

1. Ajouter le package, configurer le plugin
2. Renommer `locales/{lang}.json` en `messages/{lang}.json`
3. Remplacer `useTranslation` par `useTranslations` de next-intl
4. Remplacer `TranslationProvider` par `NextIntlClientProvider`
5. Conserver la structure de cles identique pour minimiser le diff
6. Tester en local puis en staging Vercel avant merge main
