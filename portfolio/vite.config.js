import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.VITE_DEFAULT_VERSION': JSON.stringify(env.VITE_DEFAULT_VERSION || 'v2')
    }
  }
})
