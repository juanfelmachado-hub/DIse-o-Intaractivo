/**
 * Sonidos (Guía visual, sección 10). La página NO tiene narración ni voces:
 * todo el texto es para leer; solo hay efectos y ambiente.
 *
 * Archivos en static/audio/ (se precargan con Web Audio: sin retraso y se
 * pueden repetir rápido, como el bip del radar):
 *   pajaros       ambiente del inicio (en bucle, suave) hasta el primer temblor
 *   temblor       el primer terremoto de cada lectura
 *   pasar-pagina  cada vez que pasa una hoja (también al abrir y cerrar el libro)
 *   radar         el bip del Guardián en el juego de buscar peligros
 *   guardian-llama "¡Hey, escucha!": el Guardián sale del libro hacia el lector
 *   acierto       al completar una actividad o elegir bien una opción
 *
 * Los demás ganchos (pagina-lista, acierto, pista, tambor, boing…) siguen
 * conectados y no suenan hasta que tengan archivo: basta con sumarlo a SFX.
 */
const BASE = import.meta.env.BASE_URL + 'audio/'
export const SFX = {
    pajaros: { file: 'pajaros.mp3', volume: 0.32 },
    temblor: { file: 'temblor.mp3', volume: 0.85, once: true },
    'pasar-pagina': { file: 'pasar-pagina.mp3', volume: 0.7 },
    radar: { file: 'beep.mp3', volume: 0.45 },
    'guardian-llama': { file: 'guardian-llama.mp3', volume: 0.7 },
    acierto: { file: 'acierto.mp3', volume: 0.6 },
}

let ctx = null
const buffers = {}
const played = new Set() // sonidos de una sola vez por lectura (once)
let ambience = null // { name, source, gain }
let wantAmbience = null

function load(name) {
    const s = SFX[name]
    if (!s || buffers[name]) return buffers[name]
    buffers[name] = fetch(BASE + s.file)
        .then((r) => r.arrayBuffer())
        .then((data) => ctx.decodeAudioData(data))
        .catch(() => null)
    return buffers[name]
}

// los navegadores solo permiten audio después del primer toque o tecla
function unlock() {
    if (ctx) return
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    ctx = new AC()
    ctx.resume?.()
    Object.keys(SFX).forEach(load)
    if (wantAmbience) startAmbience(wantAmbience)
}
document.addEventListener('pointerdown', unlock, { once: true, capture: true })
document.addEventListener('keydown', unlock, { once: true, capture: true })

export function playSfx(name) {
    const s = SFX[name]
    if (!ctx || !s) return // sin audio desbloqueado o sin archivo: no suena nada
    if (s.once) {
        if (played.has(name)) return
        played.add(name)
    }
    ctx.resume?.()
    load(name).then((buf) => {
        if (!buf) return
        const src = ctx.createBufferSource()
        const gain = ctx.createGain()
        gain.gain.value = s.volume ?? 1
        src.buffer = buf
        src.connect(gain).connect(ctx.destination)
        src.start()
    })
}

/** Ambiente en bucle (entra con un fundido). Si el audio aún no se permite, empieza al primer toque. */
export function startAmbience(name, fade = 1.5) {
    wantAmbience = name
    if (!ctx || ambience?.name === name) return
    stopAmbience(0.4)
    const s = SFX[name]
    load(name).then((buf) => {
        if (!buf || wantAmbience !== name || ambience?.name === name) return
        const src = ctx.createBufferSource()
        const gain = ctx.createGain()
        src.buffer = buf
        src.loop = true
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(s.volume ?? 1, ctx.currentTime + fade)
        src.connect(gain).connect(ctx.destination)
        src.start()
        ambience = { name, src, gain }
    })
}

/** Apaga el ambiente con un fundido. */
export function stopAmbience(fade = 2) {
    wantAmbience = null
    if (!ambience || !ctx) return
    const { src, gain } = ambience
    ambience = null
    const t = ctx.currentTime
    gain.gain.cancelScheduledValues(t)
    gain.gain.setValueAtTime(gain.gain.value, t)
    gain.gain.linearRampToValueAtTime(0, t + fade)
    src.stop(t + fade + 0.05)
}

/** Nueva lectura: los sonidos de una sola vez (el primer temblor) vuelven a sonar. */
export function resetOnce() {
    played.clear()
}
