// Busca o feed do Instagram (Instagram API com Instagram Login / Graph API).
// Roda apenas no servidor: o token NUNCA vai para o navegador.
// Usado pela função serverless em /api/instagram.js e pelo middleware de dev do Vite.

const GRAPH = 'https://graph.instagram.com';
const FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
  'children{id,media_type,media_url,thumbnail_url}',
].join(',');

function normalize(item) {
  const children = item.children?.data ?? [];
  const slides = (children.length ? children : [item])
    .filter((m) => m.media_url)
    .map((m) => ({
      id: m.id,
      type: m.media_type === 'VIDEO' ? 'video' : 'image',
      src: m.media_url,
      poster: m.thumbnail_url ?? null,
    }));

  const cover = slides[0];
  const allVideo = slides.length > 0 && slides.every((s) => s.type === 'video');

  return {
    id: item.id,
    kind: allVideo ? 'video' : 'photo',
    caption: item.caption ?? '',
    permalink: item.permalink,
    timestamp: item.timestamp,
    thumb: cover?.type === 'video' ? cover.poster ?? item.thumbnail_url : cover?.src,
    slides,
  };
}

export async function fetchInstagramFeed({ token, limit = 60 } = {}) {
  if (!token) {
    const err = new Error('INSTAGRAM_ACCESS_TOKEN não configurado');
    err.status = 503;
    throw err;
  }

  const items = [];
  let url = `${GRAPH}/me/media?fields=${encodeURIComponent(FIELDS)}&limit=${Math.min(limit, 50)}&access_token=${encodeURIComponent(token)}`;

  while (url && items.length < limit) {
    const res = await fetch(url);
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.error) {
      const err = new Error(body.error?.message ?? `Instagram respondeu ${res.status}`);
      err.status = 502;
      throw err;
    }
    items.push(...(body.data ?? []));
    url = body.paging?.next ?? null;
  }

  return items
    .slice(0, limit)
    .map(normalize)
    .filter((p) => p.thumb && p.slides.length);
}

// Handler no formato Node (req, res) — compatível com Vercel e com o middleware do Vite.
export async function instagramHandler(req, res, env = process.env) {
  try {
    const items = await fetchInstagramFeed({
      token: env.INSTAGRAM_ACCESS_TOKEN,
      limit: Number(env.INSTAGRAM_LIMIT) || 60,
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // As URLs de mídia do Instagram expiram; cache curto na CDN.
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.end(JSON.stringify({ items }));
  } catch (err) {
    res.statusCode = err.status ?? 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ items: [], error: err.message }));
  }
}
