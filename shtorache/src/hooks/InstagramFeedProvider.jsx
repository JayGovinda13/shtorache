import { useEffect, useState } from 'react';
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

// Busca o feed uma única vez e compartilha entre as páginas.
export function InstagramFeedProvider({ children }) {
  const [state, setState] = useState({ status: 'loading', items: [], error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(site.feedEndpoint);
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
        const raw = body.items ?? [];
        const sizes = await Promise.all(raw.map((p) => measure(p.thumb)));
        const items = raw.map((p, i) => ({ ...p, ...sizes[i] }));
        if (!cancelled) setState({ status: 'ready', items, error: null });
      } catch (error) {
        if (!cancelled) setState({ status: 'error', items: [], error: error.message });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <FeedContext.Provider value={state}>{children}</FeedContext.Provider>;
}
