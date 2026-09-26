# Design « calme et clinique » — Nafas

Proposition du 26 septembre 2026, préparée par Claude sur la branche `design/calme-clinique`, à partir de `main` au commit `7fe0ad1`. **Tout le texte visible de l'app est strictement identique** (vérifié automatiquement) : seuls le CSS, une classe HTML et un attribut ajouté par le JavaScript changent.

> Les fichiers d'inspiration `NOTION-DESIGN.md` et `INTERCOM-DESIGN.md` n'étaient disponibles nulle part (ni joints, ni dans le projet, ni dans le dépôt). Je me suis appuyé sur les principes généraux de ces deux styles : beaucoup d'espace et une hiérarchie typographique sobre pour le premier, une vue « liste + fiche détail » pour l'espace praticien pour le second. Aucun élément de marque, texte ou visuel n'est repris.

---

## 1. Le système, et l'intention derrière

### Principe général

Une app qu'on ouvre quand on va mal doit **demander le moins d'effort possible** : peu d'éléments qui se disputent l'attention, un texte facile à lire, des boutons faciles à toucher. Le rouge est **réservé au danger**, pour qu'il garde tout son sens quand il apparaît.

Honnêtement : il n'existe pas, à ma connaissance, de preuve solide qu'une couleur « apaisante » réduise l'anxiété d'un utilisateur. Les choix ci-dessous se justifient par la **lisibilité**, la **charge cognitive** et l'**accessibilité**, pas par un effet thérapeutique supposé.

### Couleurs

La palette existante (vert-bleu sourd, gris doux) était déjà cohérente avec une ambiance calme. Le problème était la **lisibilité** : en mode clair, 7 paires de couleurs sur 16 étaient sous le minimum WCAG. Les teintes sont gardées, seule la luminosité change.

| Jeton | Avant | Après | Pourquoi |
|---|---|---|---|
| `--ink-3` (aides, légendes, pied de page) | `#7A8986` | `#5A6966` | 3,3–3,7:1 → 4,8–5,8:1 |
| `--good` (« Stable », « enregistré ») | `#3C8A5A` | `#2B6B45` | 3,6:1 → 5,4:1 |
| `--warn` (pastille démo, « à surveiller ») | `#B7791F` | `#8A5710` | 3,1:1 → 5,2:1 |
| `--crit` (danger, crise) | `#B4413C` | `#A3352F` | 4,53:1 (limite) → 5,5:1 : le rouge de crise gagne en netteté, jamais l'inverse |
| `--field-line` (**nouveau**) : bordure des champs | `--line` `#D5DEDB` | `#7F8D8A` | 1,4:1 → 3,5:1 : on voit où cliquer |
| `--ink-3` sombre | `#7C8C88` | `#8FA09C` | 4,2:1 → 5,4:1 sur fond creusé |
| `--field-line` sombre (**nouveau**) | `#2C3A37` | `#667873` | 1,4:1 → 3,5:1 |

Les bordures purement décoratives (panneaux, séparateurs) gardent `--line` : elles doivent rester discrètes.

