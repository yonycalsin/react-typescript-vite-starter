import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    open: false,
  },
  build: {
    // if you are using sentry, you can use it to report the errors
    sourcemap: false,
  },
})
