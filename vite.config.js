import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    sourcemap: false, // Tắt tìm kiếm source map
  },
  build: {
    sourcemap: false, // Tắt tạo source map khi build
  },
  css: {
    devSourcemap: false, // ✅ Tắt sourcemap cho CSS trong dev
  }
})
