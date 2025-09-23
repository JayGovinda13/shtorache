import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // 1. Paleta de cores do site
  palette: {
    mode: 'dark', // Define o modo escuro
    primary: {
      main: '#9e9e9e', // Cor principal: um cinza médio
      light: '#cfd8dc',
      dark: '#424242',
    },
    secondary: {
      main: '#607d8b', // Uma cor secundária para destaque
    },
    background: {
      default: '#121212', // Cor de fundo do corpo da página
      paper: '#1e1e1e', // Cor para componentes como Card, etc.
    },
  },

  // 2. Estilos de tipografia (fonte e peso)
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightLight: 300,  // Define o peso da fonte 'light' (fina)
    fontWeightRegular: 400, // Peso regular
    fontWeightMedium: 500, // Peso médio
    fontWeightBold: 700,   // Peso negrito
    h1: {
      fontWeight: 300, // Aplica o peso fino ao h1 por padrão
    },
    h4: {
      fontWeight: 300, // Aplica o peso fino ao h4 por padrão
    },
  },

  // 3. Estilos globais
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: 'hidden',
          backgroundColor: '#121212', // O background do body é definido aqui
        },
        html: {
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;