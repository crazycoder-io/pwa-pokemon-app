import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // generate manifest.json in outDir
    manifest: true,
    sourcemap: true,
  },
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: 'Pokemon PWA',
        short_name: 'Pokemon',
        theme_color: '#4DBA87',
        icons: [
          {
            src: '/image/pokemon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/image/pokemon.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes("/api") ? url : false
            },
            handler: 'CacheFirst',
            options: {
              cacheName: 'pwa-pokeapi-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
              }
            }
          }
        ]
      }
    })
  ],
})
