import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Calcola __dirname manualmente per gli ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_PATH = path.resolve(__dirname, '../dist');
const DEPLOY_PATH = path.resolve(__dirname, '../../imagine-software/tappy-tiles');
const INDEX_FILE = path.join(BUILD_PATH, 'index.html');
const ASSETS_PATH = path.join(BUILD_PATH, 'assets');

// Trova i file JS e CSS generati da Vite
const getAssetFile = (ext) => {
    const files = fs.readdirSync(ASSETS_PATH);
    return files.find(file => file.endsWith(ext)) || '';
};

const jsFile = getAssetFile('.js');
const cssFile = getAssetFile('.css');

// DEBUG: Stampiamo i nomi reali dei file generati
console.debug(chalk.blue.bold(`🔍 File JS trovato: ${jsFile}`));
console.debug(chalk.blue.bold(`🔍 File CSS trovato: ${cssFile}`));

// Modifica index.html
if (fs.existsSync(INDEX_FILE)) {
    let html = fs.readFileSync(INDEX_FILE, 'utf-8');

    // Aggiunge il template Liquid in cima
    html = `---\nlayout: null\npermalink: /tappy-tiles/\n---\n\n` + html;

    // ✅ Sostituzione diretta degli elementi statici
    html = html.replace(
        '<meta name="og:image" content="/tappy-tiles-logo.jpg"/>',
        '<meta name="og:image" content="{{ site.url }}/tappy-tiles/tappy-tiles-logo.jpg"/>'
    );

    html = html.replace(
        '<link rel="icon" type="image/jpg" href="/tappy-tiles/tappy-tiles-logo.jpg"/>',
        '<link rel="icon" type="image/png" href="{{ site.url }}/tappy-tiles/tappy-tiles-logo.jpg"/>'
    );

    // ✅ Sostituzione dei file JS e CSS con quelli generati da Vite
    if (jsFile) {
        html = html.replace(/src="\/?tappy-tiles\/assets\/[^"]+\.js"/g, `src="{{ site.url }}/tappy-tiles/assets/${jsFile}"`);
    }
    if (cssFile) {
        html = html.replace(/href="\/?tappy-tiles\/assets\/[^"]+\.css"/g, `href="{{ site.url }}/tappy-tiles/assets/${cssFile}"`);
    }

    fs.writeFileSync(INDEX_FILE, html, 'utf-8');
    console.log(chalk.green.bold('✅ Modifica di index.html completata.'));
} else {
    console.error(chalk.red.bold('❌ Errore: index.html non trovato.'));
    process.exit(1);
}

// Elimina la cartella di destinazione e copia i nuovi file
fs.rmSync(DEPLOY_PATH, { recursive: true, force: true });
fs.mkdirSync(DEPLOY_PATH, { recursive: true });
fs.cpSync(BUILD_PATH, DEPLOY_PATH, { recursive: true });

console.log(chalk.green.bold('🚀 Build copiata con successo!'));