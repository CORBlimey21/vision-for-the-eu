import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { watch: { ignored: ['**/dist/**'] } },
  build: { rollupOptions: { output: { manualChunks: { geography: ['maplibre-gl'] } } } },
});
