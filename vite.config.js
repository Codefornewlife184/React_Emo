import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Relative yollar için eklendi (404 MIME type hatasını çözer)
  server: {
    port: 3000,
    open: true
  }
})