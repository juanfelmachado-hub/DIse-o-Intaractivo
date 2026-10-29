/**
 * El Guardián — una vocecita valiente que despierta en el pecho de Nico.
 * Modelo 3D de "guardian animado.blend" (models/guardian.glb): cuerpo verde
 * redondo con bracitos y un girasol en la cabeza, con esqueleto y las mismas
 * animaciones de Nico adaptadas a su cuerpo (Caminar, Empinarse, Agacharse,
 * Cubrirse). Camina al trasladarse, se empina para saludar y se agacha y se
 * cubre junto con Nico en el juego del tambor.
 *
 * Siempre flota (suspensión del .blend): bob + leve giro + squash al hablar.
 * Sigue un punto `home` con suavizado, por eso sus traslados se ven orgánicos.
 *
 * Antes de cada actividad sale del libro hacia la cámara (`viewerBlend`), mira
 * al lector (`faceViewer`) y lo saluda (`wave`): rompe la cuarta pared.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { clone as cloneRig } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { geo, mat, add, glowSprite, starSprite } from '../kit.js'
import { assets } from '../assets.js'
import { playSfx } from '../../audio/sfx.js'

const BODY_WIDTH = 0.3 // ancho con los bracitos (el mismo tamaño del Guardián anterior)
let TEMPLATE = null
/** Prepara una sola vez el modelo cargado: escala, centro del cuerpo y sombras. */
function template() {
    if (TEMPLATE) return TEMPLATE
    const src = assets.guardian
    if (!src) throw new Error('[cuento] El modelo del Guardián no está cargado')
    src.updateMatrixWorld(true)
    let body = null
    src.traverse((o) => {
        if (!o.isMesh) return
        if (o.material.name === 'guardian_cuerpo') body = o
        o.castShadow = o === body
        o.receiveShadow = false
        o.frustumCulled = false
        o.raycast = () => {}
    })
    const box = new THREE.Box3().setFromObject(body)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const k = BODY_WIDTH / size.x
    TEMPLATE = { src, k, center }
    return TEMPLATE
}

export class Guardian extends THREE.Group {
    /** PointLight global asignada por Experience. */
    static light = null

    constructor() {
        super()
        this.name = 'guardian'
        this.home = new THREE.Vector3()
        this.glow = 0.6
        this.squash = 0
        this.appearT = 1
        this.worldPos = new THREE.Vector3()
        this.viewerPoint = new THREE.Vector3()
        this.viewerBlend = 0
        this.faceViewer = false
        this.wave = 0
        this.presence = 1
        this.presenceTarget = 1
        this.presenceVel = 0
        this.baseScale = 1.4
        this.target = new THREE.Vector3()
        this.qLook = new THREE.Quaternion()
        this.qRest = new THREE.Quaternion()
        this.scale.setScalar(this.baseScale)
        this.build()
    }

    build() {
        this.inner = new THREE.Group()
        this.add(this.inner)

        const T = template()
        this.model = cloneRig(T.src)
        this.model.scale.setScalar(T.k)
        this.model.position.copy(T.center).multiplyScalar(-T.k)  // el centro del cuerpo en el origen
        this.inner.add(this.model)
        this.bones = {}
        this.model.traverse((o) => {
            if (o.isBone) this.bones[o.name] = o
            // brillo propio del cuerpo (cada Guardián tiene su material)
            if (o.isMesh && o.material.name === 'guardian_cuerpo') {
                o.material = o.material.clone()
                o.material.emissive = new THREE.Color('#5db65a')
                o.material.emissiveIntensity = 0.45
                o.userData.ownMaterial = true
                this.bodyMat = o.material
            }
        })
        this.chest = this.bones.mixamorigSpine2 ?? this.inner

        // animaciones (mismas de Nico, adaptadas al Guardián en Blender)
        this.mixer = new THREE.AnimationMixer(this.model)
        this.clips = {}
        for (const clip of assets.guardianClips) this.clips[clip.name] = this.mixer.clipAction(clip)
        this.current = null

        this.halo = glowSprite('#c9f7a6', 0.7, 0.75)
        this.add(this.halo)
    }

