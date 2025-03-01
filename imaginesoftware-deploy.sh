#!/bin/zsh

# ℹ️ Script per eseguire la build e copiare i file nel mio sito personale

# Definire colori ANSI
GREEN="\033[32m"
RESET="\033[0m"

# Funzione per stampare messaggi in verde
echo_green() {
  echo "${GREEN}$1${RESET}"
}

# Percorsi
BUILD_PATH="/Users/fbonizzi/Source/tappy-tiles"
DEPLOY_PATH="/Users/fbonizzi/Source/imagine-software/tappy-tiles"

# Forzare i permessi sulla cartella dist e poi eliminarla
if [ -d "$BUILD_PATH/dist" ]; then
  chmod -R u+w "$BUILD_PATH/dist"
  rm -rf "$BUILD_PATH/dist"
fi

# Spostarsi nella cartella del progetto e generare la build
cd "$BUILD_PATH" || { echo "Errore: impossibile accedere a $BUILD_PATH"; exit 1; }
npm run build || { echo "Errore: la build è fallita"; exit 1; }

# Verificare che la cartella dist esista
if [ ! -d "$BUILD_PATH/dist" ]; then
  echo "Errore: la cartella dist non esiste"
  exit 1
fi

# Eliminare il contenuto precedente nella cartella di destinazione
rm -rf "$DEPLOY_PATH"/*

# Copiare i nuovi file della build
cp -R "$BUILD_PATH/dist"/* "$DEPLOY_PATH"/

# Percorso del file index.html
INDEX_FILE="$DEPLOY_PATH/index.html"

# Modificare index.html per Jekyll
if [ -f "$INDEX_FILE" ]; then
  sed -E -i '' '1s;^;---\nlayout: null\npermalink: /tappy-tiles/\n---\n\n;' "$INDEX_FILE"
  sed -E -i '' 's;content="/tappy-tiles-logo.jpg;content="{{ site.url }}/tappy-tiles/tappy-tiles-logo.jpg;g' "$INDEX_FILE"
  sed -E -i '' 's;href="/tappy-tiles-logo.jpg;href="{{ site.url }}/tappy-tiles/tappy-tiles-logo.jpg;g' "$INDEX_FILE"
  sed -E -i '' 's;src="/src/main.tsx;src="{{ site.url }}/tappy-tiles/assets/index.js;g' "$INDEX_FILE"
  sed -E -i '' 's;href="/assets/index.css;href="{{ site.url }}/tappy-tiles/assets/index.css;g' "$INDEX_FILE"
  echo_green "Modifica di index.html completata per Jekyll."
else
  echo "Errore: index.html non trovato."
fi

echo_green "Build completata e copiata con successo!"
