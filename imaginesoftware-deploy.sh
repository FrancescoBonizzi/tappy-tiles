#!/bin/zsh

# Script per eseguire la build e copiare i file nel mio sito personale

# Percorsi
BUILD_PATH="/Users/fbonizzi/Source/tappy-tiles"
DEPLOY_PATH="/Users/fbonizzi/Source/imagine-software/tappy-tiles"

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

echo "Build completata e copiata con successo!"
