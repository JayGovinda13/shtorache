import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { instagramHandler } from './server/instagram.js';

// Em desenvolvimento, serve /api/instagram pelo próprio Vite
// lendo INSTAGRAM_ACCESS_TOKEN do arquivo .env.local.
function instagramDevApi(env) {
  return {
    name: 'instagram-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/instagram', (req, res) => instagramHandler(req, res, env));
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/instagram', (req, res) => instagramHandler(req, res, env));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  return {
    plugins: [react(), instagramDevApi(env)],
  };
});
