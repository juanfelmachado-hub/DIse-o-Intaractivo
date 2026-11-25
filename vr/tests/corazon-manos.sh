#!/bin/bash
# Emulador IWER: corazón acostado, golpes con la mano desde arriba.
#  1) pinzas junto al corazón: no cuentan como golpe;
#  2) golpes con la punta del índice, mano derecha y luego izquierda (bajar y subir = 1 contacto);
#  3) dedo apoyado sobre el corazón: no cuenta golpes repetidos.
# Antes: torre-entrar.sh, modo manos y tests/hasta-corazon.mjs.
. tests/_lib.sh
H() { R tests/corazon-estado.mjs; }
for i in $(seq 1 40); do P=$(H | python3 -c "import sys,json;print(json.load(sys.stdin).get('phase'))"); [ "$P" = play ] && break; sleep 0.5; done
J=$(H); echo "inicio: $J"
eval $(echo "$J" | python3 -c "import sys,json;d=json.load(sys.stdin);p=d['top'];print(f'HX={p[0]} HY={p[1]} HZ={p[2]}')")
up() { python3 -c "print($HY+$1)"; }
# 1) pinzas junto al corazón (sin bajar la mano)
T $HX $(up 0.05) $HZ; sleep 0.4
for k in 1 2 3; do pinch 1; sleep 0.3; pinch 0; sleep 0.4; done
echo "tras 3 pinzas: $(H | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['taps'],d['stats'])")"
# 2) golpes con el índice, cada mano
for side in right left; do
  T 0.4 0.3 -0.5; HAND=hand-$side ANCHOR=index-tip T $HX $(up 0.07) $HZ; sleep 0.3
  for k in $(seq 1 ${HITS:-4}); do
    HAND=hand-$side ANCHOR=index-tip T $HX $(up -0.005) $HZ; sleep 0.25
    HAND=hand-$side ANCHOR=index-tip T $HX $(up 0.07) $HZ; sleep ${GAP:-0.35}
  done
  HAND=hand-$side T $(python3 -c "print($HX + (0.3 if '$side'=='right' else -0.3))") 0.3 -0.5
  echo "tras golpes ($side): $(H | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['taps'],d['stats'])")"
done
# 3) dedo apoyado 2 s
ANCHOR=index-tip T $HX $(up 0.07) $HZ; sleep 0.3
ANCHOR=index-tip T $HX $(up -0.005) $HZ; sleep 2
echo "dedo apoyado: $(H | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['taps'],d['stats'])")"
ANCHOR=index-tip T $HX $(up 0.1) $HZ
