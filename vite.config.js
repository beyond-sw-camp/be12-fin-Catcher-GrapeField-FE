import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    global: 'window', // 꼭 'window'로 해줘야 >> 안 그러면 sockJS 충돌해서 연결 안 됨.
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
      // 웹소켓 프록시를 server.proxy 안에 포함
      "/ws": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true, // 이 옵션이 웹소켓 지원을 활성화합니다
        // 쿠키 전달을 위해 필요
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            proxyReq.setHeader('origin', 'http://localhost:5173');
          });
          // 프록시 오류 로깅 추가
          proxy.on('error', (err, req, res) => {
            console.error('프록시 오류:', err);
          });
        }
      }
    }
  }
})