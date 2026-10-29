/**
 * Nico — personaje principal. Usa el modelo 3D entregado (models/nico.glb, de
 * "animacion niño.blend"): esqueleto Mixamo y cuatro animaciones hechas en
 * Blender — Caminar, Empinarse, Agacharse y Cubrirse.
 *
 * Esas animaciones mandan cuando Nico camina, se estira (reach), se agacha
 * (crouch) o se cubre (cover); se mezclan con suavidad con las demás poses,
 * que siguen siendo procedurales sobre los mismos huesos.
 *
 * Animación por capas:
 *   1. Pose: valores (this.p) que gsap interpola entre poses predefinidas.
 *   2. Resortes: cada grupo del cuerpo sigue su pose con un poco de peso e
 *      inercia (las piernas y la cadera responden primero, luego el torso, los
 *      brazos y la cabeza) → movimiento encadenado, sin saltos.
 *   3. Equilibrio: al bajar o subir, el torso se inclina y los brazos se
 *      adelantan según la velocidad de la cadera (centro de gravedad sobre los
 *      pies). Las piernas usan IK: los pies quedan plantados en el piso.
 *   4. Procedural: respirar, parpadear, caminar, temblar (en update()).
 * Para agregar una pose nueva basta con sumar una entrada en POSES.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { clone as cloneRig } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { geo, mat, add, glowSprite } from '../kit.js'
import { assets } from '../assets.js'

const MOUTH = '#6b3a32'
// medidas del esqueleto (se leen del modelo en template())
let HIP_Y = 0.25 // altura de la cadera de pie
let DROP = 0.15 // cuánto baja la cadera con crouch = 1
let L_THIGH = 0.08
let L_SHIN = 0.08
let STRIDE = 0.05 // medio paso (las piernas del modelo son cortitas)

/** Nombres cortos de los huesos → huesos Mixamo del modelo (sin ':' en three.js). */
const BONES = {
    hips: 'mixamorigHips', spine: 'mixamorigSpine', chest: 'mixamorigSpine2', head: 'mixamorigHead',
    upperArmR: 'mixamorigRightArm', forearmR: 'mixamorigRightForeArm', handR: 'mixamorigRightHand',
    upperArmL: 'mixamorigLeftArm', forearmL: 'mixamorigLeftForeArm', handL: 'mixamorigLeftHand',
    thighR: 'mixamorigRightUpLeg', shinR: 'mixamorigRightLeg', footR: 'mixamorigRightFoot',
    thighL: 'mixamorigLeftUpLeg', shinL: 'mixamorigLeftLeg', footL: 'mixamorigLeftFoot',
}
/** Poses que usan las animaciones de Blender (nombre del clip en nico.glb). */
const CLIP_POSES = { crouch: 'Agacharse', kneel: 'Agacharse', cover: 'Cubrirse', hold: 'Cubrirse', reach: 'Empinarse' }
/** En "¡Sujétate!" el brazo derecho deja la cabeza y agarra la pata de la mesa (pose procedural). */
const ARMS = ['Shoulder', 'Arm', 'ForeArm', 'Hand'].flatMap((n) => [`mixamorigRight${n}`, `mixamorigLeft${n}`])
const CLIP_MASK = {
    hold: ['mixamorigRightShoulder', 'mixamorigRightArm', 'mixamorigRightForeArm', 'mixamorigRightHand'],
    // de rodillas bajo la mesa: cuerpo agachado (Blender) y manos en las rodillas (procedural)
    kneel: ARMS,
}
const SHOE_PARTS = ['zapato', 'lengueta', 'cordones', 'punta', 'suela']

/**
 * Ángulos en radianes (ejes del personaje: x = lado, y = arriba, z = adelante).
 *  armX < 0  brazo hacia adelante/arriba        armZ  abre el brazo hacia afuera (R < 0, L > 0)
 *  elbow > 0 dobla el codo                      crouch 0…1 baja la cadera (sit ≈ 1.15: sentado en el piso)
 *  hipZ      cadera atrás (<0) para equilibrar  fRz / fLz  pie derecho / izquierdo adelante
 *  lean > 0  torso hacia adelante               plant 1 = pies plantados (IK), 0 = piernas libres
 */
