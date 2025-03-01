#!/bin/zsh

# ℹ️ Script per eseguire la build e copiare i file nel mio sito personale

# Percorsi
BUILD_PATH="/Users/fbonizzi/Source/tappy-tiles"
DEPLOY_PATH="/Users/fbonizzi/Source/imagine-software/tappy-tiles"

# Eliminare la cartella dist prima della build
rm -rf "$BUILD_PATH/dist"

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
  sed -i '' '1s;^;---\nlayout: null\npermalink: /tappy-tiles/\n---\n\n;' "$INDEX_FILE"
  sed -i '' 's;\(content=")/tappy-tiles-logo.jpg;\1{{ site.url }}/tappy-tiles/tappy-tiles-logo.jpg;g' "$INDEX_FILE"
  sed -i '' 's;\(href=")/tappy-tiles-logo.jpg;\1{{ site.url }}/tappy-tiles/tappy-tiles-logo.jpg;g' "$INDEX_FILE"
  sed -i '' 's;\(src=")/src/main.tsx;\1{{ site.url }}/tappy-tiles/assets/index.js;g' "$INDEX_FILE"
  sed -i '' 's;\(href=")/assets/index.css;\1{{ site.url }}/tappy-tiles/assets/index.css;g' "$INDEX_FILE"
  echo "Modifica di index.html completata."
else
  echo "Errore: index.html non trovato."
fi

echo "Build completata e copiata con successo!"
