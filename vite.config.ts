import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      target: 'react',
      // autoCodeSplitting: true, // only when required
      routesDirectory: join(__dirname, './src/pages'), // for fsd
      generatedRouteTree: join(__dirname, './src/app/routeTree.gen.ts')
    })
  ],
  resolve: {
    alias: {
      '~': join(__dirname, './src'),
      '~app': join(__dirname, './src/app'),
      '~pages': join(__dirname, './src/pages'),
      '~widgets': join(__dirname, './src/widgets'),
      '~features': join(__dirname, './src/features'),
      '~entities': join(__dirname, './src/entities'),
      '~shared': join(__dirname, './src/shared')
    }
  },
  server: {
    proxy: {
      '/api': {
        // 서버 base 주소
        target: 'http://localhost:8080',
        // target으로 변경
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