const BASE = {
    armRx: 0.06, armRz: -0.07, elbowR: 0.18, armLx: 0.06, armLz: 0.07, elbowL: 0.18,
    crouch: 0, hipZ: 0, fRz: 0, fLz: 0, lean: 0, headX: 0, headY: 0, headZ: 0,
    plant: 1, legRx: 0, legLx: 0, knee: 0.12,
}
const P = (o) => ({ ...BASE, ...o })
export const POSES = {
    idle: P({}),
    show: P({ armRx: -1.15, armRz: -0.2, elbowR: 0.75, headX: 0.16, headY: -0.25, lean: 0.03 }),
    reach: P({ armRx: -2.75, armRz: -0.12, elbowR: 0.08, armLx: 0.2, armLz: 0.22, lean: -0.08, headX: -0.28, fRz: 0.025, fLz: -0.015 }),
    worried: P({ armRx: -0.75, armRz: 0.25, elbowR: 1.55, armLx: -0.75, armLz: -0.25, elbowL: 1.55, crouch: 0.12, hipZ: -0.01, lean: 0.1, headZ: 0.08, headX: 0.05 }),
    run: P({ armRx: -0.2, elbowR: 1.2, armLx: -0.2, elbowL: 1.2, lean: 0.2, crouch: 0.08 }),
    stop: P({ armRx: 0.25, armRz: -0.55, elbowR: 0.35, armLx: 0.25, armLz: 0.55, elbowL: 0.35, lean: -0.14, crouch: 0.1, fRz: 0.045, fLz: -0.03, headX: -0.1, headY: 0.15 }),
    // debajo de la mesa, esperando: agachado sobre los talones, manos en las rodillas
    kneel: P({ crouch: 0.72, hipZ: -0.035, lean: 0.32, armRx: -0.75, armRz: 0.05, elbowR: 0.55, armLx: -0.75, armLz: -0.05, elbowL: 0.55, headX: 0.02 }),
    // "¡Agáchate!": bien pequeñito, como una tortuga (manos al piso, cabeza abajo)
    crouch: P({ crouch: 1, hipZ: -0.045, lean: 0.78, armRx: -0.95, armRz: 0.12, elbowR: 0.55, armLx: -0.95, armLz: -0.12, elbowL: 0.55, headX: 0.3 }),
    // "¡Cúbrete!": codos al frente y manos a los lados de la cabeza y la nuca
    cover: P({ crouch: 1, hipZ: -0.045, lean: 0.55, armRx: -1.95, armRz: 0.42, elbowR: 1.85, armLx: -1.95, armLz: -0.42, elbowL: 1.85, headX: 0.32 }),
    // "¡Sujétate!": un brazo cubre la cabeza, el otro agarra la pata de la mesa
    hold: P({ crouch: 1, hipZ: -0.045, lean: 0.5, armRx: -1.2, armRz: -0.6, elbowR: 0.3, armLx: -1.95, armLz: -0.42, elbowL: 1.85, headX: 0.3, headY: -0.15 }),
    peek: P({ crouch: 0.95, hipZ: -0.035, lean: 0.22, armRx: -1.05, armRz: -0.35, elbowR: 0.45, armLx: -0.7, armLz: -0.05, elbowL: 0.6, headX: -0.18, headY: 0.38, headZ: 0.1 }),
    // sentado en el suelo, con las manos sobre las rodillas
    sit: P({ crouch: 1.17, hipZ: -0.08, fRz: 0.05, fLz: 0.05, lean: 0.14, armRx: -0.85, armRz: 0.05, elbowR: 0.25, armLx: -0.85, armLz: -0.05, elbowL: 0.25, headX: -0.04 }),
    cheer: P({ armRx: -2.75, armRz: -0.4, elbowR: 0.2, armLx: -2.75, armLz: 0.4, elbowL: 0.2, lean: -0.05, headX: -0.2 }),
    dangle: P({ armRx: -2.5, armRz: -0.55, elbowR: 0.25, armLx: -2.5, armLz: 0.55, elbowL: 0.25, plant: 0, legRx: 0.28, legLx: -0.22, knee: 0.35, headX: -0.12 }),
}

