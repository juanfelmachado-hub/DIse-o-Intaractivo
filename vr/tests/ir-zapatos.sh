#!/bin/bash
# Emulador IWER: entra al visor, salta al pasillo y espera el juego de los zapatos.
X="npx @iwsdk/cli"
bash tests/torre-entrar.sh
for i in 1 2 3; do
  $X browser run tests/_ir-pasillo.mjs >/dev/null 2>&1
  $X browser run tests/zapatos-estado.mjs --timeout 90000 >/dev/null 2>&1
  sleep 2
  A=$($X browser run tests/zapatos-estado.mjs 2>&1 | grep -o '"active": [a-z]*')
  echo "intento $i: $A"
  [ "$A" = '"active": true' ] && break
done
