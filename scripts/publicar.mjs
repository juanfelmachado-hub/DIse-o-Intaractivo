/**
 * Compila las dos versiones del cuento y deja todo listo para publicar en
 * GitHub Pages (que sirve la carpeta dist/ de la rama main):
 *
 *   1. la versión web      → dist/
 *   2. la versión del visor (vr/) → vr/dist/ → se copia a dist/vr/
 *
 * Nunca borra nada de dist/: los paquetes .js anteriores se quedan para que
 * nadie con la página en caché vea el cuento roto.
 *
 * Uso (desde la raíz del proyecto, con `npm install` hecho en la raíz y en vr/):
 *   npm run publicar
 * Después: revisar `git status`, hacer commit y `git push`.
 */
import { execSync } from 'node:child_process';
import { cpSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, cwd) => {
    console.log(`\n> ${cmd}  (${path.relative(root, cwd) || '.'})`);
    execSync(cmd, { cwd, stdio: 'inherit' });
};

if (!existsSync(path.join(root, 'node_modules'))) throw new Error('Falta `npm install` en la raíz del proyecto.');
if (!existsSync(path.join(root, 'vr', 'node_modules'))) throw new Error('Falta `npm install` dentro de vr/.');

run('npx vite build', root);
run('npm run build', path.join(root, 'vr'));
// copiar sin borrar: los archivos nuevos se suman a los que ya están
cpSync(path.join(root, 'vr', 'dist'), path.join(root, 'dist', 'vr'), { recursive: true, force: true });
console.log('\nListo: dist/ (web) y dist/vr/ (visor) actualizados. Revisa `git status`, haz commit y `git push`.');
