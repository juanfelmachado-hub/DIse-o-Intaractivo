/**
 * Escena base de un escenario pop-up sobre el libro.
 *
 * Jerarquía de cada escenario (cada página tiene su propio espacio):
 *
 *   group
 *   ├── left   → pop-ups de la página izquierda
 *   ├── (lomo) → punto de origen: todas las piezas nacen y se guardan ahí
 *   └── right  → pop-ups de la página derecha
 *
 * Una escena:
 *  - construye sus piezas en build() registrándolas con piece(): cada pieza
 *    queda montada en una bisagra física (animations/popup.js) que sale del
 *    lomo y se despliega según la APERTURA de su página (`openness`, 0…1);
 *  - expone `actions` (nombre → función) que el guion invoca con `do: [...]`;
 *  - expone `hotspots` (objetos tocables) y `anchors` (puntos con nombre);
 *  - anima lo ambiental en tick() (temblor, lámpara, etc.).
 *
 * Coordenadas: el origen es el centro del libro abierto, Y=0 es la hoja.
 * El libro mide ~6.1 de ancho (x: -3.05…3.05) y 4 de fondo (z: -2…2; +z = lector).
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { Nico } from '../models/characters/Nico.js'
import { Guardian } from '../models/characters/Guardian.js'
import { disposeOwned } from '../models/kit.js'
import { createWall } from '../models/objects/furniture.js'
import { PopupPiece } from '../animations/popup.js'
import { wobble, sparkle, glint } from '../animations/motions.js'

const tmp = new THREE.Vector3()
const fwd = new THREE.Vector3()
const right = new THREE.Vector3()
const UP = new THREE.Vector3(0, 1, 0)

// tipos heredados → pliegues físicos (ninguno usa escala ni fundido)
const TYPE_TO_FOLD = { grow: 'back', drop: 'back', front: 'front', back: 'back', left: 'left', right: 'right', none: 'none' }

export class BaseScene {
    constructor(ctx, setup = {}) {
        this.ctx = ctx
        this.setup = setup
        this.group = new THREE.Group()
        this.pieces = []
        this.anchors = {}
        this.hotspots = {}
        this.markers = {}
        this.wobbleCfg = {}
        this.actions = {}
        this.nico = null
        this.guardian = null
        this.guardianOffset = new THREE.Vector3(0.38, 0.95, 0.18)
        this.followNico = true
        this.openness = 0
        this.wind = 0
        this.carry = null
        this.viewer = null
        // contenedores por página (ambos en el origen: las coordenadas no cambian)
        this.left = new THREE.Group()
        this.right = new THREE.Group()
        this.left.name = 'pagina-izquierda'
        this.right.name = 'pagina-derecha'
        this.group.add(this.left, this.right)
    }

    halfFor(x) { return x < 0 ? this.left : this.right }

    // ------------------------------------------------------------ construcción
    init() {
        this.build()
        for (const p of this.pieces) p.schedule()
        for (const p of this.pieces) { p.settle(0); p.apply() }
        if (this.guardian) this.guardian.presence = 0
        return this
    }

    build() {}

    /**
     * Registra una pieza pop-up.
     * @param type  'front' | 'back' | 'left' | 'right' | 'none' (o los alias 'grow', 'pop', 'drop')
     *              'pop' = solapa lateral que se acuesta hacia afuera de su página
     * @param opts  { parent: PopupPiece|Object3D, pivot, follow, stiffness }
     */
    piece(obj, type = 'back', delay = 0, opts = {}) {
        const fold = type === 'pop' ? 'side' : TYPE_TO_FOLD[type]
        const parentPiece = opts.parent instanceof PopupPiece ? opts.parent : null
        const px = opts.pivot ? opts.pivot.x : obj.position.x
        const parent = parentPiece ? parentPiece.obj : (opts.parent ?? this.halfFor(px))
        const p = new PopupPiece(obj, {
            // el retraso es una fracción de la apertura de la página (no segundos)
            fold, delay: Math.min(0.14, delay * 0.25), parent, parentPiece,
            pivot: opts.pivot, follow: opts.follow, stiffness: opts.stiffness ?? (fold === 'front' ? 0.8 : 1),
            gate: opts.gate, flatten: opts.flatten, swing: opts.swing,
        })
        this.pieces.push(p)
        obj.userData.piece = p
        return obj
    }

    /**
     * Telón de fondo en dos paneles que se encuentran en el lomo (pliegue en V,
     * como los libros pop-up reales). Su bisagra está en el lomo, así que se
     * levantan desde la encuadernación. `attach` coloca objetos en el panel que
     * corresponda según su x.
     */
    backdrop(width, height, z, color = '#ffe3c8') {
        const hw = width / 2
        const L = createWall(hw - 0.02, height, color)
        const R = createWall(hw - 0.02, height, color)
        L.position.set(-hw / 2 - 0.01, 0, z)
        R.position.set(hw / 2 + 0.01, 0, z)
        this.piece(L, 'back', 0, { pivot: new THREE.Vector3(-0.001, 0, z), swing: true, stiffness: 0.85 })
        this.piece(R, 'back', 0.02, { pivot: new THREE.Vector3(0.001, 0, z), swing: true, stiffness: 0.85 })
        const attach = (obj, x, y, zz = 0.05) => {
            const panel = x < 0 ? L : R
            obj.position.set(x - panel.position.x, y, zz)
            panel.add(obj)
            return obj
        }
        return { L, R, attach, pieceOf: (x) => (x < 0 ? L : R).userData.piece }
    }

    /** Contenedor: el contenedor recibe el temblor y el objeto el bamboleo. */
    holder(obj, x = 0, y = 0, z = 0) {
        const h = new THREE.Group()
        h.position.set(x, y, z)
        h.add(obj)
        return h
    }

    /** Marca un objeto como tocable y crea el punto donde va su marcador. */
    hotspot(id, obj, markerPos) {
        this.hotspots[id] = obj
        const m = new THREE.Object3D()
        m.position.copy(markerPos)
        obj.add(m)
        this.markers[id] = m
    }

    addNico(x, z, { face = 0, pose = 'idle', delay = 0.1 } = {}) {
        const n = new Nico()
        n.position.set(x, 0, z)
        n.rotation.y = face
        n.poseInstant(pose)
        this.nico = n
        this.piece(n, 'back', delay, { stiffness: 1.25 })
        return n
    }

    addGuardian(visible = true) {
        const g = new Guardian()
        this.guardian = g
        g.visible = visible
        g.presence = 0
        if (this.nico) {
            g.home.copy(this.nico.position).add(this.guardianOffset)
            g.position.copy(g.home)
        }
        this.group.add(g)
        return g
    }

    // ------------------------------------------------------------ apertura
    /** Apertura de la doble página (0 = cerrada, 1 = abierta). */
    setOpenness(o) { this.openness = o }

    openInstant() {
        this.openness = 1
        for (const p of this.pieces) { p.settle(1); p.apply() }
        if (this.guardian) this.guardian.presence = 1
    }

    /**
     * Mientras se pasa la hoja, la página que viaja en ella se lleva sus pop-ups
     * pegados (y se guardan / salen un poco antes que los de la página fija).
     * @param side 'R' o 'L'   @param face 'front' | 'back'
     */
    beginCarry(side, face) {
        const book = this.ctx.book
        for (const p of this.pieces) {
            if (p.parentPiece) continue
            p.syncPivot()
            // si un personaje caminó a la otra página, ahora pertenece a ella
            const half = this.halfFor(p.pivot.x)
            if (p.hinge.parent !== half) half.add(p.hinge)
            const onSide = p.side === side
            p.carried = onSide ? face : null
            p.carryDelay = onSide ? 0.22 : 0
            p.book = book
        }
        this.carry = { side, face }
    }

    endCarry() {
        for (const p of this.pieces) { p.carried = null; p.carryDelay = 0 }
        this.carry = null
        for (const p of this.pieces) p.apply()
    }

    // ------------------------------------------------------------ guion
    /** Ejecuta una acción del guion. Arreglo = en paralelo. Devuelve un timeline. */
    run(cmd) {
        if (!cmd) return gsap.timeline()
        if (Array.isArray(cmd)) {
            const tl = gsap.timeline()
            for (const c of cmd) tl.add(this.run(c), 0)
            return tl
        }
        const [name, arg] = cmd.split(':')
        const fn = this.actions[name] ?? genericActions[name]
        if (!fn) {
            console.warn(`[cuento] Acción desconocida: "${cmd}" en ${this.constructor.name}`)
            return gsap.timeline()
        }
        return fn.call(this, arg) || gsap.timeline()
    }

    /** Ejecuta una lista de acciones en orden. */
    runSequence(list = []) {
        const tl = gsap.timeline()
        for (const cmd of list) tl.add(this.run(cmd))
        return tl
    }

    onDialogue(who) {
        if (who === 'guardian' && this.guardian?.visible) this.guardian.speak()
        if (who === 'nico' && this.nico) {
            gsap.fromTo(this.nico.p, { headX: this.nico.p.headX - 0.12 }, { headX: this.nico.p.headX, duration: 0.5, ease: 'back.out(3)' })
        }
    }

    /** Posición local (en el escenario) de cualquier objeto. */
    localPos(obj, out = new THREE.Vector3()) {
        obj.getWorldPosition(out)
        return this.group.worldToLocal(out)
    }

    wobble(id) {
        const cfg = this.wobbleCfg[id] ?? {}
        if (cfg.custom) return cfg.custom()
        const obj = this.hotspots[id]
        if (!obj) return gsap.timeline()
        const tl = gsap.timeline()
        tl.add(wobble(obj, { axis: cfg.axis ?? 'z', amount: cfg.amount ?? 0.1, times: cfg.times ?? 4, duration: cfg.duration ?? 0.9 }), 0)
        if (this.markers[id]) tl.add(glint(this.group, this.localPos(this.markers[id]), { color: '#ffd0c8', size: 0.5 }), 0)
        return tl
    }

    // ------------------------------------------------------------ el Guardián le habla al lector
    /**
     * El Guardián sale del libro y se acerca a la cámara (rompe la cuarta pared).
     * Mientras `viewer` esté activo, su punto de llegada se recalcula cada frame
     * frente a la cámara, aunque el libro flote o la ventana cambie de tamaño.
     */
    guardianToViewer(on) {
        const g = this.guardian
        if (!g) return
        if (on) {
            this.viewer = { t: 0 }
            g.visible = true
            g.presence = 1
            g.faceViewer = true
            return gsap.to(this.viewer, { t: 1, duration: 1.5, ease: 'power3.inOut' })
        }
        g.faceViewer = false
        const v = this.viewer
        if (!v) return
        return gsap.to(v, { t: 0, duration: 1.3, ease: 'power2.inOut', onComplete: () => { this.viewer = null } })
    }

    // ------------------------------------------------------------ loop
    update(dt, t, quake) {
        const o = this.openness
        this.wind *= Math.pow(0.04, dt)
        for (const p of this.pieces) p.update(dt, o, t, this.wind)

        this.nico?.update(dt, t, quake)
        const g = this.guardian
        if (g) {
            if (this.followNico && this.nico && !this.guardianPinned) {
                tmp.copy(this.nico.position).add(this.guardianOffset)
                g.home.lerp(tmp, Math.min(1, dt * 2.5))
            }
            if (this.viewer) {
                const cam = this.ctx.camera
                cam.getWorldDirection(fwd)
                right.crossVectors(fwd, UP).normalize()
                const side = Math.min(0.42, 0.3 * cam.aspect)
                tmp.copy(cam.position).addScaledVector(fwd, 2.6).addScaledVector(right, side).addScaledVector(UP, -0.12)
                this.group.worldToLocal(tmp)
                g.viewerPoint.copy(tmp)
                g.viewerBlend = this.viewer.t
            } else {
                g.viewerBlend = 0
            }
            // el Guardián aparece cuando su página ya está casi abierta
            if (!this.viewer) g.presenceTarget = o > 0.85 ? 1 : 0
            g.update(dt, t, this.ctx.camera)
        }
        this.tick(dt, t, quake)
    }

    tick() {}

    dispose() {
        this.group.removeFromParent()
        disposeOwned(this.group)
        if (Guardian.light) Guardian.light.intensity = 0
    }
}

