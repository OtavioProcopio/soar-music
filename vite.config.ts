import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  css: {
    postcss: './src/postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: (id) => {
          // Vendor - React core
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          
          // Vendor - Router
          if (id.includes('node_modules/react-router-dom') || 
              id.includes('node_modules/@remix-run')) {
            return 'vendor-router';
          }
          
          // Vendor - Supabase SDK
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          
          // Vendor - UI Libraries
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/recharts')) {
            return 'vendor-ui';
          }
          
          // Public Pages Bundle
          if (id.includes('/pages/')) {
            return 'public-pages';
          }
          
          // Components
          if (id.includes('/components/')) {
            return 'components';
          }
        }
      }
    }
  }
});
