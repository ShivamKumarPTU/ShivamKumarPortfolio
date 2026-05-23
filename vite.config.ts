import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssTarget: ['chrome80', 'safari14', 'firefox80', 'edge80'],
    rollupOptions: {
      input: {
        main: 'index.html',
        'about-shivam-kumar-android-developer': 'about-shivam-kumar-android-developer.html',
        'android-app-case-studies': 'android-app-case-studies.html',
        'android-developer-roadmap-by-shivam': 'android-developer-roadmap-by-shivam.html',
        'android-project-ideas-guide': 'android-project-ideas-guide.html',
        awards: 'awards.html',
        'cost-of-android-app-development-india': 'cost-of-android-app-development-india.html',
        'firebase-integration-android-guide': 'firebase-integration-android-guide.html',
        'hire-android-developer-guide': 'hire-android-developer-guide.html',
        'kotlin-for-android-developers': 'kotlin-for-android-developers.html',
        analytics: 'public/assets/js/analytics.js'
      }
    }
  }
});