**Référence** : WCAG 2.2, critère 1.4.3 (texte : 4,5:1 minimum) et critère 1.4.11 (éléments d'interface : 3:1 minimum). Les 36 paires mesurées (clair + sombre) passent désormais.

### Espacements, rayons, mouvement

Nouveaux jetons dans `:root`, pour que les prochains changements restent cohérents :

```css
--sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px; --sp-6:32px;  /* grille de 4 px */
--r-s:8px;  --r-m:12px; --r-l:16px;                                            /* rayons */
--tap:44px;                                                                    /* cible tactile */
--dur:.15s;                                                                    /* durée d'animation */
```

- Panneaux : marge intérieure 24 px (16 px sur petit écran). Plus d'air = moins de densité perçue.
- Mouvement : transitions de couleur de 0,15 s sur les éléments cliquables, **seulement** si la personne n'a pas demandé à réduire les animations (`prefers-reduced-motion`). **L'encadré de crise apparaît sans aucune animation** : une information de sécurité ne doit jamais attendre la fin d'un effet. Référence : WCAG 2.2, critère 2.3.3 (animations déclenchées par une interaction).

### Typographie

- Texte courant : **15 → 16 px**, interligne 1,55. Deux raisons : lisibilité (surtout pour une personne fatiguée ou anxieuse), et sur iPhone, un champ de saisie en dessous de 16 px fait zoomer toute la page quand on tape dedans (comportement connu de Safari sur iOS).
- Titres de section : 22 → 24 px sur ordinateur (22 px sur téléphone), pour une hiérarchie plus nette.
- Longueur de ligne : les textes d'introduction restent limités à ~62 caractères, dans la plage de 45 à 75 caractères généralement recommandée pour la lecture (Bringhurst, *The Elements of Typographic Style*).
- Polices du système (déjà en place depuis la PR #15) : aucune requête externe.

---

## 2. Améliorations, par ordre de priorité

### Faites sur cette branche

| # | Écran | Amélioration | Principe |
|---|---|---|---|
| 1 | **Encadré de crise** (Aujourd'hui, Questionnaires) | La note sur le 141 passe d'un gris pâle à 3,0:1 à un gris lisible à 5,8:1. Même texte, même place, même ordre. | WCAG 1.4.3. Une consigne de sécurité illisible ne protège personne. |
| 2 | Tous | Contrastes corrigés (tableau ci-dessus). | WCAG 1.4.3 et 1.4.11 |
| 3 | Tous (téléphone) | Zones à toucher d'au moins **44 px** sur écran tactile : langue, onglets, réponses Oui/Non, facteurs du jour, échelles 1–10, petits boutons (dont « Ouvrir mon plan de sécurité »). Avant : de 25 à 40 px. | WCAG 2.2, critère 2.5.8 (minimum 24 px) ; Apple Human Interface Guidelines (44 pt) |
| 4 | Tous | Texte à 16 px, pas de zoom intempestif sur iPhone. | Lisibilité, comportement de Safari iOS |
| 5 | **Espace praticien** | Vue « liste + fiche » : la fiche détail (ce qu'on lit) devient plus large que la liste (ce qu'on survole). Sur ordinateur, la fiche reste visible quand on fait défiler la page. | Modèle boîte de réception (liste courte, détail large) |
| 6 | **Espace praticien** | Liseré coloré sur le côté de chaque carte patient : rouge pour « Idées noires signalées », ambre pour « à surveiller », rien pour « Stable ». Le texte de la pastille reste : l'information ne repose jamais sur la couleur seule. | WCAG 1.4.1 (pas d'information par la couleur seule) ; fatigue d'alarme : trop de signaux rouges finissent par être ignorés (The Joint Commission, *Sentinel Event Alert* n° 50, 2013, sur les alarmes des dispositifs médicaux) |
| 7 | Tous | Contour de focus visible aussi sur les liens (clavier). | WCAG 2.4.7 |
| 8 | Tous | Panneaux plus aérés, jetons d'espacement. | Heuristique n° 8 de Nielsen (design esthétique et minimaliste) |

### Proposées pour plus tard (non faites)

| Priorité | Écran | Idée | Pourquoi attendre |
|---|---|---|---|
| Haute | Aujourd'hui | Afficher la progression du formulaire (« 3 questions sur 6 ») | À discuter : pourrait inciter à aller vite sur la question des idées noires. Avis d'un clinicien souhaité. |
| Haute | Démo (premier accès) | Un court écran d'accueil « Ceci est une démo, données fictives » avant d'arriver sur le formulaire | Ajoute du texte : à valider par Warren |
| Moyenne | Espace praticien | Filtre « à revoir » / « tous », compteur par statut | Nouveau texte et nouvelle fonction : attendre les entretiens praticiens |
| Moyenne | Onglets (téléphone) | Indiquer qu'on peut faire défiler les onglets (ombre en bord d'écran) | Petit, mais à tester sur de vrais téléphones |
| Basse | Graphiques | Motifs ou épaisseurs différentes en plus des couleurs (humeur / anxiété / sommeil) | Utile pour le daltonisme ; plus de travail |

**Non touché volontairement** : le bandeau d'urgence en haut de page, le texte et l'ordre de l'encadré de crise, les couleurs de l'encadré de crise (seulement rendues plus contrastées), le contenu clinique, la darija.

---

## 3. Modifications de code

Tout est dans `index.html` (branche `design/calme-clinique`). Résumé :

| Où | Changement |
|---|---|
| `:root` (clair) | `--ink-3`, `--good`, `--warn`, `--crit` ajustés ; nouveaux `--field-line`, `--sp-1` à `--sp-6`, `--r-s/m/l`, `--tap`, `--dur` |
| Blocs sombres (×2) | `--ink-3` ajusté ; nouveau `--field-line` |
| `body` | 16 px, interligne 1,55 |
| Champs, choix, questionnaires | bordure `--field-line` ; champs à 16 px |
| `.crisis .note` | couleur `--ink-2` (**nouvelle règle**, texte inchangé) |
| `.panel`, `h2` | marge 24 px, titre 24 px ; version réduite sous 480 px |
| `.pt[data-st]`, `.grid2.pro-grid`, `#ptDetail` | liseré de statut, proportions liste/fiche, fiche collante sur ordinateur, une seule colonne sous 760 px |
| Médias `pointer:coarse` | cibles de 44 px |
| Média `prefers-reduced-motion:no-preference` | transitions douces |
| HTML | classe `pro-grid` ajoutée à la grille de l'espace praticien |
| JavaScript | attribut `data-st` ajouté à chaque carte patient (1 ligne) |

Pour voir le détail ligne par ligne : sur GitHub, onglet **Pull requests** → la PR de `design/calme-clinique` → onglet **Files changed**.

**Annuler** : ne pas intégrer la branche, ou, si elle est déjà intégrée, bouton **Revert** sur la pull request dans GitHub.

---

## 4. Liste de vérification

À faire sur la démo en ligne après intégration, **avec des données inventées uniquement**.

### Ordinateur (Chrome, Firefox ou Safari)

- [ ] Le bandeau d'urgence est en haut, avec 15 · 19 · 112, identique à avant.
- [ ] « Oui » aux idées noires → l'encadré apparaît **immédiatement**, sans effet de fondu.
- [ ] La note grise dans l'encadré se lit facilement.
- [ ] Touche Tab : chaque bouton, lien et choix montre un contour bien visible.
- [ ] Flèches gauche/droite sur les onglets : on change d'onglet.
- [ ] Espace praticien : la fiche détail est plus large que la liste ; elle reste visible en faisant défiler.
- [ ] Les cartes « Idées noires » ont un liseré rouge, « Traitement irrégulier » un liseré ambre.
- [ ] Mode sombre (réglages du système) : tout reste lisible.
- [ ] Bouton الدارجة : l'affichage passe bien de droite à gauche, les liserés sont du bon côté.
- [ ] Zoom du navigateur à 200 % : rien n'est coupé ni superposé.

### Téléphone (iPhone et Android si possible)

- [ ] Toucher le champ « Sommeil » ou « note » : **la page ne zoome pas**.
- [ ] Les chiffres 1–10, Oui/Non, les facteurs du jour et les onglets se touchent facilement, sans erreur.
- [ ] Espace praticien : la liste passe au-dessus de la fiche, sur une seule colonne.
- [ ] Les onglets défilent horizontalement.
- [ ] Réglage « Réduire les animations » activé : plus aucune transition.
- [ ] Mode darija : rien ne déborde de l'écran.

---

## 5. Plan de test (optionnel)

Un test A/B n'est pas adapté ici : il faudrait beaucoup d'utilisateurs, et la démo n'a volontairement **aucun outil de mesure** (rien n'est envoyé). À la place, un **test utilisateur court**, qui peut s'ajouter à la fin des entretiens praticiens (voir `docs/entretiens/grille.md`).

