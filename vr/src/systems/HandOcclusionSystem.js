/**
 * HandOcclusionSystem — cómo se ven las manos y el rayo de la mano.
 *
 * AHORA (OCCLUSION_CFG.MANOS = 'blanca'): cada mano es una mano blanca, suave y
 * sólida, que se desvanece hacia la muñeca (WhiteHand). 'contorno' deja el dibujo
 * de IWSDK. Lo que sigue describe el modo 'oclusor', disponible con esa opción.
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
import { AnimatedHand, BufferAttribute, createSystem, DoubleSide, Matrix4, ShaderMaterial, Vector3, VisibilityState } from '@iwsdk/core';

export const OCCLUSION_CFG = {
    /**
     * Cómo se ven las manos:
     *  - 'blanca'   = mano blanca, suave y sólida que se desvanece hacia la muñeca
     *                 (la referencia que se pidió el 26 nov);
     *  - 'contorno' = el dibujo de IWSDK (contorno blanco de la mano);
     *  - 'oclusor'  = la mano real recorta lo virtual (passthrough).
     */
    MANOS: 'blanca',
    /** Mano blanca: opacidad máxima y dónde empieza/termina el desvanecido (0 = muñeca, 1 = punta del dedo más lejano). */
    WHITE_OPACITY: 1.0,
    FADE_FROM: 0.0,
    FADE_TO: 0.2,
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

/**
 * Mano blanca: blanco suave con un poco de sombra en los bordes (según hacia dónde
 * mira la superficie) y transparencia que crece hacia la muñeca, para que la mano
 * no termine en un corte. `fade` es un atributo por vértice: 0 en la muñeca y 1
 * en la punta del dedo más lejano (se calcula una vez desde la pose de reposo).
 */
const whiteMaterial = new ShaderMaterial({
    uniforms: {
        opacity: { value: OCCLUSION_CFG.WHITE_OPACITY },
        fadeFrom: { value: OCCLUSION_CFG.FADE_FROM },
        fadeTo: { value: OCCLUSION_CFG.FADE_TO },
    },
    vertexShader: /* glsl */ `
        #include <common>
        #include <skinning_pars_vertex>
        attribute float fade;
        varying float vFade;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
            #include <skinbase_vertex>
            #include <beginnormal_vertex>
            #include <skinnormal_vertex>
            vec3 transformed = position;
            #include <skinning_vertex>
            vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
            vNormal = normalize(normalMatrix * objectNormal);
            vView = normalize(-mv.xyz);
            vFade = fade;
            gl_Position = projectionMatrix * mv;
        }
    `,
    fragmentShader: /* glsl */ `
        uniform float opacity;
        uniform float fadeFrom;
        uniform float fadeTo;
        varying float vFade;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
            float facing = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
            float shade = mix(0.8, 1.0, pow(facing, 0.6));
            float a = opacity * smoothstep(fadeFrom, fadeTo, vFade);
            gl_FragColor = vec4(vec3(shade), a);
        }
    `,
    transparent: true,
    depthWrite: true,
});

/** Calcula el atributo `fade` (0 en la muñeca, 1 en la punta más lejana) en la pose de reposo. */
function addFade(mesh) {
    const g = mesh.geometry;
    if (g.getAttribute('fade')) return;
    const bones = mesh.skeleton.bones;
    let wi = bones.findIndex((b) => /wrist/i.test(b.name));
    if (wi < 0) wi = 0;
    const wrist = new Vector3().setFromMatrixPosition(new Matrix4().copy(mesh.skeleton.boneInverses[wi]).invert());
    const pos = g.getAttribute('position');
    const v = new Vector3();
    const d = new Float32Array(pos.count);
    let max = 1e-6;
    for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(mesh.bindMatrix);
        d[i] = v.distanceTo(wrist);
        if (d[i] > max) max = d[i];
    }
    for (let i = 0; i < d.length; i++) d[i] /= max;
    g.setAttribute('fade', new BufferAttribute(d, 1));
}

/** Visual de mano para IWSDK: la malla articulada, pintada como mano blanca. */
export class WhiteHand extends AnimatedHand {
    init() {
        const mesh = this.model.getObjectByProperty('type', 'SkinnedMesh');
        mesh.frustumCulled = false;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        addFade(mesh);
        mesh.material = whiteMaterial;
        mesh.renderOrder = 10; // después de lo opaco del cuento: la transparencia se mezcla bien
        this.mesh = mesh;
    }
}
WhiteHand.assetKeyPrefix = 'white-hand-';
WhiteHand.assetProfileId = 'generic-hand';

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
                        white: v instanceof WhiteHand,
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
        const Visual = { oclusor: OccluderHand, blanca: WhiteHand }[OCCLUSION_CFG.MANOS];
        if (!Visual) return true; // 'contorno': se deja la mano de IWSDK
        for (const side of ['left', 'right']) hand[side].updateVisualImplementation(Visual);
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
