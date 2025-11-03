/* eslint-env node */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, __dirname, '')   // __dirname zamiast process.cwd()
  const API = env.VITE_API_URL || 'http://localhost:8000'
  // const API = 'https://reserved-yes-multimedia-dealt.trycloudflare.com' 

  const isDev = mode === 'development'

  return defineConfig({
    plugins: [react()],
    server: isDev
      ? {
          host: true,
          port: 3001,
          // allowedHosts: ['.trycloudflare.com'],
          proxy: {
            '/api': {
              target: API,
              changeOrigin: true,
              rewrite: (p) => p.replace(/^\/api/, ''),
            },
          },
        }
      : undefined,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.js',
    },
  })
}
