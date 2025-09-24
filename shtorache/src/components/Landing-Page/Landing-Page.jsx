import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'; 
import heroImage from '../../assets/Carlos-Quintero-na-Unsplash.jpg';
import { keyframes } from '@emotion/react';

// Define a animação de zoom sutil
const zoom = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.03) skew(1deg, 1deg) rotate(-1deg);
    
  }
`;

const landingPageContent = {
  title: 'Lucas Shtorache',
};

function LandingPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100dvh', 
        width: '100vw',   
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: `${zoom} 10s infinite alternate`,
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
          color: theme.palette.common.white,
          width: '100%',
          px: { xs: 2, md: 4 },
        }}
      >
        <Typography
          component={Link}
          to="/home"
          variant="h5" // Agora o tamanho padrão será usado
          sx={{
            color: 'inherit',
            textDecoration: 'none', 
            '&:hover': {
              color: 'inherit',
              textDecoration: 'none',
            },
            fontWeight: 'light', // Fonte fina
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