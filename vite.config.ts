import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/magenta/index.ts'), // Entry point for your library
      name: 'magenta', // Global name for the library
      fileName: (format) => `magenta.${format}.js`, // Output file name
    },
    rollupOptions: {
      external: [], // Add dependencies to exclude them from the bundle
      output: {
        globals: {}, // Define global variables for external dependencies
      },
    },
  },
});
