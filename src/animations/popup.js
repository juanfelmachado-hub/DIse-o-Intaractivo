/**
 * Mecanismo pop-up físico: las piezas nacen en la encuadernación.
 *
 *   página cerrada → pieza guardada (plegada y hundida en la ranura del lomo)
 *   → sale de la ranura → se desliza sobre su página hasta su lugar
 *   → se levanta sobre su bisagra con un pequeño rebote elástico
 *   … y al cerrar, exactamente al revés: se pliega, vuelve al lomo y se hunde.
 *
 * Todo depende de un solo valor por pieza, `e` (emergencia, 0…1), que persigue
 * la APERTURA de su página con un resorte (peso, inercia, rebote). Las fases:
 *
 *   e 0.00–0.22  sale de la ranura del lomo (sube desde dentro del libro)
 *   e 0.05–0.65  se desliza desde el lomo hasta su posición, girando levemente
 *   e 0.40–1.00  se despliega sobre su bisagra (plegada → de pie)
 *   e > 1        sobrepaso elástico (se inclina un poquito y vuelve)
 *
 * Lo que queda "dentro del libro" (bajo el papel) lo oculta un plano de recorte
 * que sigue a la hoja (models/kit.js → popupClip), así las piezas desaparecen de
 * verdad en la encuadernación y nunca atraviesan la página.
 *
 * Estructura de cada pieza:
 *     hinge (pivote en la base; recibe deslizamiento, giro y pliegue)
 *       └─ offset (−pivote)
 *            └─ objeto (conserva sus coordenadas del escenario)
 */
import * as THREE from 'three'
import { BOOK } from '../book/Book.js'

const FOLD = Math.PI / 2 - 0.015
const SINK = 0.16 // cuánto se hunde en la ranura del lomo cuando está guardada
const FOLDS = {
    front: { axis: 'x', sign: 1 },   // se acuesta hacia el lector
    back: { axis: 'x', sign: -1 },   // se acuesta hacia el fondo
    left: { axis: 'z', sign: 1 },    // se acuesta hacia la izquierda
    right: { axis: 'z', sign: -1 },  // se acuesta hacia la derecha
    none: { axis: null, sign: 0 },   // calcomanías planas
}
const AX = { x: new THREE.Vector3(1, 0, 0), y: new THREE.Vector3(0, 1, 0), z: new THREE.Vector3(0, 0, 1) }
const qFold = new THREE.Quaternion()
const qYaw = new THREE.Quaternion()
const qSheet = new THREE.Quaternion()
const frame = { x: 0, y: 0, phi: 0 }

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
const sm = (a, b, x) => {
    const t = clamp01((x - a) / (b - a))
    return t * t * (3 - 2 * t)
}

export class PopupPiece {
    /**
     * @param {THREE.Object3D} obj
     * @param {object} o
     *  fold     'front' | 'back' | 'left' | 'right' | 'side' | 'none'
     *           ('side' = se acuesta hacia afuera de su página)
     *  parent   contenedor (mitad izquierda/derecha del escenario o pieza padre)
     *  pivot    punto de giro (por defecto la base del objeto)
     *  delay    retraso extra dentro de la apertura (0…0.15)
     *  stiffness  >1 más rígido/rápido, <1 más pesado
     *  parentPiece  pieza que sostiene a esta (se despliega después de ella)
     *  follow   otra pieza cuyo movimiento copia (cables del poste, etc.)
     */
    constructor(obj, o = {}) {
        this.obj = obj
        this.foldName = o.fold ?? 'back'
        this.parentPiece = o.parentPiece ?? null
        this.follow = o.follow ?? null
        this.delay = o.delay ?? 0
        this.stiffness = o.stiffness ?? 1
        this.explicitPivot = !!o.pivot
        this.gate = o.gate ?? 1
        // telones en V: se paran dentro del lomo y luego se abren como puertas
        this.swing = !!o.swing
        // las piezas grandes se aplanan al plegarse; los brazos/solapas no
        this.flatten = o.flatten ?? !o.parentPiece
        this.hinge = new THREE.Group()
        this.offset = new THREE.Group()
        this.hinge.add(this.offset)
        o.parent.add(this.hinge)
        this.offset.add(obj)
        this.pivot = new THREE.Vector3()
        if (o.pivot) this.pivot.copy(o.pivot)
        this.syncPivot(true)

        this.e = 0 // 0 = guardada en el lomo, 1 = desplegada
        this.v = 0
        this.phase = Math.random() * Math.PI * 2
        this.carried = null // null | 'front' | 'back'
        this.carryDelay = 0
        this.start = 0
        this.span = 0.6
    }

    /** Mitad del libro a la que pertenece ('L' | 'R'). */
    get side() { return this.pivot.x < 0 ? 'L' : 'R' }

    get fold() {
        const name = this.foldName === 'side' ? (this.side === 'R' ? 'right' : 'left') : this.foldName
        return FOLDS[name] ?? FOLDS.back
    }

    /** Ubica el pivote en la base actual del objeto (solo si la pieza está quieta). */
    syncPivot(force = false) {
        if (!force && (this.e < 0.98 || this.explicitPivot)) return
        if (!this.explicitPivot) this.pivot.set(this.obj.position.x, this.parentPiece ? this.obj.position.y : 0, this.obj.position.z)
        this.hinge.position.copy(this.pivot)
        this.offset.position.copy(this.pivot).negate()
    }

