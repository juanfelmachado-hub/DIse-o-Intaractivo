# «Nico y su guardián personal» — guía para trabajar en el proyecto

Cuento interactivo 3D sobre qué hacer en un temblor (proyecto *El susurro de la
Tierra*). Hay dos versiones que comparten el mismo cuento:

| Versión | Carpeta | Tecnología | Se publica en |
| --- | --- | --- | --- |
| Web (pantalla) | `src/`, `static/` | Three.js + GSAP + Vite | `dist/` → https://juanfelmachado-hub.github.io/DIse-o-Intaractivo/ |
| Visor (Meta Quest 3, realidad mixta) | `vr/` | Immersive Web SDK (IWSDK) + WebXR | `dist/vr/` → https://juanfelmachado-hub.github.io/DIse-o-Intaractivo/dist/vr/ |

Detalles de cada una: `README.md` (raíz) y `vr/README.md`. Para el trabajo con
IWSDK, leer también `vr/AGENTS.md` (se carga desde `vr/CLAUDE.md`).

Todos los textos que ve el usuario (y los comentarios del código) van en español.

## Antes de empezar (cada vez)

1. `git pull` — varias personas trabajan en el mismo repositorio, desde distintos
   computadores. Empezar siempre desde lo último que hay en GitHub.
2. Si es la primera vez en este computador: `npm install` en la raíz **y** dentro de
   `vr/` (Node 20.19+, 22.12+ o 24).

## Cómo correrlo

- Web: `npm run dev` en la raíz.
- Visor: `cd vr` y `npm run dev` (abre el navegador gestionado de IWSDK con el
  emulador IWER). Para probar en un Quest real: `npx @iwsdk/cli dev status` muestra
  la URL de la red local; abrirla en el visor, en el mismo Wi-Fi.

## Cómo está armado (lo que no es obvio)

- **El cuento es uno solo.** `vr/` no copia el cuento: importa el código de `../src`
  y los recursos de `../static`. Un cambio en `src/` cambia **las dos** versiones.
- **Lo propio del visor va en `vr/src/systems/`.** Cuando el visor necesita otro
  comportamiento, el sistema de `vr/` reemplaza el método del cuento solo en modo
  inmersivo (por ejemplo `HallwayActivity.prototype.update`) y lo restaura en
  `cleanupFuncs`. Así la web no cambia. No editar `src/` para algo que es solo del
  visor, salvo que se pida cambiar también la web.
- **Capas** (`vr/src/interaction/layers.js`): lo que hacen las manos (levantar a Nico,
  empujar al Guardián) se suma encima de la animación del cuento y se deshace cada
  cuadro. No mover directamente la posición/rotación de un personaje desde un
  sistema del visor: usar una capa.
- **Un solo agarre 3D** (`vr/src/interaction/carry.js`) para Nico, los zapatos y lo
  que se arrastra en los juegos.
- Para saber si una mano es mano o control: `world.globals.hands.h[lado].kind`
  (`'hand'` / `'controller'`). **No** usar `input.xr.gamepads[lado]`: IWSDK también
  crea un "gamepad" para cada mano.

## Probar antes de decir que funciona

- Los guiones de `vr/tests/` manejan el emulador (ver la tabla «Pruebas» de
  `vr/README.md`). El básico: `npx @iwsdk/cli dev up --headless
  --allow-browser-automation`, luego `bash tests/torre-entrar.sh` y
  `bash tests/recorrido.sh` (recorre los 5 juegos de principio a fin).
- En macOS los guiones se corren con `bash`, no con `zsh`.
- Editar un archivo de `vr/src` recarga la página del emulador: hay que volver a
  entrar (`bash tests/torre-entrar.sh`).
- El emulador no prueba lo físico (temblor de la mano, comodidad, fps reales): eso
  se dice como pendiente de probar en el visor, no como probado.

## Publicar (subir a GitHub Pages)

GitHub Pages publica automáticamente la rama `main` (flujo
`.github/workflows/static.yml`) y sirve la carpeta `dist/`, que sí está en el repositorio.

1. `git pull`
2. `npm run publicar` — compila la web en `dist/` y el visor en `vr/dist/`, y lo copia
   a `dist/vr/`.
3. Revisar `git status`, hacer commit y `git push` a `main`.
4. Esperar 1–2 minutos y comprobar que la página carga el `index-XXXX.js` nuevo.

Reglas:

- **Nunca borrar archivos de `dist/`** (ni `rsync --delete`, ni vaciar la carpeta):
  GitHub Pages guarda `index.html` 10 minutos en caché y, si el `.js` anterior ya no
  existe, quien tenga la página abierta ve el cuento roto. Por eso
  `vite.config.js` tiene `emptyOutDir: false`.
- Si el despliegue falla con «No artifacts named github-pages», es un fallo
  temporal de GitHub: volver a ejecutarlo (pestaña Actions → *Re-run*, o un commit
  vacío: `git commit --allow-empty -m "Volver a publicar"` y `git push`).
- Usar la identidad de git configurada en ese computador; no cambiarla.
- **Credenciales**: Claude nunca escribe contraseñas ni tokens. Si `git push` pide
  iniciar sesión, la persona lo hace ella misma (`gh auth login` o la ventana de
  GitHub), con una cuenta que sea colaboradora del repositorio.
- Subir solo cuando la persona lo pida.
