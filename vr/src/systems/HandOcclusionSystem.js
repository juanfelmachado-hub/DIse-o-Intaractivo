/**
 * HandOcclusionSystem — se ven las MANOS REALES del lector, no un dibujo.
 *
 * IWSDK dibuja por defecto cada mano seguida como un contorno blanco
 * (AnimatedHand). Aquí ese dibujo se reemplaza por un OCLUSOR: la misma malla
 * de mano, articulada con las 25 articulaciones que entrega el Quest cada
 * cuadro, pero que no pinta color, solo profundidad, y se dibuja ANTES que el
 * cuento. Resultado:
 *  - donde la mano real está DELANTE de algo virtual, eso virtual no se dibuja
 *    y queda a la vista el passthrough, o sea, la mano de verdad;
 *  - donde algo virtual está DELANTE de la mano (Nico en la palma, un mueble más
 *    cerca del lector), lo virtual se sigue viendo encima: la oclusión respeta
 *    la profundidad real;
 *  - no hay ningún contorno ni mano dibujada.
 *
 * ¿Por qué no el sensor de profundidad del Quest 3 (WebXR depth-sensing)? En el
 * navegador entrega un mapa de profundidad del entorno de baja resolución y con
 * algo de retraso: alrededor de los dedos deja bordes que tiemblan y cubriría
 * también el piso real bajo la maqueta. Para las manos, las articulaciones del
 * hand tracking son mucho más precisas (milímetros, sin retraso extra) y
 * oclusor cuesta un solo dibujo de una malla chica por mano. Limitación
 * conocida: la malla es la mano genérica del Quest ajustada a las articulaciones
 * de la persona; en el borde puede faltar o sobrar un poco. Se infla INFLATE
 * metros para que sobre (se ve un poquito de fondo real alrededor de los dedos)
 * y no falte (lo virtual no se come la punta de un dedo).
 *
 * Nada de esto toca la interacción: agarrar, tocar, pinza y gestos leen las
 * articulaciones en `interaction/hands.js`, no esta malla. Si el seguimiento se
 * pierde, IWSDK oculta la malla y no queda un «hueco» congelado en la escena.
 * Con controles se sigue viendo el modelo del control (no hay mano que mostrar).
 *
 * RAYO DE LA MANO: IWSDK también dibuja un rayo blanco desde la mano cuando
 * apunta a algo (también a la maqueta). Con la mano, la maqueta se toca y se
 * agarra con los dedos, así que ese rayo sobre el libro es solo un trazo
 * artificial: se oculta (rayo y cursor) mientras apunta al libro. Sigue
 * apareciendo al apuntar al panel del cuento, donde sí se usa para elegir.
 * Con controles el rayo no cambia.
 */
import { AnimatedHand, createSystem, DoubleSide, ShaderMaterial, VisibilityState } from '@iwsdk/core';

export const OCCLUSION_CFG = {
    /** Cuánto se agranda la malla hacia afuera (m): mejor que sobre a que falte. */
    INFLATE: 0.004,
    /** Se dibuja antes que todo lo opaco del cuento. */
    RENDER_ORDER: -1000,
};

/**
 * Solo profundidad: no escribe color (queda el passthrough) pero sí profundidad,
 * así lo virtual que está DETRÁS de la mano no se dibuja.
 */
const occluderMaterial = new ShaderMaterial({
    uniforms: { inflate: { value: OCCLUSION_CFG.INFLATE } },
    vertexShader: /* glsl */ `
        #include <common>
        #include <skinning_pars_vertex>
        uniform float inflate;
        void main() {
            #include <skinbase_vertex>
            #include <beginnormal_vertex>
            #include <skinnormal_vertex>
            vec3 transformed = position + normal * inflate;
            #include <skinning_vertex>
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
    `,
    fragmentShader: /* glsl */ `
        void main() { gl_FragColor = vec4(0.0); }
    `,
    colorWrite: false,
    depthWrite: true,
    depthTest: true,
    // las dos caras: por la abertura de la muñeca tampoco se ve lo virtual de atrás
    side: DoubleSide,
});

