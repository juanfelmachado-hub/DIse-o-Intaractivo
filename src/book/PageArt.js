/**
 * Ilustraciones impresas en las hojas del libro (texturas de canvas).
 *
 * Cada página imprime el "piso" del escenario pop-up (madera, alfombra, pasto…)
 * más el número y el título al pie. Las dos hojas forman un solo dibujo continuo
 * a través del lomo (por eso la alfombra se dibuja centrada en el borde del lomo).
 *
 * Orientación del canvas: arriba = borde lejano del libro, abajo = borde cercano
 * al lector. Hoja izquierda: el lomo está en el borde derecho del canvas.
 */
import * as THREE from 'three'
import { palette } from '../data/theme.js'
import { seeded } from '../models/kit.js'

const W = 768
const H = 1024
// una sola familia tipográfica en todo el libro (Instructivo de texto y diálogos)
const FONT = "'Fredoka', 'Baloo 2', 'Andika', sans-serif"
// Guía visual v2 §5: tinta y naranja
const INK = '#1E1B3A'
const ORANGE = '#F28A2E'
/** Ancho de Fredoka (eje wdth) cuando el navegador lo admite en canvas. */
function stretch(g, value) { if ('fontStretch' in g) g.fontStretch = value }

let maxAnisotropy = 4
export function setAnisotropy(value) { maxAnisotropy = Math.min(8, value) }

function finish(canvas) {
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = maxAnisotropy
    tex.userData.disposable = true
    return tex
}

function roundRect(g, x, y, w, h, r) {
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
}

function paperGrain(g, seed) {
    const rnd = seeded(seed)
    for (let i = 0; i < 1800; i++) {
        g.fillStyle = rnd() > 0.5 ? 'rgba(120,90,60,0.05)' : 'rgba(255,255,255,0.35)'
        g.fillRect(rnd() * W, rnd() * H, 1.5 + rnd() * 1.5, 1.5 + rnd() * 1.5)
    }
}

// ---------------------------------------------------------------- pisos
function drawWood(g, rnd) {
    g.fillStyle = '#f4d6a6'
    g.fillRect(0, 0, W, H)
    const plank = 78
    for (let row = 0, y = 0; y < H; row++, y += plank) {
        let x = -((row * 137) % 260)
        while (x < W) {
            const len = 220 + rnd() * 180
            const shade = rnd()
            g.fillStyle = shade > 0.66 ? '#f0cd98' : shade > 0.33 ? '#f6dbb0' : '#f2d2a1'
            g.fillRect(x + 2, y + 2, len - 4, plank - 4)
            // vetas
            g.strokeStyle = 'rgba(196,130,70,0.18)'
            g.lineWidth = 2
            g.beginPath()
            const vy = y + 18 + rnd() * (plank - 36)
            g.moveTo(x + 20, vy)
            g.bezierCurveTo(x + len * 0.3, vy - 6, x + len * 0.6, vy + 6, x + len - 20, vy)
            g.stroke()
            x += len
        }
        g.fillStyle = 'rgba(190,125,70,0.22)'
        g.fillRect(0, y, W, 3)
    }
}

function drawRug(g, side, cy = H * 0.5, rx = 360, ry = 300) {
    const cx = side === 'left' ? W : 0
    const rings = [
        ['#d9b2f0', 1], ['#f9dc6b', 0.9], ['#fff3dc', 0.84], ['#f4a3b4', 0.64], ['#fff3dc', 0.58], ['#9fd5f7', 0.36],
    ]
    for (const [color, s] of rings) {
        g.fillStyle = color
        g.beginPath()
        g.ellipse(cx, cy, rx * s, ry * s, 0, 0, Math.PI * 2)
        g.fill()
    }
    // puntitos de colores sobre la alfombra
    const dots = [palette.red, palette.orange, palette.green, palette.blue, palette.lilac]
    for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2
        g.fillStyle = dots[i % dots.length]
        g.beginPath()
        g.arc(cx + Math.cos(a) * rx * 0.74, cy + Math.sin(a) * ry * 0.74, 9, 0, Math.PI * 2)
        g.fill()
    }
}

