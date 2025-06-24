import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/VroomTrack-Suivi-vehicule/', // ← ← ← ajoute cette ligne !
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