    /** Ventana de apertura: el fondo sale primero, el frente al final. */
    schedule() {
        if (this.parentPiece) {
            this.span = 0.34
            this.start = Math.min(this.parentPiece.start + 0.2 + this.delay, 0.99 - this.span)
            return
        }
        const layer = clamp01((this.pivot.z + 2) / 4)
        this.span = 0.58
        this.start = Math.min(0.02 + layer * 0.26 + this.delay, 0.98 - this.span)
    }

    target(open) {
        const start = Math.min(this.start + this.carryDelay, 0.99 - this.span)
        return Math.min(clamp01((open - start) / this.span), this.gate)
    }

    settle(open) {
        this.e = this.target(open)
        this.v = 0
    }

    update(dt, open, t, wind) {
        if (this.follow) {
            this.e = this.follow.e
        } else {
            let tgt = this.target(open)
            const closing = tgt < this.e
            // el papel "respira" muy levemente cuando está abierto
            if (tgt > 0.995) tgt += Math.sin(t * 0.9 + this.phase) * 0.004
            // al guardarse es firme (no se queda atrás); al salir, elástico
            const k = (closing ? 150 : 70) * this.stiffness
            const zeta = closing ? 0.95 : 0.46
            const c = 2 * zeta * Math.sqrt(k)
            const h = Math.min(dt, 1 / 30) / 2
            for (let i = 0; i < 2; i++) {
                const acc = k * (tgt - this.e) - c * this.v - wind * this.e * 0.8
                this.v += acc * h
                this.e += this.v * h
            }
            // nunca más de un poquito "afuera" de lo que permite la página:
            // así dos páginas no ocupan el mismo espacio al mismo tiempo
            if (this.e > tgt + 0.12 && closing) this.e = tgt + 0.12
            if (this.e < 0) { this.e = 0; this.v = 0 }
            if (this.e > 1.16) { this.e = 1.16; this.v = 0 }
        }
        this.apply()
    }

    apply() {
        const e = this.e
        const f = this.fold
        this.hinge.visible = e > 0.004

        // pliegue sobre su bisagra (con sobrepaso elástico cuando e > 1)
        const a = this.swing
            ? (e <= 1 ? 1 - sm(0.16, 0.55, e) : -(e - 1) * 0.4)
            : (e <= 1 ? 1 - sm(0.4, 1, e) : -(e - 1) * 0.9)
        if (f.axis) qFold.setFromAxisAngle(AX[f.axis], a * FOLD * f.sign)
        else qFold.identity()

        // las piezas secundarias solo giran sobre su pieza padre
        if (this.parentPiece) {
            this.hinge.position.copy(this.pivot)
            this.hinge.quaternion.copy(qFold)
            this.hinge.scale.setScalar(1)
            return
        }

        const rise = sm(0, 0.22, e)
        const slide = sm(0.05, 0.65, e)
        const sign = this.side === 'R' ? 1 : -1
        if (this.swing) {
            // de pie dentro del lomo (casi cerrado en V) → se abre hacia el fondo
            const sw = sm(0.45, 1, e)
            qYaw.setFromAxisAngle(AX.y, -sign * (Math.PI / 2 - 0.09) * (1 - sw) + (e > 1 ? sign * (e - 1) * 0.5 : 0))
        } else {
            // al salir del lomo la pieza viene un poco girada hacia él
            qYaw.setFromAxisAngle(AX.y, sign * 0.32 * (1 - slide))
        }

        const flat = this.flatten ? 1 - clamp01(a) * 0.985 : 1
        const s = (0.82 + 0.18 * sm(0, 0.6, e)) * (e > 1 ? 1 + (e - 1) * 0.12 : 1)
        this.hinge.scale.set((f.axis === 'z' ? flat : 1) * s, s * (e > 1 ? 1 - (e - 1) * 0.1 : 1), (f.axis === 'x' ? flat : 1) * s)

        const x = this.pivot.x * slide
        const sink = -SINK * (1 - rise)
        const bk = this.book
        if (this.carried && bk) {
            // pegada a la hoja que se está pasando
            const u = Math.min(1, Math.abs(x) / BOOK.PW)
            const zn = Math.max(-1, Math.min(1, this.pivot.z / (BOOK.PD / 2)))
            bk.sheetFrame(u, zn, frame)
            const back = this.carried === 'back'
            const ang = back ? frame.phi - Math.PI : frame.phi
            // "hundirse" es hacia dentro de la hoja (según su normal)
            const nx = -Math.sin(ang)
            const ny = Math.cos(ang)
            this.hinge.position.set(frame.x + nx * (sink + this.pivot.y), frame.y + ny * (sink + this.pivot.y), this.pivot.z)
            qSheet.setFromAxisAngle(AX.z, ang)
            this.hinge.quaternion.multiplyQuaternions(qSheet, qYaw).multiply(qFold)
        } else {
            this.hinge.position.set(x, this.pivot.y + sink, this.pivot.z)
            this.hinge.quaternion.multiplyQuaternions(qYaw, qFold)
        }
    }
}
