import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // define: {
  //   global: {} // Define global variable to avoid errors
  //   // Node.js 전역객체 에뮬레이션. ESM 지원이 강화된 환경에서 더 안전하고 유지보수에 좋다.
  // },
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
      }
    }
  }
})