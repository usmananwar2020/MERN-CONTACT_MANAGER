import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // Add the svgr plugin
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'), // Define the alias
      src: "/src",
      pages: "/src/pages"
    },
  },
})
