import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Use the repository name as the base path for GitHub Pages
  // Correct repository name for GitHub Pages
  base: '/Abishek_portfolio-/',
});
