# Vérification des ressources de crise

Tâche 2 de l'issue #1. Recherche faite le **26 septembre 2026** par Claude, sur la version de `index.html` du commit `4008e40` (branche `main`).

**Ce document ne remplace pas une confirmation par des personnes compétentes au Maroc.** Il dit seulement ce que les sources trouvées en ligne confirment ou contredisent. Aucune ressource n'a été modifiée dans l'app.

## Légende

- ✅ **Confirmé** : une source officielle récente dit la même chose que l'app.
- ⚠️ **Partiel** : confirmé en partie, ou seulement par une source non marocaine ou ancienne.
- ❌ **Contredit** : les sources montrent que l'information de l'app est fausse ou dépassée.
- ❓ **Non vérifié** : aucune source fiable trouvée.

## Résultats

| # | Ressource dans l'app | Où (index.html) | Statut | Ce que disent les sources |
|---|---|---|---|---|
| 1 | **Stop Silence** (Sourire de Reda), chat d'écoute, `stopsilence.net` | l. 238 (encadré de crise), l. 539 (étape 5 du plan) | ❌ **Contredit** | L'association Sourire de Reda a annoncé sa dissolution en février 2025 [1][2]. Les articles ne disent pas que le service est repris. Le 26/09/2026, `stopsilence.net` est un blog de psychologie **en espagnol, sans lien avec le Maroc ni avec Sourire de Reda** [3]. La page Stop Silence de l'association redirige vers un site sans rapport [4]. **L'app envoie donc les personnes en crise vers un site qui n'est pas le bon service.** |
| 2 | **141** — SAMU, urgences médicales | l. 177 (bandeau), l. 235, l. 539 | ⚠️ Partiel | « Allô SAMU 141 » existe depuis mars 2020, lancé pendant le Covid [5] ; en 2020, il fonctionnait 24 h/24 dans la région Marrakech-Safi [6]. Le 30/03/2026, une réforme du SAMU a été lancée en pilote dans la région Rabat-Salé-Kénitra, avec activation du 141 comme numéro national unique ; c'est présenté comme une première étape avant la généralisation [7]. L'ambassade de France (page mise à jour le 28/04/2026) indique SAMU : 141 [8]. **À vérifier : le 141 répond-il partout au Maroc aujourd'hui, et à toute heure ?** |
| 3 | **15** — Protection civile | l. 236 | ✅ Confirmé* | Protection civile (pompiers, ambulance) : 15 [8]. |
| 4 | **19** — Police secours | l. 177, l. 237, l. 539 | ✅ Confirmé* | Police : 19 ou 112 [8]. |
| 5 | **112** « depuis un mobile » | l. 177, l. 237, l. 539 | ⚠️ Partiel | 112 est confirmé comme numéro de police [8]. La précision « depuis un mobile » n'est **pas confirmée** par cette source. |
| 6 | **CHU Ibn Rochd** (Casablanca), urgences psychiatriques 24 h/24 | l. 239 | ✅ Confirmé | Le site du CHU indique un service d'accueil des urgences psychiatriques ouvert 24 h/24, pour tous les âges [9]. Page sans date. |
| 7 | **Hôpital Ar-Razi** (Salé), urgences psychiatriques 24 h/24 | l. 239 | ⚠️ Partiel | Un service d'urgences psychiatriques y a été inauguré en avril 2019 [10]. Le fonctionnement **24 h/24 n'est pas confirmé**. Le site officiel (chis.ma) n'a pas pu être ouvert. |
| 8 | **0801 000 180** = Centre antipoison (pas une ligne d'écoute) | l. 366 (pied de page) | ✅ Confirmé* | Centre antipoison et de pharmacovigilance : +212 (0) 801 00 01 80 [8]. Le site du CAPM n'a pas pu être ouvert. |

\* Source officielle, mais **française** (ambassade de France au Maroc), pas marocaine. Aucune page officielle marocaine (Protection civile, DGSN, ministère de la Santé) listant ces numéros n'a été trouvée pendant cette recherche.

Non présent dans l'app, pour information : la même source indique **177 pour la Gendarmerie** [8]. Ne pas l'ajouter sans avis compétent.

## Ce que ça change pour la pull request n°2 (`fix/crisis-resources`)

| Changement proposé par la PR #2 | Ce que disent les sources |
|---|---|
| Retirer Stop Silence | **Soutenu** : le service semble arrêté et le lien mène à un autre site. |
| Retirer CHU Ibn Rochd et Ar-Razi | **Pas soutenu** pour Ibn Rochd (confirmé 24 h/24). Ar-Razi : existence confirmée, horaires non confirmés. |
| Remplacer 141 par 15 dans le bandeau d'urgence | **Discutable** : 141 et 15 sont tous deux confirmés, pour des services différents. Choix à faire avec un clinicien. |
| Libeller 15 « SAMU et pompiers » | **Pas soutenu** : la source dit « pompiers, ambulance », pas SAMU. |
| 141 « en phase pilote à Rabat-Salé-Kénitra » | **En partie soutenu** : c'est la réforme du SAMU qui est pilotée dans cette région [7] ; le 141 existe depuis 2020 [5]. |
| Nouvelles phrases de crise en darija | **Non relues** : à faire valider (voir `docs/relecture/`). |

## État en ligne après la fusion de la PR #2 (relevé le 26/09/2026, `main` = `7fe0ad1`)

La PR #2 a été fusionnée le 26/09/2026. Voici ce que l'app affiche maintenant, comparé aux sources ci-dessus. Cette section décrit l'écart ; elle ne change rien dans l'app.

| Ce que l'app affiche | Accord avec les sources | À décider par |
|---|---|---|
| Stop Silence retiré | ✅ Soutenu [1–4] | — |
| Bandeau d'urgence : **15 · 19 · 112** (le 141 n'y est plus) | ⚠️ Choix possible, les deux numéros existent [5][8] | Warren + clinicien |
| « 15 — **SAMU et pompiers** (Protection civile) » (français) | ❌ Pas soutenu : la source dit « pompiers, ambulance », pas SAMU [8]. La version darija dit « الإسعاف والوقاية المدنية » (ambulance et Protection civile) : **le français et la darija ne disent pas la même chose.** | Warren + clinicien |
| « 141 — Allô SAMU (vérifie la disponibilité dans ta région) » et la note sur la phase pilote à Rabat-Salé-Kénitra | ⚠️ En partie : c'est la réforme du SAMU qui est pilotée dans cette région [7] ; le 141 existe depuis 2020 [5] | Warren + clinicien |
| Urgences psychiatriques (CHU Ibn Rochd, Ar-Razi) retirées | ⚠️ Ibn Rochd était confirmé 24 h/24 [9] | Warren + clinicien |
| « 112 depuis un mobile » | ⚠️ « Depuis un mobile » toujours non confirmé [8] | Personne compétente au Maroc |
| Nouvelles phrases de crise en darija | ❓ Non relues | Relecteurs darija (`docs/relecture/`) |

