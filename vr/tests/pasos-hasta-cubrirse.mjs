/**
 * Emulador IWER: avanza hasta «Ponerse a salvo» y completa los pasos (como tocar
 * a Nico) hasta que llega el de CUBRIRSE; ahí se detiene para probar el gesto.
 *   npx @iwsdk/cli browser run tests/pasos-hasta-cubrirse.mjs --timeout 110000
 */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const c = window.cuento, { story, ui } = c, g = c.world.globals;
        const step = () => { const v = ui.vrSteps; return v && v.phase === 'step' ? v.steps?.[v.index] : null; };
        for (let i = 0; i < 400; i++) {
            await sleep(200);
            if (g.tower?.active) g.tower.skip();
            if (story.activity?.constructor.name.includes('Step') || ui.onStepsGo) break;
            if (story.mode === 'reading' && !story.activity && ui.el.next.dataset.role === 'next') ui.el.next.click();
        }
        for (let i = 0; i < 60; i++) {
            const s = step();
            if (s?.pose === 'cover') break;
            if (s || ui.vrSteps?.phase === 'intro') { ui.onStepsGo?.(); await sleep(900); } else await sleep(250);
        }
        await sleep(400);
        const v = ui.vrSteps;
        return { at: `p${story.index} b${story.beat}`, act: story.activity?.constructor.name, phase: v?.phase, index: v?.index, poses: v?.steps?.map((s) => s.pose), gesture: g.gesture?.active };
    });
}
