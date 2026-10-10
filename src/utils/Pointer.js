/**
 * Interacción directa con el 3D.
 *
 * Prioridad: 1) objetos arrastrables de una actividad, 2) objetos tocables de
 * una actividad, 3) `fallback` (PageTurner: arrastrar la hoja del libro).
 * Así las actividades nunca entran en conflicto con el cambio de página.
 */
import * as THREE from 'three'

export class Pointer {
    constructor(canvas, camera) {
        this.canvas = canvas
        this.camera = camera
        this.raycaster = new THREE.Raycaster()
        this.ndc = new THREE.Vector2()
        this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        this.hit = new THREE.Vector3()
        this.clickables = new Map()
        this.draggables = new Map()
        this.drag = null
        this.down = null
        this.enabled = true
        this.fallback = null

        canvas.addEventListener('pointerdown', (e) => this.onDown(e))
        canvas.addEventListener('pointermove', (e) => this.onMove(e))
        canvas.addEventListener('pointerup', (e) => this.onUp(e))
        canvas.addEventListener('pointercancel', (e) => this.onUp(e, true))
        canvas.addEventListener('pointerleave', (e) => {
            if (e.pointerType === 'mouse' && !this.fallback?.active) this.fallback?.hover(e, true)
        })
    }

    addClickable(object, onClick) { this.clickables.set(object, onClick) }

    /**
     * @param {THREE.Object3D} object objeto que se arrastra
     * @param {object} opts { space: Object3D en cuyo sistema se dan las coordenadas, onStart, onMove(local), onDrop(local) }
     */
    addDraggable(object, opts) { this.draggables.set(object, opts) }

    remove(object) {
        this.clickables.delete(object)
        this.draggables.delete(object)
    }

    clear() {
        this.clickables.clear()
        this.draggables.clear()
        this.drag = null
        this.canvas.style.cursor = ''
    }

    setNdc(e) {
        const r = this.canvas.getBoundingClientRect()
        this.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
        this.raycaster.setFromCamera(this.ndc, this.camera)
    }

    pick(map) {
        if (!map.size) return null
        const hits = this.raycaster.intersectObjects([...map.keys()], true)
        for (const h of hits) {
            let o = h.object
            while (o) {
                if (map.has(o)) return o
                o = o.parent
            }
        }
        return null
    }

    planePoint(space) {
        const wp = new THREE.Vector3()
        space.getWorldPosition(wp)
        this.plane.constant = -wp.y
        if (!this.raycaster.ray.intersectPlane(this.plane, this.hit)) return null
        return space.worldToLocal(this.hit.clone())
    }

    onDown(e) {
        if (!this.enabled) return
        this.setNdc(e)
        const d = this.pick(this.draggables)
        if (d) {
            const opts = this.draggables.get(d)
            this.drag = { object: d, opts }
            try { this.canvas.setPointerCapture(e.pointerId) } catch { /* puntero sintético */ }
            this.canvas.style.cursor = 'grabbing'
            opts.onStart?.()
            return
        }
        const c = this.pick(this.clickables)
        if (!c && this.fallback?.onDown(e)) return
        this.down = { x: e.clientX, y: e.clientY, object: c }
    }

    onMove(e) {
        if (!this.enabled) return
        this.setNdc(e)
        if (this.drag) {
            const p = this.planePoint(this.drag.opts.space)
            if (p) this.drag.opts.onMove?.(p)
            return
        }
        if (this.fallback?.active) return this.fallback.onMove(e)
        if (e.pointerType === 'mouse') {
            const over = this.pick(this.draggables) ? 'grab' : this.pick(this.clickables) ? 'pointer' : ''
            this.canvas.style.cursor = over
            this.fallback?.hover(e, !!over)
        }
    }

    onUp(e, cancel = false) {
        if (this.fallback?.active) return this.fallback.onUp(e)
        if (this.drag) {
            const { opts } = this.drag
            this.setNdc(e)
            const p = this.planePoint(opts.space)
            this.drag = null
            this.canvas.style.cursor = ''
            try { if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId) } catch { /* noop */ }
            opts.onDrop?.(p, cancel)
            return
        }
        const d = this.down
        this.down = null
        if (!d || !d.object || cancel) return
        if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 12) return
        this.clickables.get(d.object)?.(d.object)
    }
}
