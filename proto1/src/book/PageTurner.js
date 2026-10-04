/**
 * Pasar páginas arrastrando con el mouse (o el dedo).
 *
 *  1. Al pasar el cursor sobre una hoja, su esquina se levanta un poquito.
 *  2. Click + arrastre horizontal: la hoja sigue al cursor. El punto agarrado se
 *     proyecta en pantalla, así el cálculo no depende de la resolución.
 *  3. El ángulo no se fija directamente: un resorte lo persigue → resistencia,
 *     suavizado e inercia. La curvatura crece con la velocidad (papel real).
 *  4. Al soltar: si (progreso + inercia) supera el umbral, la hoja termina sola;
 *     si no, vuelve a su lugar con un pequeño rebote.
 *
 * Tipos de gesto:
 *  - 'page'  → pasar hoja (adelante desde la hoja derecha, atrás desde la izquierda)
 *  - 'cover' → abrir la tapa del libro cerrado
 *  - 'close' → cerrar el libro desde la última doble página
 *
 * El "delegate" (StoryController) decide qué se puede girar y reacciona al progreso.
 */
import * as THREE from 'three'
import { BOOK } from './Book.js'

const PI = Math.PI
const START_PX = 8          // movimiento mínimo antes de empezar (evita giros accidentales)
const THRESHOLD = 0.45      // progreso necesario para completar el giro
const PEEK = 0.075          // cuánto se levanta la esquina al pasar el mouse
const LOCK_MAX = 0.16       // cuánto cede la hoja cuando está bloqueada

const SPRINGS = {
    drag: { k: 150, zeta: 0.78 },
    commit: { k: 62, zeta: 0.64 },
    cancel: { k: 85, zeta: 0.42 },
    peek: { k: 55, zeta: 0.72 },
}

const v3 = new THREE.Vector3()

export class PageTurner {
    constructor({ canvas, camera, book, pointer }, delegate) {
        this.canvas = canvas
        this.camera = camera
        this.book = book
        this.delegate = delegate
        this.raycaster = new THREE.Raycaster()
        this.ndc = new THREE.Vector2()

        this.state = 'idle' // idle | peek | pending | drag | settle
        this.kind = null
        this.dir = 1
        this.theta = 0
        this.vel = 0
        this.target = 0
        this.spring = SPRINGS.peek
        this.committing = false
        this.locked = false
        this.prepared = false
        this.grab = null

        pointer.fallback = this
    }

    get active() { return this.state === 'pending' || this.state === 'drag' }
    get busy() { return this.state === 'settle' || this.active }

    // ------------------------------------------------------------ geometría del gesto
    restAngle(kind = this.kind, dir = this.dir) {
        if (kind === 'page') return dir > 0 ? 0 : PI
        return kind === 'cover' ? 0 : PI
    }

    endAngle(kind = this.kind, dir = this.dir) {
        if (kind === 'page') return dir > 0 ? PI : 0
        return kind === 'cover' ? PI : 0
    }

    /** 0 = hoja en reposo, 1 = giro completo (sin importar la dirección). */
    get progress() {
        const r = this.restAngle()
        return Math.abs(this.theta - r) / PI
    }

    setNdc(e) {
        const r = this.canvas.getBoundingClientRect()
        this.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
        this.raycaster.setFromCamera(this.ndc, this.camera)
    }

    hitTest(e) {
        this.setNdc(e)
        const mode = this.delegate.mode
        const b = this.book
        if (mode === 'cover') {
            const h = this.raycaster.intersectObject(b.coverArt, false)[0]
            return h ? { kind: 'cover', dir: 1, point: h.point } : null
        }
        if (mode !== 'reading') return null
        const hits = this.raycaster.intersectObjects([b.rightPage, b.leftPage], false)
        const h = hits[0]
        if (!h) return null
        if (h.object === b.rightPage) return { kind: 'page', dir: 1, point: h.point }
        return { kind: this.delegate.isEnd ? 'close' : 'page', dir: -1, point: h.point }
    }

