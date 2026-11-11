/**
 * Emulador IWER: abre el libro y avanza hasta el juego del radar; devuelve la
 * posición de los 4 peligros en el espacio de referencia XR (el que usan los
 * comandos `xr look-at`), para apuntarles con el control emulado.
 *   npx @iwsdk/cli browser run tests/preparar-radar.mjs
 */
export default async function run({ page, frame }) {
    const app = frame ?? page;
    return app.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const c = window.cuento;
        const { story, ui } = c;
        if (story.mode === 'cover') ui.el.introGo.click();
        for (let i = 0; i < 400 && !(story.activity?.found); i++) {
            await sleep(150);
            if (story.mode === 'reading' && !story.activity && ui.el.next.dataset.role === 'next') ui.el.next.click();
        }
        await sleep(1500);
        const player = c.world.player;
        player.updateMatrixWorld(true);
        const out = {};
        for (const id of story.activity.data.hazards) {
            const w = story.scene.hotspots[id].getWorldPosition(c.viewCam.position.clone());
            const l = player.worldToLocal(w);
            out[id] = { x: +l.x.toFixed(3), y: +l.y.toFixed(3), z: +l.z.toFixed(3) };
        }
        return { at: `${story.mode} p${story.index} b${story.beat}`, found: story.activity.found.size, targets: out };
    });
}
