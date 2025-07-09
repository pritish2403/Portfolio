import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If 'lovable-tagger' is causing issues and you're not using it, remove this line
// import { lovableTagger } from 'lovable-tagger';

export default defineConfig(({ mode }: { mode: string }) => {
  return {
    plugins: [
      react(),
      // lovableTagger(), // remove this if you don’t need it
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
