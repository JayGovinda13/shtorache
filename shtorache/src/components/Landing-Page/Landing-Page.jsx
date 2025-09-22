import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '../../assets/Carlos-Quintero-na-Unsplash.jpg';

const landingPageContent = {
  title: 'Lucas Storache Fotografia',
  subtitle: 'Capturando momentos que duram para sempre.',
  buttonText: 'Shtorache',
};

function LandingPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      />

      <Box
        sx={{
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          width: '100%',
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          variant="h1"
          component="a"
          href="https://www.google.com"
          sx={{
            color: 'white',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
              color: 'white',
            },
            fontWeight: 700,
            mb: 2,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontSize: { xs: '2.5rem', md: '5rem' },
          }}
        >
          {landingPageContent.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;