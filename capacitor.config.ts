import type { CapacitorConfig } from '@capacitor/cli';

/** Live web app — use firebaseapp.com so Apple Sign-In domain matches Apple Developer config. */
const LIVE_APP_URL = 'https://gen-lang-client-0422005049.firebaseapp.com';

/** Set CAPACITOR_LIVE=0 to bundle local dist/ instead (offline dev). */
const useLiveWebApp = process.env.CAPACITOR_LIVE !== '0';

const config: CapacitorConfig = {
  appId: 'com.goofind.app',
  appName: 'Goofind',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    ...(useLiveWebApp
      ? {
          url: LIVE_APP_URL,
          cleartext: false,
        }
      : {}),
  },
};

export default config;
