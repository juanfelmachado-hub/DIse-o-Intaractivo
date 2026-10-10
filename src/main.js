/**
 * El susurro de la Tierra — punto de entrada.
 *
 * Carga progresiva: primero tipografías y cielos (≈450 KB en total), luego se
 * compila la escena y se muestra la portada.
 *
 * Atajo de desarrollo: agrega ?pagina=p6 (o ?pagina=a1, ?pagina=4) a la URL
 * para abrir el libro directamente en esa doble página/actividad.
 */
import * as THREE from 'three'
import { Experience } from './core/Experience.js'

async function loadFonts() {
    if (!document.fonts) return
    const fonts = ['500 32px Fredoka', '600 32px Fredoka', '700 32px Fredoka', '64px Pacifico']
    const timeout = new Promise((r) => setTimeout(r, 3500))
    await Promise.race([Promise.all(fonts.map((f) => document.fonts.load(f))), timeout]).catch(() => {})
}

function loadTextures() {
    const loader = new THREE.TextureLoader()
    const load = (url) => new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject))
    return Promise.all([load(import.meta.env.BASE_URL + 'textures/sky/night.jpg'), load(import.meta.env.BASE_URL + 'textures/sky/dusk.jpg')])
        .then(([night, dusk]) => ({ night, dusk }))
}

async function boot() {
    const canvas = document.querySelector('canvas.webgl')
    const [, textures] = await Promise.all([loadFonts(), loadTextures()])

    const experience = new Experience(canvas, textures)
    window.experience = experience // útil para depurar desde la consola

    const params = new URLSearchParams(location.search)
    const jump = params.get('pagina')
    experience.start()
    if (jump) {
        experience.story.jumpTo(jump)
    } else {
        experience.story.showCover()
    }
    experience.warmUp()
    requestAnimationFrame(() => experience.ui.hideLoader())
}

boot().catch((err) => {
    console.error(err)
    const t = document.querySelector('.loader__text')
    if (t) t.textContent = 'No se pudo abrir el cuento. Recarga la página.'
})
