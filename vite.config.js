import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false, // This prevents your original code from appearing in DevTools
  },
  plugins: [react(), tailwindcss()],
});
 