/** Resortes por grupo: [frecuencia, amortiguamiento]. */
const SPRING = {
    legs: [17, 0.9], body: [12, 0.8], arms: [10, 0.62], head: [9, 0.72],
}
const GROUP = {
    crouch: 'legs', hipZ: 'legs', fRz: 'legs', fLz: 'legs', plant: 'legs', legRx: 'legs', legLx: 'legs', knee: 'legs',
    lean: 'body',
    armRx: 'arms', armRz: 'arms', elbowR: 'arms', armLx: 'arms', armLz: 'arms', elbowL: 'arms',
    headX: 'head', headY: 'head', headZ: 'head',
}

// ---------------------------------------------------------------- plantilla compartida
let TEMPLATE = null

function hex(color) { return '#' + color.getHexString() }

const ROUGH = { piel: 0.68, pelo: 0.82, ojos: 0.22, ceja: 0.9, zapato: 0.6 }
function roughFor(name) {
    const n = name.toLowerCase()
    for (const [k, r] of Object.entries(ROUGH)) if (n.includes(k)) return r
    return 0.76
}

/** Prepara una sola vez el modelo cargado: materiales del kit, sombras y datos de reposo del esqueleto. */
function template() {
    if (TEMPLATE) return TEMPLATE
    const src = assets.nico
    if (!src) throw new Error('[cuento] El modelo de Nico no está cargado')
    src.updateMatrixWorld(true)
    const sock = mat.clay('#fbf6ee', 0.85)
    src.traverse((o) => {
        if (!o.isMesh) return
        const m = o.material
        const isEye = /ojo|pupila|ceja|nariz/.test(o.name) || /ojos|cejas/.test(m.name)
        o.userData.matName = m.name
        o.material = mat.clay(hex(m.color), roughFor(m.name))
        o.castShadow = !isEye
        o.receiveShadow = false
        o.frustumCulled = false
    })
    // datos de reposo de cada hueso, en el espacio del personaje
    const rest = {}
    const inv = new THREE.Matrix4().copy(src.matrixWorld).invert()
    const m = new THREE.Matrix4()
    src.traverse((o) => {
        if (!o.isBone) return
        m.multiplyMatrices(inv, o.matrixWorld)
        const pos = new THREE.Vector3()
        const q = new THREE.Quaternion()
        const sc = new THREE.Vector3()
        m.decompose(pos, q, sc)
        // scale: escala del hueso en el personaje (el esqueleto viene escalado de Blender)
        rest[o.name] = { pos, q, scale: sc.x, localPos: o.position.clone(), localQ: o.quaternion.clone() }
    })
    for (const [name, r] of Object.entries(rest)) {
        const bone = src.getObjectByName(name)
        const parent = bone.parent
        const pq = rest[parent.name]?.q ?? (() => {
            m.multiplyMatrices(inv, parent.matrixWorld)
            const q = new THREE.Quaternion()
            m.decompose(new THREE.Vector3(), q, new THREE.Vector3())
            return q
        })()
        r.parentInv = pq.clone().invert()
    }
    for (const [alias, name] of Object.entries(BONES)) if (rest[name]) rest[alias] = rest[name]
    // medidas de las piernas del modelo
    HIP_Y = rest.hips.pos.y
    L_THIGH = rest.thighR.pos.distanceTo(rest.shinR.pos)
    L_SHIN = rest.shinR.pos.distanceTo(rest.footR.pos)
    DROP = HIP_Y * 0.6
    STRIDE = HIP_Y * 0.2
    TEMPLATE = { src, rest, sock }
    return TEMPLATE
}

const noRaycast = () => {}
const _q = new THREE.Quaternion()
const _e = new THREE.Euler()
const _v = new THREE.Vector3()
const _axis = new THREE.Vector3()
const _qs = new THREE.Quaternion()
const _q2 = new THREE.Quaternion()
const _qt = new THREE.Quaternion()

export class Nico extends THREE.Group {
    constructor() {
        super()
        this.name = 'nico'
        this.p = { ...POSES.idle, lift: 0 }
        this.s = { ...this.p } // estado suavizado (resortes)
        this.sv = {} // velocidades de los resortes
        for (const k of Object.keys(GROUP)) this.sv[k] = 0
        this.walking = 0
        this.walkSpeed = 0.7
        this.walkPhase = 0
        this.walkAmt = 0
        this.blink = 0
        this.nextBlink = 2
        this.heartGlow = 0
        this.prevCrouch = 0
        this.balance = 0
        this.build()
    }

