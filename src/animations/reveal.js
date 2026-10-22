/**
 * Aparición suave de los elementos del libro (Guía visual, sección 11).
 *
 * Reemplaza la animación pop-up: cuando el libro termina de abrirse, los
 * objetos van brotando de la hoja POR UNIDADES, de atrás hacia adelante:
 * suben un 8 % de su altura, pasan de 92 % a 100 % de escala y aparecen
 * (750 ms, easeOutCubic, sin rebote), con 260 ms entre unidades → nunca más de
 * 3 a la vez, máximo 7 por página, menos de 2.5 s en total.
 * Al pasar la página todo sale junto en 300 ms (se hunde un 4 % y se desvanece).
 * Al volver a una página ya vista, aparece con un desvanecimiento de 300 ms.
 * Con "reducir movimiento": todo aparece junto con un desvanecimiento de 300 ms.
 *
 * Los materiales del kit se comparten entre objetos; para desvanecer una unidad
 * sin afectar a las demás, sus mallas usan copias temporales del material
 * mientras dura la animación.
 */
import * as THREE from 'three'
import gsap from 'gsap'

export const REVEAL = { duration: 0.75, stagger: 0.26, rise: 0.08, startScale: 0.92, leave: 0.3, back: 0.3, maxUnits: 7 }

export const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

const box = new THREE.Box3()
const size = new THREE.Vector3()
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

export class RevealUnit {
    /**
     * @param {THREE.Object3D[]} objects objetos de la unidad (piezas del escenario)
     * @param {object} opts { guardian: Guardian | null }
     */
    constructor(objects, { guardian = null } = {}) {
        this.objects = objects.filter(Boolean)
        this.guardian = guardian
        this.pieces = this.objects.map((o) => o.userData.piece).filter(Boolean)
        this.height = null
        this.faded = false
        this.ready = true
    }

    measure() {
        if (this.height !== null) return this.height
        box.makeEmpty()
        for (const o of this.objects) box.expandByObject(o)
        this.height = box.isEmpty() ? 0.5 : Math.max(0.1, box.getSize(size).y)
        return this.height
    }

    /** Copias temporales de los materiales (para variar la opacidad sin tocar los compartidos). */
    beginFade() {
        if (this.faded) return
        this.faded = true
        this.mats = []
        for (const root of this.objects) {
            root.traverse((o) => {
                if (!o.material || o.userData.fadeOrig) return
                const list = Array.isArray(o.material) ? o.material : [o.material]
                const clones = list.map((m) => {
                    const c = m.clone()
                    c.clippingPlanes = m.clippingPlanes // mismo plano del lomo (se actualiza solo)
                    c.userData.baseOpacity = m.opacity
                    c.userData.baseDepthWrite = m.depthWrite
                    c.transparent = true
                    this.mats.push(c)
                    return c
                })
                o.userData.fadeOrig = o.material
                o.material = Array.isArray(o.material) ? clones : clones[0]
            })
        }
    }

    setOpacity(v) {
        for (const m of this.mats ?? []) {
            m.opacity = m.userData.baseOpacity * v
            m.depthWrite = m.userData.baseDepthWrite && v > 0.98
        }
    }

    endFade() {
        if (!this.faded) return
        this.faded = false
        for (const root of this.objects) {
            root.traverse((o) => {
                if (!o.userData.fadeOrig) return
                o.material = o.userData.fadeOrig
                delete o.userData.fadeOrig
            })
        }
        for (const m of this.mats ?? []) m.dispose()
        this.mats = null
    }

    /** Estado intermedio: e = 0 (escondida) … 1 (en su lugar). */
    set(e, { rise = REVEAL.rise, scale = REVEAL.startScale } = {}) {
        const h = this.measure()
        for (const p of this.pieces) {
            p.rise = -rise * h * (1 - e)
            p.rscale = scale + (1 - scale) * e
            p.hidden = e <= 0.001
        }
        if (this.guardian) {
            this.guardian.presence = this.guardian.presenceTarget = e
            this.guardian.presenceVel = 0
        }
        this.setOpacity(e)
    }

    hideNow() {
        this.endFade()
        this.beginFade()
        this.set(0)
        this.ready = false
    }

    showNow() {
        this.set(1)
        this.endFade()
        for (const p of this.pieces) { p.rise = 0; p.rscale = 1; p.hidden = false }
        this.ready = true
    }
}

/** Aparición de una página: unidades de atrás hacia adelante. */
export function revealUnits(units, { onLastStart } = {}) {
    const reduced = reducedMotion()
    const tl = gsap.timeline()
    units.forEach((u) => u.hideNow())
    const step = reduced ? 0 : REVEAL.stagger
    const dur = reduced ? REVEAL.back : REVEAL.duration
    units.forEach((u, i) => {
        const s = { e: 0 }
        const opts = reduced ? { rise: 0, scale: 1 } : {}
        tl.to(s, {
            e: 1, duration: dur, ease: 'none',
            onUpdate: () => u.set(easeOutCubic(s.e), opts),
            onComplete: () => u.showNow(),
        }, i * step)
    })
    tl.call(() => onLastStart?.(), null, Math.max(0, (units.length - 1) * step))
    return tl
}

/** Al volver a una página ya vista: todo junto, solo desvanecimiento (300 ms). */
export function fadeInUnits(units, { onStart } = {}) {
    const tl = gsap.timeline()
    units.forEach((u) => u.hideNow())
    const s = { e: 0 }
    tl.call(() => onStart?.(), null, 0)
    tl.to(s, {
        e: 1, duration: REVEAL.back, ease: 'none',
        onUpdate: () => units.forEach((u) => u.set(s.e, { rise: 0, scale: 1 })),
        onComplete: () => units.forEach((u) => u.showNow()),
    }, 0)
    return tl
}

/** Al pasar la página: todo sale junto (300 ms), se hunde un 4 % y se desvanece. */
export function hideUnits(units) {
    const reduced = reducedMotion()
    const tl = gsap.timeline()
    units.forEach((u) => { u.endFade(); u.beginFade() })
    const s = { e: 1 }
    tl.to(s, {
        e: 0, duration: REVEAL.leave, ease: 'power1.in',
        onUpdate: () => units.forEach((u) => u.set(s.e, reduced ? { rise: 0, scale: 1 } : { rise: 0.04, scale: 1 })),
        onComplete: () => units.forEach((u) => { u.set(0); u.ready = false }),
    })
    return tl
}
