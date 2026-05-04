# gstack — Install global ONLYMORE Group

## Méta

- **Date d'install** : 2026-05-04 22:20 CEST (Europe/Paris)
- **Auteur** : Florent Gibert (CEO, ONLYMORE Group)
- **Branche** : `claude/install-gstack-global-6XpYd`
- **Source** : <https://github.com/garrytan/gstack>
- **gstack version** : `1.26.3.0`
- **gstack commit** : `db9447c3339950bb0506c547e5b3225f5def3854`
- **Scope d'install** : global (`~/.claude/skills/gstack/`) — pas team mode
- **Flag `--prefix`** : ACTIF — tous les skills namespaced `gstack-*` (zéro collision)

## Comptage

| Indicateur                 | Valeur |
|----------------------------|--------|
| Skills custom avant        | 1      |
| Skills total après         | 48     |
| Symlinks `gstack-*` créés  | 46     |
| Custom préservés           | 1 (intact) |
| Custom disparus            | 0      |
| Delta net                  | +47 (+46 symlinks + dossier source `gstack/`) |

> Note divergence vs prompt initial : le prompt anticipait 23 skills et 135+ custom existants. La réalité de l'environnement est 46 skills gstack (gstack a grossi) et 1 seul custom (`session-start-hook`).

## Skills `gstack-*` installés (46)

```
gstack-autoplan
gstack-benchmark
gstack-benchmark-models
gstack-browse
gstack-canary
gstack-careful
gstack-codex
gstack-connect-chrome
gstack-context-restore
gstack-context-save
gstack-cso
gstack-design-consultation
gstack-design-html
gstack-design-review
gstack-design-shotgun
gstack-devex-review
gstack-document-release
gstack-freeze
gstack-guard
gstack-health
gstack-investigate
gstack-land-and-deploy
gstack-landing-report
gstack-learn
gstack-make-pdf
gstack-office-hours
gstack-open-gstack-browser
gstack-pair-agent
gstack-plan-ceo-review
gstack-plan-design-review
gstack-plan-devex-review
gstack-plan-eng-review
gstack-plan-tune
gstack-qa
gstack-qa-only
gstack-retro
gstack-review
gstack-scrape
gstack-setup-browser-cookies
gstack-setup-deploy
gstack-setup-gbrain
gstack-ship
gstack-skillify
gstack-sync-gbrain
gstack-unfreeze
gstack-upgrade
```

## Caveat runtime — Playwright Chromium NON installé

Le sandbox de cet environnement bloque le téléchargement de Chromium depuis `cdn.playwright.dev` (HTTP 403, "Host not in allowlist"). Pour débloquer l'install, le check `ensure_playwright_browser` du `setup` a été contourné via la variable `GSTACK_SKIP_BROWSER=1`.

**Conséquences runtime :**

- ✅ Skills sans navigateur fonctionnels : `gstack-plan-ceo-review`, `gstack-plan-eng-review`, `gstack-plan-design-review`, `gstack-plan-devex-review`, `gstack-review`, `gstack-cso`, `gstack-investigate`, `gstack-office-hours`, `gstack-autoplan`, `gstack-codex`, `gstack-context-save`, `gstack-context-restore`, `gstack-careful`, `gstack-freeze`, `gstack-guard`, `gstack-unfreeze`, `gstack-learn`, `gstack-retro`, `gstack-document-release`, `gstack-skillify`, `gstack-make-pdf`, `gstack-setup-deploy`, `gstack-setup-gbrain`, `gstack-sync-gbrain`, `gstack-upgrade`, `gstack-plan-tune`, `gstack-pair-agent`, `gstack-health`, `gstack-benchmark-models`, `gstack-landing-report`, `gstack-ship`, `gstack-land-and-deploy`.
- ❌ Skills navigateur cassés tant que Chromium n'est pas installé : `gstack-browse`, `gstack-qa`, `gstack-qa-only`, `gstack-design-review`, `gstack-design-shotgun`, `gstack-design-html`, `gstack-design-consultation`, `gstack-canary`, `gstack-benchmark`, `gstack-scrape`, `gstack-devex-review`, `gstack-setup-browser-cookies`, `gstack-open-gstack-browser`, `gstack-connect-chrome`.

**Pour activer le navigateur dans un environnement réseau ouvert** :

```bash
cd ~/.claude/skills/gstack && bunx playwright install chromium
# Puis vérifier :
bun --eval 'import { chromium } from "playwright"; const b = await chromium.launch(); await b.close();'
```

Une fois Chromium installé, retirer la modif locale du `setup` (l'early-return sur `GSTACK_SKIP_BROWSER`) si on veut un setup propre, ou laisser comme escape hatch documenté.

## Patch appliqué localement au `setup` gstack

Modification minimale, réversible, pour permettre le skip du check browser sous sandbox :

```diff
 ensure_playwright_browser() {
+  if [ "${GSTACK_SKIP_BROWSER:-0}" = "1" ]; then
+    return 0
+  fi
   if [ "$IS_WINDOWS" -eq 1 ]; then
```

Cette modif est **dans le clone gstack uniquement** (`~/.claude/skills/gstack/setup`) — pas dans ce repo. Elle saute si `gstack-upgrade` ou un re-clone est lancé.

## Procédure rollback

Backup atomique pris avant install :

```bash
rm -rf ~/.claude
mv ~/.claude.backup-20260504-201534 ~/.claude
```

Cette opération restaure l'état exact pré-install (1 skill `session-start-hook`, zéro `gstack`).

## Prochaines étapes recommandées

1. **Tester un skill no-browser** pour valider l'install : `/gstack-office-hours` ou `/gstack-plan-ceo-review`.
2. **Décider du browser** : soit allowlister `cdn.playwright.dev` dans la sandbox (chemin propre), soit accepter que les 14 skills navigateur soient inactifs en dev.
3. **Phase team mode** (à valider après run réussi en solo) : relancer `./setup --team` pour vendorer gstack dans `.claude/skills/gstack/` du repo et le partager avec collaborateurs/agents futurs.