Dans son commentaire du 26/09/2026 sur l'issue #1, la PR #2 devait rester « non fusionnée en attendant une relecture clinique ». **Cette relecture n'est pas documentée dans le dépôt.**

## Ce qui reste à faire (par des humains)

1. ~~**Stop Silence** : retirer ce lien de l'app.~~ Fait (PR #6 et #2). Reste la migration des anciens plans enregistrés, qui ne marche pas encore (voir `docs/rapport-bugs.md`).
2. Faire confirmer par une personne compétente au Maroc (clinicien, médecin urgentiste, SAMU) :
   - si le 141 répond dans toutes les régions et à toute heure ;
   - si le 112 fonctionne depuis un fixe comme depuis un mobile ;
   - les horaires des urgences psychiatriques d'Ar-Razi.
3. Trouver, si elle existe, une ligne d'écoute psychologique marocaine active en 2026, **vérifiée** avant tout ajout.
4. Refaire cette vérification juste avant toute démonstration ou tout pilote : les services changent.

## Sources (consultées le 26 septembre 2026)

1. [Médias24, 05/02/2025 — L'association Sourire de Réda tire sa révérence après 16 ans](https://medias24.com/2025/02/05/lassociation-sourire-de-reda-tire-sa-reverence-apres-16-ans-de-bons-et-loyaux-services/)
2. [Le360, 05/02/2025 — Après 16 ans d'engagement, Sourire de Reda jette l'éponge](https://fr.le360.ma/societe/jeunes-en-detresse-apres-16-ans-dengagement-lassociation-sourire-de-reda-jette-leponge_ONMG5FCSGFBMVMAPUGJ2F6TFZM/)
3. [stopsilence.net (état le 26/09/2026)](https://www.stopsilence.net/)
4. [sourire2reda.org/stop-silence (redirige ailleurs le 26/09/2026)](https://www.sourire2reda.org/stop-silence/)
5. [H24info, 15/03/2020 — Le ministère de la Santé lance « Allô SAMU 141 »](https://www.h24info.ma/maroc/sante/le-ministere-de-la-sante-lance-allo-samu-141-un-numero-daide-medicale-urgente/)
6. [Infomédiaire, 04/04/2020 — Allô SAMU 141 dans la région Marrakech-Safi](https://www.infomediaire.net/allo-samu-141-plus-de-6-000-appels-par-jour-au-niveau-de-la-region-marrakech-safi/)
7. [Médias24, 30/03/2026 — Rabat-Salé-Kénitra lance un SAMU nouvelle génération](https://medias24.com/2026/03/30/urgences-pour-accelerer-les-transferts-de-patients-la-region-rabat-sale-kenitra-lance-un-samu-nouvelle-generation-1650775/)
8. [Ambassade de France au Maroc — En cas d'urgence (mise à jour du 28/04/2026)](https://ma.diplomatie.gouv.fr/fr/urgence)
9. [CHU Ibn Rochd — Urgences (page sans date)](https://chuibnrochd.ma/?page_id=1673)
10. [Médias24, 30/04/2019 — Salé : inauguration du service d'urgences psychiatriques de l'hôpital Arrazi](https://medias24.com/2019/04/30/sale-inauguration-du-nouveau-service-durgences-psychiatriques-de-lhopital-arrazi/)
