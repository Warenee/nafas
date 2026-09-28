# Liste de contrôle juridique, vie privée et accessibilité — Nafas

Préparée par Claude le 28 septembre 2026, à partir de `index.html` sur la branche `claude/add-instagram-reel-o33qat` (base `main`, commit `f62a673`).

Point de départ : la liste « 20 things to have Claude do so your app doesn't get sued » (reel Instagram, capture envoyée par Warren). Cette liste vise surtout des applications commerciales. Elle ne tient pas compte du droit marocain.

**Ce document n'est pas un avis juridique.** Il ne dit pas que Nafas est conforme, sécurisé ou autorisé. Il décrit ce que contient le code aujourd'hui, et pose des questions à faire trancher par les bonnes personnes. Tout ce qui touche au droit est marqué **non vérifié**.

Qui décide :
- **Juriste** : spécialiste marocain du droit et de la vie privée (loi 09-08, CNDP).
- **Clinicien** : psychologue ou psychiatre.
- **Sécurité** : ingénieur sécurité.
- **Warren** : porteur du projet.

## 1. Ce que fait la démo aujourd'hui (constaté dans le code)

- **Aucun serveur, aucun compte, aucun envoi.** Aucun `fetch`, aucun formulaire envoyé, aucun script ni police externe.
- **Pas de cookie.** La démo utilise le `localStorage` du navigateur avec 6 clés : `nafas-entries` (journal), `nafas-q` (questionnaires), `nafas-plan` (plan de sécurité), `nafas-lang`, `nafas-theme` et `nafas-tab`.
- **Hébergement : GitHub Pages.** GitHub peut enregistrer des informations techniques sur les visiteurs, comme l'adresse IP. **Non vérifié** : à lire dans la politique de confidentialité de GitHub.
- **Pied de page** : adresse e-mail de contact, rappel « prototype », mention CNDP / loi 09-08 et hébergement au Maroc.

## 2. Les 20 points

| # | Point | État dans Nafas | À faire | Qui décide |
|---|---|---|---|---|
| 1 | Politique de confidentialité | Absente. Le pied de page a seulement un résumé en une phrase. | Pour la démo : décider s'il faut une page « Tes données » factuelle (ce qui est stocké, où, comment l'effacer). Pour une version réelle : texte rédigé ou validé par un juriste. | Juriste, Warren |
| 2 | Conditions d'utilisation | Absentes | Idem : rédaction par un juriste avant tout usage réel | Juriste |
| 3 | Politique de remboursement | Sans objet : rien n'est payant | Aucun | — |
| 4 | Politique de cookies | Pas de cookie, mais du `localStorage` | Demander si le `localStorage` exige une information ou un consentement au Maroc (**non vérifié**) | Juriste |
| 5 | Bandeau de consentement cookies | Absent | Dépend du point 4. Ne pas ajouter de bandeau « par réflexe » avant la réponse. | Juriste |
| 6 | Consentements dans les formulaires | Aucune case de consentement. Les formulaires enregistrent des données de santé fictives. | Pour une version réelle : consentement explicite aux données de santé, à définir par un juriste et un clinicien | Juriste, Clinicien |
| 7 | Pas de données inutiles | Plutôt respecté : pas de nom, pas d'e-mail, pas de localisation. Les notes libres peuvent contenir n'importe quoi. | Liste des données par écran, à valider | Warren, Juriste |
| 8 | Audit des SDK tiers | Aucun SDK ni script externe | Garder cette règle. Revérifier à chaque ajout. | Warren, Sécurité |
| 9 | Pas de « dark patterns » (interfaces trompeuses) | Rien de trompeur repéré dans les boutons. Voir cependant le point 12. | — | Warren |
| 10 | Frais cachés | Sans objet | Aucun | — |
| 11 | Faux avis | Aucun avis. Les patients de l'espace praticien sont fictifs. | Vérifier qu'ils sont clairement présentés comme fictifs | Warren |
| 12 | Affirmations non prouvées | **À revoir** : voir la section 3 | Relecture des phrases listées | Clinicien, Warren |
| 13 | Textes alternatifs (accessibilité) | Pas d'images. Les deux grands graphiques ont une description (`aria-label`). Les mini-courbes de l'espace praticien (fonction `spark`) n'en ont pas. | Petit correctif technique possible | Warren |
| 14 | Contraste des couleurs | Bon. Le texte le plus pâle en mode sombre atteint 5,35:1, au-dessus du seuil de 4,5:1 (critère WCAG AA). | Tester aussi le mode clair | Warren |
| 15 | Navigation au clavier | Présente : lien « Aller au contenu », flèches entre les onglets (sens inversé en darija), contour de focus visible | Faire un test complet à la main | Warren |
| 16 | Coordonnées du responsable | E-mail de contact dans le pied de page | Pour une version réelle : identité du responsable du traitement, à définir avec un juriste | Juriste, Warren |
| 17 | Consentement pour les mineurs | Rien dans la démo. Question ouverte. | Âge minimum ? Accord des parents ? Parcours clinique différent ? | Juriste, Clinicien, Warren |
| 18 | Lien de désinscription des e-mails | Sans objet : aucun e-mail envoyé | Aucun | — |
| 19 | Licences des polices et images | Polices du téléphone uniquement, aucune image | Aucun | — |
| 20 | Demande de suppression des données | Pas de bouton « effacer mes données ». Il faut passer par les réglages du navigateur. | Déjà prévu : idée n° 1 de `docs/fonctionnalites.md` (« voir, exporter, effacer ») | Warren (pour la démo), Juriste (pour une version réelle) |

## 3. Phrases à faire relire (point 12)

Rien n'est envoyé, donc dans la démo le praticien ne voit pas les données saisies sur le téléphone du patient. Pourtant, certaines phrases laissent entendre le contraire :

| Ligne de `index.html` | Texte actuel | Pourquoi le relire |
|---|---|---|
| 234 | « Ton psychologue et ton psychiatre voient l'évolution… » | Dans la démo, rien n'est transmis au praticien |
| 622 | « Ton praticien voit s'il… » (statut du plan de sécurité) | Même problème. Cela touche aussi au plan de sécurité. |
| 305 | « Des échelles validées, utilisées dans le monde entier. » | Affirmation clinique : validées pour quelle population ? Et en darija ? |

Ces textes sont liés au contenu clinique ou à la sécurité : **ne pas les réécrire sans un clinicien.**

## 4. Questions pour le juriste

1. Le `localStorage` d'un site de démo, sans données réelles, demande-t-il une information ou un consentement au Maroc ?
2. Quels documents faut-il avant un pilote avec de vrais patients : politique de confidentialité, conditions d'utilisation, formulaire de consentement, déclaration ou autorisation CNDP ?
3. Qui est le « responsable du traitement » : Warren, l'école ou le praticien ?
4. Quelles règles s'appliquent aux mineurs ?
5. Quelles exigences d'hébergement s'appliquent aux données de santé ?
6. L'hébergement GitHub Pages pose-t-il un problème, même pour une démo ?
