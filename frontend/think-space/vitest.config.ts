import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'; // Import plugin React

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  plugins: [react()], // Sử dụng plugin React
});
