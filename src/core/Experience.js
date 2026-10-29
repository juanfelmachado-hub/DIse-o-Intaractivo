/**
 * Experiencia: renderer, escena, cámara y el bucle principal.
 * Un único requestAnimationFrame actualiza GSAP, el temblor, el mundo, el
 * libro (y la hoja que se arrastra), los escenarios y la cámara, y luego dibuja.
 */
import * as THREE from 'three'
import gsap from 'gsap'
import { Quake } from './Quake.js'
import { CameraRig } from './CameraRig.js'
import { Environment } from '../world/Environment.js'
import { Book } from '../book/Book.js'
import { PageTurner } from '../book/PageTurner.js'
import { setAnisotropy } from '../book/PageArt.js'
import { renderPortraits } from '../book/CoverArt.js'
import { setSfxHandler } from '../animations/motions.js'
import { Guardian } from '../models/characters/Guardian.js'
import { UI } from '../ui/UI.js'
import { Hotspots } from '../ui/Hotspots.js'
import { Pointer } from '../utils/Pointer.js'
import { StoryController } from '../story/StoryController.js'

export class Experience {
    constructor(canvas, textures) {
        this.canvas = canvas

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.outputColorSpace = THREE.SRGBColorSpace
        this.renderer.toneMapping = THREE.NeutralToneMapping
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.localClippingEnabled = true // ranura del lomo (popupClip)
        setAnisotropy(this.renderer.capabilities.getMaxAnisotropy())

        this.scene = new THREE.Scene()
        // el lienzo ocupa solo la escena (Guía visual §4.2): encima de la barra de página y la banda
        this.sceneEl = canvas.parentElement
        this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 400)
        this.scene.add(this.camera)

        this.quake = new Quake()
        this.rig = new CameraRig(this.camera)
        this.env = new Environment({ scene: this.scene, renderer: this.renderer, textures })

        // una sola luz puntual compartida para el brillo del Guardián
        Guardian.light = new THREE.PointLight('#bff5a0', 0, 2.4, 2)
        this.scene.add(Guardian.light)

        const portraits = renderPortraits(this.renderer)
        this.book = new Book()
        this.scene.add(this.book.root, this.book.shadow)

        this.ui = new UI()
        this.ui.setAvatars(portraits)
        this.ui.setProgressEnds(this.book.progressEnds)
        this.rig.layout = () => this.ui.bookSpace()
        // sonidos escritos: en HTML sobre la escena, junto a lo que suena
        setSfxHandler((text, world) => this.ui.sfxAt(text, world, this.camera))
        this.hotspots = new Hotspots(this.ui.el.hotspots, this.camera)
        this.pointer = new Pointer(canvas, this.camera)

        this.story = new StoryController({
            book: this.book,
            env: this.env,
            rig: this.rig,
            quake: this.quake,
            ui: this.ui,
            hotspots: this.hotspots,
            pointer: this.pointer,
            camera: this.camera,
        })
        // pasar páginas arrastrando (reemplaza cualquier botón de navegación)
        this.turner = new PageTurner({ canvas, camera: this.camera, book: this.book, pointer: this.pointer }, this.story)
        this.story.ctx.turner = this.turner

        this.resize()
        window.addEventListener('resize', () => this.resize())
        // el lienzo se reajusta cuando cambia el espacio de la escena (§4.3)
        if (window.ResizeObserver) new ResizeObserver(() => this.resize()).observe(this.sceneEl)

        // GSAP se actualiza dentro de nuestro propio requestAnimationFrame
        gsap.ticker.remove(gsap.updateRoot)
        this.last = 0
        this.elapsed = 0
        this.tick = this.tick.bind(this)
    }

    resize() {
        const w = Math.max(1, this.sceneEl.clientWidth)
        const h = Math.max(1, this.sceneEl.clientHeight)
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(w, h, false)
        this.rig.setViewport(w, h)
    }

    /** Compila shaders y sube texturas antes de mostrar (evita tirones). */
    warmUp() {
        this.rig.update(0, 0, this.quake)
        this.renderer.compile(this.scene, this.camera)
        this.renderer.render(this.scene, this.camera)
    }

    start() {
        requestAnimationFrame(this.tick)
    }

    tick(time) {
        requestAnimationFrame(this.tick)
        const dt = this.last ? Math.min((time - this.last) / 1000, 1 / 20) : 0
        this.last = time
        this.elapsed += dt
        const t = this.elapsed

        gsap.updateRoot(time / 1000)
        this.quake.update(dt)
        this.env.update(dt, t, this.quake, this.camera)
        this.book.update(dt, t, this.quake, this.rig.parallax)
        this.turner.update(dt)
        this.story.update(dt, t, this.quake)
        this.rig.update(dt, t, this.quake)
        this.hotspots.update()
        this.ui.update(this.camera, dt)
        this.renderer.render(this.scene, this.camera)
        // en desarrollo: comprobar que ningún cuadro de texto invade el libro
        if (import.meta.env.DEV && (this.checkT = (this.checkT ?? 0) + dt) > 1) {
            this.checkT = 0
            // solo avisa si el cruce dura más de un segundo (no durante una transición)
            const hit = !this.ui.assertNoOverlap(this.rig.bookRect(), true)
            if (hit && this.lastHit) this.ui.assertNoOverlap(this.rig.bookRect())
            this.lastHit = hit
        }
    }
}
