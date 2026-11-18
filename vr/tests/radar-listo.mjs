/**
 * Emulador IWER: deja el radar listo para llevar a Nico con la mano.
 * Salta la torre, avanza hasta el radar, marca los 4 peligros (rayo) y
 * devuelve dónde está Nico (centro de su caja de interacción) y el destino
 * bajo la mesa, en coordenadas del mundo (= espacio XR: el jugador está en el origen).
 *   npx @iwsdk/cli browser run tests/radar-listo.mjs --timeout 110000
 */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const until = async (fn, ms = 20000) => { const t0 = performance.now(); while (performance.now() - t0 < ms) { if (fn()) return true; await sleep(100); } return false; };
        const c = window.cuento, { story, ui, pointer } = c, g = c.world.globals;
        if (story.mode === 'cover') ui.el.introGo.click();
        await until(() => story.mode === 'reading');
        await until(() => g.tower?.active || story.beat > 0, 5000);
        if (g.tower?.active) g.tower.skip();
        for (let i = 0; i < 400 && !(story.activity?.found); i++) {
            await sleep(150);
            if (story.mode === 'reading' && !story.activity && ui.el.next.dataset.role === 'next') ui.el.next.click();
        }
        const act = story.activity;
        const head = () => c.viewCam.position;
        const evtTo = (w) => {
            const ray = pointer.raycaster.ray.clone();
            ray.origin.copy(head()); ray.direction.copy(w).sub(head()).normalize();
            const p = w.clone().project(c.viewCam);
            return { ray, ndcX: p.x, ndcY: p.y, clientX: ((p.x + 1) / 2) * 1000, clientY: ((1 - p.y) / 2) * 1000, pointerId: 7, pointerType: 'xr', button: 0 };
        };
        const wp = (o) => o.getWorldPosition(head().clone());
        for (const id of act.data.hazards) { const o = story.scene.hotspots[id]; pointer.onDown(evtTo(wp(o))); await sleep(60); pointer.onUp(evtTo(wp(o))); await sleep(500); }
        await until(() => pointer.draggables.size > 0, 8000);
        await sleep(600);
        const item = [...g.interact.items].find((i) => i.kind === 'nico' || i.kind === 'drag');
        const r = (v) => ({ x: +v.x.toFixed(4), y: +v.y.toFixed(4), z: +v.z.toFixed(4) });
        const center = item ? item.box.getCenter(head().clone()) : null;
        if (center) item.object.localToWorld(center);
        const t = story.scene.anchors.tableFront;
        const dest = story.scene.group.localToWorld(head().clone().set(t.x, 0, t.z - 0.4));
        return { at: `p${story.index} b${story.beat}`, found: act.found.size, drags: pointer.draggables.size, items: [...g.interact.items].map((i) => i.kind), nico: center && r(center), dest: r(dest), k: c.diorama.scale.x };
    });
}
