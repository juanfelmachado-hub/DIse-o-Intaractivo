/**
 * Capas aditivas sobre lo que anima el cuento.
 *
 * El cuento original mueve a Nico y al Guardián cada cuadro (resortes,
 * seguimiento, animaciones). Las reacciones a las manos se SUMAN encima sin
 * pelear con eso: StorySystem quita todas las capas antes de actualizar el
 * cuento y las vuelve a poner después. Así una reacción nunca rompe una
 * animación narrativa, y al terminar desaparece sin dejar rastro.
 */
import { Quaternion, Vector3 } from '@iwsdk/core';

export class Layers {
    constructor() {
        this.items = new Set();
    }
    add(layer) { this.items.add(layer); return layer; }
    remove(layer) { layer.undo(); this.items.delete(layer); }
    undo() { for (const l of this.items) l.undo(); }
    apply() { for (const l of this.items) l.apply(); }
}

/** Desplazamiento de posición (en el sistema del padre) + escala relativa + giro. */
export class OffsetLayer {
    constructor(object) {
        this.object = object;
        this.pos = new Vector3(); // deseado
        this.scale = new Vector3(1, 1, 1);
        this.rot = new Quaternion();
        this._pos = new Vector3(); // aplicado
        this._scale = new Vector3(1, 1, 1);
        this._rot = new Quaternion();
        this._inv = new Quaternion();
        this.applied = false;
    }
    undo() {
        if (!this.applied) return;
        const o = this.object;
        o.position.sub(this._pos);
        o.scale.divide(this._scale);
        o.quaternion.multiply(this._inv.copy(this._rot).invert());
        this.applied = false;
    }
    apply() {
        if (this.applied) return;
        const o = this.object;
        this._pos.copy(this.pos);
        this._scale.copy(this.scale);
        this._rot.copy(this.rot);
        o.position.add(this._pos);
        o.scale.multiply(this._scale);
        o.quaternion.multiply(this._rot);
        this.applied = true;
    }
    get idle() {
        return this.pos.lengthSq() < 1e-10 && Math.abs(this.scale.x - 1) + Math.abs(this.scale.y - 1) + Math.abs(this.scale.z - 1) < 1e-5 && Math.abs(this.rot.w) > 0.99999;
    }
}