    /**
     * Reproduce una animación: 'Caminar' (en bucle), 'Empinarse', 'Agacharse',
     * 'Cubrirse' (una vez y se queda en la pose final) o null para volver a flotar.
     */
    play(name, fade = 0.35) {
        const next = name && this.clips[name]
        if (next === this.current) return
        if (next) {
            next.reset()
            if (name === 'Caminar') next.setLoop(THREE.LoopRepeat)
            else { next.setLoop(THREE.LoopOnce, 1); next.clampWhenFinished = true }
            next.setEffectiveWeight(1).play()
            if (this.current) next.crossFadeFrom(this.current, fade, false)
            else next.fadeIn(fade)
        } else if (this.current) this.current.fadeOut(fade)
        this.current = next || null
    }

    /** Imita la postura de Nico en el juego del tambor (crouch, cover, hold). */
    mimic(pose) {
        const map = { crouch: 'Agacharse', cover: 'Cubrirse', hold: 'Cubrirse', kneel: 'Agacharse' }
        this.play(map[pose] ?? null, 0.5)
    }

    /** Juego 1: cada peligro encontrado se pega como sticker en el pecho del Guardián. */
    addSticker(color) {
        const n = this.stickers?.length ?? 0
        this.stickers = this.stickers ?? []
        const spots = [[-0.045, -0.045], [0.045, -0.05], [-0.02, -0.095], [0.035, -0.1]]
        const [x, y] = spots[n % spots.length]
        const st = add(this.inner, geo.circle(0.022, 16), mat.clay(color, 0.5), [x, y, 0.13], { cast: false })
        st.lookAt(st.position.clone().multiplyScalar(2))
        this.inner.updateMatrixWorld(true)
        this.chest.attach(st)
        st.scale.setScalar(0.01)
        gsap.to(st.scale, { x: 1, y: 1, z: 1, duration: 0.45, ease: 'back.out(2.5)' })
        this.stickers.push(st)
        return st
    }

    /** Estrellas ganadas en los juegos: giran alrededor del Guardián. */
    setStars(n) {
        this.starSprites = this.starSprites ?? []
        while (this.starSprites.length < n) {
            const s = starSprite('#FFC247', 0.075)
            this.add(s)
            this.starSprites.push(s)
        }
    }

    /** Al final: las tres estrellas se juntan y el Guardián se ilumina. */
    gatherStars() {
        const tl = gsap.timeline()
        ;(this.starSprites ?? []).forEach((s, i) => {
            tl.to(s.position, { x: 0, y: 0.02, z: 0.06, duration: 0.8, ease: 'power2.inOut' }, i * 0.15)
            tl.to(s.scale, { x: 0.16, y: 0.16, duration: 0.8, ease: 'power2.inOut' }, i * 0.15)
        })
        this.gathering = true
        tl.add(this.pulse(3), 0.6)
        tl.to(this, { glow: 2.6, duration: 0.8, ease: 'power2.out' }, 0.8)
        return tl
    }

    /** Aparece desde el pecho de Nico con un giro en espiral. */
    appear(from, to) {
        playSfx('guardian-llama') // se acerca a Nico: sonido suave de llegada
        this.position.copy(from)
        this.home.copy(to)
        this.appearT = 0
        this.visible = true
        const tl = gsap.timeline()
        tl.fromTo(this.inner.scale, { x: 0.01, y: 0.01, z: 0.01 }, { x: 1, y: 1, z: 1, duration: 1.1, ease: 'elastic.out(1, 0.55)' }, 0.1)
        tl.fromTo(this, { glow: 2.5 }, { glow: 0.7, duration: 1.6, ease: 'power2.out' }, 0)
        tl.to(this, { appearT: 1, duration: 1.4, ease: 'power2.out' }, 0)
        tl.add(this.speak(), 0.9)
        return tl
    }

    /** Se traslada caminando (con la animación de caminar) hasta v. */
    moveTo(v, duration = 1.0) {
        if (!this.current || this.current === this.clips.Caminar) this.play('Caminar', 0.25)
        return gsap.to(this.home, {
            x: v.x, y: v.y, z: v.z, duration, ease: 'power2.inOut',
            onComplete: () => { if (this.current === this.clips.Caminar) this.play(null, 0.4) },
        })
    }

