/**
 * Formas de interacción ajustadas a la geometría VISIBLE de cada objeto.
 *
 * Para cada objeto se calcula una caja en SU sistema local (gira y se mueve con
 * él) a partir de las mallas que se ven: no las cajas invisibles de "hit" de la
 * web, ni sprites, brillos o halos. El contacto se mide en metros reales desde
 * la punta de los dedos hasta la superficie de esa caja.
 *
 *  - malla visual: la del cuento, sin cambios;
 *  - malla de interacción: esta caja ajustada (o, si se pide, varias cajas por
 *    parte del cuerpo, p. ej. cabeza y cuerpo de Nico);
 *  - collider físico: lo crea el sistema de físicas (Havok de IWSDK) aparte.
 */
import { Box3, Matrix4, Vector3 } from '@iwsdk/core';

const _m = new Matrix4();
const _inv = new Matrix4();
const _b = new Box3();
const _p = new Vector3();
const _q = new Vector3();

/** ¿Esta malla cuenta como parte visible del objeto? */
function visibleMesh(o, root, lenient = false) {
    if (!(o.isMesh || o.isSkinnedMesh) || o.isSprite) return false;
    if (o.userData?.hitbox || o.userData?.noInteract) return false;
    const m = o.material;
    if (!m || m.visible === false || m.blending === 2 /* aditivo: brillos */) return false;
    // una página que aparece con un fundido tiene materiales casi transparentes un instante
    if (!lenient && m.transparent && m.opacity < 0.05) return false;
    for (let p = o; p && p !== root; p = p.parent) if (p.visible === false) return false;
    return !!o.geometry;
}

/**
 * Caja local ajustada a las mallas visibles de `root` (en coordenadas de root).
 * `filter(mesh)` permite quedarse solo con algunas partes.
 */
export function fitLocalBox(root, filter = null, lenient = false) {
    const box = new Box3();
    root.updateWorldMatrix(true, true);
    _inv.copy(root.matrixWorld).invert();
    root.traverse((o) => {
        if (!visibleMesh(o, root, lenient) || (filter && !filter(o))) return;
        const g = o.geometry;
        if (o.isSkinnedMesh) {
            // malla con esqueleto: su caja en la pose actual (huesos aplicados)
            o.computeBoundingBox?.();
            _b.copy(o.boundingBox ?? g.boundingBox ?? new Box3());
        } else {
            if (!g.boundingBox) g.computeBoundingBox();
            _b.copy(g.boundingBox);
        }
        if (_b.isEmpty()) return;
        _m.multiplyMatrices(_inv, o.matrixWorld);
        _b.applyMatrix4(_m);
        box.union(_b);
    });
    // nada visible todavía (fundido de página): la geometría real, sin mirar la opacidad
    if (box.isEmpty() && !lenient) return fitLocalBox(root, filter, true);
    return box;
}

/**
 * Distancia en metros REALES desde un punto del mundo a la superficie de la caja
 * local de `obj` (0 si está dentro). `outClosest` recibe el punto más cercano.
 */
export function distanceToBox(obj, box, worldPoint, outClosest = null) {
    _p.copy(worldPoint);
    obj.worldToLocal(_p);
    _q.copy(_p).clamp(box.min, box.max);
    const inside = _q.equals(_p);
    obj.localToWorld(_q);
    if (outClosest) outClosest.copy(_q);
    return inside ? 0 : _q.distanceTo(worldPoint);
}

/** Radio de una esfera que envuelve la caja (en metros reales): descarte rápido antes de la prueba fina. */
export function boundRadius(obj, box) {
    const s = obj.getWorldScale(_p).x;
    return box.getSize(_q).length() * 0.5 * s;
}

/** Centro de la caja en el mundo. */
export function boxCenter(obj, box, out) {
    box.getCenter(out);
    return obj.localToWorld(out);
}
