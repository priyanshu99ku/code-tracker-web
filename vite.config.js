import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) {
              return 'vendor_recharts';
            }
            if (id.includes('react-icons')) {
                return 'vendor_react-icons';
            }
            return 'vendor'; // all other node_modules
          }
        },
      },
    },
  },
})
