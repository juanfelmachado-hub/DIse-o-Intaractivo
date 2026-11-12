#!/bin/sh
# Emulador IWER: entra en la sesión, coloca el libro frente al lector y lo abre (hasta la torre).
set -e
X="npx @iwsdk/cli"
$X xr enter --input-json '{}' >/dev/null 2>&1 || true
sleep 2
$X xr look-at --input-json '{"device":"controller-right","target":{"x":0,"y":0,"z":-1.0}}' >/dev/null 2>&1
sleep 0.5
$X xr select --input-json '{"device":"controller-right","duration":0.15}' >/dev/null 2>&1
sleep 1
P=$($X xr list-targets --input-json '{}' 2>&1 | python3 -c "
import sys,json;d=json.load(sys.stdin)
def walk(o):
  if isinstance(o,dict):
    if o.get('name')=='btn-start' and 'position' in o: print(json.dumps(o['position'])); sys.exit()
    for v in o.values(): walk(v)
  elif isinstance(o,list):
    for v in o: walk(v)
walk(d)")
$X xr look-at --input-json "{\"device\":\"controller-right\",\"target\":$P}" >/dev/null 2>&1
sleep 0.4
$X xr select --input-json '{"device":"controller-right","duration":0.15}' >/dev/null 2>&1
sleep 9
