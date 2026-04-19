export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export const articles: Record<string, Block[]> = {
  "linfini-decode": [
    { type: "p", text: "Un logo n'est pas un ornement. C'est la premiere these d'une marque, compressee en une forme. Chez ONLYMORE Group, la lemniscate n'est pas un choix esthetique, c'est un argument narratif." },
    { type: "h2", text: "Deux lettres, un circuit" },
    { type: "p", text: "O et M. Le O ferme, le M ouvre. ONLY et MORE : le minimum necessaire (ONLY), l'extension raisonnee (MORE). Ensemble, les deux glyphes composent une lemniscate, c'est-a-dire un huit horizontal, symbole mathematique de l'infini." },
    { type: "p", text: "Cette lemniscate n'est pas decorative. Elle reproduit visuellement la circulation monetaire mutualiste : un capital injecte dans un territoire, qui revient, qui repart, qui revient encore, sans jamais fuir hors du systeme. Le O comme boucle fermee, le M comme moteur central." },
    { type: "h2", text: "Un signe, trois siecles" },
    { type: "p", text: "Le logo compresse trois heritages. D'abord, les 220 annees du mutualisme francais depuis la premiere societe de secours mutuel autorisee en 1806. Ensuite, les 138 annees du football professionnel anglais depuis la creation de la Football League le 17 avril 1888, qui a fait du sport de competition une economie affective collective. Enfin, les 60 annees du float model depuis que Warren Buffett a transforme Berkshire Hathaway en 1965 : un capital patient, un flux qui travaille en silence pendant des decennies." },
    { type: "p", text: "Trois traditions independantes, trois siecles superposes, un seul glyphe. La lemniscate est l'intersection ou ces traditions s'entrelacent." },
    { type: "h2", text: "Quatre niveaux de lecture" },
    { type: "p", text: "Un bon logo doit tenir plusieurs lectures simultanees sans se contredire." },
    { type: "p", text: "Niveau 1, premium. A premier regard, la typographie Playfair, la sobriete, le centrage classique signalent une marque institutionnelle. L'oeil la classe : haute instance, pas startup." },
    { type: "p", text: "Niveau 2, lettres. O et M. ONLY et MORE. Deux piliers. Le minimum indispensable. Le ras du suffisant. La philosophie anti-gaspillage." },
    { type: "p", text: "Niveau 3, mecanisme. Le O devient circuit ferme, le M devient moteur. L'energie circule sans fuite : metaphore directe du capital local qui reste sur le territoire." },
    { type: "p", text: "Niveau 4, philosophie. Pas de debut, pas de fin. L'infini lemniscatique. Une infrastructure concue pour durer au-dela des cycles, au-dela des fondateurs." },
    { type: "h2", text: "Pourquoi la sobriete" },
    { type: "p", text: "La plupart des marques fintech tentent la complexite visuelle pour signaler l'innovation. ONLYMORE Group inverse. Une marque qui porte une these mutualiste sur 30 ans doit ressembler a un bien public : sobre, clair, indiscutable. La sobriete du logo ONLYMORE n'est pas un dessin simple, c'est un positionnement." },
    { type: "quote", text: "Un logo reussi, c'est une these qu'on n'a plus besoin d'expliquer." },
    { type: "p", text: "Chaque fois qu'un interlocuteur nous demande ce que represente le logo, nous repondons qu'il represente exactement ce que fait le groupe. La reponse est circulaire, volontairement : c'est le principe meme du float mutualiste." },
  ],

  "le-caffe-sospeso-digitalise": [
    { type: "p", text: "Naples, debut du XIXe siecle. Dans les cafes populaires, une tradition s'installe sans qu'aucune regle ne la code. Un client commande deux cafes, n'en boit qu'un, laisse le second paye a disposition. Un passant sans le sou peut entrer, demander si un cafe sospeso est disponible, et s'il l'est, le consommer sans avoir a justifier sa situation." },
    { type: "h2", text: "Une mecanique invisible" },
    { type: "p", text: "Le cafe suspendu fonctionne sur trois principes. Premier, l'asymetrie temporelle : le donateur paie maintenant, le beneficiaire consomme plus tard. Deuxieme, l'anonymat double : le donateur n'identifie pas le beneficiaire, le beneficiaire n'identifie pas le donateur. Troisieme, l'absence d'intermediaire : le cafetier n'est pas une ONG, il encaisse un cafe et il en sert un autre, sans reportage ni communication." },
    { type: "p", text: "La solidarite circule sans s'ebruiter. Elle se materialise dans le geste quotidien, pas dans un acte de vertu ostentatoire. Ce modele a survecu deux siecles parce qu'il respecte la dignite de celui qui recoit." },
    { type: "h2", text: "De Naples a l'Occitanie" },
    { type: "p", text: "COLHYBRI, filiale operationnelle d'ONLYMORE Group, transpose le principe. La plateforme permet a un commercant local de proposer trois niveaux d'abonnement (3, 10 ou 15 euros par mois) a ses clients fideles. Une fraction de chaque abonnement alimente une reserve solidaire mutualisee, accessible selon des criteres transparents a des beneficiaires identifies par les structures sociales locales." },
    { type: "p", text: "Le commercant n'a pas besoin de devenir philanthrope. Il rajoute un produit a son catalogue. Le client n'a pas besoin de militer. Il soutient son boulanger, son cafetier, son libraire. La mutualisation se fait en arriere-plan, dans un tableau de bord que le commercant n'a pas a presenter." },
    { type: "h2", text: "Le don sans trace" },
    { type: "p", text: "Une question se pose. Un cafe suspendu digitalise n'est-il pas trace, donc surveille ?" },
    { type: "p", text: "COLHYBRI resout le paradoxe en pseudonymisant systematiquement les beneficiaires. Le commercant voit des metriques agregees (10 cafes suspendus servis ce mois). L'administrateur de la plateforme voit des flux statistiques. Personne ne voit Madame Dupont entrant reclamer un cafe. La dignite reste entiere, la tracabilite reste comptable." },
    { type: "p", text: "Cette architecture n'est pas une amelioration de la charite. C'est une maintenance d'un outil de solidarite populaire qui existait deja, et qui perdait sa ville a mesure que les cafes de quartier fermaient." },
    { type: "h2", text: "Pourquoi le sport, aussi" },
    { type: "p", text: "Le meme principe structure CROWNIUM. Une place au stade achetee mutualise un financement pour le club via le compte courant d'associe mutualiste. L'abonnement d'un supporter, dissout dans le flux, contribue au fonctionnement du club comme une goutte parmi d'autres. Personne ne sait si son euro a finance le transfert d'un joueur, la renovation d'un vestiaire ou la bourse d'un centre de formation. Cette opacite est voulue : elle est le contraire de la transparence activiste, elle est la dignite du flux." },
    { type: "quote", text: "La philanthropie ne paraissait jadis possible qu'aux extremes. ONLYMORE la reintegre au ras du quotidien." },
    { type: "p", text: "Le cafe suspendu n'a jamais ete un acte de riches. C'etait un acte d'habitues. Chacun payait un peu plus de temps en temps, sans plan, sans comite, sans reseau social. COLHYBRI vise a restaurer cette dynamique : pas un geste, une habitude." },
  ],

  "le-berkshire-hathaway-du-sport": [
    { type: "p", text: "Trois references reviennent systematiquement quand on explique CROWNIUM. Berkshire Hathaway, Bundesliga 50+1, Green Bay Packers. Les trois sont des modeles differents, et c'est precisement ce qui permet de les agreger." },
    { type: "h2", text: "Berkshire Hathaway, 1965. Le float comme actif strategique" },
    { type: "p", text: "En 1965, Warren Buffett prend le controle de Berkshire Hathaway, une entreprise textile en declin, et entame une transformation qui va devenir le cas d'ecole de la finance contemporaine. L'idee centrale n'est pas boursiere, elle est operationnelle : acquerir des compagnies d'assurance pour disposer du float, c'est-a-dire des primes encaissees avant le paiement des sinistres. Ce float devient un capital permanent, quasi-gratuit, qu'il est possible d'investir dans des entreprises operationnelles sur des horizons de 20, 30, 40 ans." },
    { type: "p", text: "En 2025, Berkshire Hathaway capitalise plus de 900 milliards de dollars. Le float model n'est pas une astuce, c'est une architecture de duree. Elle prouve qu'un capital dormant, correctement structure, produit un alpha considerable sur la longue periode." },
    { type: "p", text: "ONLYMORE Group s'inspire de ce modele. Les abonnements CROWNIUM alimentent un compte courant d'associe mutualiste qui finance le club sans dette, sans dilution, et surtout avec un horizon long. Le float n'est plus assurantiel, il est affectif : la ressource prolongee est la fidelite des supporters." },
    { type: "h2", text: "Bundesliga 50+1. La gouvernance comme infrastructure" },
    { type: "p", text: "La regle 50+1, en vigueur en Bundesliga depuis 1998, impose que le club, en tant qu'association, detienne la majorite des droits de vote. Des investisseurs externes peuvent injecter du capital, mais ils ne peuvent jamais prendre le controle. Cette regle a genere un effet mesurable : le taux de remplissage moyen des stades de Bundesliga depasse 95%, soit le plus eleve d'Europe." },
    { type: "p", text: "Le club reste le club. Le supporter reste dans une relation d'affiliation, pas de consommation. La gouvernance produit la densite, pas l'inverse." },
    { type: "p", text: "CROWNIUM reprend cette logique. Les supporters mutualises ne deviennent jamais actionnaires du club. Le club reste majoritaire chez lui. Le mecanisme CROWNIUM injecte de la ressource sans perturber la structure de pouvoir. C'est une injection de flux, pas une prise de controle." },
    { type: "h2", text: "Green Bay Packers, 1919. La communaute comme modele inspirationnel" },
    { type: "p", text: "Les Green Bay Packers sont la seule franchise de la NFL detenue par la communaute. Fondes en 1919, ils comptent aujourd'hui 538 967 actionnaires, essentiellement des residents du Wisconsin, chacun detenant un nombre limite d'actions sans droit de vote collectif significatif. Le club est la propriete de sa ville, litteralement." },
    { type: "p", text: "Cet exemple est souvent cite par erreur. Il est inspirationnel, pas operationnel. Le modele Packers est illegal dans presque toutes les autres ligues sportives mondiales, y compris en Ligue 1. CROWNIUM ne copie pas Green Bay. CROWNIUM s'en inspire philosophiquement pour construire un modele parallele, compatible avec le droit francais : les supporters ne detiennent pas le club, mais ils financent son operation via un float mutualise." },
    { type: "h2", text: "Trois modeles, une synthese" },
    { type: "p", text: "La these CROWNIUM se lit en trois phrases. De Berkshire Hathaway, on prend le float et la duree. De Bundesliga, on prend la gouvernance protegee. De Green Bay, on prend l'affiliation emotionnelle sans deguiser en actionnariat ce qui n'en est pas." },
    { type: "quote", text: "Pas un nouveau modele. Une recombinaison disciplinee de trois modeles eprouves." },
    { type: "p", text: "Cette recombinaison n'a rien de revolutionnaire. Elle est exactement ce que demande le contexte reglementaire 2025 : UEFA Squad Cost Rule qui plafonne les couts a 70% des revenus, Resolution P10_TA(2025)0212 du Parlement europeen qui valide le modele cooperatif a 552 voix et 86,4%, agrements ESS qui reconnaissent l'utilite sociale. Tous ces textes convergent. CROWNIUM arrive a l'intersection, pret." },
  ],
};
