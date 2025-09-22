import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import heroImage from '../../assets/Carlos-Quintero-na-Unsplash.jpg';

const landingPageContent = {
  title: 'Lucas Shtorache',
};

function LandingPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100dvh', 
        minHeight: '-webkit-fill-available', 
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
          component="a"
          href='https://www.google.com'
          variant="h1"
  sx={{
    color: 'white', // Defina a cor do seu texto aqui
    textDecoration: 'none', // Remove o sublinhado
    
    // Esta parte garante que a cor e o sublinhado NÃO mudem ao passar o mouse
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
    },

    // Estilos de texto
    fontWeight: 400,
    mb: 4,
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
    fontSize: { xs: '1.2rem', md: '1.5rem' },
  }}
        >
          {landingPageContent.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;