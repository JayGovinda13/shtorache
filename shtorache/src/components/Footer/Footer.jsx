import { Box, Typography } from '@mui/material';
import { site } from '../../config';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        px: { xs: 2, sm: 4 },
        py: 4,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        color: 'text.secondary',
      }}
    >
      <Typography variant="caption">
        © {new Date().getFullYear()} {site.name}
      </Typography>
      <Typography
        variant="caption"
        component="a"
        href={site.instagram.url}
        target="_blank"
        rel="noreferrer"
        sx={{ textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
      >
        @{site.instagram.handle}
      </Typography>
    </Box>
  );
}

export default Footer;
