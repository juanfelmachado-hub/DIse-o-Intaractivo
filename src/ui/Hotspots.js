/**
 * Marcadores HTML tocables que siguen a objetos 3D (proyección cada frame).
 * Son <button> reales: accesibles con teclado y fáciles de tocar en tablet.
 */
import * as THREE from 'three'

const v = new THREE.Vector3()

export class Hotspots {
    constructor(container, camera) {
        this.container = container
        this.camera = camera
        this.items = new Map()
    }

    add(id, object, { label = '', onClick = null, className = '', index = 0, showLabel = false, passive = false } = {}) {
        this.remove(id)
        const el = document.createElement('button')
        el.type = 'button'
        el.className = `hotspot ${className}`
        el.style.setProperty('--i', index)
        el.setAttribute('aria-label', label)
        el.innerHTML = `<span class="hotspot__ring"></span>${label ? `<span class="hotspot__label">${label}</span>` : ''}`
        if (showLabel) el.classList.add('show-label')
        if (onClick) el.addEventListener('click', (e) => { e.stopPropagation(); onClick(id) })
        // passive: el puntero lo atraviesa (para arrastrar el objeto 3D debajo),
        // pero sigue siendo accesible con teclado
        if (!onClick || passive) el.style.pointerEvents = 'none'
        if (!onClick) el.tabIndex = -1
        this.container.append(el)
        this.items.set(id, { el, object })
        return el
    }

    setClass(id, cls, on = true) {
        this.items.get(id)?.el.classList.toggle(cls, on)
    }

    remove(id) {
        const it = this.items.get(id)
        if (!it) return
        it.el.remove()
        this.items.delete(id)
    }

    clear() {
        for (const id of [...this.items.keys()]) this.remove(id)
    }

    update() {
        if (!this.items.size) return
        const w = window.innerWidth
        const h = window.innerHeight
        for (const { el, object } of this.items.values()) {
            object.getWorldPosition(v)
            v.project(this.camera)
            const visible = v.z < 1 && object.visible !== false
            el.style.opacity = visible ? '' : '0'
            el.style.transform = `translate(${((v.x + 1) / 2) * w}px, ${((1 - v.y) / 2) * h}px)`
        }
    }
}
