import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      components: "/src/components",
      constants: "/src/constants",
      api: "/src/api"
    },
  },
})
