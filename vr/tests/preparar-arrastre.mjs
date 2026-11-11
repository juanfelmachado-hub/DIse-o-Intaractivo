/** Emulador IWER: posición (espacio XR) de Nico y del destino bajo la mesa, para arrastrar con el control. */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(() => {
        const c = window.cuento; const s = c.story.scene; const p = c.world.player;
        p.updateMatrixWorld(true);
        const V = c.viewCam.position.constructor;
        const r = (v) => { const l = p.worldToLocal(v); return { x: +l.x.toFixed(3), y: +l.y.toFixed(3), z: +l.z.toFixed(3) }; };
        const t = s.anchors.tableFront;
        return { nico: r(s.nico.hit.getWorldPosition(new V())), destino: r(s.group.localToWorld(new V(t.x, 0, t.z - 0.4))), drags: c.pointer.draggables.size };
    });
}
