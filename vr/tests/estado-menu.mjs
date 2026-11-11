export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(() => {
        const c = window.cuento; const w = c.world; const p = w.player;
        return { modo: c.story.mode, pausa: !!w.globals.cuentoPaused, menu: w.getSceneObject('menu-panel').visible, panel: w.getSceneObject('story-panel').visible, escalaPanel: +w.getSceneObject('story-panel').scale.x.toFixed(4), giro: +(p.rotation.y * 180 / Math.PI).toFixed(1), lugar: w.globals.placement && w.queryManager ? undefined : undefined, vr: w.renderer.xr.isPresenting };
    });
}