/**
 * Visual de mano para IWSDK: la malla articulada, convertida en oclusor.
 * Hereda de AnimatedHand (IWSDK no exporta BaseHandVisual) pero reemplaza su
 * init(): no se crea el contorno; el articulado de la malla es el de la base.
 */
export class OccluderHand extends AnimatedHand {
    init() {
        const mesh = this.model.getObjectByProperty('type', 'SkinnedMesh');
        mesh.frustumCulled = false;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        mesh.material = occluderMaterial;
        mesh.renderOrder = OCCLUSION_CFG.RENDER_ORDER;
        this.mesh = mesh;
    }
}
// prefijo propio: el caché de IWSDK no debe devolver la mano con contorno
OccluderHand.assetKeyPrefix = 'occluder-hand-';
OccluderHand.assetProfileId = 'generic-hand';

export class HandOcclusionSystem extends createSystem({}) {
    init() {
        this.ready = false;
        const sys = this;
        this.world.globals.handOcclusion = {
            /** Estado de cada mano (pruebas): ¿hay oclusor, está visible, con qué material? */
            state() {
                const out = {};
                for (const side of ['left', 'right']) {
                    const a = sys.adapters()?.[side];
                    const v = a?.visual;
                    out[side] = {
                        connected: !!a?.connected,
                        occluder: v instanceof OccluderHand,
                        visible: !!v?.model?.visible && !!v?.model?.parent,
                        colorWrite: v?.mesh ? v.mesh.material.colorWrite : null,
                        outline: v ? countOutlines(v.model) : 0,
                    };
                }
                return out;
            },
        };
    }

    adapters() { return this.input?.xr?.visualAdapters?.hand; }

    install() {
        const hand = this.adapters();
        if (!hand) return false;
        for (const side of ['left', 'right']) hand[side].updateVisualImplementation(OccluderHand);
        return true;
    }

    update() {
        if (!this.ready) this.ready = this.install();
        if (!this.ready || this.world.visibilityState.peek() === VisibilityState.NonImmersive) return;
        // IWSDK corre la malla de la mano cuando el dedo toca un panel de UI (para
        // que el dibujo no lo atraviese). Un oclusor tiene que quedar EXACTO sobre
        // la mano real: se vuelve a poner en la pose del seguimiento.
        const hand = this.adapters();
        for (const side of ['left', 'right']) {
            const a = hand[side];
            const v = a.visual;
            if (!(v instanceof OccluderHand) || !a.gripSpace) continue;
            v.model.position.copy(a.gripSpace.position);
            v.model.quaternion.copy(a.gripSpace.quaternion);
        }
        this.hideBookRays();
    }

    /** Con la mano, el rayo y el cursor no se dibujan sobre la maqueta (sí sobre el panel). */
    hideBookRays() {
        const c = this.world.globals.cuento;
        const hands = this.world.globals.hands;
        const mps = this.input.xr.multiPointers;
        if (!c || !hands || !mps) return;
        for (const side of ['left', 'right']) {
            if (hands.h[side].kind !== 'hand') continue;
            const mp = mps[side];
            const rp = mp?.ray?.visual; // RayPointer de IWSDK
            const hit = rp?.rayIntersection?.object;
            if (!hit || !isInside(hit, c.diorama)) continue;
            if (rp.ray?.material?.uniforms?.opacity) rp.ray.material.uniforms.opacity.value = 0;
            mp.cursorVisual?.setVisible(false);
        }
    }
}

function isInside(o, root) {
    for (let p = o; p; p = p.parent) if (p === root) return true;
    return false;
}

/** Mallas visibles que pintan color dentro de la mano (debería ser 0). */
function countOutlines(model) {
    let n = 0;
    model.traverse((o) => { if (o.isMesh && o.visible && o.material?.colorWrite !== false) n++; });
    return n;
}
