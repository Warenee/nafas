// Vérifie que le vérificateur échoue bien sur des copies modifiées de index.html (fichiers temporaires).
// Lancer : node --test outils/verif-crise.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const script = new URL('verif-crise.mjs', import.meta.url).pathname;
const original = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const dossier = mkdtempSync(join(tmpdir(), 'verif-crise-'));

function lancer(modif) {
  const f = join(dossier, 'index.html');
  writeFileSync(f, modif(original));
  return spawnSync(process.execPath, [script, f], { encoding: 'utf8' });
}
function remplacer(de, vers) {
  return h => { assert.ok(h.includes(de), `introuvable : ${de}`); return h.replace(de, vers); };
}

test('passe sur index.html tel quel', () => {
  assert.equal(lancer(h => h).status, 0);
});
test('échoue si un numéro du bandeau change', () => {
  const r = lancer(remplacer('<b>19</b>', '<b>18</b>'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /bandeau_disc/);
  assert.match(r.stderr, /absent du registre.*18/);
});
test('échoue si un texte darija de crise change', () => {
  const r = lancer(remplacer('c_19:"البوليس"', 'c_19:"البوليس!"'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /darija/);
});
test('échoue si une clé de crise n\'a pas de darija', () => {
  const r = lancer(remplacer('</footer>', '<p data-i18n="c_test">Texte</p></footer>'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /Clé de crise sans darija : c_test/);
});
test('échoue si l\'étape 6 du plan change', () => {
  const r = lancer(remplacer('Rendre mon environnement plus sûr', 'Rendre mon environnement sûr'));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /plan_etapes_5_6/);
});
