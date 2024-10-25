import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Specify the output directory if needed
    outDir: 'dist', // This is the default, so you can remove it if you want
  },
  // Optional: Set base to '/' if deploying to the root
  base: '/', // Adjust if deploying in a sub-directory
});