    build() {
        const T = template()
        this.rest = T.rest
        this.model = cloneRig(T.src)
        this.add(this.model)
        this.bones = {}
        this.model.traverse((o) => { if (o.isBone) this.bones[o.name] = o })
        for (const [alias, name] of Object.entries(BONES)) if (this.bones[name]) this.bones[alias] = this.bones[name]
        this.allBones = [...new Set(Object.values(this.bones))]
        this.parts = {}
        this.model.traverse((o) => {
            if (o.name && (o.isMesh || o.isGroup)) this.parts[o.name] = o
            // los toques se detectan con la caja `hit` (más grande y barata que la malla)
            if (o.isMesh) o.raycast = noRaycast
        })

        // zapatos ↔ calcetines (la actividad 3 se los pone): las piezas del
        // zapato se reconocen por su material; el calcetín es el zapato en blanco
        const meshes = []
        this.model.traverse((o) => { if (o.isSkinnedMesh) meshes.push(o) })
        this.shoes = meshes.filter((m) => SHOE_PARTS.includes(m.userData.matName))
        this.socks = this.shoes.filter((m) => m.userData.matName === 'zapato').map((body) => {
            const s = new THREE.SkinnedMesh(body.geometry, T.sock)
            s.bind(body.skeleton, body.bindMatrix)
            s.castShadow = true
            s.frustumCulled = false
            s.visible = false
            s.raycast = noRaycast
            body.parent.add(s)
            return s
        })

        // el modelo no tiene huesos de párpados: sin parpadeo
        this.eyes = []

        // boca (el modelo no trae boca): justo debajo de la nariz, apoyada en la
        // cara (la base de la nariz). La nariz se mide con el esqueleto en reposo.
        const nose = new THREE.Box3()
        this.model.updateMatrixWorld(true)
        this.model.traverse((o) => {
            if (!o.isSkinnedMesh || o.userData.matName !== 'nariz') return
            o.skeleton.update()
            const v = new THREE.Vector3()
            for (let i = 0; i < o.geometry.attributes.position.count; i++) nose.expandByPoint(o.getVertexPosition(i, v).applyMatrix4(o.matrixWorld))
        })
        const ok = !nose.isEmpty()
        const mx = ok ? (nose.min.x + nose.max.x) / 2 : 0
        const my = ok ? nose.min.y - 0.018 : 0.62
        const mz = ok ? nose.min.z + 0.011 : 0.15
        const mouthMat = mat.clay(MOUTH, 0.6)
        this.mouths = {
            smile: this.attach('head', new THREE.Mesh(geo.torus(0.015, 0.0042, 6, 16, Math.PI), mouthMat), [mx, my, mz]),
            o: this.attach('head', new THREE.Mesh(geo.sphere(0.0095, 12, 10), mouthMat), [mx, my - 0.006, mz]),
            worried: this.attach('head', new THREE.Mesh(geo.torus(0.012, 0.0038, 6, 16, Math.PI), mouthMat), [mx, my - 0.011, mz - 0.002]),
        }
        // pegadas a la cara (la superficie se inclina hacia atrás bajo la nariz)
        for (const m of Object.values(this.mouths)) m.rotateX(0.3)
        this.mouths.smile.rotateZ(Math.PI)
        this.mouths.o.scale.set(0.85, 1.15, 0.5)
        this.face('smile')

        // corazón (brilla cuando despierta el Guardián)
        this.heart = glowSprite('#ffb36b', 0.0, 0.95)
        this.attach('chest', this.heart, [0, 0.46, 0.125])

        // mano derecha: aquí se sostiene el bloque azul
        const hr = this.rest.handR.pos
        this.hand = this.attach('handR', new THREE.Group(), [hr.x, hr.y - 0.03, hr.z + 0.01])

        // animaciones de Blender
        this.mixer = new THREE.AnimationMixer(this.model)
        this.clips = {}
        for (const clip of assets.nicoClips) {
            const a = this.mixer.clipAction(clip)
            a.enabled = true
            a.setEffectiveWeight(0)
            this.clips[clip.name] = a
        }
        this.clipW = 0      // peso de la animación de pose (agacharse, cubrirse, estirarse)
        this.poseClip = null
        if (this.clips.Caminar) this.clips.Caminar.setLoop(THREE.LoopRepeat).play()
        this.clipQ = this.allBones.map(() => new THREE.Quaternion())
        this.clipP = this.allBones.map(() => new THREE.Vector3())

        // zona de toque generosa (actividades)
        this.hit = new THREE.Mesh(geo.box(0.5, 0.95, 0.5), mat.hit())
        this.hit.position.y = 0.47
        this.add(this.hit)

        // descalzo (con calcetines) hasta que se pone los zapatos
        this.setShoes(false)
        // punto sobre la cabeza: de aquí sale la colita de su globo de diálogo
        this.speechAnchor = this.attach('head', new THREE.Object3D(), [0, 0.97, 0.02])
        this.applyRig(0)
    }

