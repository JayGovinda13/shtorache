import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  // Adiciona estilos globais para o body e html
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          overflow: 'hidden', // Remove a rolagem
        },
        html: {
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;