import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      },
      build: {
        target: 'esnext',
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        rollupOptions: {
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
              
              // Auth - AuthContext + supabase.ts
              if (id.includes('/contexts/AuthContext') || 
                  id.includes('/services/supabase.ts')) {
                return 'auth';
              }
              
              // Admin Pages Bundle
              if (id.includes('/pages/admin/')) {
                return 'admin-pages';
              }
              
              // Admin Service
              if (id.includes('/services/admin.service')) {
                return 'admin-service';
              }
              
              // Professor Pages Bundle
              if (id.includes('/pages/professor/')) {
                return 'professor-pages';
              }
              
              // Professor Service
              if (id.includes('/services/professor.service')) {
                return 'professor-service';
              }
              
              // Public Pages Bundle
              if (id.includes('/pages/') && 
                  !id.includes('/pages/admin/') && 
                  !id.includes('/pages/professor/')) {
                return 'public-pages';
              }
              
              // Components
              if (id.includes('/components/')) {
                return 'components';
              }
            }
          }
        },
        chunkSizeWarningLimit: 800
      }
    };
});
