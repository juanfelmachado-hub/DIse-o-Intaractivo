#!/bin/bash
# Emulador IWER: recorrido completo (repite tests/recorrido.mjs hasta "terminado"). Antes: torre-entrar.sh.
for i in $(seq 1 ${N:-8}); do
  O=$(npx @iwsdk/cli browser run tests/recorrido.mjs --timeout 110000 2>&1 | python3 -c "import sys,json;d=json.load(sys.stdin);print(json.dumps(d.get('data',{}).get('result',d)))")
  echo "$O" | cut -c1-1500
  echo "$O" | grep -q terminado && break
done