    /** Cuelga un objeto de un hueso usando coordenadas del personaje en reposo. */
    attach(boneName, obj, [x, y, z]) {
        const bone = this.bones[boneName]
        const r = this.rest[boneName]
        const inv = r.q.clone().invert()
        // soporte que deshace la escala del hueso: el objeto conserva su tamaño
        const holder = new THREE.Group()
        holder.position.set(x, y, z).sub(r.pos).applyQuaternion(inv).divideScalar(r.scale ?? 1)
        holder.quaternion.copy(inv)
        holder.scale.setScalar(1 / (r.scale ?? 1))
        obj.castShadow = false
        holder.add(obj)
        bone.add(holder)
        return obj
    }

    /** Rota un hueso con ángulos en ejes del personaje (relativos a su padre). */
    joint(name, x = 0, y = 0, z = 0, order = 'XYZ') {
        _q.setFromEuler(_e.set(x, y, z, order))
        this.jointQ(name, _q)
    }

    /** Igual que joint(), con un cuaternión en ejes del personaje. */
    jointQ(name, q) {
        const b = this.bones[name]
        if (!b) return
        const r = this.rest[name]
        b.quaternion.copy(r.parentInv).multiply(q).multiply(r.q)
    }

    // ------------------------------------------------------------ API
    face(name) {
        for (const [k, m] of Object.entries(this.mouths)) m.visible = k === name
        this.currentFace = name
    }

    pose(name, duration = 0.7, ease = 'back.out(1.4)') {
        const target = POSES[name]
        if (!target) return gsap.timeline()
        this.currentPose = name
        this.playPoseClip(CLIP_POSES[name], Math.max(duration, 0.45))
        this.setMask(CLIP_MASK[name], Math.max(duration, 0.45))
        // agacharse/levantarse: nunca de golpe (el peso baja y sube con control)
        const big = Math.abs(target.crouch - this.p.crouch) > 0.25
        if (big) {
            duration = Math.max(duration, 0.85)
            ease = 'power2.inOut'
        }
        return gsap.to(this.p, { ...target, duration, ease, overwrite: 'auto' })
    }

    /** Pasa a la animación de Blender de una pose (o sale de ella, con clip = undefined). */
    playPoseClip(clipName, fade = 0.5) {
        const next = clipName && this.clips?.[clipName]
        if (next && next !== this.poseClip) {
            next.reset().setLoop(THREE.LoopOnce, 1)
            next.clampWhenFinished = true
            next.play()
            // si ya está agachado (de rodillas, bajo la mesa), la animación entra
            // en su pose final: no se levanta para volver a agacharse
            if (clipName === 'Agacharse' && (this.s.crouch > 0.4 || this.poseClip)) next.time = next.getClip().duration
            this.prevClip = this.poseClip
            this.poseClip = next
            this.clipMix = 0 // de la animación anterior a la nueva
            gsap.to(this, { clipMix: 1, duration: fade, ease: 'power2.inOut', overwrite: 'auto' })
        }
        gsap.to(this, { clipW: next ? 1 : 0, duration: fade, ease: 'power2.inOut' })
    }

