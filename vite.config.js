import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

  ],
  define: {
    'process.env': {},
    global: {}
  },
  optimizeDeps: {
    include: ['jspdf', 'html2canvas']
  },
  server: {
    historyApiFallback: true, 
    headers: {
      "Content-Security-Policy": "script-src 'self' 'unsafe-inline'"
    },
  },
})
