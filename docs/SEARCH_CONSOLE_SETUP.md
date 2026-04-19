# Google Search Console, Bing, IndexNow — setup

Objectif : faire indexer onlymore.group par Google, Bing, et declencher
l'indexation proactive via IndexNow.

## 1. Verification Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter la propriete de type "Domaine" : `onlymore.group`
3. Google propose une chaine TXT a placer sur le DNS.
4. Se connecter sur Hostinger (panneau DNS `onlymore.group`).
5. Ajouter un enregistrement TXT :
   - Nom : `@`
   - Valeur : `google-site-verification=XXXXXXXXXXXXXXXXXXXX` (fourni par Google)
   - TTL : 14400
6. Attendre 10 a 30 minutes la propagation, puis cliquer "Verifier" dans GSC.

## 2. Soumission du sitemap

Une fois la propriete verifiee :
1. Dans GSC, menu "Sitemaps"
2. Soumettre l'URL : `https://onlymore.group/sitemap.xml`
3. Verifier que le statut passe a "Reussite" apres quelques heures.

## 3. Verification Bing Webmaster Tools

1. Aller sur https://www.bing.com/webmasters
2. Ajouter `https://onlymore.group`
3. Option la plus simple : importer la propriete depuis GSC (si deja verifiee cote Google).
4. Sinon, methode DNS TXT similaire.
5. Soumettre le sitemap `https://onlymore.group/sitemap.xml`.

## 4. IndexNow (ping proactif Bing/Yandex/Seznam)

Generer une cle IndexNow (UUID v4) et creer un fichier
`public/{cle}.txt` contenant la cle elle-meme. Puis ping :

```bash
curl "https://api.indexnow.org/indexnow?url=https://onlymore.group/fr&key=<cle>"
```

A automatiser dans un workflow GitHub Actions sur push vers main.

## 5. Ping Google (optionnel, deprecie par Google)

Google a officiellement deprecie l'endpoint `/ping?sitemap=` en 2023. La
soumission via GSC reste la methode officielle. Neanmoins Bing accepte :

```bash
curl "https://www.bing.com/ping?sitemap=https://onlymore.group/sitemap.xml"
```

## 6. Verification du bon fonctionnement

Apres 24 a 72h :
- `site:onlymore.group` doit retourner des resultats
- Tester l'inspection URL dans GSC pour `https://onlymore.group/fr`
- Tester `https://onlymore.group/robots.txt` (doit autoriser GPTBot, ClaudeBot, etc.)
- Tester `https://onlymore.group/sitemap.xml` (doit lister toutes les pages)
- Tester `https://onlymore.group/llms.txt` (doit etre present)
- Tester `https://onlymore.group/.well-known/security.txt`

## 7. Rich Results Test

- https://search.google.com/test/rich-results
- Saisir `https://onlymore.group/fr`
- Valider la presence de : Organization, WebSite, LocalBusiness, ItemList.

## 8. Page Speed Insights

- https://pagespeed.web.dev/report?url=https%3A%2F%2Fonlymore.group%2Ffr
- Viser : Perf mobile >= 90, A11y >= 95, Best Practices >= 95, SEO = 100.
