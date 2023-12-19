import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginStyleInject from 'vite-plugin-style-inject'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginStyleInject()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/main.tsx')
      }
    }
  }
})
