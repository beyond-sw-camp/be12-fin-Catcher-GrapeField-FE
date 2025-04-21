import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    global: 'window', // 꼭 'window'로 해줘야 >> 안 그러면 sockJS 충돌해서 연결 안 z됨.
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // cookieDomainRewrite: "your-production-domain.com", 
      },
    },
    ws: { //웹소켓용 프록시
      "/ws": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true,
      }
    }
  }
})




