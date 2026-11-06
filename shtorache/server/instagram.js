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

// Busca UMA página do feed. `after` é o cursor devolvido na página anterior.
export async function fetchInstagramPage({ token, after, limit = 12 } = {}) {
  if (!token) {
    const err = new Error('INSTAGRAM_ACCESS_TOKEN não configurado');
    err.status = 503;
    throw err;
  }

  const params = new URLSearchParams({
    fields: FIELDS,
    limit: String(Math.min(Math.max(limit, 1), 50)),
    access_token: token,
  });
  if (after) params.set('after', after);

  const res = await fetch(`${GRAPH}/me/media?${params}`);
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.error) {
    const err = new Error(body.error?.message ?? `Instagram respondeu ${res.status}`);
    err.status = 502;
    throw err;
  }

  return {
    items: (body.data ?? []).map(normalize).filter((p) => p.thumb && p.slides.length),
    // Só há próxima página quando o Instagram devolve `paging.next`.
    next: body.paging?.next ? body.paging?.cursors?.after ?? null : null,
  };
}

// Handler no formato Node (req, res) — compatível com Vercel e com o middleware do Vite.
// GET /api/instagram?after=<cursor>
export async function instagramHandler(req, res, env = process.env) {
  try {
    const query = new URL(req.url ?? '/', 'http://localhost').searchParams;
    const page = await fetchInstagramPage({
      token: env.INSTAGRAM_ACCESS_TOKEN,
      after: query.get('after') || undefined,
      limit: Number(env.INSTAGRAM_PAGE_SIZE) || 12,
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    // As URLs de mídia do Instagram expiram; cache curto na CDN.
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.end(JSON.stringify(page));
  } catch (err) {
    res.statusCode = err.status ?? 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ items: [], next: null, error: err.message }));
  }
}
