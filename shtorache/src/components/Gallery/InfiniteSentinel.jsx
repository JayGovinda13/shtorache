import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

// Marcador no fim da lista: quando entra na tela, pede a próxima página.
// O observer é recriado a cada mudança de `count`, então se a página nova
// não encher a tela (ex.: filtro só de vídeos) ele dispara de novo.
function InfiniteSentinel({ onLoadMore, hasMore, loading, count }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasMore || loading) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && onLoadMore(), {
      rootMargin: '0px 0px 800px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, [onLoadMore, hasMore, loading, count]);

  return (
    <Box ref={ref} sx={{ py: 6, textAlign: 'center', minHeight: 1 }}>
      {loading && (
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
          carregando…
        </Typography>
      )}
      {!hasMore && count > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
          —
        </Typography>
      )}
    </Box>
  );
}

export default InfiniteSentinel;
