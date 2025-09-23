import React from 'react';
import { Box, Typography } from '@mui/material';
import heroImage from '../../assets/Carlos-Quintero-na-Unsplash.jpg';
import { Link } from 'react-router-dom'; 

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
        // Usando 100dvh é o suficiente para a maioria dos casos
        height: '100dvh', 
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
          component={Link}
          to="/home"
          variant="h5"
          sx={{
            color: 'white', 
            textDecoration: 'none', 
            
            '&:hover': {
              color: 'white',
              textDecoration: 'none',
            },

            fontWeight: 'light', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          {landingPageContent.title}
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage;