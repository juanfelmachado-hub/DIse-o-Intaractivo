/**
 * Cúpula de cielo. Mezcla en GPU los dos HDRI entregados (convertidos a JPG
 * livianos: noche y atardecer) con un degradado diurno, y los tiñe con un color
 * pastel para que el fondo nunca compita con el libro.
 */
import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec3 vDir;
void main() {
    vDir = position;
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
}
`

const fragmentShader = /* glsl */ `
#define PI 3.141592653589793
uniform sampler2D tNight;
uniform sampler2D tDusk;
uniform float uDusk;
uniform float uDay;
uniform float uBright;
uniform float uTintAmount;
uniform float uRotNight;
uniform float uRotDusk;
uniform vec3 uTint;
uniform vec3 uDayTop;
uniform vec3 uDayHorizon;
uniform vec3 uFog;
varying vec3 vDir;

vec2 equirect(vec3 d, float rot) {
    float u = atan(d.z, d.x) / (2.0 * PI) + 0.5 + rot;
    float v = asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5;
    return vec2(fract(u), v);
}

void main() {
    vec3 d = normalize(vDir);
    vec3 ds = normalize(vec3(d.x, max(d.y, 0.035), d.z));
    vec3 night = texture2D(tNight, equirect(ds, uRotNight)).rgb;
    vec3 dusk = texture2D(tDusk, equirect(ds, uRotDusk)).rgb;
    vec3 col = mix(night, dusk, uDusk);

    float h = clamp(d.y, 0.0, 1.0);
    vec3 day = mix(uDayHorizon, uDayTop, pow(h, 0.55));
    col = mix(col, day, uDay);

    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, uTint * (0.35 + lum * 1.25), uTintAmount);
    col *= uBright;

    float horizon = smoothstep(-0.03, 0.22, d.y);
    col = mix(uFog, col, horizon);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`

export class Sky {
    constructor(textures) {
        for (const t of [textures.night, textures.dusk]) {
            t.colorSpace = THREE.SRGBColorSpace
            t.generateMipmaps = false
            t.minFilter = THREE.LinearFilter
            t.wrapS = THREE.RepeatWrapping
        }
        this.uniforms = {
            tNight: { value: textures.night },
            tDusk: { value: textures.dusk },
            uDusk: { value: 0 },
            uDay: { value: 0 },
            uBright: { value: 1 },
            uTintAmount: { value: 0 },
            uRotNight: { value: 0.1 },
            uRotDusk: { value: 0.6 },
            uTint: { value: new THREE.Color('#ffffff') },
            uDayTop: { value: new THREE.Color('#8fc6f2') },
            uDayHorizon: { value: new THREE.Color('#e8f3ff') },
            uFog: { value: new THREE.Color('#ffffff') },
        }
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(150, 48, 24),
            new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader,
                fragmentShader,
                side: THREE.BackSide,
                depthWrite: false,
            }),
        )
        this.mesh.frustumCulled = false
        this.mesh.renderOrder = -10
    }
}
