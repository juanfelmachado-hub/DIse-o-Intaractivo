#!/bin/bash
# Emulador IWER: toca «Continuar» con la punta del índice (sin pinza): baja el dedo sobre el botón y lo levanta.
# Uso: bash tests/boton-dedo.sh [veces]   (modo manos)
. tests/_lib.sh
B=$(R tests/boton-continuar.mjs)
eval $(echo "$B" | python3 -c "import sys,json;d=json.load(sys.stdin);b=[x for x in d['buttons'] if x['dir']==1][0]['pos'];print(f'BX={b[0]} BY={b[1]} BZ={b[2]}')")
for k in $(seq 1 ${1:-1}); do
  ANCHOR=index-tip T $BX $(python3 -c "print($BY+0.06)") $BZ; sleep 0.35
  ANCHOR=index-tip T $BX $(python3 -c "print($BY+0.004)") $BZ; sleep 0.35
  ANCHOR=index-tip T $BX $(python3 -c "print($BY+0.08)") $BZ; sleep ${GAP:-0.4}
done
R tests/boton-continuar.mjs
