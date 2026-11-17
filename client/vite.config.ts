import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('swiper') || id.includes('react-type-animation') || id.includes('react-hot-toast')) {
              return 'vendor-ui';
            }
            if (id.includes('pdf-parse')) {
              return 'vendor-pdf';
            }
            if (
              id.includes('react-router-dom') ||
              id.includes('react-helmet-async') ||
              id.includes('react') ||
              id.includes('scheduler')
            ) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
})
