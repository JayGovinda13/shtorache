import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { site } from '../config';

function Row({ label, href, children }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '160px 1fr' },
        gap: { xs: 0.5, sm: 4 },
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
        {label}
      </Typography>
      <Typography
        component="a"
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        sx={{
          fontSize: { xs: '1.2rem', sm: '1.6rem' },
          fontWeight: 300,
          textDecoration: 'none',
          width: 'fit-content',
          backgroundImage: 'linear-gradient(currentColor, currentColor)',
          backgroundSize: '0% 1px',
          backgroundPosition: '0 100%',
          backgroundRepeat: 'no-repeat',
          transition: 'background-size .4s ease',
          '&:hover': { backgroundSize: '100% 1px' },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

function ContactPage() {
  useEffect(() => {
    document.title = `Contato — ${site.name}`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ pt: { xs: 12, sm: 16 }, pb: 12, px: { xs: 2, sm: 4 }, maxWidth: 960 }}>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: '1.6rem', sm: '2.4rem' }, fontWeight: 300, letterSpacing: '0.04em', mb: 6 }}
      >
        Contato
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.4rem' },
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'text.secondary',
          maxWidth: 640,
          mb: 8,
        }}
      >
        {site.bio} Para coberturas de shows, turnês, ensaios e clipes, fale direto comigo.
      </Typography>

      <Row label="Instagram" href={site.instagram.url}>
        @{site.instagram.handle} ↗
      </Row>
      {site.email && (
        <Row label="E-mail" href={`mailto:${site.email}`}>
          {site.email}
        </Row>
      )}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />
    </Box>
  );
}

export default ContactPage;
