// Função serverless (Vercel): GET /api/instagram
// Configure INSTAGRAM_ACCESS_TOKEN nas variáveis de ambiente do projeto.
import { instagramHandler } from '../server/instagram.js';

export default function handler(req, res) {
  return instagramHandler(req, res);
}