    /** Huesos que dejan la animación y siguen la pose procedural (con un fundido). */
    setMask(names = [], fade = 0.5) {
        this.mask = this.mask ?? {}
        const to = {}
        for (const b of this.allBones) to[b.name] = names.includes(b.name) ? 1 : 0
        gsap.to(this.mask, { ...to, duration: fade, ease: 'power2.inOut', overwrite: true })
    }

    poseInstant(name) {
        this.mask = Object.fromEntries((CLIP_MASK[name] ?? []).map((n) => [n, 1]))
        const clip = CLIP_POSES[name] && this.clips?.[CLIP_POSES[name]]
        if (clip) {
            this.playPoseClip(CLIP_POSES[name], 0)
            clip.time = clip.getClip().duration
            gsap.killTweensOf(this, 'clipW,clipMix')
            this.clipW = 1
            this.clipMix = 1
        } else if (this.clips) {
            gsap.killTweensOf(this, 'clipW,clipMix')
            this.clipW = 0
            this.poseClip = null
        }
        Object.assign(this.p, POSES[name])
        Object.assign(this.s, POSES[name])
        for (const k of Object.keys(this.sv)) this.sv[k] = 0
        this.prevCrouch = this.p.crouch
        this.currentPose = name
        this.applyRig(0)
    }

    setShoes(on) {
        this.shoes.forEach((s) => { s.visible = on })
        this.socks.forEach((s) => { s.visible = !on })
    }

    /** Sostener un objeto en la mano derecha (ej. el bloque azul). */
    hold(object) {
        this.hand.clear()
        if (object) this.hand.add(object)
    }

    turnTo(x, z, duration = 0.5) {
        const angle = Math.atan2(x - this.position.x, z - this.position.z)
        let delta = angle - this.rotation.y
        delta = Math.atan2(Math.sin(delta), Math.cos(delta))
        return gsap.to(this.rotation, { y: this.rotation.y + delta, duration, ease: 'power2.out' })
    }

    /** Caminar hasta (x, z) del escenario. speed en unidades/segundo. */
    walkTo(x, z, { speed = 0.75, face = true, run = false } = {}) {
        const dist = Math.hypot(x - this.position.x, z - this.position.z)
        const duration = Math.max(0.35, dist / speed)
        const tl = gsap.timeline()
        if (face) tl.add(this.turnTo(x, z, 0.35), 0)
        tl.call(() => { this.walking = run ? 1.6 : 1; this.walkSpeed = speed }, null, 0.1)
        tl.to(this.position, { x, z, duration, ease: 'sine.inOut' }, 0.1)
        tl.call(() => { this.walking = 0 })
        return tl
    }

    heartbeat(times = 3) {
        const tl = gsap.timeline()
        for (let i = 0; i < times; i++) {
            tl.to(this, { heartGlow: 1, duration: 0.14, ease: 'power2.out' })
            tl.to(this, { heartGlow: 0.35, duration: 0.5, ease: 'power2.in' })
        }
        return tl
    }

    /** Pequeño salto de reacción. */
    hop() {
        return gsap.timeline()
            .to(this.p, { lift: 0.1, duration: 0.18, ease: 'power2.out' })
            .to(this.p, { lift: 0, duration: 0.35, ease: 'bounce.out' })
    }

    // ------------------------------------------------------------ loop
    springs(dt) {
        const h = Math.min(dt, 1 / 30) / 2
        for (const [k, g] of Object.entries(GROUP)) {
            const [w, z] = SPRING[g]
            for (let i = 0; i < 2; i++) {
                const a = w * w * (this.p[k] - this.s[k]) - 2 * z * w * this.sv[k]
                this.sv[k] += a * h
                this.s[k] += this.sv[k] * h
            }
        }
        this.s.lift = this.p.lift
    }

    update(dt, t, quake) {
        this.springs(dt)
        // equilibrio: mientras la cadera sube o baja, el torso se adelanta y
        // los brazos se abren un poco (centro de gravedad sobre los pies)
        const vel = dt > 0 ? (this.s.crouch - this.prevCrouch) / dt : 0
        this.prevCrouch = this.s.crouch
        const target = Math.min(1, Math.abs(vel) / 1.6)
        this.balance += (target - this.balance) * Math.min(1, dt * 9)
        this.applyRig(t, dt, quake)
    }

