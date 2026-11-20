# Utilidades para los guiones del emulador IWER.
X="npx @iwsdk/cli"
# R script.mjs → imprime el resultado en una línea (reintenta si el puente no responde)
R() { for i in 1 2 3; do O=$($X browser run "$1" --timeout 90000 2>&1); echo "$O" | python3 -c "import sys,json;d=json.load(sys.stdin);print(json.dumps(d['data']['result']))" 2>/dev/null && return; sleep 1; done; echo "ERROR: $(echo "$O" | head -c 300)"; }
T() { $X xr set-transform --input-json "{\"device\":\"${HAND:-hand-right}\",\"position\":{\"x\":$1,\"y\":$2,\"z\":$3},\"anchor\":\"${ANCHOR:-grasp}\",\"orientation\":\"auto\"}" >/dev/null 2>&1; }
pinch() { $X xr run-sequence --input-json "{\"device\":\"${HAND:-hand-right}\",\"steps\":[{\"pinch\":$1,\"duration\":0.2}]}" --timeout 45000 >/dev/null 2>&1; }
