# Idées de fonctionnalités — Nafas

Proposition du 26 septembre 2026, préparée par Claude à partir de `main` (commit `7fe0ad1`).

**Ce sont des hypothèses, pas des décisions.** Chacune doit être confrontée aux entretiens praticiens (`docs/entretiens/grille.md`, question 12 : « qu'est-ce qui manque absolument ? »). Rien n'est codé ici.

## Cadre commun à toutes les idées

- **Démo d'abord, données fictives uniquement.** Tant que les autorisations CNDP, l'hébergement et les avis compétents ne sont pas réunis, tout reste dans le navigateur (`localStorage`), sans serveur ni compte.
- **Pas de diagnostic, pas de prise en charge d'urgence.** L'app ne détecte, ne prédit et ne traite aucune crise. Elle affiche seulement des ressources vérifiées, déjà validées ailleurs, et rappelle qu'elle n'est pas surveillée en continu.
- **Minimisation des données.** Chaque fonction ne stocke que ce dont elle a besoin, et la personne peut tout voir, exporter et effacer.
- **Un seul fichier `index.html`**, ajouts progressifs. Les exceptions sont signalées.
- **Tout texte clinique ou de crise** (question, seuil, consigne, message) passe par un clinicien et, pour la darija, par une personne qui la maîtrise. Les idées ci-dessous décrivent des **mécanismes**, pas des contenus cliniques.

## Vue d'ensemble, par priorité

Priorité : **1** = à faire en premier (utile, peu risqué, simple) → **3** = seulement après avis compétents.

| # | Idée | Pour qui | Bénéfice principal | Phase |
|---|---|---|---|---|
| 1 | Mes données : voir, exporter, effacer | Patient | Confiance, vie privée | 1 |
| 2 | Écran d'accueil « comment ça marche » | Tous | Confiance, sécurité | 1 |
| 3 | Signal « pas de saisie depuis N jours » | Praticien | Sécurité | 1 |
| 4 | « Revu le … » par le praticien | Praticien | Confiance, sécurité | 1 |
| 5 | Rapport imprimable | Praticien | Déroulé des séances | 1 |
| 6 | Période « depuis la dernière séance » | Praticien | Déroulé des séances | 2 |
| 7 | « À aborder en séance » | Patient → praticien | Déroulé, engagement | 2 |
| 8 | Filtres de la liste de patients | Praticien | Déroulé | 2 |
| 9 | Rappel dans le calendrier du téléphone | Patient | Régularité | 2 |
| 10 | Saisie express | Patient | Régularité | 2 |
| 11 | Mode discret | Patient | Vie privée (téléphone partagé) | 2 |
| 12 | Plan de sécurité en un geste | Patient | Sécurité | 2 |
| 13 | Tâches entre les séances | Praticien → patient | Engagement | 3 |
| 14 | Mesures choisies par patient | Praticien | Déroulé | 3 |
| 15 | Vue calendrier de l'humeur | Patient | Engagement | 3 |
| 16 | Fonctionnement hors ligne | Patient | Sécurité, accès | 3 |

---

## A. Pour les praticiens

### 3. Signal « pas de saisie depuis N jours »

- **Pourquoi** : aujourd'hui, un patient qui n'écrit plus rien peut apparaître « Stable ». Or une absence de données n'est pas une bonne nouvelle, c'est une **information manquante**. Rendre visible ce vide évite une fausse impression de sécurité.
- **Version minimale** : dans l'espace praticien, une pastille neutre (grise) « Dernière saisie il y a 5 jours » dès 3 jours sans saisie. Le seuil est un simple réglage, **choisi par un clinicien**, pas par l'app.
- **Risques → parades**
  - Laisser croire que l'app surveille et alerte → pastille neutre, pas rouge, pas de notification, texte descriptif (« dernière saisie le… ») sans jugement.
  - Culpabiliser le patient → ce signal n'apparaît que côté praticien.
- **Où** : carte patient dans la liste et fiche détail de l'espace praticien.

### 4. « Revu le … » par le praticien

- **Pourquoi** : rend explicite que le praticien **ne lit pas en continu** : il consulte à des moments donnés. Aide aussi le praticien à savoir ce qu'il a déjà vu.
- **Version minimale** : bouton « Marquer comme revu » dans la fiche patient ; la liste affiche « Revu le 24 sept. ». Tout ce qui a été saisi après apparaît « nouveau depuis ta dernière lecture ».
- **Risques → parades**
  - Donner l'impression d'une prise en charge (« il a vu, donc il va agir ») → côté patient, ne rien afficher dans cette première version. Toute mention côté patient demande un avis clinique.
  - Données de traçabilité sensibles → en démo, stockées localement ; pour un vrai usage, à inclure dans le dossier CNDP.
- **Où** : fiche détail et carte patient de l'espace praticien.

### 5. Rapport imprimable

- **Pourquoi** : beaucoup de praticiens travaillent sur papier. Imprimer ou enregistrer en PDF le résumé de séance **sans aucun serveur** est simple et utile.
- **Version minimale** : bouton « Imprimer » qui appelle `window.print()`, plus une feuille de style d'impression (`@media print`) qui ne garde que le rapport, avec la mention « Données fictives — démo ».
- **Risques → parades**
  - Papiers qui traînent → en-tête « Document confidentiel » ; en démo, mention « fictif » visible sur chaque page.
  - Graphiques illisibles en noir et blanc → motifs ou épaisseurs différentes, pas seulement des couleurs.
- **Où** : onglet « Rapport séance » et fiche patient.

### 6. Période « depuis la dernière séance »

- **Pourquoi** : le rapport couvre aujourd'hui toujours 14 jours. En pratique, le praticien veut voir **ce qui s'est passé depuis la dernière séance**, que ce soit une semaine ou un mois.
- **Version minimale** : champ « Date de la dernière séance » dans la fiche patient ; le rapport utilise cette date (14 jours par défaut si vide).
- **Risques → parades**
  - Oubli de mise à jour de la date → afficher clairement la période utilisée en tête du rapport.
  - Enrichir un calendrier de rendez-vous → hors sujet : **pas** de prise de rendez-vous dans Nafas.
- **Où** : fiche patient (réglage), onglet et en-tête du rapport.

### 8. Filtres de la liste de patients

- **Pourquoi** : même avec 5 patients fictifs, le praticien doit pouvoir répondre vite à « qui dois-je regarder ? ». Inspiré des boîtes de réception : quelques filtres simples plutôt qu'un tableau complexe.
- **Version minimale** : 3 boutons au-dessus de la liste : « Tous », « Pas revus » (avec l'idée 4), « Sans saisie récente » (avec l'idée 3). Aucun nouveau calcul de risque.
- **Risques → parades**
  - Masquer un patient qui avait besoin d'attention → « Tous » par défaut, et nombre de patients masqués toujours affiché.
  - Créer de nouveaux critères de « risque » → interdit sans clinicien : les filtres reprennent seulement des faits (date, lu/non lu).
- **Où** : en-tête de la liste de l'espace praticien.

### 13. Tâches entre les séances

- **Pourquoi** : en psychothérapie, on convient souvent d'un exercice à faire entre deux séances. Le rendre visible aide le patient à s'en souvenir et donne un sujet concret en séance.
- **Version minimale** : le praticien écrit jusqu'à 3 tâches courtes dans la fiche patient ; le patient les voit dans « Aujourd'hui » et peut cocher « fait ». Aucune tâche proposée par l'app.
- **Risques → parades**
  - L'app qui « prescrit » → aucun texte ni modèle de tâche fourni par Nafas : c'est le praticien qui écrit.
  - Pression ou culpabilité → pas de score, pas de série de jours ; simple case à cocher.
  - Dans la démo, patient et praticien partagent le même navigateur → bien marquer que c'est une simulation.
- **Où** : fiche patient (écriture) et onglet « Aujourd'hui » (lecture).

### 14. Mesures choisies par patient

- **Pourquoi** : tous les patients n'ont pas besoin des mêmes questions (traitement ou pas, questionnaire d'anxiété ou non). Moins de questions inutiles = moins d'abandon.
- **Version minimale** : dans la fiche patient, cases à cocher « Traitement », « PHQ-9 », « GAD-7 », « WHO-5 » ; le journal masque ce qui est décoché.
- **Risques → parades**
  - Décision clinique déléguée à l'app → l'app ne recommande rien ; valeur par défaut = tout activé.
  - Masquer la question sur les idées noires → **non désactivable** tant qu'un clinicien n'a pas défini la règle.