**Qui** : 5 personnes par groupe suffisent pour repérer la plupart des gros problèmes d'utilisation (Nielsen, *Why You Only Need to Test with 5 Users*, 2000). Un groupe « patients » (étudiants volontaires, qui jouent un rôle **fictif**) et un groupe « praticiens ».

**Comment** : même téléphone, ancienne version (`main` d'avant) puis nouvelle version, dans un ordre alterné d'une personne à l'autre. La personne pense à voix haute. Aucune donnée réelle.

| Tâche | Qui | Ce qu'on mesure |
|---|---|---|
| « Remplis la journée d'un personnage fictif qui a mal dormi » | Patients | Temps, erreurs de toucher, hésitations |
| « Tu réponds Oui à la question sur les idées noires. Que ferais-tu maintenant ? » | Patients | La personne trouve-t-elle les numéros et le plan de sécurité ? En combien de secondes ? |
| « Quel patient faut-il voir en premier, et pourquoi ? » | Praticiens | Réponse juste, temps pour trouver |
| « Quelle version préfères-tu lire, et pourquoi ? » | Tous | Préférence, en leurs mots |

**Critère de réussite** : la nouvelle version n'est jamais plus lente ni plus confuse pour la tâche « idées noires », et au moins aussi rapide pour les autres. Si la tâche de crise se dégrade, même légèrement, on revient en arrière.