function drawGrass(g, rnd, flowers = true) {
    g.fillStyle = '#bfe4a2'
    g.fillRect(0, 0, W, H)
    for (let i = 0; i < 40; i++) {
        g.fillStyle = rnd() > 0.5 ? 'rgba(214,240,190,0.7)' : 'rgba(160,210,130,0.45)'
        g.beginPath()
        g.ellipse(rnd() * W, rnd() * H, 40 + rnd() * 90, 26 + rnd() * 50, rnd() * 3, 0, Math.PI * 2)
        g.fill()
    }
    g.strokeStyle = 'rgba(110,175,90,0.55)'
    g.lineWidth = 3
    g.lineCap = 'round'
    for (let i = 0; i < 260; i++) {
        const x = rnd() * W
        const y = rnd() * H
        g.beginPath()
        g.moveTo(x, y)
        g.lineTo(x + (rnd() - 0.5) * 8, y - 10 - rnd() * 8)
        g.stroke()
    }
    if (!flowers) return
    const colors = [palette.red, palette.yellow, palette.lilac, '#ffffff', palette.orange]
    for (let i = 0; i < 34; i++) {
        const x = rnd() * W
        const y = rnd() * H
        g.fillStyle = colors[i % colors.length]
        for (let p = 0; p < 5; p++) {
            const a = (p / 5) * Math.PI * 2
            g.beginPath()
            g.arc(x + Math.cos(a) * 7, y + Math.sin(a) * 7, 6, 0, Math.PI * 2)
            g.fill()
        }
        g.fillStyle = '#ffe58a'
        g.beginPath()
        g.arc(x, y, 5, 0, Math.PI * 2)
        g.fill()
    }
}

function drawStones(g, points) {
    for (const [x, y, r] of points) {
        g.fillStyle = 'rgba(120,100,90,0.18)'
        g.beginPath()
        g.ellipse(x + 4, y + 6, r * 1.2, r * 0.8, 0, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = '#efe6dc'
        g.beginPath()
        g.ellipse(x, y, r * 1.2, r * 0.8, 0, 0, Math.PI * 2)
        g.fill()
    }
}

function drawConfetti(g, rnd) {
    g.fillStyle = '#fff6e6'
    g.fillRect(0, 0, W, H)
    // cuadrícula crema del moodboard
    g.strokeStyle = 'rgba(240,190,140,0.28)'
    g.lineWidth = 3
    for (let x = 0; x < W; x += 64) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke() }
    for (let y = 0; y < H; y += 64) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke() }
    const colors = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
    for (let i = 0; i < 22; i++) {
        g.fillStyle = colors[i % colors.length]
        g.globalAlpha = 0.85
        g.beginPath()
        g.arc(rnd() * W, rnd() * H, 8 + rnd() * 16, 0, Math.PI * 2)
        g.fill()
    }
    g.globalAlpha = 1
}

/** Color de cada escena (folio y marcas del pie de página). */
const SCENE_ACCENT = {
    room: palette.orange,
    underTable: '#9b6fd6',
    exit: '#3d8fd6',
    route: '#d9a21b',
    patio: '#4f9a57',
}

const floors = {
    room(g, side, rnd) { drawWood(g, rnd); drawRug(g, side) },
    exit(g, side, rnd) { drawWood(g, rnd); drawRug(g, side, H * 0.5, 300, 240) },
    underTable(g, side, rnd) { drawWood(g, rnd); drawRug(g, side, H * 0.46, 470, 400) },
    route(g, side, rnd) {
        if (side === 'left') drawWood(g, rnd)
        else {
            drawGrass(g, rnd)
            drawStones(g, [[90, 560, 30], [190, 590, 26], [290, 560, 28]])
        }
    },
    patio(g, side, rnd) {
        drawGrass(g, rnd)
        if (side === 'left') drawStones(g, [[300, 250, 30], [400, 330, 28], [500, 400, 30], [600, 470, 26], [700, 520, 28]])
        else drawStones(g, [[30, 560, 26]])
    },
    title(g, side, rnd) { drawConfetti(g, rnd) },
}

