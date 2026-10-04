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
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 400)
        this.scene.add(this.camera)

        this.quake = new Quake()
        this.rig = new CameraRig(this.camera)
        this.env = new Environment({ scene: this.scene, renderer: this.renderer, textures })

        // una sola luz puntual compartida para el brillo del Guardián
        Guardian.light = new THREE.PointLight('#bff5a0', 0, 2.4, 2)
        this.scene.add(Guardian.light)

        this.book = new Book()
        this.scene.add(this.book.root, this.book.shadow)

        this.ui = new UI()
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

        this.resize()
        window.addEventListener('resize', () => this.resize())

        // GSAP se actualiza dentro de nuestro propio requestAnimationFrame
        gsap.ticker.remove(gsap.updateRoot)
        this.last = 0
        this.elapsed = 0
        this.tick = this.tick.bind(this)
    }

    resize() {
        const w = window.innerWidth
        const h = window.innerHeight
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(w, h)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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
        this.ui.update(this.camera, this.book)
        this.renderer.render(this.scene, this.camera)
    }
}