    applyRig(t = 0, dt = 0, quake = null) {
        const s = this.s
        const B = this.bones
        const bal = this.balance

        // ---- 1. animaciones de Blender: se evalúan y se guardan
        const walkOn = this.walking > 0
        this.walkAmt += ((walkOn ? 1 : 0) - this.walkAmt) * Math.min(1, dt * 8)
        // la animación de caminar es de pie: agachado o de rodillas (bajo la mesa)
        // camina con el paso procedural, sin levantarse
        const standing = 1 - Math.min(1, Math.max(this.s.crouch, this.p.crouch) * 1.8)
        const wW = this.clips?.Caminar ? this.walkAmt * (1 - this.clipW) * standing : 0
        const W = Math.min(1, this.clipW + wW)
        if (W > 0.001) {
            const walk = this.clips.Caminar
            if (walk) {
                walk.setEffectiveWeight(wW / W)
                walk.setEffectiveTimeScale(THREE.MathUtils.clamp((this.walkSpeed * Math.max(1, this.walking)) / 0.5, 0.6, 2))
            }
            for (const a of Object.values(this.clips)) if (a !== walk) a.setEffectiveWeight(0)
            if (this.poseClip) {
                const pw = this.clipW / W
                if (this.prevClip && this.clipMix < 1) {
                    this.prevClip.setEffectiveWeight(pw * (1 - this.clipMix))
                    this.poseClip.setEffectiveWeight(pw * this.clipMix)
                } else this.poseClip.setEffectiveWeight(pw)
            }
            this.mixer.update(dt)
            this.allBones.forEach((b, i) => { this.clipQ[i].copy(b.quaternion); this.clipP[i].copy(b.position) })
        } else if (dt) this.mixer?.update(dt)
        // las poses procedurales parten del reposo
        for (const b of this.allBones) {
            const r = this.rest[b.name]
            b.quaternion.copy(r.localQ)
            b.position.copy(r.localPos)
        }

        // ---- caminar (pasos cortos y rápidos: piernas cortitas)
        const walking = this.walking > 0
        if (walking) this.walkPhase += dt * (Math.PI * this.walkSpeed * this.walking) / (2 * STRIDE) * 0.55
        const wa = this.walkAmt
        const ph = this.walkPhase
        const breath = Math.sin(t * 2.2) * 0.012

        // ---- cadera
        // rodillas apenas flojas de pie; al caminar la cadera baja en cada apoyo
        const bob = wa * (0.006 + Math.abs(Math.sin(ph)) * 0.01)
        const hipY = HIP_Y - 0.004 - s.crouch * DROP + s.lift - bob
        const hipZ = s.hipZ - bal * 0.012
        const hr = this.rest.hips
        _v.set(0, hipY - hr.pos.y, hipZ).applyQuaternion(hr.parentInv)
        B.hips.position.copy(hr.localPos).add(_v)
        const sway = quake && quake.intensity > 0.01 ? quake.shake.x * 0.08 : 0
        this.joint('hips', 0, wa * Math.sin(ph) * 0.08, 0)

        // ---- torso: la inclinación se reparte entre columna y pecho
        const lean = s.lean + bal * 0.32 + wa * 0.06
        this.joint('spine', lean * 0.45 + breath * 0.3, -wa * Math.sin(ph) * 0.1, sway)
        this.joint('chest', lean * 0.55 - breath * 0.5, 0, sway * 0.4)
        this.joint('head', s.headX + breath * 0.6 - bal * 0.1, s.headY, s.headZ + (quake && quake.intensity > 0.01 ? quake.shake.z * 0.06 : 0))

        // ---- brazos (balanceo al caminar y al equilibrarse)
        const swing = wa * Math.sin(ph) * 0.55
        this.joint('upperArmR', s.armRx - swing - bal * 0.45, 0, s.armRz - bal * 0.15)
        this.joint('forearmR', -(s.elbowR + bal * 0.3 + wa * 0.35), 0, 0)
        this.joint('upperArmL', s.armLx + swing - bal * 0.45, 0, s.armLz + bal * 0.15)
        this.joint('forearmL', -(s.elbowL + bal * 0.3 + wa * 0.35), 0, 0)

        // ---- piernas: IK con los pies plantados (o libres si plant = 0)
        this.leg('R', s.fRz + wa * Math.sin(ph) * STRIDE, wa * Math.max(0, Math.cos(ph)) * 0.035, s.legRx + wa * Math.sin(ph) * 0.5, hipY, hipZ)
        this.leg('L', s.fLz - wa * Math.sin(ph) * STRIDE, wa * Math.max(0, -Math.cos(ph)) * 0.035, s.legLx - wa * Math.sin(ph) * 0.5, hipY, hipZ)

        // ---- parpadeo
        if (dt) {
            this.nextBlink -= dt
            if (this.nextBlink < 0) {
                this.blink = 0.14
                this.nextBlink = 2 + Math.random() * 3
            }
            this.blink = Math.max(0, this.blink - dt)
        }
        const ey = this.blink > 0 ? 0.12 : 1
        for (const e of this.eyes) { e.scale.set(1, 1, 1); e.scale[this.eyeAxis] = ey }

        // ---- 2. mezcla con las animaciones de Blender
        if (W > 0.001) {
            this.allBones.forEach((b, i) => {
                const w = W * (1 - (this.mask?.[b.name] ?? 0) * (this.clipW / W))
                b.quaternion.slerp(this.clipQ[i], w)
                b.position.lerp(this.clipP[i], w)
            })
        }

        // ---- corazón
        const hg = this.heartGlow
        this.heart.visible = hg > 0.01
        this.heart.scale.setScalar(0.06 + hg * 0.3)
        this.heart.material.opacity = hg
    }

