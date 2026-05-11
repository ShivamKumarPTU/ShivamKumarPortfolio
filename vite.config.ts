import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssTarget: ['chrome80', 'safari14', 'firefox80', 'edge80'],
  }
});
