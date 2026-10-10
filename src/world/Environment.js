/**
 * Mundo que rodea al libro: cielo, luces, niebla, paisaje y partículas.
 * Cambia de "atmósfera" (mood) con transiciones suaves según la página.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { moods, daySky } from '../data/theme.js'
import { Sky } from './Sky.js'
import { Nature } from './Nature.js'
import { createFireflies, createDust, createMotes } from './Particles.js'

const COLOR_KEYS = ['tint', 'fog', 'hemiSky', 'hemiGround', 'sun', 'ground', 'hills', 'mountains']
const NUMBER_KEYS = ['dusk', 'day', 'skyBright', 'tintAmount', 'fogNear', 'fogFar', 'hemiIntensity', 'sunIntensity', 'fireflies', 'dust', 'exposure']

export class Environment {
    constructor({ scene, renderer, textures }) {
        this.scene = scene
        this.renderer = renderer

        // parámetros animables (se copian a uniforms/luces en update)
        const start = moods.night
        this.p = {}
        for (const k of NUMBER_KEYS) this.p[k] = start[k]
        for (const k of COLOR_KEYS) this.p[k] = new THREE.Color(start[k])

        this.sky = new Sky(textures)
        this.sky.uniforms.uDayTop.value.set(daySky.top)
        this.sky.uniforms.uDayHorizon.value.set(daySky.horizon)
        scene.add(this.sky.mesh)

        scene.fog = new THREE.Fog(this.p.fog.clone(), this.p.fogNear, this.p.fogFar)

        this.hemi = new THREE.HemisphereLight('#ffffff', '#88aa77', 1)
        scene.add(this.hemi)

        // Una sola luz con sombra, encuadrada sobre el libro
        this.sun = new THREE.DirectionalLight('#ffffff', 2)
        this.sun.position.set(-4.5, 9, 5.5)
        this.sun.castShadow = true
        this.sun.shadow.mapSize.set(2048, 2048)
        const sc = this.sun.shadow.camera
        sc.left = -4.6; sc.right = 4.6; sc.top = 4.2; sc.bottom = -4.2; sc.near = 2; sc.far = 22
        this.sun.shadow.bias = -0.0006
        this.sun.shadow.normalBias = 0.025
        this.sun.shadow.radius = 4
        scene.add(this.sun, this.sun.target)

        // luz de contorno (sin sombra) desde atrás: separa las piezas de papel
        // del fondo y da profundidad entre capas
        this.rim = new THREE.DirectionalLight('#cfe0ff', 0.9)
        this.rim.position.set(3, 5, -7)
        scene.add(this.rim)

        this.nature = new Nature()
        scene.add(this.nature.group)

        this.fireflies = createFireflies()
        this.dust = createDust()
        this.motes = createMotes()
        scene.add(this.fireflies, this.dust, this.motes)

        this.current = 'night'
        this.apply()
    }

    /** Cambia la atmósfera con una transición suave. */
    setMood(name, duration = 2.5) {
        const m = moods[name]
        if (!m || name === this.current) return null
        this.current = name
        const tl = gsap.timeline()
        const nums = {}
        for (const k of NUMBER_KEYS) nums[k] = m[k]
        tl.to(this.p, { ...nums, duration, ease: 'sine.inOut' }, 0)
        for (const k of COLOR_KEYS) {
            const c = new THREE.Color(m[k])
            tl.to(this.p[k], { r: c.r, g: c.g, b: c.b, duration, ease: 'sine.inOut' }, 0)
        }
        return tl
    }

    setMoodInstant(name) {
        const m = moods[name]
        if (!m) return
        this.current = name
        for (const k of NUMBER_KEYS) this.p[k] = m[k]
        for (const k of COLOR_KEYS) this.p[k].set(m[k])
        this.apply()
    }

    apply() {
        const p = this.p
        const u = this.sky.uniforms
        u.uDusk.value = p.dusk
        u.uDay.value = p.day
        u.uBright.value = p.skyBright
        u.uTintAmount.value = p.tintAmount
        u.uTint.value.copy(p.tint)
        u.uFog.value.copy(p.fog)
        this.scene.fog.color.copy(p.fog)
        this.scene.fog.near = p.fogNear
        this.scene.fog.far = p.fogFar
        this.hemi.color.copy(p.hemiSky)
        this.hemi.groundColor.copy(p.hemiGround)
        this.hemi.intensity = p.hemiIntensity
        this.sun.color.copy(p.sun)
        this.sun.intensity = p.sunIntensity * (this.flicker ?? 1)
        this.rim.color.copy(p.hemiSky)
        this.rim.intensity = 0.35 + p.hemiIntensity * 0.45
        this.nature.groundMat.color.copy(p.ground)
        this.nature.hillMat.color.copy(p.hills)
        this.nature.mountainMat.color.copy(p.mountains)
        this.renderer.toneMappingExposure = p.exposure
        this.fireflies.material.uniforms.uOpacity.value = p.fireflies
        this.fireflies.visible = p.fireflies > 0.01
        this.dust.material.uniforms.uOpacity.value = p.dust
        this.dust.visible = p.dust > 0.01
    }

    update(dt, t, quake, camera) {
        // variación muy leve de la luz (nubes que pasan)
        this.flicker = 1 + Math.sin(t * 0.37) * 0.035 + Math.sin(t * 1.13 + 1.7) * 0.015
        this.sun.position.x = -4.5 + Math.sin(t * 0.05) * 0.6
        this.apply()
        this.motes.material.uniforms.uTime.value = t
        this.motes.material.uniforms.uOpacity.value = 0.25 + this.p.dusk * 0.5 * (1 - this.p.dust)
        this.sky.mesh.position.copy(camera.position)
        this.fireflies.material.uniforms.uTime.value = t
        this.dust.material.uniforms.uTime.value = t
        this.nature.update(dt, t, quake, this.p.dusk * (0.35 + this.p.day * 0.55))
    }
}
