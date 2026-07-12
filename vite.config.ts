import path from 'path';
import os from 'os';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { geocodeDevPlugin } from './vite-geocode-dev-plugin';

function getLanIp(): string {
  try {
    const nets = os.networkInterfaces();
    for (const entries of Object.values(nets)) {
      for (const net of entries ?? []) {
        if (net.family === 'IPv4' && !net.internal) return net.address;
      }
    }
  } catch {
    /* sandbox or restricted env */
  }
  return 'localhost';
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const lanIp = getLanIp();
    const port = 3000;

    const geocoderAuth = env.GEOCODER_CA_AUTH || env.VITE_GEOCODER_CA_AUTH || '';

    return {
      plugins: [react(), geocodeDevPlugin(geocoderAuth)],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        port,
        host: '0.0.0.0',
        strictPort: true,
        headers: {
          'Cache-Control': 'no-store',
        },
        hmr: {
          host: lanIp,
          port,
          protocol: 'ws',
        },
        proxy: {
          '/api/nominatim': {
            target: 'https://nominatim.openstreetmap.org',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/nominatim/, ''),
          },
          '/api/photon': {
            target: 'https://photon.komoot.io',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/photon/, '/api'),
          },
          '/api/geocoder': {
            target: 'https://geocoder.ca',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/geocoder/, ''),
          },
          '/api/canada-geo': {
            target: 'https://geolocator.api.geo.ca',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/canada-geo/, '/geolocation/en'),
          },
        },
      },
      preview: {
        host: '0.0.0.0',
        port: 4173,
        strictPort: true,
        proxy: {
          '/api/nominatim': {
            target: 'https://nominatim.openstreetmap.org',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/nominatim/, ''),
          },
          '/api/photon': {
            target: 'https://photon.komoot.io',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/photon/, '/api'),
          },
          '/api/geocoder': {
            target: 'https://geocoder.ca',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/geocoder/, ''),
          },
          '/api/canada-geo': {
            target: 'https://geolocator.api.geo.ca',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api\/canada-geo/, '/geolocation/en'),
          },
        },
      },
    };
});
