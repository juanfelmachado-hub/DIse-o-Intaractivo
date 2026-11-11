/** Emulador IWER: costo de dibujo en la escena actual (no mide el rendimiento del visor). */
export default async function run({ page, frame }) {
    return (frame ?? page).evaluate(async () => {
        const c = window.cuento; const r = c.world.renderer;
        const { story, ui } = c;
        if (story.mode === 'cover') { ui.el.introGo.click(); await new Promise((res) => setTimeout(res, 9000)); }
        const info = r.info;
        const a = info.render.frame; const t0 = performance.now();
        await new Promise((res) => setTimeout(res, 2000));
        const fps = (info.render.frame - a) / ((performance.now() - t0) / 1000);
        return {
            escena: `${story.mode} p${story.index}`,
            vr: r.xr.isPresenting,
            llamadas: info.render.calls, triangulos: info.render.triangles,
            geometrias: info.memory.geometries, texturas: info.memory.textures, programas: info.programs?.length,
            sombra: c.env.sun.shadow.mapSize.x, pixelRatio: r.getPixelRatio(), fpsEmulador: +fps.toFixed(1),
            foveacion: r.xr.getFoveation?.(),
        };
    });
}
