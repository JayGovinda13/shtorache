import { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { site } from '../../config';

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(12px); letter-spacing: 0.6em; }
  to   { opacity: 1; transform: translateY(0);    letter-spacing: 0.32em; }
`;

// Barras de cinema (2.39:1) que entram devagar.
const letterbox = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`;

const breathe = keyframes`
  0%, 100% { opacity: 0.35; }
  50%      { opacity: 1; }
`;

// Em telas verticais limita a barra para não esmagar o quadro.
const barHeight = 'max(0px, min(11dvh, calc((100dvh - 100vw / 2.39) / 2)))';

function LandingPage() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.pause();
      return;
    }
    // Alguns navegadores ignoram autoplay até o vídeo estar mudo via propriedade.
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') navigate('/trabalho');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const meta = {
    position: 'absolute',
    zIndex: 3,
    color: 'rgba(255,255,255,0.6)',
    animation: `${fadeIn} 1.6s ease 2.2s both`,
  };

  return (
    <Box
      component="section"
      aria-label={site.name}
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        bgcolor: '#000',
        color: '#fff',
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={site.heroVideo.poster}
        onPlaying={() => setReady(true)}
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1) contrast(1.15) brightness(0.85)',
          opacity: ready ? 1 : 0.6,
          transition: 'opacity 2.4s ease',
          transform: 'scale(1.04)',
        }}
      >
        {site.heroVideo.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </Box>

      {/* Vinheta */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Letterbox */}
      {['top', 'bottom'].map((edge) => (
        <Box
          key={edge}
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            [edge]: 0,
            height: barHeight,
            bgcolor: '#000',
            zIndex: 2,
            transformOrigin: edge,
            animation: `${letterbox} 2.2s cubic-bezier(.7,0,.2,1) 0.4s both`,
          }}
        />
      ))}

      {/* Título */}
      <Box
        component={Link}
        to="/trabalho"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: 300,
            fontSize: { xs: '1.35rem', sm: '2rem', md: '2.6rem' },
            textTransform: 'uppercase',
            letterSpacing: '0.32em',
            mr: '-0.32em', // compensa o tracking para centralizar
            animation: `${rise} 2.4s cubic-bezier(.2,.7,.2,1) 1s both`,
          }}
        >
          {site.name}
        </Typography>
        <Typography
          variant="overline"
          sx={{
            mt: 2,
            color: 'rgba(255,255,255,0.65)',
            fontSize: { xs: '0.6rem', sm: '0.7rem' },
            animation: `${fadeIn} 1.6s ease 2s both`,
          }}
        >
          {site.tagline}
        </Typography>
      </Box>

      {/* Metadados nos cantos, como num slate de filmagem */}
      <Typography
        variant="caption"
        sx={{ ...meta, top: `calc(${barHeight} + 20px)`, left: { xs: 16, sm: 32 } }}
      >
        REC ●
      </Typography>
      <Typography
        variant="caption"
        component="a"
        href={site.instagram.url}
        target="_blank"
        rel="noreferrer"
        sx={{
          ...meta,
          top: `calc(${barHeight} + 20px)`,
          right: { xs: 16, sm: 32 },
          textDecoration: 'none',
          '&:hover': { color: '#fff' },
        }}
      >
        @{site.instagram.handle}
      </Typography>
      <Typography
        variant="overline"
        component={Link}
        to="/trabalho"
        sx={{
          ...meta,
          bottom: `calc(${barHeight} + 20px)`,
          left: '50%',
          transform: 'translateX(-50%)',
          textDecoration: 'none',
          color: '#fff',
          fontSize: '0.65rem',
          animation: `${fadeIn} 1.6s ease 2.6s both, ${breathe} 3.2s ease-in-out 4.2s infinite`,
          '&:hover': { animationPlayState: 'paused', opacity: 1 },
        }}
      >
        Entrar
      </Typography>
    </Box>
  );
}

export default LandingPage;
