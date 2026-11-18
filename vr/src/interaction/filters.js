/**
 * Filtro One Euro (Casiez, Roussel y Vogel, CHI 2012) para posiciones 3D.
 *
 * Suaviza mucho cuando la mano está casi quieta (quita el temblor del tracking)
 * y casi nada cuando se mueve rápido (sin retraso perceptible): el corte del
 * filtro pasa-bajos sube con la velocidad.
 *
 *   corte = MIN_CUTOFF + BETA · |velocidad filtrada|
 */
import { Vector3 } from '@iwsdk/core';

function alpha(cutoff, dt) {
    const tau = 1 / (2 * Math.PI * cutoff);
    return 1 / (1 + tau / dt);
}

export class OneEuro3 {
    /**
     * @param {number} minCutoff Hz con la mano quieta (más bajo = más suave).
     * @param {number} beta cuánto sube el corte con la velocidad (m/s → Hz).
     * @param {number} dCutoff Hz del filtro de la velocidad.
     */
    constructor(minCutoff = 1.6, beta = 18, dCutoff = 1.2) {
        this.minCutoff = minCutoff;
        this.beta = beta;
        this.dCutoff = dCutoff;
        this.x = new Vector3();
        this.dx = new Vector3();
        this._raw = new Vector3();
        this._d = new Vector3();
        this.has = false;
    }

    reset() { this.has = false; this.dx.set(0, 0, 0); }

    /** Filtra `v` en su lugar y lo devuelve. */
    filter(v, dt) {
        if (!this.has || dt <= 0) {
            this.x.copy(v);
            this.dx.set(0, 0, 0);
            this.has = true;
            return v;
        }
        this._d.copy(v).sub(this.x).divideScalar(dt);
        this.dx.lerp(this._d, alpha(this.dCutoff, dt));
        const cutoff = this.minCutoff + this.beta * this.dx.length();
        this.x.lerp(v, alpha(cutoff, dt));
        return v.copy(this.x);
    }
}
