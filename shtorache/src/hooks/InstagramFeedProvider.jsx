import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FeedContext } from './useInstagramFeed';
import { site } from '../config';

// Lê largura/altura reais da imagem (a API do Instagram não informa dimensões).
function measure(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve({ width: 4, height: 5 });
    img.src = src;
  });
}

async function fetchPage(after) {
  const url = new URL(site.feedEndpoint, window.location.origin);
  if (after) url.searchParams.set('after', after);
  const res = await fetch(url);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
  const raw = body.items ?? [];
  const sizes = await Promise.all(raw.map((p) => measure(p.thumb)));
  return { items: raw.map((p, i) => ({ ...p, ...sizes[i] })), next: body.next ?? null };
}

// Feed paginado compartilhado entre as páginas: carrega a 1ª página e expõe
// `loadMore()` para o scroll infinito.
export function InstagramFeedProvider({ children }) {
  const [state, setState] = useState({
    status: 'loading', // loading | ready | error
    items: [],
    hasMore: true,
    loadingMore: false,
    error: null,
  });
  const cursor = useRef(null);
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setState((s) => ({ ...s, loadingMore: s.status === 'ready' }));
    try {
      const page = await fetchPage(cursor.current);
      cursor.current = page.next;
      setState((s) => {
        const seen = new Set(s.items.map((p) => p.id));
        return {
          status: 'ready',
          items: [...s.items, ...page.items.filter((p) => !seen.has(p.id))],
          hasMore: Boolean(page.next),
          loadingMore: false,
          error: null,
        };
      });
    } catch (error) {
      setState((s) =>
        s.status === 'ready'
          ? { ...s, loadingMore: false, hasMore: false, error: error.message }
          : { ...s, status: 'error', loadingMore: false, hasMore: false, error: error.message },
      );
    } finally {
      busy.current = false;
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const loadMore = useCallback(() => {
    if (state.status === 'ready' && state.hasMore) load();
  }, [load, state.status, state.hasMore]);

  const value = useMemo(() => ({ ...state, loadMore }), [state, loadMore]);
  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}
