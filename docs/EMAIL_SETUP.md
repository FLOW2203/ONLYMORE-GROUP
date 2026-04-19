# Email setup, onlymore.group

Objectif : disposer de @onlymore.group operationnel avant merge main,
supprimer toute reference publique a onlymore2024@gmail.com.

## 1. Choix du fournisseur

Trois options, ordre de preference :

1. **Google Workspace Business Starter** : 6 EUR/utilisateur/mois, 30 Go, meilleur
   spam filtering, integration Calendly native, SPF et DKIM automatiques.
2. **OVH Mail Pro** : 2 EUR/utilisateur/mois, support FR, hebergement UE,
   SPF et DKIM manuels.
3. **ProtonMail Business** : 9 EUR/utilisateur/mois, chiffrement bout-en-bout,
   positionnement vie privee. Recommande si la com publique met le privacy en avant.

Recommandation : commencer avec Google Workspace (3 mo) pour la velocite, migrer
plus tard si besoin.

## 2. Alias a creer

Un seul utilisateur reel (florent@onlymore.group). Les autres sont des alias
qui redirigent vers florent jusqu'a ce que le volume le justifie.

- florent@onlymore.group (boite principale)
- investors@onlymore.group (alias, prioritaire)
- press@onlymore.group (alias, engagement de reponse 24-48h)
- legal@onlymore.group (alias)
- privacy@onlymore.group (alias, DPO)
- accessibility@onlymore.group (alias)
- security@onlymore.group (alias, vuln disclosure)

## 3. Configuration DNS (Hostinger)

Ajouter dans le panneau DNS `onlymore.group` :

### MX records (Google Workspace)

```
Priorite 1,  Valeur : ASPMX.L.GOOGLE.COM.
Priorite 5,  Valeur : ALT1.ASPMX.L.GOOGLE.COM.
Priorite 5,  Valeur : ALT2.ASPMX.L.GOOGLE.COM.
Priorite 10, Valeur : ALT3.ASPMX.L.GOOGLE.COM.
Priorite 10, Valeur : ALT4.ASPMX.L.GOOGLE.COM.
```

### SPF

```
Type : TXT
Nom  : @
Valeur : v=spf1 include:_spf.google.com ~all
```

### DKIM

Active depuis la console admin Google Workspace, onglet Apps > Google Workspace >
Gmail > Authentification du courrier. Publier la valeur fournie (cle 2048 bits
recommandee) :

```
Type : TXT
Nom  : google._domainkey
Valeur : <v=DKIM1; k=rsa; p=...> fourni par Google
```

### DMARC (obligatoire pour Gmail/Yahoo entrants)

Commencer en politique `none` pendant 2 semaines, puis passer a `quarantine`,
puis `reject` si le reporting est stable.

```
Type : TXT
Nom  : _dmarc
Valeur : v=DMARC1; p=none; rua=mailto:privacy@onlymore.group; ruf=mailto:privacy@onlymore.group; pct=100; adkim=s; aspf=s
```

## 4. Verification

Apres propagation (15 a 60 minutes) :

- Envoyer un mail de test depuis florent@onlymore.group vers gmail personnel
- Verifier `Authentication-Results` dans les en-tetes du mail recu :
  `spf=pass`, `dkim=pass`, `dmarc=pass`
- Tester la delivrabilite via mail-tester.com (cible : 10/10)

## 5. Reconfiguration du site

Une fois @onlymore.group operationnel :

- Confirmer que Footer.tsx pointe bien sur les alias institutionnels (deja fait, commit 1)
- Mettre a jour les docs Google Search Console pour pointer vers le nouveau mail
- Verifier que security.txt pointe vers security@onlymore.group (deja fait)
- Ajouter un lien mailto:florent@onlymore.group sur LinkedIn personnel et ONLYMORE Group LinkedIn

## 6. Migration historique

L'adresse onlymore2024@gmail.com reste en usage interne (git commits,
signatures Vercel/GitHub). Aucune action publique requise. Elle disparait de la
facade publique via le commit 1 (Footer) et le commit 4 (llms.txt).
