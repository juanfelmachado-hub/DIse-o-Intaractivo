#!/bin/bash
# Emulador IWER: lleva a Nico con la mano bajo la mesa (juego 1) y revisa cómo queda.
# Antes: torre-entrar.sh, modo manos y tests/radar-listo.mjs (marca los 4 peligros).
. tests/_lib.sh
J=$(R tests/radar-listo.mjs)
eval $(echo "$J" | python3 -c "
import sys,json;d=json.load(sys.stdin);n=d['nico'];t=d['dest']
print('NX=%s NY=%s NZ=%s DX=%s DZ=%s' % (n['x'],n['y'],n['z'],t['x'],t['z']))")
T $NX $(python3 -c "print($NY+0.04)") $NZ; sleep 0.4; T $NX $NY $NZ; sleep 0.4; pinch 1; sleep 0.4
T $NX 0.2 $NZ; sleep 0.3; T $DX 0.15 $DZ; sleep 0.3; T $DX 0.07 $DZ; sleep 0.4; pinch 0; sleep 0.3; T $DX 0.3 0; sleep 3.5
echo "mesa: $(R tests/nico-mesa.mjs)"
echo "derecho: $(R tests/nico-erguido.mjs)"
echo "mira hacia: $(R tests/_frente.mjs)"
