# Legal transition playbook, pre-Kbis to post-Kbis

Objet : ce document liste exactement ce qui doit changer sur le site
`onlymore.group` le jour ou le Kbis de la SAS ONLYMORE Group est
recu et les numeros officiels attribues.

Il est destine a Florent et a tout membre de la NEW TEAM qui executera
la migration (humain ou Claude sur une nouvelle session).

## Donnees attendues le jour J

Au moment de la reception du Kbis, les informations suivantes seront
disponibles et devront etre recuperees exactement telles qu'elles
figurent sur le document officiel :

- SIREN : 9 chiffres
- RCS, Rodilhan (30230), ressort judiciaire de Nîmes : numero d'immatriculation complet (ex. : "Nîmes B 123 456 789", format officiel du Kbis)
- Capital social : montant en euros (ex. : "1 000 €")
- Date d'immatriculation
- Nom complet et qualite du representant legal
- Adresse complete du siege social (si elle differe de celle declaree actuellement)
- TVA intracommunautaire (souvent attribuee dans la foulee, ex. : "FR76 123456789")

Conserver le Kbis scan dans un dossier `docs/internal/kbis/` (hors git,
ou en git prive) avec horodatage.

## Find & replace a executer (ordre)

### 1. Legal pages, valeurs d'immatriculation

Fichier : `app/[locale]/legal/mentions/page.tsx`

Remplacer le bloc actuel de la section "Editeur du site", qui utilise
des listes avec "en cours d'attribution" / "en cours de constitution",
par les valeurs officielles du Kbis :

```
SIREN: {SIREN_REEL}
Capital social: {CAPITAL_REEL} €
RCS: Rodilhan (30230), ressort judiciaire de Nîmes, B {RCS_REEL}
Siège social: {ADRESSE_REELLE}
Directeur de la publication: Florent Gibert
Forme juridique: SAS
```

Egalement : retirer la phrase `editor_body` qui indique "en cours de
constitution" et "les presentes mentions seront mises a jour". La
remplacer par une version stabilisee :

FR : "Le site onlymore.group est edite par ONLYMORE Group, SAS
immatriculee au Registre du Commerce et des Societes de Nimes sous le
numero {RCS_REEL}, au capital de {CAPITAL_REEL} euros, dont le siege
social est situe {ADRESSE_REELLE}. Directeur de la publication :
Florent Gibert. Contact : contact@onlymore.group."

EN : equivalent avec "ONLYMORE Group, a simplified joint-stock company
(SAS) registered in Rodilhan (30230), Nîmes judicial district, under
number {RCS_REEL}, with a share capital of {CAPITAL_REEL} euros, whose
registered office is located at {ADRESSE_REELLE}."

### 2. Legal pages, controller_body

Fichier : `app/[locale]/legal/privacy/page.tsx` et les cles FR+EN
`legal.privacy.controller_body` dans `locales/fr.json` et
`locales/en.json`.

Remplacer le texte "societe par actions simplifiee (SAS) en cours de
constitution, en cours d'inscription au RCS de Nimes" par "societe par
actions simplifiee (SAS) immatriculee au RCS de Nimes sous le numero
{RCS_REEL}" (FR) et l'equivalent EN.

### 3. Schema.org Organization

Fichier : `lib/seo.ts`, fonction `getOrganizationSchema()`.

Remettre `legalName: "ONLYMORE Group"` vers `legalName: "ONLYMORE
Group SAS"` une fois l'immatriculation effective.

Ajouter deux champs a Organization :
- `taxID: "{SIREN_REEL}"` (SIREN sans espaces)
- `vatID: "{TVA_INTRA}"` (ex. : "FR76123456789")

Ces champs sont conventionnels Schema.org et sont lus par le Knowledge
Graph et le registre Bing Webmaster.

### 4. AI plugin manifest

Fichier : `public/.well-known/ai-plugin.json`.

Ajouter dans `description_for_model` apres "Rodilhan (30230),
Occitanie, founded 2023 by Florent Gibert." la phrase : "Registered in
Rodilhan (30230), Nîmes judicial district, under number {RCS_REEL},
share capital {CAPITAL_REEL} EUR."

### 5. llms.txt et llms-full.txt

Fichiers : `public/llms.txt` et `public/llms-full.txt`.

Dans les sections "About" (llms.txt) et "01. DOCTRINE V2" (llms-full),
ajouter une phrase factuelle : "ONLYMORE Group SAS is registered in
Rodilhan (30230), Nîmes judicial district, under number {RCS_REEL},
share capital {CAPITAL_REEL} EUR." Cela devient de la donnee
structurelle citable par les LLM.

### 6. Footer (si exposition nominale)

Fichier : `components/Footer.tsx`.

Le Footer ne montre actuellement aucun identifiant legal. C'est le
comportement souhaite. Ne rien modifier.

## Search pattern de securite (grep avant commit)

Avant de commit la migration, executer :

```bash
grep -rn "en cours d'attribution" app/ components/ locales/
grep -rn "en cours de constitution" app/ components/ locales/
grep -rn "en cours d'inscription" app/ components/ locales/
grep -rn "currently being incorporated" app/ components/ locales/
grep -rn "in the process of being registered" app/ components/ locales/
```

Chacune de ces commandes doit retourner 0 ligne une fois la migration
terminee. Sinon, c'est qu'un endroit non documente ici utilise encore
le vocabulaire pre-immatriculation.

## Tests de recette post-migration

- /fr/legal/mentions affiche le SIREN et le numero RCS reel
- /en/legal/mentions idem, version anglaise
- /fr/legal/privacy affiche le controller_body stabilise
- Rich Results Test de https://onlymore.group/fr : Organization contient
  `taxID` et `vatID` valides
- curl https://onlymore.group/llms.txt contient la ligne factuelle RCS
- Aucun placeholder `{{...}}` ou phrase "en cours" ne subsiste dans
  le HTML rendu des pages legales

## Commit de migration, convention de message

Message de commit attendu :

```
chore(legal): post-Kbis migration, replace pre-incorporation values

- SIREN: {SIREN_REEL}
- RCS: Rodilhan (30230), ressort judiciaire de Nîmes, B {RCS_REEL}
- Capital: {CAPITAL_REEL} EUR
- Legal form stabilized to SAS ONLYMORE Group

Update legal/mentions editor block, legal/privacy controller body,
Schema.org Organization legalName + taxID + vatID, llms.txt and
llms-full.txt RCS reference, ai-plugin.json description.
```

## Actions a faire en meme temps, hors code

- Mettre a jour la page LinkedIn Company ONLYMORE Group avec le numero
  SIREN et la forme juridique stabilisee
- Actualiser Crunchbase, PitchBook, France Active, BGE Nimes et
  Winvesty avec le Kbis si deja referencee
- Demander a Stripe / Calendly / Plausible / Google Workspace une
  mise a jour de la raison sociale sur les factures
- Rafraichir Google Search Console : reindexer /fr/legal/mentions et
  /en/legal/mentions manuellement apres push
