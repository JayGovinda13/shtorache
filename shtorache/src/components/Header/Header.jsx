import { useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site } from '../../config';

const links = [
  { to: '/trabalho', label: 'Tudo' },
  { to: '/fotos', label: 'Fotos' },
  { to: '/videos', label: 'Vídeos' },
  { to: '/contato', label: 'Contato' },
];

const linkSx = {
  fontSize: '0.72rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  color: 'text.secondary',
  transition: 'color .3s ease',
  '&:hover, &.active': { color: 'text.primary' },
};

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        height: 64,
        px: { xs: 2, sm: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: scrolled || open ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: '1px solid',
        borderColor: scrolled && !open ? 'divider' : 'transparent',
        transition: 'background-color .4s ease, border-color .4s ease',
      }}
    >
      <Typography
        component={Link}
        to="/"
        sx={{
          fontSize: '0.8rem',
          fontWeight: 400,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: 'text.primary',
        }}
      >
        {site.shortName}
      </Typography>

      {/* Desktop */}
      <Box component="nav" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 4, alignItems: 'center' }}>
        {links.map((l) => (
          <Box key={l.to} component={NavLink} to={l.to} sx={linkSx}>
            {l.label}
          </Box>
        ))}
        <Box component="a" href={site.instagram.url} target="_blank" rel="noreferrer" sx={linkSx}>
          Instagram ↗
        </Box>
      </Box>

      {/* Mobile */}
      <IconButton
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        sx={{ display: { xs: 'inline-flex', sm: 'none' }, mr: -1, color: 'text.primary' }}
      >
        <Box sx={{ width: 22, height: 10, position: 'relative' }}>
          {[0, 1].map((i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '1px',
                bgcolor: 'currentColor',
                top: open ? 5 : i * 9,
                transform: open ? `rotate(${i ? -45 : 45}deg)` : 'none',
                transition: 'all .3s ease',
              }}
            />
          ))}
        </Box>
      </IconButton>

      <Box
        component="nav"
        aria-hidden={!open}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'rgba(10,10,10,0.97)',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 4,
          gap: 3,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .35s ease',
        }}
      >
        {links.map((l) => (
          <Box
            key={l.to}
            component={NavLink}
            to={l.to}
            tabIndex={open ? 0 : -1}
            sx={{ ...linkSx, fontSize: '1.6rem', fontWeight: 300, letterSpacing: '0.12em' }}
          >
            {l.label}
          </Box>
        ))}
        <Box
          component="a"
          href={site.instagram.url}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          sx={{ ...linkSx, mt: 4, fontFamily: (t) => t.mono, letterSpacing: '0.08em' }}
        >
          @{site.instagram.handle} ↗
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