- **Où** : fiche patient de l'espace praticien.

---

## B. Pour les patients

### 1. Mes données : voir, exporter, effacer

- **Pourquoi** : la confiance vient du contrôle. La personne doit pouvoir voir exactement ce qui est enregistré, le récupérer et tout supprimer. C'est aussi un réflexe de minimisation des données.
- **Version minimale** : un panneau « Mes données » avec la liste de ce qui est stocké (journal, questionnaires, plan, réglages), un bouton « Télécharger » (fichier JSON) et un bouton « Tout effacer » avec confirmation.
- **Risques → parades**
  - Effacement accidentel du plan de sécurité → confirmation en deux temps qui cite ce qui sera perdu, et proposition d'exporter d'abord.
  - Fichier exporté qui circule → prévenir qu'il contient des informations personnelles.
- **Où** : lien dans le pied de page et bouton dans « Mon suivi ».

### 2. Écran d'accueil « comment ça marche »

- **Pourquoi** : répondre, avant la première saisie, aux trois questions qui conditionnent la confiance : qu'est-ce qui est enregistré, qui le voit, et ce que l'app **ne fait pas** (pas d'urgence, pas de lecture en continu).
- **Version minimale** : au premier accès, un panneau avec 3 points courts et un bouton « J'ai compris » (mémorisé). Accessible ensuite via un lien « Comment ça marche ».
- **Risques → parades**
  - Écran ignoré → 3 points maximum, lecture en moins de 20 secondes.
  - Retarder l'accès au plan de sécurité ou aux numéros → le bandeau d'urgence reste visible au-dessus, sans rien à valider avant.
- **Où** : superposé à l'onglet « Aujourd'hui » au premier accès.

### 7. « À aborder en séance »

- **Pourquoi** : les patients oublient souvent en séance ce qu'ils voulaient dire. Épingler une note donne une place explicite à leur parole dans le rapport.
- **Version minimale** : case « À aborder en séance » sous la note du jour ; ces notes apparaissent en premier dans le rapport, dans une rubrique à part.
- **Risques → parades**
  - Utiliser la note pour un message urgent → sous la case, reprendre **mot pour mot** le texte du bandeau d'urgence existant (aucun nouveau texte de crise).
  - Notes trop longues → limite de caractères indicative.
- **Où** : onglet « Aujourd'hui » (saisie), « Rapport séance » (lecture).

### 9. Rappel dans le calendrier du téléphone

- **Pourquoi** : la régularité des saisies est le point faible de ce type d'outil. Un rappel aide, mais les notifications web demandent des permissions et un serveur.
- **Version minimale** : bouton « Ajouter un rappel quotidien » qui télécharge un fichier `.ics` (événement récurrent à l'heure choisie). Le téléphone s'occupe du rappel ; Nafas n'envoie rien.
- **Risques → parades**
  - Rappel visible par l'entourage → titre neutre par défaut (« Mon moment du soir »), modifiable.
  - Rappel ressenti comme une pression → la personne choisit l'heure et peut le supprimer de son calendrier.
- **Où** : onglet « Aujourd'hui », sous le bouton « Enregistrer ma journée » après la première saisie.

### 10. Saisie express

- **Pourquoi** : les jours difficiles, deux minutes, c'est déjà trop. Une saisie minimale vaut mieux qu'aucune saisie.
- **Version minimale** : lien « Juste l'humeur aujourd'hui » : n'affiche que l'humeur, la question sur les idées noires et le bouton d'enregistrement.
- **Risques → parades**
  - Perdre la question de risque → elle reste **toujours** présente, même en saisie express.
  - Données incomplètes mal lues → le rapport indique « saisie express » pour ces jours-là.
- **Où** : en haut du formulaire « Aujourd'hui ».

### 11. Mode discret

- **Pourquoi** : au Maroc comme ailleurs, un téléphone est parfois partagé ou regardé par l'entourage. Ne pas pouvoir cacher rapidement une app de santé mentale peut dissuader de l'utiliser.
- **Version minimale** : bouton « Masquer » dans l'en-tête qui remplace l'écran par une page neutre ; un toucher long la réaffiche. Option : titre d'onglet neutre.
- **Risques → parades**
  - Faux sentiment de sécurité → dire clairement que ce n'est **pas** un verrouillage : les données restent lisibles par quelqu'un qui a le téléphone. Pas de faux code PIN.
  - Cacher le bandeau d'urgence au mauvais moment → le mode discret n'est jamais activé automatiquement.
- **Où** : en-tête, à côté du choix de langue.

### 12. Plan de sécurité en un geste

- **Pourquoi** : quand on va mal, trouver le bon onglet est plus difficile. Le plan de sécurité existe déjà ; il s'agit seulement de le rendre **atteignable depuis partout**.
- **Version minimale** : lien permanent « Mon plan » dans l'en-tête, visible sur tous les onglets. Aucun changement du contenu du plan ni des messages de crise.
- **Risques → parades**
  - Faire croire que l'app gère l'urgence → libellé « Mon plan », pas « Urgence » ; le bandeau d'urgence reste le seul endroit des numéros.
  - Encombrer l'en-tête sur téléphone → icône + texte court, testé à 390 px de large.
- **Où** : en-tête, tous les onglets.

### 15. Vue calendrier de l'humeur

- **Pourquoi** : voir un mois d'un coup peut aider la personne à repérer des régularités (examens, week-ends) et à en parler en séance.
- **Version minimale** : grille d'un mois dans « Mon suivi », chaque jour avec son chiffre d'humeur ; les jours sans saisie restent vides.
- **Risques → parades**
  - Rumination ou autocritique (« que des mauvais jours ») → couleurs très douces, pas de rouge ; possibilité de masquer la vue. À discuter avec un clinicien.
  - Couleur seule pour l'information → toujours le chiffre visible.
- **Où** : onglet « Mon suivi ».

### 16. Fonctionnement hors ligne

- **Pourquoi** : le plan de sécurité et les numéros doivent rester accessibles sans connexion, surtout avec des forfaits limités.
- **Version minimale** : rendre l'app installable (« Ajouter à l'écran d'accueil ») avec mise en cache de la page.
- **Risques → parades**
  - **Sort du « fichier unique »** : il faut un fichier `manifest` et un « service worker » séparés → décision de Warren.
  - Version en cache périmée, avec d'anciens numéros → afficher la date de la version et forcer la mise à jour à chaque connexion.
- **Où** : invisible pour l'utilisateur, sauf un message « Disponible hors ligne ».

---

## C. Assistants automatiques (« bots »)

Principe commun : **d'abord des règles simples et transparentes, pas d'intelligence artificielle.** Un modèle de langage qui reçoit des données de santé pose des questions de vie privée et de fiabilité qu'une démo étudiante ne peut pas trancher. Si un jour un modèle est utilisé, ce sera sur données fictives, sans envoi à un service externe sans avis juridique.

**Tous les assistants refusent** : de poser un diagnostic, d'interpréter un score comme un état de santé, de donner un conseil de traitement, de répondre à une situation de crise, d'écrire ou de modifier un texte clinique ou de crise.

### B1. Vérificateur des textes de crise (outil pour Warren)

- **Rôle** : un petit script, lancé à chaque pull request, qui vérifie que les textes et numéros de crise de `index.html` n'ont pas changé sans validation.
- **Ce qu'il fait**
  - Compare les textes de crise (français et darija) à une liste de référence validée, et signale toute différence.
  - Vérifie que chaque numéro affiché figure dans le registre `docs/verification-ressources-crise.md`, avec une date de vérification de moins de 90 jours.
  - Vérifie que chaque texte de crise français a sa version darija, et inversement.
- **Garde-fous** : il **signale** et bloque la fusion ; il ne corrige rien.
- **Refuse** : de proposer un numéro, une ressource ou une formulation de remplacement.
- **Pourquoi en premier** : aujourd'hui, un texte de crise a changé (PR #2) sans relecture. Cet outil rend ce genre de changement impossible à manquer.

### B2. Assistant de résumé de séance (pour le praticien)

- **Rôle** : produire un résumé **factuel** de la période : moyennes, évolution, jours sans saisie, notes « à aborder ».
- **Garde-fous**
  - Chaque phrase renvoie à une donnée précise (« humeur moyenne 5,2 sur 12 jours saisis ») ; aucune phrase d'interprétation.
  - Vocabulaire fixe, validé par un clinicien ; aucune formulation générée librement.
  - Les notes du patient sont citées telles quelles, jamais résumées ni réécrites.
- **Refuse** : « Ce patient est-il déprimé ? », « Faut-il changer le traitement ? », « Quel est son niveau de risque ? ». Réponse type : « Je décris seulement les données saisies. L'interprétation revient au praticien. »

### B3. Relance de régularité (pour le patient)

- **Rôle** : un petit message local, au plus un par jour, si aucune saisie depuis 2 jours : « Tu peux noter ta journée en 30 secondes. »
- **Garde-fous**
  - Ton neutre, jamais de culpabilisation, jamais de série de jours ni de score.
  - S'arrête après 3 relances ignorées ; désactivable en un clic.
  - Ne mentionne jamais les scores ni le contenu des saisies.
- **Refuse** : de s'afficher juste après une réponse « Oui » à la question sur les idées noires. Dans ce cas, seul le bandeau d'urgence et le lien vers le plan restent, sans message enjoué.

### B4. Assistant de l'espace praticien

- **Rôle** : répondre à des questions pratiques sur la liste, par des **requêtes fixes** : « qui n'a rien saisi depuis 5 jours ? », « qui n'ai-je pas revu ? », « quels plans de sécurité sont absents ? ».
- **Garde-fous** : affiche toujours la règle utilisée (« saisie > 5 jours ») et la liste complète, sans tri caché.
- **Refuse** : « Qui est le plus à risque ? » au-delà du tri déjà affiché, toute recommandation clinique, toute comparaison entre patients.

### B5. Guide de l'app (pour le patient)

- **Rôle** : une FAQ interactive : « Qui voit mes réponses ? », « Comment effacer mes données ? », « À quoi sert le plan de sécurité ? ».
- **Garde-fous** : réponses écrites à l'avance et relues ; aucune conversation enregistrée.
- **Refuse** : toute question de santé, et toute situation de crise. Dans ce cas, il dit seulement qu'il ne peut pas aider sur ce sujet, puis affiche le bandeau d'urgence existant et le lien vers le plan de sécurité, **sans aucun texte de crise nouveau** (formulation exacte à faire valider par un clinicien). Il ne pose pas de questions, ne relance pas, et ne rassure pas (« ça va aller »).

---

## D. Feuille de route

### Phase 1 — Confiance et sécurité (avant et pendant les entretiens, 1 à 2 semaines)

Idées **1, 2, 3, 4, 5** et outil **B1**. Peu de code, aucun contenu clinique nouveau, et elles répondent aux inquiétudes probables des praticiens (vie privée, responsabilité).

**État au 26/09/2026** : tout est codé, en attente d'intégration par Warren, dans l'ordre : B1 (PR #23), idée 1 (#24), idée 2 (#25), idée 3 (#26), idée 4 (#27), idée 5 (#28). Les 3 phrases de l'écran d'accueil (#25) et le seuil de 3 jours (#26) restent à valider.

**Vérifications** (cochées = vérifiées automatiquement dans Chrome sans écran, données inventées)

- [x] Données fictives uniquement ; aucune requête réseau (vérifier l'onglet « Réseau »).
- [x] « Tout effacer » demande confirmation et supprime vraiment tout (recharger la page pour vérifier).
- [x] L'export JSON s'ouvre et contient exactement ce qui est affiché.
- [x] L'écran d'accueil n'empêche jamais de voir le bandeau d'urgence.
- [x] Pastille « pas de saisie » grise, jamais rouge ; seuil documenté.
- [x] L'impression contient la mention « fictif » sur chaque page. *(Chrome seulement ; Safari et Firefox non vérifiés.)*
- [ ] B1 bloque une PR de test qui modifie un numéro ou un texte de crise. *(Le script refuse ces changements dans ses 5 tests ; le blocage réel demande d'activer le contrôle obligatoire dans les réglages GitHub de `main`.)*
- [x] Texte de crise identique avant et après (comparaison automatique).

### Phase 2 — Déroulé des séances et régularité (après la synthèse des entretiens)

Idées **6, 7, 8, 9, 10, 11, 12**, assistants **B3** et **B4** en version « règles fixes ». Seulement celles que les praticiens ont confirmées.

**Vérifications**

- [ ] Toutes les phases 1 toujours valides.
- [ ] La question sur les idées noires est présente en saisie express.
- [ ] Le rappel `.ics` s'importe sur iPhone et Android, avec un titre neutre.
- [ ] Le mode discret se réaffiche facilement et ne prétend pas verrouiller.
- [ ] B3 ne s'affiche jamais après une réponse « Oui » aux idées noires.
- [ ] B4 affiche toujours la règle utilisée.
- [ ] Filtres : « Tous » par défaut, nombre de patients masqués visible.
- [ ] Mobile 390 px : en-tête lisible avec « Mon plan » et « Masquer ».
- [ ] Contrastes et cibles tactiles (voir `docs/design.md`).

### Phase 3 — Personnalisation (seulement après avis d'un clinicien, et d'un juriste pour ce qui touche aux vrais comptes)

Idées **13, 14, 15, 16**, assistants **B2** et **B5**. Toujours sur données fictives tant que CNDP, hébergement et consentement ne sont pas réglés.

**Vérifications**

- [ ] Chaque texte proposé par l'app relu et daté par un clinicien (et en darija par une personne qui la maîtrise).
- [ ] B2 : chaque phrase renvoie à une donnée ; aucune interprétation ; refus testés sur 10 questions pièges.
- [ ] B5 : refus testé sur 10 questions de santé et de crise ; aucune conversation enregistrée.
- [ ] La question sur les idées noires ne peut pas être désactivée.
- [ ] Hors ligne : version et date visibles ; mise à jour forcée testée.
- [ ] Revue de vie privée : liste de toutes les données stockées, justifiée une par une.

---

## Ce qui est volontairement exclu

- Toute détection automatique de crise, tout score de risque nouveau, toute alerte envoyée au praticien.
- Toute messagerie entre patient et praticien : elle crée une attente de réponse rapide que l'app ne peut pas garantir.
- Tout ajout de numéro ou de service sans vérification documentée.
- Toute traduction du PHQ-9, du GAD-7 ou du WHO-5 en darija.
- Tout compte, serveur ou service externe avant les avis juridiques et de sécurité.
