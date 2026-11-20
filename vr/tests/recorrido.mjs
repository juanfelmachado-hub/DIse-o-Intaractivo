/**
 * Prueba de recorrido completo en el emulador IWER (no es una prueba en el visor).
 *
 *   npx @iwsdk/cli dev up --headless --allow-browser-automation
 *   npx @iwsdk/cli xr enter --input-json '{}'
 *   npx @iwsdk/cli browser run tests/recorrido.mjs --timeout 110000   (repetir hasta "terminado")
 *
 * Cada ejecución avanza ~95 s (límite del navegador gestionado) y continúa donde quedó.
 *
 * La torre de bloques (que en el visor arma el lector) se salta con
 * tower.skip(): se prueba aparte con tests/torre-manos.sh.
 *
 * Recorre el cuento de principio a fin: portada → la sala (radar, ponerse a
 * salvo, tambor) → el pasillo (zapatos, camino, réplica, tortuga) → el patio
 * (zona segura) → cierre y vuelta a la portada. Los juegos se juegan por el
 * mismo camino que el rayo del control: VRPointer.onDown/onMove/onUp con un
 * rayo 3D real hacia el objeto, y el tambor con el mismo golpe del gatillo.
 */
export default async function run({ page, frame }) {
    const app = frame ?? page;
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

    const log = await app.evaluate(async () => {
        const R = (window.__recorrido ??= { out: [], played: [], started: false, done: false });
        const out = R.out;
        const deadline = performance.now() + 95000;
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const until = async (fn, ms = 20000, step = 100) => {
            const t0 = performance.now();
            while (performance.now() - t0 < ms) { if (fn()) return true; await sleep(step); }
            return false;
        };
        await until(() => window.cuento, 30000);
        const c = window.cuento;
        const { story, ui, pointer } = c;
        const note = (m) => out.push(`${(performance.now() / 1000).toFixed(1)}s ${m}`);
        const where = () => `${story.mode} p${story.index} b${story.beat}`;

        // --- rayo desde la cabeza hacia un punto del mundo (como el rayo del control)
        const head = () => c.viewCam.position;
        const evtTo = (w) => {
            const ray = pointer.raycaster.ray.clone();
            ray.origin.copy(head());
            ray.direction.copy(w).sub(head()).normalize();
            const p = w.clone().project(c.viewCam);
            return { ray, ndcX: p.x, ndcY: p.y, clientX: ((p.x + 1) / 2) * 1000, clientY: ((1 - p.y) / 2) * 1000, pointerId: 7, pointerType: 'xr', button: 0 };
        };
        const wp = (o) => o.getWorldPosition(head().clone());
        const local = (v) => story.scene.group.localToWorld(v.clone());
        const tap = async (o) => { const e = evtTo(wp(o)); pointer.onDown(e); await sleep(60); pointer.onUp(evtTo(wp(o))); };
        const drag = async (o, toWorld, steps = 12, ms = 70) => {
            const from = wp(o);
            pointer.onDown(evtTo(from));
            for (let i = 1; i <= steps; i++) {
                await sleep(ms);
                pointer.onMove(evtTo(from.clone().lerp(toWorld, i / steps)));
            }
            await sleep(ms);
            pointer.onUp(evtTo(toWorld));
        };

        // --- los juegos
        const games = {
            async 'juego-radar'(act) {
                await until(() => act.found, 15000);
                for (const id of act.data.hazards) { await tap(story.scene.hotspots[id]); await sleep(500); }
                note(`radar: ${act.found.size}/${act.data.hazards.length} peligros`);
                await until(() => pointer.draggables.size > 0, 8000);
                const t = story.scene.anchors.tableFront;
                await drag(story.scene.nico, local(head().clone().set(t.x, 0, t.z - 0.4)));
            },
            async 'pasos-seguros'(act) {
                await until(() => ui.onStepsGo, 15000);
                for (let i = 0; i < 12 && !act.finished; i++) { ui.onStepsGo?.(); await sleep(900); }
            },
            async 'juego-tambor'(act) {
                await until(() => ui.drumTarget, 15000);
                let last = 0;
                while (!act.finished && !act.disposed) {
                    const since = performance.now() / 1000 - act.lastBeat;
                    if (since < 0.12 && act.lastBeat !== last && !ui.el.drum.hidden) { last = act.lastBeat; ui.el.drum.onclick(); }
                    await sleep(25);
                }
                note(`tambor: ${act.taps} golpes`);
            },
            async 'juego-pasillo'(act) {
                const s = story.scene;
                const g = c.world.globals;
                await until(() => pointer.draggables.has(s.shoes) || g.shoes?.active, 20000);
                if (g.shoes?.active) {
                    // en el visor: cada zapato se lleva con una "mano" (los mismos onGrab/onHold/onRelease que usa la pinza)
                    for (const rec of [...g.shoes.list]) {
                        const hand = { point: wp(rec.shoe), quat: s.group.quaternion.clone().identity(), vel: wp(rec.shoe).set(0, 0, 0), speed: 0 };
                        rec.item.busy = true;
                        rec.item.onGrab(hand);
                        const goal = wp(rec.shoe); const q = hand.quat.clone();
                        g.shoes.footTarget(rec.side, goal, q);
                        const from = hand.point.clone();
                        for (let i = 1; i <= 30 && !rec.placed; i++) {
                            hand.point.lerpVectors(from, goal, Math.min(1, i / 20));
                            rec.item.onHold(hand, 0.016);
                            await sleep(16);
                        }
                        if (!rec.placed) { rec.item.busy = false; rec.item.onRelease(hand); }
                        await sleep(400);
                    }
                    await until(() => !g.shoes.list.length, 3000);
                    note(`pasillo: zapatos con la mano ${g.shoes.placed.length === 0 && !g.shoes.active ? 'puestos' : 'NO'}`);
                } else await drag(s.shoes, wp(s.nico));
                await until(() => !s.shoes.visible, 3000);
                note(`pasillo: zapatos ${s.shoes.visible ? 'NO' : 'puestos'}`);
                await until(() => pointer.draggables.has(s.nico), 8000);
                const walk = async () => {
                    pointer.onDown(evtTo(wp(s.nico)));
                    for (let i = 0; i < 60 && !act.arrived && pointer.drag; i++) {
                        await sleep(140);
                        pointer.onMove(evtTo(local(s.pointOnPath(Math.min(1, act.u + 0.05)))));
                    }
                    pointer.onUp(evtTo(wp(s.nico)));
                };
                await walk();
                if (!act.arrived && act.replicaDone) {
                    note('pasillo: réplica → tortuga');
                    await until(() => !ui.el.turtle.hidden, 5000);
                    ui.el.turtle.onclick();
                    await until(() => pointer.draggables.has(s.nico), 8000);
                    await walk();
                }
            },
            async 'juego-patio'(act) {
                const s = story.scene;
                await until(() => pointer.draggables.has(s.nico), 15000);
                const safe = Object.keys(act.data.zones).find((k) => act.data.zones[k].safe);
                const z = s.zones[safe];
                await drag(s.nico, local(head().clone().set(z.x, 0, z.z)));
                note(`patio: zona ${safe}`);
            },
        };

        // --- portada → abrir el libro
        if (!R.started) {
            R.started = true;
            note(`inicio ${where()}`);
            ui.el.introGo.click();
            await until(() => story.mode === 'reading' && story.beat >= 0, 20000);
            note(`libro abierto ${where()}`);
        }
        const played = { has: (id) => R.played.includes(id), add: (id) => R.played.push(id), [Symbol.iterator]: () => R.played[Symbol.iterator]() };
        let guard = 0;
        while (guard++ < 400 && performance.now() < deadline) {
            await sleep(250);
            if (story.mode === 'cover') { R.done = true; break; }
            if (story.mode !== 'reading' || c.turner.busy) continue;
            // la torre que arma el lector con las manos (solo en el visor): aquí se deja a Nico
            const tower = c.world.globals.tower;
            if (tower?.active) {
                note(`torre activa en ${where()} → «Que la termine Nico»`);
                tower.skip();
                continue;
            }
            const act = story.activity;
            if (act) {
                const id = story.page.beats[story.beat]?.instruction?.taskId;
                if (!played.has(id)) {
                    played.add(id);
                    note(`juego ${id} en ${where()}`);
                    const t0 = performance.now();
                    await games[id]?.(act);
                    await until(() => !story.activity, 30000);
                    note(`juego ${id} ${story.tasksDone().has(id) ? 'COMPLETADO' : 'NO completado'} (${((performance.now() - t0) / 1000).toFixed(1)} s)`);
                }
                continue;
            }
            const role = ui.el.next.dataset.role;
            if (role === 'next' || role === 'turn') {
                const before = where();
                const label = ui.el.next.getAttribute('aria-label');
                ui.el.next.click();
                if (role === 'turn') note(`${label} (desde ${before})`);
            }
        }
        if (R.done && !R.reported) { R.reported = true; note(`terminado: ${where()} — juegos: ${R.played.join(', ')}`); }
        return { done: R.done, at: where(), out: out.slice() };
    });
    return { ...log, errors: [...new Set(errors)].slice(0, 20) };
}
