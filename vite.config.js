import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project pages live under /codecloze/ in production; root in dev.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/codecloze/' : '/',
  plugins: [react(), tailwindcss()],
}))