// ---------------------------------------------------------------- acciones genéricas
const genericActions = {
    'nico.pose'(name) { return this.nico?.pose(name) },
    'nico.face'(name) { this.nico?.face(name) },
    'nico.heart'(n) {
        if (!this.nico) return
        return this.nico.heartbeat(Number(n) || 3)
    },
    'nico.walkTo'(anchor) {
        const a = this.anchors[anchor]
        if (!this.nico || !a) return
        const tl = gsap.timeline()
        if (this.nico.p.crouch > 0.3) tl.add(this.nico.pose('idle', 0.5))
        tl.add(this.nico.walkTo(a.x, a.z, { speed: 0.7 }))
        if (a.faceCamera !== false) tl.add(gsap.to(this.nico.rotation, { y: 0, duration: 0.5, ease: 'power2.out' }))
        return tl
    },
    'nico.lookAround'() {
        if (!this.nico) return
        const p = this.nico.p
        return gsap.timeline()
            .to(p, { headY: -0.7, duration: 0.7, ease: 'sine.inOut' })
            .to(p, { headY: 0.7, duration: 1.1, ease: 'sine.inOut' })
            .to(p, { headY: 0, duration: 0.7, ease: 'sine.inOut' })
    },
    'nico.hop'() { return this.nico?.hop() },
    'guardian.appear'() {
        const g = this.guardian
        if (!g || !this.nico) return
        const from = this.localPos(this.nico.heart)
        const to = this.nico.position.clone().add(this.guardianOffset)
        const tl = gsap.timeline()
        tl.add(this.nico.heartbeat(1), 0)
        tl.add(sparkle(this.group, from, { color: '#d8ffc0', count: 9 }), 0.15)
        tl.add(g.appear(from, to), 0.2)
        return tl
    },
    'guardian.glow'() {
        if (!this.guardian) return
        return gsap.timeline().add(this.guardian.pulse(2), 0).add(sparkle(this.group, this.guardian.position, { color: '#d8ffc0', count: 6, radius: 0.25 }), 0)
    },
    'guardian.energy'() {
        const g = this.guardian
        const n = this.nico
        if (!g || !n) return
        const tl = gsap.timeline()
        tl.add(g.pulse(1), 0)
        const target = this.localPos(n.heart)
        for (let i = 0; i < 6; i++) {
            tl.add(sparkle(this.group, g.position.clone().lerp(target, i / 5), { color: '#d8ffc0', count: 3, radius: 0.12, size: 0.16 }), 0.25 + i * 0.12)
        }
        tl.to(n, { heartGlow: 0.9, duration: 0.4 }, 0.9)
        tl.to(n, { heartGlow: 0.25, duration: 1.4 }, 1.4)
        tl.add(g.pulse(1), 1.0)
        return tl
    },
    wobble(id) { return this.wobble(id) },
    'hazards.wobble'() {
        const tl = gsap.timeline()
        ;(this.hazards ?? []).forEach((id, i) => tl.add(this.wobble(id), i * 0.35))
        return tl
    },
    calm() {},
}
