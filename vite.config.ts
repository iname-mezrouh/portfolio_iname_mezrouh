import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173, // Changed from 8443 to standard port
    strictPort: false, // Allow fallback if port is in use
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    sourcemap: false,
    minify: true,
  },
})