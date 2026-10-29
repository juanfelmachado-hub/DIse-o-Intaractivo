/** Íconos SVG en línea (sin dependencias externas). */

export const avatars = {
    guardian: `<svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="18" r="11" fill="#b5f5b9"/>
        <path d="M16 7c-1-3-4-4-6-3 1 2 3 3 6 3zm0 0c1-3 4-4 6-3-1 2-3 3-6 3z" fill="#4fae5b"/>
        <ellipse cx="12.5" cy="17" rx="1.6" ry="2" fill="#1f2a22"/><ellipse cx="19.5" cy="17" rx="1.6" ry="2" fill="#1f2a22"/>
        <path d="M13 21.5q3 2.5 6 0" stroke="#1f2a22" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,
    nico: `<svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="17" r="11" fill="#f7d2b6"/>
        <path d="M5.5 15C6 8 11 5 16 5s10 3 10.5 10c-3-2-6-4-10.5-4S8.5 13 5.5 15z" fill="#7b4a2d"/>
        <circle cx="12.5" cy="18" r="1.6" fill="#2b2233"/><circle cx="19.5" cy="18" r="1.6" fill="#2b2233"/>
        <path d="M13.5 22q2.5 2 5 0" stroke="#7a2e3a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,
}

export const stepIcons = {
    turtle: `<svg viewBox="0 0 64 48" aria-hidden="true">
        <ellipse cx="32" cy="30" rx="20" ry="13" fill="#5db65a"/>
        <path d="M18 28c3-9 25-9 28 0" stroke="#3f8f3c" stroke-width="2.5" fill="none"/>
        <path d="M32 18v24M22 22l5 16M42 22l-5 16" stroke="#3f8f3c" stroke-width="2" opacity=".6"/>
        <circle cx="55" cy="30" r="6" fill="#9fdc8f"/><circle cx="57" cy="28.5" r="1.3" fill="#2b2233"/>
        <ellipse cx="19" cy="42" rx="5" ry="3" fill="#9fdc8f"/><ellipse cx="45" cy="42" rx="5" ry="3" fill="#9fdc8f"/>
    </svg>`,
    cover: `<svg viewBox="0 0 64 48" aria-hidden="true">
        <circle cx="32" cy="28" r="12" fill="#f7d2b6"/>
        <path d="M20 26c0-8 5-12 12-12s12 4 12 12" fill="#7b4a2d"/>
        <path d="M10 30C12 14 22 8 32 8s20 6 22 22" stroke="#f6b94a" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="10" cy="31" r="5" fill="#f7d2b6"/><circle cx="54" cy="31" r="5" fill="#f7d2b6"/>
        <circle cx="28" cy="30" r="1.6" fill="#2b2233"/><circle cx="36" cy="30" r="1.6" fill="#2b2233"/>
    </svg>`,
    hold: `<svg viewBox="0 0 64 48" aria-hidden="true">
        <rect x="6" y="6" width="52" height="8" rx="4" fill="#e9a45e"/>
        <rect x="40" y="12" width="8" height="34" rx="3" fill="#c4733f"/>
        <path d="M14 34c6-6 14-8 26-6" stroke="#f6b94a" stroke-width="9" fill="none" stroke-linecap="round"/>
        <rect x="35" y="22" width="16" height="12" rx="6" fill="#f7d2b6"/>
        <path d="M38 22v12M42 22v12M46 22v12" stroke="#e7b896" stroke-width="1.5"/>
    </svg>`,
}

/**
 * Íconos de la actividad (Guía visual v2 §6.4): círculo naranja (o dorado al
 * terminar) con un dibujo simple en tinta, de línea gruesa y esquinas redondeadas.
 */
