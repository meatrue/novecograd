import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), mkcert()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
    server: {
        // @ts-ignore: needed
        https: true,
        port: 5173,
        strictPort: true,
        open: true,
    },
    base: '/novecograd',
});
