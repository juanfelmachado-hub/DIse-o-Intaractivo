/**
 * Partículas ambientales animadas por completo en GPU (sin costo por frame en CPU):
 *  - Fireflies: luciérnagas de la escena nocturna del .blend de inicio.
 *  - Dust: polvo y hojitas que caen durante el temblor.
 */
import * as THREE from 'three'
import { glowTexture, seeded } from '../models/kit.js'

function makePoints({ count, box, seed, color, size, vertex, blending }) {
    const rnd = seeded(seed)
    const pos = new Float32Array(count * 3)
    const rand = new Float32Array(count)
    for (let i = 0; i < count; i++) {
        pos[i * 3] = box[0][0] + rnd() * (box[0][1] - box[0][0])
        pos[i * 3 + 1] = box[1][0] + rnd() * (box[1][1] - box[1][0])
        pos[i * 3 + 2] = box[2][0] + rnd() * (box[2][1] - box[2][0])
        rand[i] = rnd()
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uSize: { value: size },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            uColor: { value: new THREE.Color(color) },
            uMap: { value: glowTexture() },
        },
        vertexShader: vertex,
        fragmentShader: /* glsl */ `
            uniform vec3 uColor;
            uniform float uOpacity;
            uniform sampler2D uMap;
            varying float vAlpha;
            void main() {
                float a = texture2D(uMap, gl_PointCoord).a * vAlpha * uOpacity;
                if (a < 0.01) discard;
                gl_FragColor = vec4(uColor, a);
                #include <colorspace_fragment>
            }
        `,
        transparent: true,
        depthWrite: false,
        blending: blending ?? THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    points.frustumCulled = false
    return points
}

export function createFireflies() {
    return makePoints({
        count: 90,
        seed: 3,
        box: [[-16, 16], [0.4, 7], [-16, 4]],
        color: '#ffe48a',
        size: 150,
        vertex: /* glsl */ `
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vAlpha;
            void main() {
                vec3 p = position;
                float t = uTime * (0.25 + aRand * 0.35);
                p.x += sin(t + aRand * 31.0) * 0.9;
                p.y += sin(t * 1.3 + aRand * 17.0) * 0.5;
                p.z += cos(t * 0.8 + aRand * 11.0) * 0.9;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                float blink = 0.55 + 0.45 * sin(uTime * (1.5 + aRand * 2.0) + aRand * 40.0);
                vAlpha = blink;
                gl_PointSize = uSize * uPixelRatio * (0.35 + aRand * 0.65) / -mv.z;
            }
        `,
    })
}

export function createDust() {
    return makePoints({
        count: 140,
        seed: 5,
        box: [[-7, 7], [0, 6], [-5, 4]],
        color: '#f3e6d0',
        size: 34,
        blending: THREE.NormalBlending,
        vertex: /* glsl */ `
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vAlpha;
            void main() {
                vec3 p = position;
                float fall = mod(p.y - uTime * (0.25 + aRand * 0.45), 6.0);
                p.y = fall;
                p.x += sin(uTime * 1.7 + aRand * 20.0) * 0.25;
                p.z += cos(uTime * 1.3 + aRand * 13.0) * 0.25;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                vAlpha = smoothstep(0.0, 0.8, fall) * smoothstep(6.0, 4.5, fall) * 0.8;
                gl_PointSize = uSize * uPixelRatio * (0.4 + aRand * 0.6) / -mv.z;
            }
        `,
    })
}

/** Motitas de polvo dorado flotando en la luz alrededor del libro (siempre sutiles). */
export function createMotes() {
    return makePoints({
        count: 70,
        seed: 11,
        box: [[-5, 5], [0.3, 3.4], [-3, 3]],
        color: '#fff2c4',
        size: 26,
        vertex: /* glsl */ `
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vAlpha;
            void main() {
                vec3 p = position;
                float t = uTime * (0.08 + aRand * 0.1);
                p.x += sin(t * 2.0 + aRand * 25.0) * 0.6;
                p.y += sin(t * 1.4 + aRand * 13.0) * 0.35 + mod(uTime * 0.03 * (0.5 + aRand), 0.8);
                p.z += cos(t * 1.7 + aRand * 7.0) * 0.5;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                vAlpha = (0.35 + 0.65 * sin(uTime * (0.6 + aRand) + aRand * 30.0) * 0.5 + 0.5) * 0.55;
                gl_PointSize = uSize * uPixelRatio * (0.5 + aRand * 0.5) / -mv.z;
            }
        `,
    })
}
