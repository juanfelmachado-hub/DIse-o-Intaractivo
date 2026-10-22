/**
 * Ganchos de sonido (Guía visual, sección 10).
 *
 * La página NO tiene narración ni voces: todo el texto es para leer. Los
 * efectos de sonido se añaden después; por ahora SFX está vacío y playSfx()
 * no hace nada. Cuando existan los archivos basta con llenar la tabla, sin
 * tocar el resto del código. Ejemplo futuro:
 *   { 'pagina-lista': 'sfx/pagina-lista.mp3' }
 *
 * Ganchos conectados: pagina-lista, pasar-pagina, pagina-bloqueada, acierto,
 * pista, sonido-escrito, toque-objeto, temblor, objeto-cae, siguiente,
 * y los de los juegos: radar, tambor, boing, clac, estrella.
 */
export const SFX = {}

let audioUnlocked = false
// los navegadores solo permiten audio después del primer toque
document.addEventListener('pointerdown', () => { audioUnlocked = true }, { once: true })

export function playSfx(name) {
    if (!audioUnlocked || !SFX[name]) return // sin archivo: no suena nada
    new Audio(SFX[name]).play().catch(() => {})
}
