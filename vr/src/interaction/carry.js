/**
 * Carry — manipulación 3D común (Nico, zapatos y lo que se arrastra en los juegos).
 *
 * Un solo comportamiento para todo lo que se agarra con la pinza:
 *  - se toma desde el punto donde se pellizcó: el objeto guarda su posición y su
 *    giro RELATIVOS a la mano (no salta al centro de la mano);
 *  - mientras se sostiene sigue a la mano en X, Y y Z y gira con ella en los tres
 *    ejes, con un suavizado exponencial (sin vibración ni saltos);
 *  - nunca baja más que la superficie de abajo (la página o el piso real);
 *  - al soltarlo hereda la velocidad de la mano (con tope), cae con gravedad,
 *    rebota un poco, frena con fricción y se endereza conservando hacia dónde
 *    mira (un objeto real no queda acostado en el aire).
 *
 * El resultado se aplica como capa (OffsetLayer) sobre lo que anima el cuento:
 * `sync()` convierte la pose deseada (mundo) en el desplazamiento y el giro de
 * la capa, así el código original del juego sigue moviendo su "base".
 */
import { Euler, Quaternion, Vector3 } from '@iwsdk/core';
import { groundAt } from './surfaces.js';

export const CARRY_CFG = {
    /** Qué tan rápido persigue a la mano la posición / el giro (1/s). */
    FOLLOW: 24,
    ROT_FOLLOW: 16,
    GRAVITY: 9.8,
    /** Velocidad máxima heredada de la mano al soltar (m/s). */
    MAX_THROW: 1.2,
    BOUNCE: 0.22,
    /** Fricción horizontal sobre la superficie (1/s). */
    FRICTION: 9,
    /** Qué tan rápido se endereza al caer (1/s). */
    UPRIGHT: 7,
};

const _q = new Quaternion();
const _e = new Euler(0, 0, 0, 'YXZ');

export class Carry {
    constructor(object, layer) {
        this.object = object;
        this.layer = layer;
        this.pos = new Vector3(); // pose deseada (mundo)
        this.quat = new Quaternion();
        this.vel = new Vector3();
        this.offPos = new Vector3(); // en el sistema de la mano
        this.offQ = new Quaternion();
        this.mode = 'idle'; // idle | held | falling | rest
        this.lift = 0; // altura del origen del objeto sobre su base (m): no atraviesa la superficie
        this.fallFrom = 0;
        /** Si se fija, el giro sigue a este (mundo) en vez de a la mano (p. ej. mirar a la puerta). */
        this.aim = null;
        this._t = new Vector3();
        this._p = new Vector3();
        this._b = new Vector3();
        this._qb = new Quaternion();
        this._up = new Quaternion();
    }

    /** Toma el objeto con la mano, desde donde está (sin saltos). */
    begin(hand) {
        const o = this.object;
        o.getWorldPosition(this.pos);
        o.getWorldQuaternion(this.quat);
        _q.copy(hand.quat).invert();
        this.offPos.copy(this.pos).sub(hand.point).applyQuaternion(_q);
        this.offQ.copy(_q).multiply(this.quat);
        this.vel.set(0, 0, 0);
        this.mode = 'held';
    }

    /** Sigue a la mano (posición y giro), sin atravesar la superficie de abajo. */
    hold(c, hand, dt) {
        this._t.copy(this.offPos).applyQuaternion(hand.quat).add(hand.point);
        const floor = groundAt(c, this._t) + this.lift;
        if (this._t.y < floor) this._t.y = floor;
        const a = 1 - Math.exp(-CARRY_CFG.FOLLOW * dt);
        this._p.copy(this.pos);
        this.pos.lerp(this._t, a);
        if (dt > 0) this.vel.copy(this.pos).sub(this._p).divideScalar(dt);
        if (this.aim) _q.copy(this.aim);
        else _q.copy(hand.quat).multiply(this.offQ);
        this.quat.slerp(_q, 1 - Math.exp(-CARRY_CFG.ROT_FOLLOW * dt));
    }

    /** Suelta: hereda la velocidad de la mano (con tope) y empieza a caer. */
    release(hand) {
        this.vel.copy(hand?.vel ?? this.vel);
        if (this.vel.length() > CARRY_CFG.MAX_THROW) this.vel.setLength(CARRY_CFG.MAX_THROW);
        this.mode = 'falling';
        this.fallFrom = this.pos.y;
    }

    /** Un paso de caída. Devuelve true al quedar quieto sobre la superficie. */
    fall(c, dt) {
        this.vel.y -= CARRY_CFG.GRAVITY * dt;
        this.vel.multiplyScalar(Math.max(0, 1 - 0.4 * dt)); // aire
        this.pos.addScaledVector(this.vel, dt);
        // se endereza conservando hacia dónde mira
        _e.setFromQuaternion(this.quat);
        this._up.setFromEuler(_e.set(0, _e.y, 0, 'YXZ'));
        this.quat.slerp(this._up, 1 - Math.exp(-CARRY_CFG.UPRIGHT * dt));
        const floor = groundAt(c, this.pos) + this.lift;
        if (this.pos.y > floor) return false;
        this.pos.y = floor;
        if (this.vel.y < -0.5) {
            this.vel.y = -this.vel.y * CARRY_CFG.BOUNCE;
            this.vel.x *= 0.6;
            this.vel.z *= 0.6;
            return false;
        }
        this.vel.y = 0;
        const f = Math.max(0, 1 - CARRY_CFG.FRICTION * dt);
        this.vel.x *= f;
        this.vel.z *= f;
        if (Math.hypot(this.vel.x, this.vel.z) > 0.02) return false;
        this.quat.copy(this._up);
        this.vel.set(0, 0, 0);
        this.mode = 'rest';
        return true;
    }

    /** Altura de la caída que acaba de terminar (m). */
    get dropHeight() { return this.fallFrom - this.pos.y; }

    /**
     * Escribe la capa: desplazamiento (sistema del padre) = deseado − base, y giro
     * (sistema del objeto) = base⁻¹ · deseado. La base es lo que anima el cuento.
     */
    sync() {
        const o = this.object;
        const L = this.layer;
        // base sin la capa (posición y giro locales)
        this._b.copy(o.position);
        this._qb.copy(o.quaternion);
        if (L.applied) {
            this._b.sub(L._pos);
            this._qb.multiply(_q.copy(L._rot).invert());
        }
        this._qb.normalize();
        o.parent.worldToLocal(this._p.copy(this.pos));
        L.pos.copy(this._p).sub(this._b);
        // giro deseado en el sistema del padre
        o.parent.getWorldQuaternion(_q).invert().multiply(this.quat);
        L.rot.copy(this._qb.invert()).multiply(_q).normalize();
    }
}
