/**
 * Emulador IWER: cómo se dibujan las manos (HandOcclusionSystem).
 * Antes: torre-entrar.sh y modo manos (xr set-input-mode hand).
 * Esperado con MANOS 'contorno' (el actual): occluder false y el contorno de IWSDK
 * visible (outlineMeshesInScene 2). Con MANOS 'oclusor': occluder true,
 * colorWrite false y outline 0 en las dos manos.
 */
export default async function run({ page, frame }) {
  return (frame ?? page).evaluate(() => {
    const g = window.cuento.world.globals;
    const st = g.handOcclusion.state();
    // ¿queda alguna malla de mano con el material de contorno de IWSDK en la escena?
    let outlines = 0;
    window.cuento.world.scene.traverse((o) => { if (o.isSkinnedMesh && o.visible && o.material?.uniforms?.outlineColor) outlines++; });
    return { ...st, outlineMeshesInScene: outlines, tracked: { left: g.hands.h.left.tracked, right: g.hands.h.right.tracked, kind: g.hands.h.right.kind } };
  });
}
