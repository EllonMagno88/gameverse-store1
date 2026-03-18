import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Removemos os cabeçalhos COOP/COEP por enquanto para ver se o fetch destrava
  server: {
    fs: {
      strict: false
    }
  }
})