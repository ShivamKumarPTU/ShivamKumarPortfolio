import { defineConfig } from 'vite';

export default defineConfig({
  build: {
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
        // Add analytics as a separate entry point so Vite bundles it
        analytics: 'public/assets/js/analytics.js'
      }
    }
  }
});
