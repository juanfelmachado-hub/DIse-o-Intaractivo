#!/bin/bash
# Emulador IWER: corazón con la mano. 1) pinza apuntando al corazón (no debe contar). 2) golpes con el índice.
# Antes: torre-entrar.sh y tests/hasta-corazon.mjs.
. tests/_lib.sh
H() { R tests/objetos-estado.mjs | python3 -c "import sys,json;d=json.load(sys.stdin)['heart'];print(json.dumps(d))"; }
for i in $(seq 1 40); do P=$(H | python3 -c "import sys,json;print(json.load(sys.stdin)['phase'])"); [ "$P" = play ] && break; sleep 0.5; done
J=$(H); echo "inicio: $J"
eval $(echo "$J" | python3 -c "import sys,json;d=json.load(sys.stdin);p=d['pos'];print(f'HX={p[0]} HY={p[1]} HZ={p[2]}')")
# 1) pinza a distancia, apuntando al corazón (rayo de la mano) y pinza junto al corazón sin moverse hacia él
T $HX $HY $(python3 -c "print($HZ+0.3)"); sleep 0.4
for k in 1 2 3; do pinch 1; sleep 0.3; pinch 0; sleep 0.5; done
echo "tras 3 pinzas a distancia: $(H | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['actTaps'],d['stats'])")"
# 2) golpes con la punta del índice
for k in $(seq 1 ${HITS:-8}); do
  ANCHOR=index-tip T $HX $HY $(python3 -c "print($HZ+0.09)"); sleep 0.25
  ANCHOR=index-tip T $HX $HY $HZ; sleep ${GAP:-0.5}
done
ANCHOR=index-tip T $HX $HY $(python3 -c "print($HZ+0.12)"); sleep 0.3
echo "tras golpes: $(H | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['actTaps'],d['stats'])")"
