import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // Exponer el servidor en todas las interfaces
    port: 8080,       // Establecer el puerto a 8080
    strictPort: true, // Si el puerto está ocupado, no cambiará automáticamente
  },
});