const T = '#1E1B3A'
export const missionIcons = {
    // Busca peligros: ondas de señal hacia arriba
    radar: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round">
        <circle cx="24" cy="34" r="4" fill="${T}" stroke="none"/><path d="M15.5 25.5a12 12 0 0 1 17 0M8.5 18.5a22 22 0 0 1 31 0"/></svg>`,
    // A la mesa: mesa de frente con un punto debajo
    mesa: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 14h34M11 14v22M37 14v22"/><circle cx="24" cy="28" r="4.5" fill="${T}" stroke="none"/></svg>`,
    // Zapatos: un zapato de lado
    zapatos: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 12v22h31c0-5-4-8-10-9l-6-3V12z"/></svg>`,
    // Despacio: dos pares de huellas pequeñas
    camino: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="${T}">
        <ellipse cx="15" cy="33" rx="4.5" ry="6.5"/><circle cx="12" cy="23.5" r="1.9"/><circle cx="17.5" cy="23.5" r="1.9"/>
        <ellipse cx="32" cy="17" rx="4.5" ry="6.5"/><circle cx="29" cy="7.5" r="1.9"/><circle cx="34.5" cy="7.5" r="1.9"/></svg>`,
    // Lugar seguro: pin de ubicación con un anillo en la base
    patio: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round">
        <path d="M24 34s-10-9-10-17a10 10 0 0 1 20 0c0 8-10 17-10 17z" fill="${T}" stroke="none"/>
        <ellipse cx="24" cy="38" rx="11" ry="4"/></svg>`,
    // Instructivo del radar: un dedo que se mueve por la escena
    dedo: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 26V10a3.5 3.5 0 0 1 7 0v12l7 1.6a4 4 0 0 1 3 4.6L35.5 38H20l-6-8a3 3 0 0 1 4.5-4z"/><path d="M8 10h5M8 18h4" stroke-width="3.5"/></svg>`,
    // Instructivo del radar: tocar el peligro (una lámpara que se balancea)
    tocar: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 5v9"/><path d="M12 28c0-7 5-13 12-13s12 6 12 13z" fill="${T}"/><path d="M19 34a5 5 0 0 0 10 0"/><path d="M6 20l-2-3M42 20l2-3M8 30H4M40 30h4" stroke-width="3.5"/></svg>`,
    // Actividad terminada: estrella tinta llena (sobre el círculo dorado)
    estrella: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l5.8 11.8 13 1.9-9.4 9.2 2.2 12.9L24 34.7l-11.6 6.1 2.2-12.9-9.4-9.2 13-1.9z" fill="${T}" stroke="${T}" stroke-width="2" stroke-linejoin="round"/></svg>`,
    tambor: `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="3.5" stroke-linejoin="round">
        <ellipse cx="24" cy="18" rx="14" ry="6"/><path d="M10 18v13c0 3.3 6.3 6 14 6s14-2.7 14-6V18"/><path d="M14 9l8 8M34 9l-8 8" stroke-linecap="round"/></svg>`,
    turtle: `<svg viewBox="0 0 64 48" aria-hidden="true">
        <ellipse cx="32" cy="30" rx="20" ry="13" fill="${T}"/>
        <circle cx="55" cy="30" r="6" fill="${T}"/>
        <ellipse cx="19" cy="42" rx="5" ry="3" fill="${T}"/><ellipse cx="45" cy="42" rx="5" ry="3" fill="${T}"/>
        <path d="M22 30h20M32 20v20" stroke="#DDF5E8" stroke-width="2.5"/></svg>`,
    cover: `<svg viewBox="0 0 64 48" aria-hidden="true" fill="none" stroke="${T}" stroke-width="5" stroke-linecap="round">
        <circle cx="32" cy="30" r="10" fill="${T}" stroke="none"/><path d="M12 32C14 16 22 10 32 10s18 6 20 22"/></svg>`,
    hold: `<svg viewBox="0 0 64 48" aria-hidden="true" fill="${T}">
        <rect x="6" y="6" width="52" height="7" rx="3.5"/><rect x="40" y="11" width="7" height="33" rx="3"/>
        <rect x="30" y="22" width="20" height="12" rx="6"/><path d="M12 36c6-6 12-8 20-8" stroke="${T}" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`,
}