/**
 * Crea la textura de una hoja.
 * @param {object} page  entrada de story.pages (o un objeto similar)
 * @param {'left'|'right'} side
 */
export function makePageTexture(page, side) {
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')
    const seed = (String(page.id ?? 'x').split('').reduce((a, c) => a + c.charCodeAt(0), 0) + (side === 'left' ? 11 : 37))
    const rnd = seeded(seed)

    // papel
    g.fillStyle = palette.paper
    g.fillRect(0, 0, W, H)

    // área ilustrada
    const outer = 34
    const spine = 14
    const top = 34
    const bottom = 128
    const x0 = side === 'left' ? outer : spine
    const x1 = side === 'left' ? W - spine : W - outer
    g.save()
    roundRect(g, x0, top, x1 - x0, H - top - bottom, 26)
    g.clip()
    const floor = floors[page.scene] ?? floors.title
    floor(g, side, rnd)
    g.restore()

    // marco suave
    g.strokeStyle = 'rgba(255,255,255,0.9)'
    g.lineWidth = 6
    roundRect(g, x0, top, x1 - x0, H - top - bottom, 26)
    g.stroke()

    // pie de página (misma retícula en todas las hojas): título corrido en la
    // hoja izquierda y folio en la derecha, alineados a la misma línea base.
    // El color del folio identifica la escena (continuidad entre páginas).
    g.textBaseline = 'alphabetic'
    const base = H - bottom / 2 + 16
    const accent = SCENE_ACCENT[page.scene] ?? palette.red
    g.fillStyle = 'rgba(59,47,74,.14)'
    g.fillRect(side === 'left' ? outer + 8 : spine + 26, H - bottom + 26, (side === 'left' ? W - spine - outer - 34 : W - outer - spine - 34), 2)
    if (side === 'left' && page.title) {
        g.fillStyle = accent
        g.beginPath()
        g.arc(outer + 22, base - 13, 9, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = INK
        g.font = `700 42px ${FONT}`
        stretch(g, 'semi-expanded')
        g.textAlign = 'left'
        g.fillText(page.title, outer + 44, base, W - outer - 140)
        stretch(g, 'normal')
    }
    if (side === 'right' && page.number !== undefined) {
        const cx = W - outer - 34
        g.fillStyle = ORANGE
        g.beginPath()
        g.arc(cx, base - 13, 32, 0, Math.PI * 2)
        g.fill()
        g.fillStyle = INK
        g.font = `700 36px ${FONT}`
        g.textAlign = 'center'
        g.fillText(String(page.number), cx, base)
    }

    // sombra del lomo
    const sx = side === 'left' ? W : 0
    const grd = g.createLinearGradient(sx, 0, side === 'left' ? W - 110 : 110, 0)
    grd.addColorStop(0, 'rgba(110,70,40,0.32)')
    grd.addColorStop(0.35, 'rgba(110,70,40,0.1)')
    grd.addColorStop(1, 'rgba(110,70,40,0)')
    g.fillStyle = grd
    g.fillRect(side === 'left' ? W - 110 : 0, 0, 110, H)

    paperGrain(g, seed)
    return finish(canvas)
}

/** Doble página de título (al abrir el libro). */
export function makeTitleTexture(side, text) {
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')
    const tex = makePageTexture({ id: 'title', scene: 'title' }, side)
    g.drawImage(tex.image, 0, 0)
    tex.dispose()

    g.textBaseline = 'alphabetic'
    if (side === 'right') {
        // título: jerarquía fuerte y una sola tipografía
        g.fillStyle = 'rgba(255,248,236,.94)'
        roundRect(g, 80, 230, W - 150, 520, 44)
        g.fill()
        g.textAlign = 'center'
        const cx = W / 2 + 8
        const lines = splitTitle(text)
        g.fillStyle = palette.ink
        g.font = `600 70px ${FONT}`
        g.fillText(lines[0], cx, 360)
        g.font = `500 52px ${FONT}`
        g.fillText(lines[1], cx, 440)
        g.fillStyle = palette.red
        g.font = `700 150px ${FONT}`
        g.fillText(lines[2], cx, 590)
        leaf(g, cx, 668, 1)
    } else {
        // subtítulo: bloque corto, alineado a la izquierda, líneas cortas
        g.fillStyle = 'rgba(255,248,236,.94)'
        roundRect(g, 110, 360, W - 200, 300, 40)
        g.fill()
        g.fillStyle = palette.orange
        g.fillRect(160, 420, 70, 8)
        g.fillStyle = palette.ink
        g.font = `500 44px ${FONT}`
        g.textAlign = 'left'
        wrap(g, text, 160, 495, W - 340, 60)
    }
    return finish(canvas)
}

/** "El susurro de la Tierra" → ["El susurro", "de la", "Tierra"] */
function splitTitle(text) {
    const w = text.split(' ')
    if (w.length >= 4) return [w.slice(0, 2).join(' '), w.slice(2, -1).join(' '), w[w.length - 1]]
    return ['', '', text]
}

/** La hojita del Guardián (emblema del cuento). */
function leaf(g, x, y, s = 1) {
    g.fillStyle = '#4fae5b'
    g.beginPath()
    g.ellipse(x - 22 * s, y - 6 * s, 30 * s, 14 * s, -0.6, 0, Math.PI * 2)
    g.ellipse(x + 22 * s, y - 6 * s, 30 * s, 14 * s, 0.6, 0, Math.PI * 2)
    g.fill()
    g.fillStyle = '#3b8d48'
    g.fillRect(x - 3 * s, y - 4 * s, 6 * s, 34 * s)
}

/** Doble página final: "Fin" y la última frase del Guardián. */
export function makeEndTexture(side) {
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const g = canvas.getContext('2d')
    const tex = makePageTexture({ id: 'end', scene: 'title' }, side)
    g.drawImage(tex.image, 0, 0)
    tex.dispose()
    g.textBaseline = 'alphabetic'
    if (side === 'left') {
        g.fillStyle = 'rgba(255,248,236,.94)'
        roundRect(g, 110, 300, W - 190, 380, 44)
        g.fill()
        g.textAlign = 'center'
        g.fillStyle = palette.red
        g.font = `700 190px ${FONT}`
        g.fillText('Fin', W / 2 - 10, 540)
        const dots = [palette.red, palette.orange, palette.yellow, palette.green, palette.blue, palette.lilac]
        dots.forEach((c, i) => {
            g.fillStyle = c
            g.beginPath()
            g.arc(W / 2 - 135 + i * 50, 610, 12, 0, Math.PI * 2)
            g.fill()
        })
    } else {
        // la última frase del Guardián, como cita: alineada a la izquierda
        g.fillStyle = 'rgba(243,236,255,.96)'
        roundRect(g, 90, 300, W - 170, 380, 44)
        g.fill()
        g.strokeStyle = '#e2a93b'
        g.lineWidth = 6
        roundRect(g, 90, 300, W - 170, 380, 44)
        g.stroke()
        leaf(g, 160, 395, 0.8)
        g.fillStyle = palette.ink
        g.font = `600 46px ${FONT}`
        g.textAlign = 'left'
        wrap(g, 'Cuando haya peligro, yo te aviso… y tú te cuidas.', 150, 480, W - 320, 62)
        g.fillStyle = '#6a3fb5'
        g.font = `600 34px ${FONT}`
        g.fillText('— el Guardián', 150, 640)
    }
    return finish(canvas)
}

function wrap(g, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ')
    let line = ''
    let yy = y
    for (const w of words) {
        const test = line ? `${line} ${w}` : w
        if (g.measureText(test).width > maxWidth && line) {
            g.fillText(line, x, yy)
            line = w
            yy += lineHeight
        } else line = test
    }
    g.fillText(line, x, yy)
}

/** Textura del canto de las hojas (rayitas de papel apilado). */
export function makeEdgeTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const g = canvas.getContext('2d')
    g.fillStyle = '#f6ead4'
    g.fillRect(0, 0, 64, 64)
    for (let y = 0; y < 64; y += 4) {
        g.fillStyle = y % 8 === 0 ? 'rgba(170,130,90,0.25)' : 'rgba(170,130,90,0.12)'
        g.fillRect(0, y, 64, 1)
    }
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
}
