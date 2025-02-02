import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.lovable.aitravel',
  appName: 'AI Travel Planner',
  webDir: 'dist',
  server: {
    url: 'https://REPLACE_WITH_PROJECT_ID.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;