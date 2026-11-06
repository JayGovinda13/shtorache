import { createTheme } from '@mui/material/styles';

const mono = '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f2f2f2' },
    text: { primary: '#ededed', secondary: '#8a8a8a' },
    divider: 'rgba(255,255,255,0.12)',
    background: { default: '#0a0a0a', paper: '#0a0a0a' },
  },
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    fontWeightLight: 300,
    h1: { fontWeight: 300, letterSpacing: '0.04em' },
    h2: { fontWeight: 300, letterSpacing: '0.02em' },
    overline: { fontFamily: mono, letterSpacing: '0.2em', lineHeight: 1.6 },
    caption: { fontFamily: mono, letterSpacing: '0.08em' },
  },
  mono,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { backgroundColor: '#0a0a0a' },
        body: {
          backgroundColor: '#0a0a0a',
          WebkitFontSmoothing: 'antialiased',
        },
        '::selection': { background: '#ededed', color: '#0a0a0a' },
        a: { color: 'inherit' },
        // Granulação de filme sobre todo o site.
        'body::after': {
          content: '""',
          position: 'fixed',
          inset: '-50%',
          width: '200%',
          height: '200%',
          pointerEvents: 'none',
          zIndex: 2000,
          opacity: 0.07,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          animation: 'grain 0.9s steps(6) infinite',
        },
        '@keyframes grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-3%, 2%)' },
          '40%': { transform: 'translate(2%, -4%)' },
          '60%': { transform: 'translate(-4%, -1%)' },
          '80%': { transform: 'translate(3%, 3%)' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          'body::after': { animation: 'none' },
        },
      },
    },
  },
});

export default theme;
