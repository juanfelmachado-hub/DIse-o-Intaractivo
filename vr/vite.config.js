/**
 * Vite para la versión VR (Meta Quest 3) de «Nico y su guardián personal».
 *
 * iwsdk.config.json es la autoridad del proyecto; aquí solo se conecta el
 * plugin de IWSDK y se comparte el cuento original sin copiarlo:
 *  - el código del cuento vive en ../src (el mismo de la versión web);
 *  - los modelos, audios y texturas originales viven en ../static y se sirven
 *    (y se copian al compilar) tal cual, sin duplicarlos en el repositorio.
 * `dedupe` obliga a que ../src use el mismo Three.js (super-three de IWSDK) y
 * el mismo GSAP que la app VR: una sola instancia de cada uno.
 */
import { iwsdkDev } from '@iwsdk/vite-plugin-dev';
import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const STATIC = path.resolve(here, '../static');
const SHARED = ['models', 'audio', 'textures'];
const TYPES = { '.glb': 'model/gltf-binary', '.mp3': 'audio/mpeg', '.jpg': 'image/jpeg', '.png': 'image/png' };

/** Sirve ../static/{models,audio,textures} en desarrollo y lo copia a dist/. */
function originalStatic() {
    let outDir = 'dist';
    return {
        name: 'cuento-static',
        configResolved(c) { outDir = path.resolve(c.root, c.build.outDir); },
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const url = decodeURIComponent((req.url ?? '').split('?')[0]);
                const top = url.split('/')[1];
                if (!SHARED.includes(top)) return next();
                const file = path.join(STATIC, url);
                if (!file.startsWith(STATIC) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
                res.setHeader('Content-Type', TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream');
                fs.createReadStream(file).pipe(res);
            });
        },
        closeBundle() {
            for (const dir of SHARED) fs.cpSync(path.join(STATIC, dir), path.join(outDir, dir), { recursive: true });
            // las guías AGENTS.md de public/ son para el desarrollo, no se publican
            for (const f of fs.readdirSync(outDir, { recursive: true })) if (path.basename(f) === 'AGENTS.md') fs.rmSync(path.join(outDir, f));
        },
    };
}

export default defineConfig({
    plugins: [iwsdkDev(), originalStatic()],
    server: { host: '0.0.0.0', port: 8081, open: false, fs: { allow: ['..'] } },
    build: {
        outDir: 'dist',
        sourcemap: process.env.NODE_ENV !== 'production',
        target: 'esnext',
        rollupOptions: { input: './index.html' },
        chunkSizeWarningLimit: 4000,
    },
    esbuild: { target: 'esnext' },
    // @drawcall/uikitml otherwise pulls a second three/@pmndrs/uikit graph
    // (its own three vs the app's super-three alias). Duplicate Component classes break
    // instanceof checks → "Only pmndrs/uikit components can be added as children".
    // three y gsap: el código compartido de ../src resuelve la misma copia que vr/.
    resolve: {
        dedupe: [
            'three',
            'gsap',
            '@pmndrs/uikit',
            '@pmndrs/uikit-horizon',
            '@pmndrs/uikit-lucide',
        ],
    },
    optimizeDeps: {
        exclude: ['@babylonjs/havok'],
        include: [
            'three',
            'gsap',
            '@pmndrs/uikit',
            '@pmndrs/uikit-horizon',
            '@pmndrs/uikit-lucide',
            '@drawcall/uikitml',
        ],
        esbuildOptions: { target: 'esnext' },
    },
    publicDir: 'public',
    base: './',
});
