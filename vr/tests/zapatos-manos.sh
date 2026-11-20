#!/bin/bash
# Emulador IWER: pone los zapatos con la mano derecha. Por cada zapato: pinza → subir → (pie equivocado) → pie correcto → soltar.
# Uso: bash tests/zapatos-manos.sh  (antes: torre-entrar.sh y llegar al pasillo; ver tests/_ir-pasillo.mjs)
X="npx @iwsdk/cli"
st() { $X browser run tests/zapatos-estado.mjs 2>&1 | python3 -c "import sys,json;print(json.dumps(json.load(sys.stdin)['data']['result']))"; }
T() { $X xr set-transform --input-json "{\"device\":\"hand-right\",\"position\":{\"x\":$1,\"y\":$2,\"z\":$3},\"anchor\":\"grasp\",\"orientation\":\"auto\"}" >/dev/null 2>&1; }
pinch() { $X xr run-sequence --input-json "{\"device\":\"hand-right\",\"steps\":[{\"pinch\":$1,\"duration\":0.2}]}" --timeout 45000 >/dev/null 2>&1; }
$X xr set-input-mode --input-json '{"mode":"hand"}' >/dev/null 2>&1; sleep 1
for SIDE in ${SIDES:-R L}; do
  J=$(st)
  eval $(echo "$J" | python3 -c "
import sys,json;d=json.loads(sys.stdin.read());s=[x for x in d['shoes'] if x['side']=='$SIDE'][0]
o='L' if '$SIDE'=='R' else 'R';f=d['feet']['$SIDE'];w=d['feet'][o]
print(f'SX={s[\"center\"][0]} SY={s[\"center\"][1]} SZ={s[\"center\"][2]} FX={f[0]} FY={f[1]} FZ={f[2]} WX={w[0]} WZ={w[2]}')")
  T $SX $(python3 -c "print($SY+0.04)") $SZ; sleep 0.4
  T $SX $SY $SZ; sleep 0.4
  pinch 1; sleep 0.4
  T $SX $(python3 -c "print($SY+0.06)") $SZ; sleep 0.4
  echo "agarrado $SIDE: $(st | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['hands'],[ (x['side'],x['mode'],x['busy']) for x in d['shoes']])")"
  if [ -z "$NOWRONG" ]; then
    T $WX $(python3 -c "print($FY+0.025)") $WZ; sleep 0.5
    echo "pie equivocado: $(st | python3 -c "import sys,json;d=json.load(sys.stdin);print([(x['side'],x['nearSide'],x['near'],x['right'],x['oriented']) for x in d['shoes'] if x['busy']])")"
  fi
  T $FX $(python3 -c "print($FY+0.03)") $FZ; sleep 0.5
  echo "pie correcto: $(st | python3 -c "import sys,json;d=json.load(sys.stdin);print([(x['side'],x['nearSide'],x['near'],x['right'],x['oriented'],x['placed']) for x in d['shoes']])")"
  pinch 0; sleep 0.6
  T $FX $(python3 -c "print($FY+0.12)") $(python3 -c "print($FZ+0.1)"); sleep 0.6
  echo "soltado: $(st | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['placed'],[(x['side'],x['mode'],x['placed'],x['pos']) for x in d['shoes']])")"
done
sleep 2.5
echo "final: $(st)"
