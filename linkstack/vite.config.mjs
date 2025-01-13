import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel(['resources/js/app.tsx']),
        react(),
    ],
    server: {
        // respond to all network requests (same as '0.0.0.0')
        host: "0.0.0.0",
        // we need a strict port to match on PHP side
        strictPort: true,
        port: 5173,
    }
});