    /**
     * Pierna de 2 huesos en el plano sagital. Con plant = 1 el tobillo va a su
     * punto en el piso (adelante = +z); con plant = 0 se usan ángulos libres.
     */
    leg(side, footZ, footLift, fkThigh, hipY, hipZ) {
        const s = this.s
        const rt = this.rest[`thigh${side}`]
        const ra = this.rest[`foot${side}`]
        // posición de la articulación de la cadera (la pelvis no rota en x)
        const hy = rt.pos.y - HIP_Y + hipY
        const hz = rt.pos.z + hipZ
        const ay = ra.pos.y + footLift
        const az = ra.pos.z + footZ
        const dy = ay - hy
        const dz = az - hz
        const reach = L_THIGH + L_SHIN
        const d = Math.min(reach - 1e-4, Math.max(Math.abs(L_THIGH - L_SHIN) + 0.012, Math.hypot(dy, dz)))
        const phi = Math.atan2(dz, -dy)
        const alpha = Math.acos(THREE.MathUtils.clamp((L_THIGH * L_THIGH + d * d - L_SHIN * L_SHIN) / (2 * L_THIGH * d), -1, 1))
        const beta = Math.acos(THREE.MathUtils.clamp((L_THIGH * L_THIGH + L_SHIN * L_SHIN - d * d) / (2 * L_THIGH * L_SHIN), -1, 1))
        const ikThigh = -(phi + alpha)
        const ikKnee = Math.PI - beta
        const w = THREE.MathUtils.clamp(s.plant, 0, 1)
        const thigh = ikThigh * w + fkThigh * (1 - w)
        const knee = ikKnee * w + s.knee * (1 - w)
        // las rodillas se abren un poco al agacharse: el giro es alrededor del
        // eje cadera–tobillo, así el pie no se mueve del lugar
        const spread = (side === 'R' ? -1 : 1) * Math.min(1, s.crouch) * 0.22 * w
        _axis.set(0, dy, dz).normalize()
        _qs.setFromAxisAngle(_axis, -spread)
        _q2.setFromEuler(_e.set(thigh, 0, 0))
        this.jointQ(`thigh${side}`, _qt.multiplyQuaternions(_qs, _q2))
        this.joint(`shin${side}`, knee, 0, 0)
        // el pie queda plano sobre el piso (deshace la flexión y la apertura)
        _q2.setFromEuler(_e.set(-(thigh + knee) * w, 0, 0))
        this.jointQ(`foot${side}`, _qt.multiplyQuaternions(_q2, _qs.invert()))
    }
}
