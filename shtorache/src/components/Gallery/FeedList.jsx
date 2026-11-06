import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

const dateFmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

// Vídeo que só toca enquanto está visível na tela. Toque liga/desliga o som.
function InlineVideo({ src, poster, ratio }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <Box sx={{ position: 'relative', aspectRatio: ratio, bgcolor: '#141414' }}>
      <Box
        component="video"
        ref={ref}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        onClick={() => setMuted((m) => !m)}
        sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          right: 12,
          bottom: 10,
          fontSize: '0.6rem',
          color: '#fff',
          textShadow: '0 1px 6px rgba(0,0,0,.8)',
          pointerEvents: 'none',
        }}
      >
        {muted ? 'SOM OFF' : 'SOM ON'}
      </Typography>
    </Box>
  );
}

function Slide({ slide, ratio, alt }) {
  if (slide.type === 'video') return <InlineVideo src={slide.src} poster={slide.poster} ratio={ratio} />;
  return (
    <Box
      component="img"
      src={slide.src}
      alt={alt}
      loading="lazy"
      decoding="async"
      sx={{
        display: 'block',
        width: '100%',
        aspectRatio: ratio,
        objectFit: 'cover',
        bgcolor: '#141414',
      }}
    />
  );
}

// Carrossel horizontal com snap, como no Instagram.
function Carousel({ slides, ratio, alt }) {
  const [active, setActive] = useState(0);
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / el.clientWidth));
        }}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {slides.map((s) => (
          <Box key={s.id} sx={{ flex: '0 0 100%', scrollSnapAlign: 'start' }}>
            <Slide slide={s} ratio={ratio} alt={alt} />
          </Box>
        ))}
      </Box>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: 10,
          right: 12,
          fontSize: '0.6rem',
          color: '#fff',
          textShadow: '0 1px 6px rgba(0,0,0,.8)',
          pointerEvents: 'none',
        }}
      >
        {active + 1}/{slides.length}
      </Typography>
    </Box>
  );
}

// Lista de coluna única para o celular: mídia de ponta a ponta, uma embaixo da outra.
function FeedList({ items }) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 5 }}>
      {items.map((post) => {
        const ratio = `${post.width} / ${post.height}`;
        const alt = post.caption?.slice(0, 120) || 'Foto de Lucas Shtorache';
        return (
          <Box component="li" key={post.id}>
            {post.slides.length > 1 ? (
              <Carousel slides={post.slides} ratio={ratio} alt={alt} />
            ) : (
              <Slide slide={post.slides[0]} ratio={ratio} alt={alt} />
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                px: 2,
                pt: 1.25,
                color: 'text.secondary',
              }}
            >
              <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
                {post.timestamp ? dateFmt.format(new Date(post.timestamp)) : ''}
              </Typography>
              <Typography
                variant="caption"
                component="a"
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                sx={{ fontSize: '0.65rem', textDecoration: 'none' }}
              >
                Instagram ↗
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default FeedList;
