import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ``,
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        /assets\/images\/coding-profiles\/.+\.svg$/,
      ],
    },
  },
  optimizeDeps: {
    exclude: ['*.svg'],
  },
  server: {
    hmr: {
      overlay: false, // Disable the error overlay
    },
  },
})
