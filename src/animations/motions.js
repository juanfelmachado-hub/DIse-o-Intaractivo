/**
 * Pequeñas animaciones reutilizables (bamboleos, brillos, onomatopeyas…).
 * Todas devuelven timelines de gsap para que el guion pueda encadenarlas.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { glowSprite } from '../models/kit.js'

/** Bamboleo "esto se puede caer": gira desde su origen y vuelve. */
export function wobble(obj, { axis = 'z', amount = 0.12, times = 4, duration = 0.9 } = {}) {
    const base = obj.userData.wobbleBase ?? (obj.userData.wobbleBase = obj.rotation[axis])
    const tl = gsap.timeline()
    const step = duration / (times * 2)
    for (let i = 0; i < times; i++) {
        const a = amount * (1 - i / times)
        tl.to(obj.rotation, { [axis]: base + a, duration: step, ease: 'sine.inOut' })
        tl.to(obj.rotation, { [axis]: base - a, duration: step, ease: 'sine.inOut' })
    }
    tl.to(obj.rotation, { [axis]: base, duration: step, ease: 'sine.out' })
    return tl
}

/** Salto con estiramiento (squash & stretch). */
export function bounce(obj, height = 0.12) {
    const y = obj.position.y
    const s = obj.scale.clone()
    return gsap.timeline()
        .to(obj.scale, { x: s.x * 1.08, y: s.y * 0.9, z: s.z * 1.08, duration: 0.12, ease: 'power2.out' })
        .to(obj.position, { y: y + height, duration: 0.25, ease: 'power2.out' }, '>')
        .to(obj.scale, { x: s.x * 0.95, y: s.y * 1.08, z: s.z * 0.95, duration: 0.25 }, '<')
        .to(obj.position, { y, duration: 0.4, ease: 'bounce.out' })
        .to(obj.scale, { x: s.x, y: s.y, z: s.z, duration: 0.4, ease: 'elastic.out(1,0.5)' }, '<')
}

/** Destello de estrellitas alrededor de un punto. */
export function sparkle(parent, position, { color = '#fff6c2', count = 7, radius = 0.35, size = 0.22 } = {}) {
    const tl = gsap.timeline()
    for (let i = 0; i < count; i++) {
        const s = glowSprite(color, 0.001, 1)
        s.position.copy(position)
        parent.add(s)
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.5
        const r = radius * (0.6 + Math.random() * 0.6)
        tl.to(s.position, {
            x: position.x + Math.cos(a) * r, y: position.y + 0.1 + Math.random() * radius, z: position.z + Math.sin(a) * r * 0.6,
            duration: 0.9, ease: 'power2.out',
        }, i * 0.03)
        tl.to(s.scale, { x: size, y: size, duration: 0.25, ease: 'back.out(2)' }, i * 0.03)
        tl.to(s.material, { opacity: 0, duration: 0.5, ease: 'power1.in' }, i * 0.03 + 0.5)
        tl.call(() => { parent.remove(s); s.material.dispose() }, null, i * 0.03 + 1.05)
    }
    return tl
}

/** Brillo puntual que crece y se apaga (marca algo importante). */
export function glint(parent, position, { color = '#ffffff', size = 0.6 } = {}) {
    const s = glowSprite(color, 0.001, 1)
    s.position.copy(position)
    parent.add(s)
    return gsap.timeline()
        .to(s.scale, { x: size, y: size, duration: 0.35, ease: 'back.out(2)' })
        .to(s.material, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 0.45)
        .call(() => { parent.remove(s); s.material.dispose() })
}

/** Palabra flotante (onomatopeya) hecha con canvas: "clin", "pum"... */
const FONT = "'Fredoka', 'Trebuchet MS', sans-serif"
export function wordSprite(text, color = '#ea5b4f') {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 256
    const g = c.getContext('2d')
    g.font = `700 150px ${FONT}`
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.lineJoin = 'round'
    g.lineWidth = 26
    g.strokeStyle = '#ffffff'
    g.strokeText(text, 256, 132)
    g.fillStyle = color
    g.fillText(text, 256, 132)
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    const m = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false })
    const s = new THREE.Sprite(m)
    s.renderOrder = 10
    s.userData.ownMaterial = true
    s.userData.ownTexture = tex
    s.scale.set(0.001, 0.0005, 1)
    return s
}

export function popWord(parent, text, position, { color, size = 0.62, rise = 0.45, hold = 0.9 } = {}) {
    const s = wordSprite(text, color)
    s.position.copy(position)
    s.material.rotation = (Math.random() - 0.5) * 0.4
    parent.add(s)
    return gsap.timeline()
        .to(s.scale, { x: size, y: size / 2, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
        .to(s.position, { y: position.y + rise, duration: hold + 0.6, ease: 'sine.out' }, 0)
        .to(s.material, { opacity: 0, duration: 0.5, ease: 'power1.in' }, hold)
        .call(() => {
            parent.remove(s)
            s.material.dispose()
            s.userData.ownTexture.dispose()
        })
}
