import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

function Header() {
  const theme = useTheme();

  // Estado para o menu de Fotos
  const [photosAnchorEl, setPhotosAnchorEl] = useState(null);
  const photosOpen = Boolean(photosAnchorEl);

  const handlePhotosClick = (event) => {
    setPhotosAnchorEl(event.currentTarget);
  };
  const handlePhotosClose = () => {
    setPhotosAnchorEl(null);
  };

  // Estado para o menu de Vídeos
  const [videosAnchorEl, setVideosAnchorEl] = useState(null);
  const videosOpen = Boolean(videosAnchorEl);

  const handleVideosClick = (event) => {
    setVideosAnchorEl(event.currentTarget);
  };
  const handleVideosClose = () => {
    setVideosAnchorEl(null);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 'none' }}
    >
      <Toolbar>
        {/* Lado Esquerdo: Título do Site */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: 'light',
          }}
        >
          Lucas Shtorache
        </Typography>

        {/* Lado Direito: Links de Navegação */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {/* Botão do menu de Fotos */}
          <Button
            color="inherit"
            id="photos-button"
            aria-controls={photosOpen ? 'photos-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={photosOpen ? 'true' : undefined}
            onClick={handlePhotosClick}
          >
            Fotos
          </Button>

          {/* Menu de Subdivisões de Fotos */}
          <Menu
            id="photos-menu"
            anchorEl={photosAnchorEl}
            open={photosOpen}
            onClose={handlePhotosClose}
            MenuListProps={{
              'aria-labelledby': 'photos-button',
            }}
          >
            <MenuItem onClick={handlePhotosClose} component={Link} to="/fotos/ensaios">
              Ensaios
            </MenuItem>
            <MenuItem onClick={handlePhotosClose} component={Link} to="/fotos/ao-vivo">
              Ao Vivo
            </MenuItem>
          </Menu>

          {/* Botão do menu de Vídeos */}
          <Button
            color="inherit"
            id="videos-button"
            aria-controls={videosOpen ? 'videos-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={videosOpen ? 'true' : undefined}
            onClick={handleVideosClick}
          >
            Vídeos
          </Button>

          {/* Menu de Subdivisões de Vídeos */}
          <Menu
            id="videos-menu"
            anchorEl={videosAnchorEl}
            open={videosOpen}
            onClose={handleVideosClose}
            MenuListProps={{
              'aria-labelledby': 'videos-button',
            }}
          >
            <MenuItem onClick={handleVideosClose} component={Link} to="/videos/clipes">
              Clipes
            </MenuItem>
            <MenuItem onClick={handleVideosClose} component={Link} to="/videos/ao-vivo">
              Ao Vivo
            </MenuItem>
          </Menu>

          {/* Outros links de navegação */}
          <Button color="inherit" component={Link} to="/contact">
            Contato
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;