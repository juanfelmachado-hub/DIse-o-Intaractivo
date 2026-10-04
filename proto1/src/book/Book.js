/**
 * El libro: protagonista de la experiencia.
 *
 * Jerarquía:
 *   root   → posición en el mundo + flotación (sensación de suspensión del .blend)
 *   pivot  → orientación (de pie mostrando la portada ↔ acostado abierto)
 *   inner  → desplazamiento para centrar el libro cerrado
 *     ├─ mitad derecha (contratapa + bloque de hojas + hoja derecha)
 *     ├─ leftHinge (tapa + bloque + hoja izquierda) — gira 180° sobre el lomo
 *     ├─ flipper  (la hoja que el lector arrastra: malla 25×7 curvada por CPU)
 *     └─ stage    (aquí se despliegan los escenarios pop-up)
 *
 * La hoja NO se anima sola: PageTurner fija su ángulo (θ), curvatura y torsión
 * cada frame según el arrastre del mouse. `sheetFrame()` expone la superficie
 * curvada para que las piezas pop-up puedan ir "pegadas" a la hoja.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { geo, mesh, glowTexture, popupClip } from '../models/kit.js'
import { makeCoverTexture, makeEdgeTexture } from './PageArt.js'

export const BOOK = { PW: 3.05, PD: 4.0, M: 0.1, COVER_T: 0.07, BLOCK_T: 0.15 }
const SEGS = 24
const ZS = 6
const SHEET_Y = 0.006
const COVER_Y = 2.35
const OPEN_Y = 0.62
export const CLOSED_X = -(BOOK.PW + BOOK.M) / 2

const FLOAT_COVER = { amp: 0.12, tilt: 0.035, yaw: -0.18 }
const FLOAT_OPEN = { amp: 0.03, tilt: 0.006, yaw: 0 }

export class Book {
    constructor() {
        const { PW, PD, M, COVER_T, BLOCK_T } = BOOK

        this.root = new THREE.Group()
        this.root.name = 'book'
        this.pivot = new THREE.Group()
        this.inner = new THREE.Group()
        this.root.add(this.pivot)
        this.pivot.add(this.inner)

        this.stage = new THREE.Group()
        this.stage.position.y = 0.003
        this.inner.add(this.stage)

        this.baseY = COVER_Y
        this.float = { speed: 0.9, ...FLOAT_COVER }
        this.look = new THREE.Vector2()
        this._n = new THREE.Vector3()
        this._p = new THREE.Vector3()
        this.leftTex = null
        this.rightTex = null
        this.turn = null
        this.sheet = { theta: 0, curl: 0, twist: 0 }

        // material propio (no del kit): el recorte de la ranura no afecta al libro
        const coverMat = new THREE.MeshStandardMaterial({ color: '#cf5b3c', roughness: 0.62 })
        const edgeMat = new THREE.MeshStandardMaterial({ map: makeEdgeTexture(), roughness: 0.95 })

        // ---- mitad derecha (fija)
        const back = mesh(geo.rbox(PW + M, COVER_T, PD + 2 * M, 0.03), coverMat, { cast: true, receive: true })
        back.position.set((PW + M) / 2, -BLOCK_T - COVER_T / 2, 0)
        const rBlock = mesh(geo.box(PW, BLOCK_T, PD), edgeMat, { cast: false, receive: true })
        rBlock.position.set(PW / 2, -BLOCK_T / 2, 0)
        this.rightPage = this.makePagePlane()
        this.rightPage.rotation.x = -Math.PI / 2
        this.rightPage.position.set(PW / 2, 0.0015, 0)
        this.inner.add(back, rBlock, this.rightPage)

        // ---- mitad izquierda (gira sobre el lomo)
        this.leftHinge = new THREE.Group()
        this.inner.add(this.leftHinge)
        const front = mesh(geo.rbox(PW + M, COVER_T, PD + 2 * M, 0.03), coverMat, { cast: true, receive: true })
        front.position.set((PW + M) / 2, BLOCK_T + COVER_T / 2, 0)
        const lBlock = mesh(geo.box(PW, BLOCK_T, PD), edgeMat, { cast: false, receive: true })
        lBlock.position.set(PW / 2, BLOCK_T / 2, 0)
        this.leftPage = this.makePagePlane()
        // Rz(π)·Rx(-π/2): al abrir (giro de 180°) queda boca arriba y bien orientada
        this.leftPage.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, Math.PI, 'ZYX'))
        this.leftPage.position.set(PW / 2, -0.0015, 0)

        this.coverArt = new THREE.Mesh(
            geo.plane(PW + M - 0.04, PD + 2 * M - 0.04),
            new THREE.MeshStandardMaterial({ roughness: 0.55, map: makeCoverTexture('El susurro de la Tierra') }),
        )
        this.coverArt.rotation.x = -Math.PI / 2
        this.coverArt.position.set((PW + M) / 2, BLOCK_T + COVER_T + 0.002, 0)
        this.leftHinge.add(front, lBlock, this.leftPage, this.coverArt)

        // lomo redondeado (se ve con el libro cerrado)
        this.spine = mesh(geo.cyl(BLOCK_T + COVER_T, BLOCK_T + COVER_T, PD + 2 * M, 18, false), coverMat)
        this.spine.rotation.x = Math.PI / 2
        this.spine.scale.set(0.35, 1, 1)
        this.inner.add(this.spine)

        // puntos donde se muestran las pistas de arrastre
        this.anchors = {
            right: new THREE.Object3D(),
            left: new THREE.Object3D(),
            cover: new THREE.Object3D(),
        }
        this.anchors.right.position.set(PW * 0.86, 0.05, PD * 0.36)
        this.anchors.left.position.set(-PW * 0.86, 0.05, PD * 0.36)
        this.anchors.cover.position.set(PW * 0.92, BLOCK_T + COVER_T + 0.02, PD * 0.1)
        this.inner.add(this.anchors.right, this.anchors.left)
        this.leftHinge.add(this.anchors.cover)

        this.buildFlipper()

        // ---- sombra suave en el pasto
        const shadowMat = new THREE.MeshBasicMaterial({
            map: glowTexture(), color: '#1d1430', transparent: true, opacity: 0.35, depthWrite: false,
        })
        this.shadow = new THREE.Mesh(geo.plane(1, 1), shadowMat)
        this.shadow.rotation.x = -Math.PI / 2
        this.shadow.position.y = 0.02
        this.shadow.renderOrder = -1

        this.setClosed()
    }

    makePagePlane() {
        const m = new THREE.Mesh(geo.plane(BOOK.PW, BOOK.PD), new THREE.MeshStandardMaterial({ roughness: 0.92, color: '#ffffff' }))
        m.receiveShadow = true
        return m
    }

    // ------------------------------------------------------------ hoja que se pasa
    buildFlipper() {
        const { PW, PD } = BOOK
        const cols = SEGS + 1
        const rows = ZS + 1
        const count = cols * rows
        const pos = new THREE.BufferAttribute(new Float32Array(count * 3), 3)
        const nor = new THREE.BufferAttribute(new Float32Array(count * 3), 3)
        const uvF = new Float32Array(count * 2)
        const uvB = new Float32Array(count * 2)
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
                const k = j * cols + i
                const u = i / SEGS
                const v = 1 - j / ZS
                uvF[k * 2] = u
                uvF[k * 2 + 1] = v
                uvB[k * 2] = 1 - u
                uvB[k * 2 + 1] = v
                pos.setXYZ(k, u * PW, 0, -PD / 2 + (j / ZS) * PD)
            }
        }
        const index = []
        for (let j = 0; j < ZS; j++) {
            for (let i = 0; i < SEGS; i++) {
                const a = j * cols + i
                const b = a + 1
                const c = a + cols
                const d = c + 1
                index.push(a, c, b, b, c, d)
            }
        }
        const front = new THREE.BufferGeometry()
        front.setAttribute('position', pos)
        front.setAttribute('normal', nor)
        front.setAttribute('uv', new THREE.BufferAttribute(uvF, 2))
        front.setIndex(index)
        const backG = new THREE.BufferGeometry()
        backG.setAttribute('position', pos)
        backG.setAttribute('normal', nor)
        backG.setAttribute('uv', new THREE.BufferAttribute(uvB, 2))
        backG.setIndex(index)
        this.flipGeo = front
        this.flipFront = new THREE.Mesh(front, new THREE.MeshStandardMaterial({ roughness: 0.92, side: THREE.FrontSide }))
        this.flipBack = new THREE.Mesh(backG, new THREE.MeshStandardMaterial({ roughness: 0.92, side: THREE.BackSide }))
        for (const m of [this.flipFront, this.flipBack]) {
            m.frustumCulled = false
            m.castShadow = true
            m.receiveShadow = true
            m.visible = false
            this.inner.add(m)
        }
        this.deform()
    }

    /** Ángulo de la superficie en u (0 = lomo, 1 = borde) y zn (-1 fondo … 1 frente). */
    phi(u, zn) {
        const s = this.sheet
        const p = s.theta - s.curl * u + s.twist * u * zn
        return p < 0 ? 0 : p > Math.PI ? Math.PI : p
    }

    /** Deforma la malla: curvatura a lo largo de la hoja + torsión de la esquina tomada. */
    deform() {
        const { PW } = BOOK
        const pos = this.flipGeo.attributes.position
        const cols = SEGS + 1
        const du = PW / SEGS
        for (let j = 0; j <= ZS; j++) {
            const zn = -1 + (2 * j) / ZS
            let x = 0
            let y = SHEET_Y
            for (let i = 0; i <= SEGS; i++) {
                if (i > 0) {
                    const f = this.phi((i - 0.5) / SEGS, zn)
                    x += Math.cos(f) * du
                    y += Math.sin(f) * du
                }
                pos.setX(j * cols + i, x)
                pos.setY(j * cols + i, y)
            }
        }
        pos.needsUpdate = true
        this.flipGeo.computeVertexNormals()
    }

    /** Punto y ángulo de la superficie de la hoja (para pegar piezas pop-up). */
    sheetFrame(u, zn, out) {
        const { PW } = BOOK
        const steps = Math.max(1, Math.ceil(u * SEGS))
        const du = (u * PW) / steps
        let x = 0
        let y = SHEET_Y
        for (let i = 0; i < steps; i++) {
            const f = this.phi(((i + 0.5) / steps) * u, zn)
            x += Math.cos(f) * du
            y += Math.sin(f) * du
        }
        out.x = x
        out.y = y
        out.phi = this.phi(u, zn)
        return out
    }

    setSheet(theta, curl, twist) {
        this.sheet.theta = theta
        this.sheet.curl = curl
        this.sheet.twist = twist
        this.deform()
    }

    // ------------------------------------------------------------ texturas
    setPageMap(meshObj, tex) {
        const was = meshObj.material.map
        meshObj.material.map = tex
        if (!was !== !tex) meshObj.material.needsUpdate = true
    }

    disposeTex(tex, keep) {
        if (tex && !keep.includes(tex) && tex.userData.disposable) tex.dispose()
    }

    setPages(leftTex, rightTex) {
        const oldL = this.leftTex
        const oldR = this.rightTex
        this.leftTex = leftTex
        this.rightTex = rightTex
        this.setPageMap(this.leftPage, leftTex)
        this.setPageMap(this.rightPage, rightTex)
        this.disposeTex(oldL, [leftTex, rightTex])
        this.disposeTex(oldR, [leftTex, rightTex])
    }

    /** Levanta un poquito la esquina (al pasar el mouse) sin preparar la página nueva. */
    peek(dir) {
        const tex = dir > 0 ? this.rightTex : this.leftTex
        this.setPageMap(this.flipFront, tex)
        this.setPageMap(this.flipBack, tex)
        this.flipFront.visible = this.flipBack.visible = true
    }

    endPeek() {
        if (this.turn) return
        this.flipFront.visible = this.flipBack.visible = false
    }

    /** Prepara el giro real: la hoja muestra la página actual y su reverso la nueva. */
    beginTurn(dir, newLeft, newRight) {
        this.turn = { dir, newLeft, newRight, oldLeft: this.leftTex, oldRight: this.rightTex }
        if (dir > 0) {
            this.setPageMap(this.flipFront, this.rightTex)
            this.setPageMap(this.flipBack, newLeft)
            this.setPageMap(this.rightPage, newRight)
        } else {
            this.setPageMap(this.flipBack, this.leftTex)
            this.setPageMap(this.flipFront, newRight)
            this.setPageMap(this.leftPage, newLeft)
        }
        this.flipFront.visible = this.flipBack.visible = true
    }

    commitTurn() {
        const t = this.turn
        if (!t) return
        this.turn = null
        this.leftTex = t.newLeft
        this.rightTex = t.newRight
        this.setPageMap(this.leftPage, t.newLeft)
        this.setPageMap(this.rightPage, t.newRight)
        this.flipFront.visible = this.flipBack.visible = false
        this.disposeTex(t.oldLeft, [t.newLeft, t.newRight])
        this.disposeTex(t.oldRight, [t.newLeft, t.newRight])
    }

    cancelTurn() {
        const t = this.turn
        if (!t) return
        this.turn = null
        this.setPageMap(this.leftPage, t.oldLeft)
        this.setPageMap(this.rightPage, t.oldRight)
        this.flipFront.visible = this.flipBack.visible = false
        this.disposeTex(t.newLeft, [t.oldLeft, t.oldRight])
        this.disposeTex(t.newRight, [t.oldLeft, t.oldRight])
    }

    setCoverLabel(label) {
        const old = this.coverArt.material.map
        this.coverArt.material.map = makeCoverTexture('El susurro de la Tierra', label)
        old?.dispose()
    }

    // ------------------------------------------------------------ tapa
    /**
     * Ángulo de la tapa (0 = cerrado, π = abierto). Mientras se arrastra, el
     * libro se re-centra para que el lomo no "salte".
     */
    setCoverAngle(theta, standing) {
        this.leftHinge.rotation.z = theta
        this.inner.position.x = CLOSED_X * (1 - theta / Math.PI)
        this.spine.visible = theta < 1.35
        if (standing) this.pivot.rotation.x = Math.PI / 2 - Math.sin(theta * 0.5) * 0.22
    }

    get coverAngle() { return this.leftHinge.rotation.z }

    setClosed() {
        this.pivot.rotation.set(Math.PI / 2, 0, 0)
        this.leftHinge.rotation.z = 0
        this.inner.position.x = CLOSED_X
        this.baseY = COVER_Y
        this.spine.visible = true
        Object.assign(this.float, FLOAT_COVER)
    }

    setOpen() {
        this.pivot.rotation.set(0, 0, 0)
        this.leftHinge.rotation.z = Math.PI
        this.inner.position.x = 0
        this.baseY = OPEN_Y
        this.spine.visible = false
        Object.assign(this.float, FLOAT_OPEN)
    }

    /** Tras abrir la tapa con el mouse: el libro se acuesta sobre el pasto. */
    finishOpen() {
        const tl = gsap.timeline()
        tl.to(this.pivot.rotation, { x: 0, duration: 1.7, ease: 'power2.inOut' }, 0)
        tl.to(this, { baseY: OPEN_Y, duration: 2.2, ease: 'power2.inOut' }, 0)
        tl.to(this.float, { ...FLOAT_OPEN, duration: 2, ease: 'sine.inOut' }, 0)
        tl.call(() => { this.spine.visible = false }, null, 0.1)
        return tl
    }

    /** Tras cerrar la tapa con el mouse: el libro se levanta mostrando la portada. */
    finishClose() {
        const tl = gsap.timeline()
        this.spine.visible = true
        tl.to(this.pivot.rotation, { x: Math.PI / 2, duration: 1.8, ease: 'power2.inOut' }, 0)
        tl.to(this, { baseY: COVER_Y, duration: 2.4, ease: 'power2.inOut' }, 0)
        tl.to(this.float, { ...FLOAT_COVER, duration: 2.5, ease: 'sine.inOut' }, 0.6)
        return tl
    }

    // ------------------------------------------------------------ loop
    update(dt, t, quake, parallax) {
        const f = this.float
        const s = quake.shake
        // el libro responde suavemente al mouse (se inclina hacia el lector)
        if (parallax) this.look.lerp(parallax, Math.min(1, dt * 2.5))
        this.root.position.y = this.baseY + Math.sin(t * f.speed) * f.amp + s.y * 0.04
        this.root.position.x = s.x * 0.05
        this.root.rotation.z = Math.sin(t * 0.7) * f.tilt + s.z * 0.025 - this.look.x * 0.018
        this.root.rotation.x = Math.sin(t * 0.53) * f.tilt * 0.6 + s.y * 0.01 + this.look.y * 0.022
        this.root.rotation.y = f.yaw + Math.sin(t * 0.31) * f.tilt * 1.5 + this.look.x * 0.035

        // el plano de la hoja: lo que esté debajo (dentro del libro) no se ve
        this.stage.updateWorldMatrix(true, false)
        this._n.set(0, 1, 0).transformDirection(this.stage.matrixWorld)
        this._p.setFromMatrixPosition(this.stage.matrixWorld).addScaledVector(this._n, -0.006)
        popupClip.setFromNormalAndCoplanarPoint(this._n, this._p)

        const h = Math.max(0, this.root.position.y)
        const open = 1 - this.pivot.rotation.x / (Math.PI / 2)
        const w = 3.2 + open * 4.2
        this.shadow.scale.set(w * (1 + h * 0.15), 2.2 + open * 3.6, 1)
        this.shadow.material.opacity = 0.42 / (1 + h * 0.45)
    }
}
