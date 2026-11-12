/**
 * Emulador IWER: estado de la torre, las manos, el panel y las reacciones.
 *   npx @iwsdk/cli browser run tests/estado-manos.mjs
 */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(() => {
        const c = window.cuento, g = c.world.globals, r = (v) => (v ? { x: +v.x.toFixed(3), y: +v.y.toFixed(3), z: +v.z.toFixed(3) } : null);
        const h = (s) => { const x = g.hands?.h[s]; return x && { tracked: x.tracked, kind: x.kind, grab: x.grab, point: r(x.point), pinch: +x.pinchDist.toFixed(3) }; };
        const sc = c.story.scene;
        return {
            story: `${c.story.mode} p${c.story.index} b${c.story.beat}`, blocked: c.story.blocked,
            tower: { active: g.tower?.active, height: g.tower?.height, canSkip: g.tower?.canSkip },
            blocks: sc?.blocks?.map((b) => r(b.getWorldPosition(b.position.clone()))),
            interact: [...(g.interact?.items ?? [])].map((i) => i.kind),
            hands: { left: h('left'), right: h('right') },
            mission: c.ui.mission?.short ?? null, talk: c.ui.talk?.text ?? null,
            panelHidden: g.panel?.hidden, guardian: g.reactions?.guardian.state, nico: g.reactions?.nico.state,
        };
    });
}
