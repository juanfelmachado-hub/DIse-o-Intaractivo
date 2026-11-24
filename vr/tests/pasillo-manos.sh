#!/bin/bash
# Emulador IWER: lleva a Nico con la mano por el camino del pasillo y lo suelta (después de los zapatos).
. tests/_lib.sh
J=$(R tests/pasillo-camino.mjs); echo "antes: $J" | cut -c1-120
eval $(echo "$J" | python3 -c "
import sys,json;d=json.loads(sys.stdin.read());n=d['nico'];print(f'NX={n[0]} NY={n[1]} NZ={n[2]}')
for i,p in enumerate(d['pts']): print(f'P{i}=\"{p[0]} {n[1]+0.03} {p[2]}\"')")
T $NX $(python3 -c "print($NY+0.04)") $NZ; sleep 0.4; T $NX $NY $NZ; sleep 0.4; pinch 1; sleep 0.4
for P in "$P1" "$P2" "$P3" "$P4" "$P5" "$P6"; do T $P; sleep 0.35; echo "  $(R tests/nico-puerta.mjs)"; done
echo "llevando: $(R tests/pasillo-camino.mjs | cut -c1-120)"
pinch 0; sleep 0.3; echo "  $(R tests/nico-puerta.mjs)"; sleep 2
echo "soltado: $(R tests/pasillo-camino.mjs | cut -c1-120)"
echo "  $(R tests/nico-puerta.mjs)"
