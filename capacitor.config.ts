import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.goofind.app',
  appName: 'Goofind',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
