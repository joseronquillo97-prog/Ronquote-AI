import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Network drives don't support native FS events — use polling instead
      usePolling: true,
      interval: 800,
    },
  },
})
