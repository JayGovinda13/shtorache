import { useEffect } from 'react';
import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Gallery from '../components/Gallery/Gallery';
import FeedList from '../components/Gallery/FeedList';
import InfiniteSentinel from '../components/Gallery/InfiniteSentinel';
import { useInstagramFeed } from '../hooks/useInstagramFeed';
import { site } from '../config';

const copy = {
  all: { title: 'Trabalho', empty: 'Nada publicado ainda.' },
  photo: { title: 'Fotos', empty: 'Nenhuma foto por aqui ainda.' },
  video: { title: 'Vídeos', empty: 'Nenhum vídeo por aqui ainda.' },
};

function PageShell({ title, count, children }) {
  return (
    <Box sx={{ pt: { xs: 12, sm: 16 }, pb: 10, px: { xs: 0, sm: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 0 },
          mb: { xs: 4, sm: 6 },
        }}
      >
        <Typography
          component="h1"
          sx={{ fontSize: { xs: '1.6rem', sm: '2.4rem' }, fontWeight: 300, letterSpacing: '0.04em' }}
        >
          {title}
        </Typography>
        {count != null && (
          <Typography variant="caption" color="text.secondary">
            {String(count).padStart(2, '0')}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  );
}

function Loading() {
  const heights = [320, 220, 280, 360, 240, 300, 260, 340];
  return (
    <Box sx={{ columnCount: { xs: 1, sm: 3, lg: 4 }, columnGap: '10px' }}>
      {heights.map((h, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          animation="wave"
          height={h}
          sx={{ mb: { xs: 5, sm: '10px' }, bgcolor: '#141414', breakInside: 'avoid' }}
        />
      ))}
    </Box>
  );
}

function Message({ children }) {
  return (
    <Box sx={{ py: 10, px: { xs: 2, sm: 0 }, maxWidth: 520 }}>
      <Typography sx={{ color: 'text.secondary', fontWeight: 300, lineHeight: 1.8 }}>{children}</Typography>
      <Typography
        component="a"
        href={site.instagram.url}
        target="_blank"
        rel="noreferrer"
        variant="caption"
        sx={{ display: 'inline-block', mt: 3, textDecoration: 'none', borderBottom: '1px solid', pb: 0.5 }}
      >
        Ver tudo em @{site.instagram.handle} ↗
      </Typography>
    </Box>
  );
}

function GalleryPage({ filter }) {
  const { status, items, hasMore, loadingMore, loadMore } = useInstagramFeed();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { title, empty } = copy[filter];
  const filtered = filter === 'all' ? items : items.filter((p) => p.kind === filter);

  useEffect(() => {
    document.title = `${title} — ${site.name}`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <PageShell title={title} count={status === 'ready' && !hasMore ? filtered.length : null}>
      {status === 'loading' && <Loading />}
      {status === 'error' && (
        <Message>O feed do Instagram não pôde ser carregado agora. O trabalho completo está no perfil.</Message>
      )}
      {status === 'ready' && filtered.length === 0 && !hasMore && <Message>{empty}</Message>}
      {status === 'ready' && filtered.length > 0 &&
        (isMobile ? <FeedList items={filtered} /> : <Gallery items={filtered} />)}
      {status === 'ready' && (
        <InfiniteSentinel
          onLoadMore={loadMore}
          hasMore={hasMore}
          loading={loadingMore}
          count={filtered.length}
        />
      )}
    </PageShell>
  );
}

export default GalleryPage;
