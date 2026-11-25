#!/bin/bash
# Emulador IWER: entra, pasa a modo manos, salta la torre y avanza hasta el corazón (juego 2).
npx @iwsdk/cli xr set-input-mode --input-json '{"mode":"controller"}' >/dev/null 2>&1 # torre-entrar usa el control
bash tests/torre-entrar.sh >/dev/null 2>&1
. tests/_lib.sh
$X xr set-input-mode --input-json '{"mode":"hand"}' >/dev/null 2>&1; sleep 2
R tests/_saltar-torre.mjs >/dev/null
$X browser run tests/hasta-corazon.mjs --timeout 110000 >/dev/null 2>&1
R tests/corazon-estado.mjs
