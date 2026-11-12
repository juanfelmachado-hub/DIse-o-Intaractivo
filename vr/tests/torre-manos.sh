#!/bin/sh
# Emulador IWER (no es una prueba en el visor): construye la torre con la MANO derecha emulada.
# Por cada bloque: pinza abierta sobre el bloque → cerrar → subir → llevar sobre la torre → bajar → abrir.
# Uso: sh tests/torre-manos.sh   (antes: sh tests/torre-entrar.sh)
X="npx @iwsdk/cli"
blocks() { $X browser run tests/torre-estado.mjs 2>&1 | python3 -c "import sys,json;d=json.load(sys.stdin)['data']['result'];print(json.dumps(d))"; }
T() { $X xr set-transform --input-json "{\"device\":\"hand-right\",\"position\":{\"x\":$1,\"y\":$2,\"z\":$3},\"anchor\":\"grasp\",\"orientation\":\"auto\"}" >/dev/null 2>&1; }
pinch() { $X xr run-sequence --input-json "{\"device\":\"hand-right\",\"steps\":[{\"pinch\":$1,\"duration\":0.2}]}" --timeout 45000 >/dev/null 2>&1; }
$X xr set-input-mode --input-json '{"mode":"hand"}' >/dev/null 2>&1
sleep 1
BASE=${BASE:-2}
for SRC in ${SRCS:-0 5 3}; do
  J=$(blocks)
  eval $(echo "$J" | python3 -c "
import sys,json;d=json.loads(sys.stdin.read());b=d['blocks'];s=b[$SRC];t=b[$BASE]
top=max(p[1] for p in b if abs(p[0]-t[0])<0.02 and abs(p[2]-t[2])<0.02)
h=0.17*d['k']
print(f'SX={s[0]} SY={s[1]} SZ={s[2]} TX={t[0]} TZ={t[2]} TY={top+h+0.003} UP={top+h+0.06}')")
  T $SX $(python3 -c "print($SY+0.04)") $SZ; sleep 0.4
  T $SX $SY $SZ; sleep 0.4
  pinch 1; sleep 0.4
  T $SX $UP $SZ; sleep 0.4
  T $TX $UP $TZ; sleep 0.4
  T $TX $TY $TZ; sleep 0.5
  pinch 0; sleep 0.3
  T $TX $(python3 -c "print($UP+0.08)") $TZ; sleep 1.6
  echo "bloque $SRC -> altura: $($X browser run tests/torre-estado.mjs 2>&1 | grep -o '"h": [0-9]*')"
done
