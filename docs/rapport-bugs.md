# Rapport de bugs — Nafas

Relecture complète de `index.html` (commit `951adec`, branche `main`) le **26 septembre 2026**, par Claude. Les points marqués « testé » ont été reproduits dans un navigateur sans écran (Chromium), avec des **données fictives** uniquement.

**Rien n'est corrigé ici.** Ce document sert à choisir, avec Warren, quoi corriger et dans quel ordre.

## Légende

- 🔴 **Élevé** : peut tromper la personne ou toucher à la sécurité ou à la vie privée.
- 🟠 **Moyen** : résultat faux ou incohérent, mais sans danger direct.
- 🟢 **Faible** : propreté du code, confort, accessibilité.

Colonne « Qui décide » : **W** = Warren seul (technique) ; **W + C** = Warren avec l'avis d'un clinicien (touche au contenu clinique ou de crise).

## État au 26/09/2026 (fin de journée, `main` = `7fe0ad1`)

Vérifié dans le code de `main`. Le tableau des bugs ci-dessous reste la version d'origine, avec ses numéros de ligne d'alors.

| Point | État |
|---|---|
| Stop Silence, pied de page | ✅ Corrigés (PR #6, #7) |
| Bug 1 (date à minuit) | ✅ Corrigé (PR #9) |
| Bug 2 (polices Google) | ✅ Corrigé (PR #15) : plus aucune requête externe |
| Bug 4 (faux « enregistré ») | ✅ Corrigé (PR #10) |
| Bug 5 (encadré de crise figé) | ✅ Corrigé (PR #13) |
| Bug 9 (contact cliquable) | ✅ Corrigé (PR #16) |
| Bug 10 (accessibilité des onglets) | ✅ Corrigé (PR #14) |
| Audit A1, A2 (échappement du journal, noms d'onglets) | ✅ Corrigés (PR #17) |
| Bugs 3, 6, 7 | ⏳ Ouverts : attendent les relecteurs (W + C) |
| Bugs 8, 11 | ⏳ Ouverts (W) |
| **Migration du plan (étape 5)** | ⏳ **Ouvert, nouveau.** La conversion des anciens plans ajoutée par la PR #2 ne se déclenche jamais : `LEGACY_PLAN5_DEFAULT` contient encore la ligne Stop Silence, que `loadPlan()` retire avant la comparaison. Un plan enregistré avant la PR #2 garde « SAMU 141 » sans « à vérifier dans ta région », et cette valeur par défaut compte comme une rubrique remplie. Correction d'une ligne : retirer la ligne Stop Silence de `LEGACY_PLAN5_DEFAULT`. (W, touche au plan de sécurité) |

Autres points ouverts : voir l'issue #1 (anomalies du test mobile) et l'audit sécurité B1 à B6 (stockage en clair, origine partagée `warenee.github.io`, pas de CSP, pas de suppression des données, espace praticien sans connexion, rapport copié dans le presse-papiers). B7 (« disponible sans connexion ») n'est plus d'actualité : la PR #2 a retiré cette phrase.

## Bugs trouvés

| # | Gravité | Où | Problème | Testé ? | Piste de correction | Qui décide |
|---|---|---|---|---|---|---|
| 1 | 🔴 | l. 376 (`iso`), utilisée l. 486 et 517 | **Mauvaise date entre minuit et 1 h au Maroc.** La date est calculée à l'heure de Londres (UTC), pas à l'heure du téléphone. Une saisie faite le 27/09 à 00 h 30 est enregistrée au 26/09 **et remplace la saisie du 26**, sans prévenir. Même chose pour les questionnaires. | ✅ Oui : saisie à 00 h 30 le 27/09 → enregistrée « 2026-09-26 » | Calculer la date avec l'heure locale du téléphone. Petite modification d'une ligne. | W |
| 2 | 🔴 | l. 10–12 (`<head>`) ; texte l. 365 et `README.md` | **« Rien n'est envoyé » n'est pas tout à fait vrai.** Au chargement, la page contacte `fonts.googleapis.com` pour les polices : Google reçoit donc l'adresse IP de la personne et sait qu'elle ouvre la page. Pour une app de santé mentale, c'est un point de vie privée. | ✅ Oui : seule requête externe observée | Soit utiliser les polices du téléphone (aucune requête), soit préciser le texte. À discuter : ça touche à la vie privée. | W (+ spécialiste vie privée plus tard) |
| 3 | 🔴 | l. 490 | **Darija, idées noires = Oui** : le message affiché est seulement « تسجل. » (enregistré), sans le rappel des numéros présent en français. *(Déjà connu, posé aux relecteurs.)* | Lu dans le code | Attendre la formulation validée par les relecteurs. | W + C |
| 4 | 🟠 | l. 383 (`store`) et l. 489–490, 519, 551 | **« Enregistré » s'affiche même quand rien n'est enregistré.** Si le navigateur bloque le stockage (navigation privée stricte, stockage plein), l'erreur est ignorée et le message de réussite s'affiche quand même. | ✅ Oui : stockage bloqué → « Journée enregistrée. » | Faire renvoyer « réussi / échoué » par `store`, et afficher un message d'erreur clair. | W |
| 5 | 🟠 | l. 510 | **Encadré de crise des questionnaires figé.** Quand on répond plus de 0 à la question 9 du PHQ-9, l'app copie l'encadré de crise du jour. Si on change de langue ensuite, la copie ne suit pas. En darija, elle s'affiche aussi de gauche à droite (l'onglet ne bascule pas). | Lu dans le code | Reconstruire l'encadré à chaque changement de langue. | W |
| 6 | 🟠 | l. 520 et l. 556 | **Messages qui font croire à un envoi** au praticien (« apparaîtra en priorité chez ton praticien », « Ton praticien voit s'il est rempli »), alors que la démo n'envoie rien. *(Déjà connu, posé aux relecteurs.)* | Lu dans le code | Formulation à valider. | W + C |
| 7 | 🟠 | l. 689 (Espace praticien) | Le bandeau « Action attendue : contacter le patient aujourd'hui… » est du **contenu clinique** (protocole). Il précise bien « dans la vraie version », mais un praticien pourrait le lire comme une recommandation. | Lu dans le code | À montrer au clinicien relecteur. | W + C |
| 8 | 🟠 | l. 412 | **Affichage de droite à gauche partiel** en darija : seuls le menu, le bandeau d'urgence, « Aujourd'hui » et « Plan de sécurité » basculent. *(Déjà connu.)* | Lu dans le code | À traiter avec la traduction des autres onglets, après relecture. | W |
| 9 | 🟢 | l. 364 | L'adresse de contact est écrite entre crochets et n'est pas cliquable. | Lu dans le code | Lien `mailto:` si Warren le souhaite (l'adresse est publique sur le site). | W |
| 10 | 🟢 | l. 180–187 | **Accessibilité des onglets** : ils utilisent `role="tab"` mais sans lien vers leur contenu (`aria-controls`) ni navigation au clavier avec les flèches. Un lecteur d'écran s'y retrouve mal. | Lu dans le code | Ajouter les attributs manquants. | W |
| 11 | 🟢 | l. 173 | Le badge du haut affiche « démo par rayane ». À vérifier si c'est le nom voulu. | Lu dans le code | — | W |

## Ce qui a été vérifié et ne pose pas de problème

- **Pas d'injection de code par les notes** : les notes, les facteurs du jour et le plan de sécurité sont échappés avant affichage (fonction `esc`, ou `textContent` pour le rapport). Un texte comme `<script>` dans une note s'affiche comme du texte.
- Les seuils des scores PHQ-9, GAD-7 et WHO-5 (l. 433–437) correspondent aux seuils habituellement publiés. *Non vérifié contre une source primaire ici* : à confirmer par le clinicien, comme tout le contenu clinique.
- Aucune erreur JavaScript au chargement ni en changeant de langue.

## Ordre de correction suggéré

1. Bug 1 (date à minuit) : risque faible, correction courte, facile à tester.
2. Bug 4 (faux « enregistré ») : même idée, une seule fonction à modifier.
3. Bug 2 (polices Google) : décider d'abord ce que Warren préfère.
4. Bugs 3, 6, 7 : après le retour des relecteurs.
5. Bugs 5, 8, 9, 10, 11 : quand le reste est stable.

## Comment tester soi-même (données fictives)

- **Bug 1** : dans les réglages de l'ordinateur, mettre l'heure à 00 h 30, ouvrir la démo, enregistrer une journée, puis regarder la date dans « Mon suivi ».
- **Bug 2** : ouvrir la démo, clic droit → Inspecter → onglet « Réseau », recharger : une ligne `fonts.googleapis.com` apparaît.
- **Bug 4** : ouvrir la démo dans une fenêtre qui bloque les cookies et données de site, enregistrer une journée, recharger : elle a disparu alors que « Journée enregistrée. » s'était affiché.
