# GOAT AME CITY activation, Supabase + Turnstile TODO

Objet : ce document liste precisement ce qu'il faut pour activer la
collecte des signatures du manifeste en production et faire passer
l'API `/api/concours/engage` de "stub qui log" a "backend complet avec
leaderboard public".

A executer dans une session Claude Code dediee, une fois que Florent
a cree les comptes Supabase et Cloudflare Turnstile.

## 1. Comptes et projets a creer

- **Supabase** : projet `onlymore-group-prod`, region `eu-west-3` Paris
  (coherent avec Vercel hosting et RGPD)
- **Cloudflare Turnstile** : widget pour `onlymore.group`, mode
  managed, langue auto
- **Upstash Redis (optionnel)** : instance `onlymore-rate` region EU
  pour remplacer le rate limiter in-memory actuel

## 2. Schema SQL Supabase

Executer dans SQL Editor du projet :

```sql
-- Table principale
create table public.goat_ame_engagements (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text not null,
  city text not null,
  country char(5) not null,
  rgpd_consent boolean not null default false,
  ip_hash text,
  user_agent text,
  created_at timestamptz not null default now(),
  unique(email)
);

-- Index pour leaderboard
create index idx_engagements_city_country
  on public.goat_ame_engagements (country, city);

create index idx_engagements_created_at
  on public.goat_ame_engagements (created_at desc);

-- Vue materialisee leaderboard
create materialized view public.city_leaderboard as
select
  country,
  city,
  count(*) as points,
  max(created_at) as latest_at
from public.goat_ame_engagements
group by country, city
order by points desc, latest_at desc;

create unique index idx_city_leaderboard_key
  on public.city_leaderboard (country, city);
```

## 3. Row Level Security

```sql
alter table public.goat_ame_engagements enable row level security;

-- Insertion via service_role uniquement (backend Next.js)
create policy "service_role inserts only"
  on public.goat_ame_engagements
  for insert
  to service_role
  with check (true);

-- Lecture publique anonymisee via la vue
grant select on public.city_leaderboard to anon;
```

## 4. Variables d'environnement Vercel

Ajouter dans le dashboard Vercel, scope Production et Preview :

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ... (secret, never client)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
TURNSTILE_SITEKEY=0x4... (public, OK cote client)
TURNSTILE_SECRET=0x4... (secret)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

Ajouter les 2 premiers aussi dans `.env.example` apres activation.

## 5. Cote code, migrations a appliquer

### 5.1 API route `/app/api/concours/engage/route.ts`

Remplacer la section marquee `TODO(@florent)` par :

```typescript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

// Apres validation Turnstile OK
const { error } = await supabase
  .from("goat_ame_engagements")
  .insert({
    email: parsed.data.email,
    first_name: parsed.data.firstName,
    city: parsed.data.city,
    country: parsed.data.country,
    rgpd_consent: parsed.data.rgpd,
    ip_hash: hashIp(ip),
    user_agent: req.headers.get("user-agent") || null,
  });

if (error) {
  if (error.code === "23505") {
    // unique email violation, return idempotent success
    return NextResponse.json({ success: true, duplicate: true });
  }
  console.error("[concours.engage] supabase error", error);
  return NextResponse.json({ error: "persist failed" }, { status: 500 });
}
```

Ajouter la validation Turnstile avant l'insert :

```typescript
const tsToken = body?.turnstileToken;
const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET!,
    response: tsToken,
    remoteip: ip,
  }),
});
const tsJson = await tsRes.json();
if (!tsJson.success) {
  return NextResponse.json({ error: "turnstile failed" }, { status: 400 });
}
```

### 5.2 Schema Zod

Etendre `EngagementSchema` dans `components/EngagementForm.tsx` et
dans la route avec `turnstileToken: z.string().min(10)`.

### 5.3 Composant `EngagementForm.tsx`

Ajouter le widget Turnstile :

```tsx
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// Script async Cloudflare + widget render programmatique
// Renvoie le token dans un input hidden name="turnstileToken"
```

### 5.4 Rate limiter

Remplacer le `Map<string, RateEntry>` in-memory par Upstash Redis :

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

const { success } = await ratelimit.limit(`engage:${ip}`);
if (!success) return NextResponse.json({ error: "rate limit" }, { status: 429 });
```

## 6. Leaderboard public

Creer une nouvelle route `/app/api/concours/leaderboard/route.ts` qui
renvoie le top 50 par pays :

```typescript
export async function GET(req: NextRequest) {
  const country = req.nextUrl.searchParams.get("country") || "ALL";
  const q = supabase.from("city_leaderboard").select("*").limit(50);
  if (country !== "ALL") q.eq("country", country);
  const { data } = await q;
  return NextResponse.json({ cities: data || [] });
}
```

Ajouter dans `/app/[locale]/concours/page.tsx` un composant
`<LeaderboardTable />` qui fetch au mount.

## 7. Cron regeneration

Via Vercel Cron ou GitHub Actions, rafraichir la vue materialisee
toutes les 10 minutes :

```yaml
# .github/workflows/leaderboard-refresh.yml
on:
  schedule: [{ cron: "*/10 * * * *" }]
jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST "$SUPABASE_URL/rest/v1/rpc/refresh_leaderboard" \
            -H "apikey: $SUPABASE_SERVICE_ROLE_KEY"
```

Avec en SQL :

```sql
create or replace function public.refresh_leaderboard()
returns void language sql as $$
  refresh materialized view concurrently public.city_leaderboard;
$$;
```

## 8. RGPD

- Ajouter dans `/app/[locale]/legal/privacy` une section "Concours
  GOAT AME CITY" precisant les donnees collectees (email, prenom,
  ville, pays, IP hashee, user-agent), la finalite (scoring concours
  + mises a jour concours uniquement), la duree (efface apres la fin
  du concours 2026 sauf desinscription preference)
- Envoi d'un email de confirmation double opt-in apres signature
- Fournir un lien d'unsubscribe dans chaque email
- Mettre a jour `/llms.txt` section Contact en ajoutant concours@onlymore.group

## 9. Tests de recette post-activation

- [ ] Signer le manifeste depuis un device reel : engagement en base
- [ ] Signer deux fois avec le meme email : 200 success duplicate=true
- [ ] 6 signatures depuis la meme IP : la 6eme retourne 429
- [ ] Requete sans origin match : 403
- [ ] Requete Turnstile invalide : 400
- [ ] Leaderboard GET all : liste triee par points desc
- [ ] Leaderboard GET country=FR : filtre applique
- [ ] Cron refresh s'execute : vue materialisee rafraichie

## 10. Ordre d'execution recommande

1. Creer comptes Supabase + Turnstile + Upstash
2. Executer le SQL Supabase (sections 2 et 3)
3. Ajouter les env vars Vercel (section 4)
4. Modifier route + form pour Turnstile (sections 5.1, 5.2, 5.3)
5. Brancher Supabase (section 5.1 suite)
6. Remplacer rate limiter (section 5.4)
7. Ajouter leaderboard GET + widget front (section 6)
8. Activer le cron (section 7)
9. Mettre a jour RGPD (section 8)
10. Recette complete (section 9)

A ce stade, la collecte des signatures est live et le leaderboard
public tourne.
