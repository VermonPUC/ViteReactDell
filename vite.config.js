import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: "127.0.0.1",
    port: 5111
  },
  server: {
    allowedHosts: [".localhost"],
    host: true,
    port: 5111
  }
})