    speak() {
        return gsap.timeline()
            .to(this, { squash: 1, duration: 0.12, ease: 'power2.out' })
            .to(this, { squash: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    pulse(times = 2) {
        const tl = gsap.timeline()
        for (let i = 0; i < times; i++) {
            tl.to(this, { glow: 2.2, duration: 0.3, ease: 'power2.out' })
            tl.to(this, { glow: 0.7, duration: 0.6, ease: 'power2.in' })
        }
        return tl
    }

    /** Saluda al lector: se empina y levanta el bracito. */
    greet() {
        return gsap.timeline()
            .call(() => this.play('Empinarse', 0.3))
            .add(this.speak(), 0.1)
            .add(this.pulse(1), 0.1)
            .call(() => { if (this.current === this.clips.Empinarse) this.play(null, 0.6) }, null, 1.9)
    }

    update(dt, t, camera) {
        // presencia: aparece/desaparece con un resorte elástico (es mágico)
        const k = 120
        const acc = k * (this.presenceTarget - this.presence) - 2 * 0.38 * Math.sqrt(k) * this.presenceVel
        this.presenceVel += acc * Math.min(dt, 1 / 30)
        this.presence = Math.max(0, this.presence + this.presenceVel * Math.min(dt, 1 / 30))
        this.scale.setScalar(this.baseScale * Math.max(0.0001, this.presence) * (1 + this.viewerBlend * 0.12))

        // seguimiento suave del punto "home" o del punto frente al lector
        this.target.copy(this.home).lerp(this.viewerPoint, this.viewerBlend)
        const follow = 1 - Math.pow(0.02, dt * (0.6 + this.appearT * 1.4 + this.viewerBlend * 2))
        this.position.lerp(this.target, follow)

        // mirar al lector
        this.qRest.identity()
        if (camera && (this.faceViewer || this.viewerBlend > 0.01)) {
            const saved = this.quaternion.clone()
            this.lookAt(camera.position)
            this.qLook.copy(this.quaternion)
            this.quaternion.copy(saved)
            this.quaternion.slerp(this.faceViewer ? this.qLook : this.qRest, Math.min(1, dt * 5))
        } else {
            this.quaternion.slerp(this.qRest, Math.min(1, dt * 4))
        }
        this.mixer.update(dt)
        this.inner.position.y = Math.sin(t * 2.1) * 0.035
        this.inner.rotation.y = Math.sin(t * 0.9) * 0.35 * (1 - this.viewerBlend * 0.8)
        this.inner.rotation.z = Math.sin(t * 1.3) * 0.08
        const s = this.squash
        this.inner.scale.x = this.inner.scale.z = this.appearT < 1 ? this.inner.scale.x : 1 + s * 0.14
        if (this.appearT >= 1) this.inner.scale.y = 1 - s * 0.12

        // estrellas en órbita
        if (this.starSprites && !this.gathering) {
            const n = this.starSprites.length
            this.starSprites.forEach((s, i) => {
                const a = t * 1.4 + (i / Math.max(1, n)) * Math.PI * 2
                s.position.set(Math.cos(a) * 0.17, 0.05 + Math.sin(t * 2 + i) * 0.02, Math.sin(a) * 0.17)
            })
        }

        const g = this.glow
        this.bodyMat.emissiveIntensity = 0.3 + g * 0.35
        this.halo.material.opacity = 0.35 + g * 0.35
        this.halo.scale.setScalar(0.55 + g * 0.18 + Math.sin(t * 3) * 0.03)
        // Luz compartida (una sola en toda la experiencia: agregar/quitar luces
        // recompila shaders, así que el Guardián solo la mueve y la enciende).
        const light = Guardian.light
        if (light && this.visible && this.presence > 0.05) {
            this.getWorldPosition(this.worldPos)
            light.position.copy(this.worldPos)
            light.intensity = (0.25 + g * 0.45) * Math.min(1, this.inner.scale.x) * Math.min(1, this.presence)
        }
    }
}