    toScreen(local) {
        v3.copy(local)
        this.book.inner.localToWorld(v3).project(this.camera)
        const r = this.canvas.getBoundingClientRect()
        return { x: r.left + ((v3.x + 1) / 2) * r.width, y: r.top + ((1 - v3.y) / 2) * r.height }
    }

    // ------------------------------------------------------------ eventos (desde Pointer)
    onDown(e) {
        if (this.state === 'settle') return false
        const hit = this.hitTest(e)
        if (!hit) return false
        const allow = this.delegate.canTurn(hit.kind, hit.dir)
        if (allow === 'none') return false

        const sameGesture = this.state === 'peek' && this.kind === hit.kind && this.dir === hit.dir
        if (!sameGesture) this.resetTo(hit.kind, hit.dir)
        this.locked = allow === 'locked'

        const { PW, PD, M, BLOCK_T, COVER_T } = BOOK
        const local = this.book.inner.worldToLocal(hit.point.clone())
        const W = hit.kind === 'cover' ? PW + M : PW
        const r = Math.min(1, Math.max(0.5, Math.abs(local.x) / W))
        const zn = Math.max(-1, Math.min(1, local.z / (PD / 2)))
        const y = hit.kind === 'cover' ? BLOCK_T + COVER_T : 0
        const spine = this.toScreen(new THREE.Vector3(0, y, local.z))
        let half
        if (hit.kind === 'cover') {
            half = this.toScreen(new THREE.Vector3(W, y, local.z)).x - spine.x
        } else {
            const R = this.toScreen(new THREE.Vector3(PW, 0, local.z))
            const L = this.toScreen(new THREE.Vector3(-PW, 0, local.z))
            half = (R.x - L.x) / 2
        }
        this.grab = { x: e.clientX, y: e.clientY, spineX: spine.x, half: Math.max(40, half), r, zn, id: e.pointerId }
        this.state = 'pending'
        try { this.canvas.setPointerCapture(e.pointerId) } catch { /* puntero sintético */ }
        this.canvas.style.cursor = 'grabbing'
        return true
    }

    onMove(e) {
        const g = this.grab
        if (!g) return
        if (this.state === 'pending') {
            const dx = e.clientX - g.x
            const dy = e.clientY - g.y
            if (Math.abs(dx) < START_PX || Math.abs(dx) < Math.abs(dy) * 0.6) return
            this.startDrag()
        }
        if (this.state !== 'drag') return
        const c = (e.clientX - g.spineX) / (g.half * g.r)
        let t = Math.acos(Math.max(-1, Math.min(1, c)))
        if (this.locked) {
            // la hoja cede un poquito y se resiste (actividad sin terminar)
            const rest = this.restAngle()
            const d = t - rest
            t = rest + Math.sign(d) * LOCK_MAX * Math.tanh(Math.abs(d) / 0.6)
        }
        this.target = t
    }

    onUp(e) {
        const g = this.grab
        this.grab = null
        try { if (g && this.canvas.hasPointerCapture(g.id)) this.canvas.releasePointerCapture(g.id) } catch { /* noop */ }
        this.canvas.style.cursor = ''
        if (this.state === 'pending') {
            this.target = this.restAngle()
            this.state = 'peek'
            this.spring = SPRINGS.peek
            return
        }
        if (this.state !== 'drag') return

        const p = this.progress
        const pv = (this.vel * (this.kind === 'page' ? this.dir : this.kind === 'cover' ? 1 : -1)) / PI
        const projected = p + pv * 0.22
        if (this.locked) this.delegate.onLockedAttempt?.()
        const commit = !this.locked && projected > THRESHOLD && p > 0.1
        this.committing = commit
        this.target = commit ? this.endAngle() : this.restAngle()
        this.spring = commit ? SPRINGS.commit : SPRINGS.cancel
        this.state = 'settle'
        if (commit) this.delegate.commit(this.kind, this.dir)
    }

