/**
 * Emulador IWER: estado de la maqueta (colocación, posición, escala) y del cuento.
 *   npx @iwsdk/cli browser run tests/estado-maqueta.mjs
 */
export default async function run({ page, frame }) {
    const app = frame ?? page;
    return app.evaluate(() => {
        const c = window.cuento;
        const w = c.world;
        const d = c.diorama;
        const r = (v) => +v.toFixed(3);
        const head = w.camera.getWorldPosition(d.position.clone());
        return {
            placing: !!w.globals.placing,
            diorama: { visible: d.visible, x: r(d.position.x), y: r(d.position.y), z: r(d.position.z), yawDeg: r(d.rotation.y * 180 / Math.PI), scale: r(d.scale.x) },
            nicoCm: c.story.scene?.nico ? r(0.95 * d.scale.x * 100) : null,
            head: { x: r(head.x), y: r(head.y), z: r(head.z) },
            player: { s: r(w.player.scale.x), x: r(w.player.position.x), z: r(w.player.position.z) },
            background: w.scene.background ? 'color' : 'passthrough',
            story: `${c.story.mode} p${c.story.index} b${c.story.beat}`,
            panels: ['story-panel', 'menu-panel'].map((id) => w.getSceneObject(id)?.visible),
        };
    });
}
