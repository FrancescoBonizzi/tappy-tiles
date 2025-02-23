import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
    plugins: [react(), tailwindcss()],
    base: mode === 'development'
        ? '/'
        : '/assets/tappy-tiles/', // I need this to serve with jeckyll on my personal website
    build: {
        outDir: 'dist',
    },
}));