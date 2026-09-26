// Vérificateur des textes de crise (assistant B1, docs/fonctionnalites.md).
// Il SIGNALE seulement : il ne corrige, ne propose et ne remplace jamais aucun texte ni numéro.
//
//   node outils/verif-crise.mjs                  → vérifie index.html
//   node outils/verif-crise.mjs autre.html       → vérifie un autre fichier (utilisé par le test)
//   node outils/verif-crise.mjs --ecrire-reference
//       → recopie les textes actuels dans docs/crise-reference.json.
//         À lancer SEULEMENT après validation par un clinicien et un relecteur darija.
import { readFileSync, writeFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const RACINE = new URL('..', import.meta.url);
const REFERENCE = new URL('docs/crise-reference.json', RACINE);
const REGISTRE = new URL('docs/verification-ressources-crise.md', RACINE);

const args = process.argv.slice(2);
const ecrire = args.includes('--ecrire-reference');
const cible = args.find(a => !a.startsWith('--')) ?? new URL('index.html', RACINE);
const html = readFileSync(cible, 'utf8');

// Trouve un morceau du fichier, ou arrête tout si la structure a changé.
function trouver(re, nom) {
  const m = html.match(re);
  if (!m) { console.error(`✗ Introuvable dans index.html : ${nom}. La structure a changé, vérifier le script.`); process.exit(1); }
  return m[1] ?? m[0];
}
// Évalue une valeur JavaScript écrite dans index.html (objet ou tableau de textes), sans l'exécuter dans la page.
const valeur = (re, nom) => runInNewContext('(' + trouver(re, nom) + ')');

const DA = valeur(/const DA=(\{[\s\S]*?\n\});/, 'const DA');
const PLAN = valeur(/const PLAN=(\[[\s\S]*?\n\]);/, 'const PLAN');
const PLAN5_DEFAULT = valeur(/const PLAN5_DEFAULT=(\{[\s\S]*?\n\});/, 'const PLAN5_DEFAULT');
const estCle = k => k === 'disc' || k.startsWith('c_');

const actuel = {
  bandeau_disc: trouver(/<div class="disc" id="disc">[\s\S]*?<\/div>/, 'bandeau #disc'),
  encadre_crisis: trouver(/<div class="crisis" id="crisis"[\s\S]*?<\/div>/, 'encadré #crisis'),
  darija: Object.fromEntries(Object.entries(DA).filter(([k]) => estCle(k))),
  plan_etapes_5_6: PLAN.filter(s => s.k === '5' || s.k === '6'),
  PLAN5_DEFAULT,
};

if (ecrire) {
  writeFileSync(REFERENCE, JSON.stringify(actuel, null, 2) + '\n');
  console.log('Référence écrite : docs/crise-reference.json. Vérifier le diff avant de l\'envoyer.');
  process.exit(0);
}

const erreurs = [];
const reference = JSON.parse(readFileSync(REFERENCE, 'utf8'));

// 1. Textes identiques à la référence.
const texte = v => JSON.stringify(v, null, 2);
for (const nom of new Set([...Object.keys(reference), ...Object.keys(actuel)])) {
  if (texte(reference[nom]) !== texte(actuel[nom]))
    erreurs.push(`Texte de crise modifié : « ${nom} »\n    référence : ${texte(reference[nom])}\n    actuel    : ${texte(actuel[nom])}`);
}

// 2. Chaque numéro affiché figure en gras (**15**) dans le registre de vérification.
const registre = readFileSync(REGISTRE, 'utf8');
const sansBalises = s => s.replace(/<[^>]*>/g, ' ');
const visible = [
  sansBalises(actuel.bandeau_disc), sansBalises(actuel.encadre_crisis),
  sansBalises(trouver(/<footer>[\s\S]*?<\/footer>/, 'pied de page')),
  ...Object.values(actuel.darija), ...Object.values(PLAN5_DEFAULT), texte(actuel.plan_etapes_5_6),
].join('\n');
// Suites de chiffres (espaces permis : « 0801 000 180 »), au moins 2 chiffres, pas collées à un tiret (« loi 09-08 »).
const numeros = new Set([...visible.matchAll(/(?<![\d-])\d+(?: \d+)*(?![\d-])/g)].map(m => m[0]).filter(n => n.replace(/ /g, '').length >= 2));
for (const n of numeros)
  if (!registre.includes(`**${n}**`)) erreurs.push(`Numéro affiché absent du registre docs/verification-ressources-crise.md : ${n}`);

// 3. Chaque clé de crise française (data-i18n) a sa version darija, et inversement.
const cleFR = new Set([...html.matchAll(/data-i18n="([\w]+)"/g)].map(m => m[1]).filter(estCle));
const cleDA = new Set(Object.keys(actuel.darija));
for (const k of cleFR) if (!cleDA.has(k)) erreurs.push(`Clé de crise sans darija : ${k}`);
for (const k of cleDA) if (!cleFR.has(k)) erreurs.push(`Clé de crise darija sans français : ${k}`);
for (const s of PLAN) if ((s.k === '5' || s.k === '6') && !(s.fr && s.da)) erreurs.push(`Étape ${s.k} du plan : français ou darija manquant`);
if (!(PLAN5_DEFAULT.fr && PLAN5_DEFAULT.da)) erreurs.push('PLAN5_DEFAULT : français ou darija manquant');

if (erreurs.length) {
  console.error(`✗ ${erreurs.length} problème(s) sur les textes de crise :\n`);
  erreurs.forEach(e => console.error('- ' + e + '\n'));
  console.error('Ce script ne corrige rien. Tout changement doit être relu par un clinicien (et un relecteur darija),\npuis la référence mise à jour avec --ecrire-reference dans la même pull request.');
  process.exit(1);
}
console.log(`✓ Textes de crise identiques à la référence ; ${numeros.size} numéros présents dans le registre (${[...numeros].join(', ')}) ; clés FR/darija appariées.`);