    /** Hover: la esquina de la hoja reacciona al cursor. */
    hover(e, blocked) {
        if (this.state !== 'idle' && this.state !== 'peek') return
        const hit = blocked ? null : this.hitTest(e)
        const allow = hit ? this.delegate.canTurn(hit.kind, hit.dir) : 'none'
        if (hit && allow !== 'none') {
            this.canvas.style.cursor = allow === 'locked' ? 'not-allowed' : 'grab'
            if (allow === 'ok' && (this.state === 'idle' || this.kind !== hit.kind || this.dir !== hit.dir)) {
                if (this.state === 'peek' && this.progress > 0.01) return // esperar a que baje la anterior
                this.resetTo(hit.kind, hit.dir)
                this.state = 'peek'
                if (hit.kind === 'page') {
                    this.book.peek(hit.dir)
                    this.delegate.peek?.(hit.dir)
                }
            }
            if (this.state === 'peek') {
                const rest = this.restAngle()
                this.target = allow === 'ok' ? rest + (rest === 0 ? PEEK : -PEEK) : rest
            }
        } else {
            if (!blocked) this.canvas.style.cursor = ''
            if (this.state === 'peek') this.target = this.restAngle()
        }
    }

    resetTo(kind, dir) {
        this.kind = kind
        this.dir = dir
        this.theta = this.restAngle(kind, dir)
        this.vel = 0
        this.target = this.theta
        this.prepared = false
        this.spring = SPRINGS.peek
    }

    startDrag() {
        this.state = 'drag'
        this.spring = SPRINGS.drag
        if (this.kind === 'page') {
            this.book.peek(this.dir)
            this.delegate.peek?.(this.dir)
            if (!this.locked) this.prepared = this.delegate.prepare(this.dir)
        }
        this.delegate.dragStart?.(this.kind, this.dir)
    }

    // ------------------------------------------------------------ física
    update(dt) {
        if (this.state === 'idle' || dt <= 0) return
        const { k, zeta } = this.spring
        const c = 2 * zeta * Math.sqrt(k)
        const n = 3
        const h = Math.min(dt, 1 / 30) / n
        for (let i = 0; i < n; i++) {
            const a = k * (this.target - this.theta) - c * this.vel
            this.vel += a * h
            this.theta += this.vel * h
            // topes físicos con rebote
            if (this.theta < 0) { this.theta = 0; this.vel = -this.vel * 0.28 }
            if (this.theta > PI) { this.theta = PI; this.vel = -this.vel * 0.28 }
        }
        this.apply()

        const settled = Math.abs(this.theta - this.target) < 0.004 && Math.abs(this.vel) < 0.06
        if (!settled) return
        this.theta = this.target
        this.vel = 0
        this.apply()
        if (this.state === 'settle') {
            const { kind, dir, committing } = this
            this.state = 'idle'
            this.kind = null
            this.prepared = false
            if (committing) this.delegate.finish(kind, dir)
            else this.delegate.cancel(kind, dir)
        } else if (this.state === 'peek' && this.target === this.restAngle()) {
            if (this.kind === 'page') {
                this.book.endPeek()
                this.delegate.endPeek?.()
            }
            this.state = 'idle'
            this.kind = null
        }
    }

    apply() {
        const th = this.theta
        if (this.kind === 'page') {
            const s = Math.sin(th)
            const lag = Math.abs(this.vel) > 0.35 ? Math.sign(this.vel) : this.dir
            const curl = lag * s * (0.55 + Math.min(0.6, Math.abs(this.vel) * 0.1))
            const twist = this.dir * (this.grab?.zn ?? this.lastZn ?? 0.6) * 0.5 * s
            if (this.grab) this.lastZn = this.grab.zn
            this.book.setSheet(th, curl, twist)
            this.delegate.progress?.(this.progress, this.vel, this.prepared)
        } else if (this.kind) {
            this.book.setCoverAngle(th, this.kind === 'cover')
        }
    }

    /** Fuerza el reposo inmediato (al saltar de página, reiniciar, etc.). */
    reset() {
        this.state = 'idle'
        this.kind = null
        this.grab = null
        this.prepared = false
        this.book.endPeek()
    }
}
