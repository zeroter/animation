import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginStyleInject from 'vite-plugin-style-inject'
import { resolve } from 'path'
import vitePluginBanner from 'vite-plugin-banner'

const bannerContent = `// ==UserScript==
// @name         Animation
// @namespace    https://stay.app/
// @version      0.1
// @description  Template userscript created by Stay
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==
`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginStyleInject(),
    vitePluginBanner({
      content: bannerContent
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/main.tsx')
      }
    }
  }
})
