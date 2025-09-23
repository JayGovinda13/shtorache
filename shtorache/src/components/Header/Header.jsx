import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const theme = useTheme();

  // Estado do menu mobile
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  // Estado para o menu de Fotos (usado no desktop e no mobile)
  const [photosAnchorEl, setPhotosAnchorEl] = useState(null);
  const photosOpen = Boolean(photosAnchorEl);

  const handlePhotosClick = (event) => {
    setPhotosAnchorEl(event.currentTarget);
  };

  const handlePhotosClose = () => {
    setPhotosAnchorEl(null);
  };

  // Estado para o menu de Vídeos (usado no desktop e no mobile)
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

        {/* Links de Navegação (Desktop) */}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button
            color="inherit"
            id="photos-button-desktop"
            aria-controls={photosOpen ? 'photos-menu-desktop' : undefined}
            aria-haspopup="true"
            aria-expanded={photosOpen ? 'true' : undefined}
            onClick={handlePhotosClick}
          >
            Fotos
          </Button>

          <Menu
            id="photos-menu-desktop"
            anchorEl={photosAnchorEl}
            open={photosOpen}
            onClose={handlePhotosClose}
            MenuListProps={{
              'aria-labelledby': 'photos-button-desktop',
            }}
          >
            <MenuItem onClick={handlePhotosClose} component={Link} to="/fotos/ensaios">
              Ensaios
            </MenuItem>
            <MenuItem onClick={handlePhotosClose} component={Link} to="/fotos/ao-vivo">
              Ao Vivo
            </MenuItem>
          </Menu>

          <Button
            color="inherit"
            id="videos-button-desktop"
            aria-controls={videosOpen ? 'videos-menu-desktop' : undefined}
            aria-haspopup="true"
            aria-expanded={videosOpen ? 'true' : undefined}
            onClick={handleVideosClick}
          >
            Vídeos
          </Button>

          <Menu
            id="videos-menu-desktop"
            anchorEl={videosAnchorEl}
            open={videosOpen}
            onClose={handleVideosClose}
            MenuListProps={{
              'aria-labelledby': 'videos-button-desktop',
            }}
          >
            <MenuItem onClick={handleVideosClose} component={Link} to="/videos/clipes">
              Clipes
            </MenuItem>
            <MenuItem onClick={handleVideosClose} component={Link} to="/videos/ao-vivo">
              Ao Vivo
            </MenuItem>
          </Menu>

          <Button color="inherit" component={Link} to="/contact">
            Contato
          </Button>
        </Box>

        {/* Menu Hambúrguer (Mobile) */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Menu Principal Mobile */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {/* Botão de navegação para Contato */}
        <MenuItem onClick={handleMobileMenuClose} component={Link} to="/contact">
            Contato
        </MenuItem>
        
        {/* Botão para abrir o sub-menu de Fotos */}
        <MenuItem
            id="photos-button-mobile"
            aria-controls={photosOpen ? 'photos-menu-mobile' : undefined}
            aria-haspopup="true"
            aria-expanded={photosOpen ? 'true' : undefined}
            onClick={handlePhotosClick}
        >
            Fotos
        </MenuItem>

        {/* Sub-menu de Fotos (Mobile) */}
        <Menu
            id="photos-menu-mobile"
            anchorEl={photosAnchorEl}
            open={photosOpen}
            onClose={handlePhotosClose}
            MenuListProps={{ 'aria-labelledby': 'photos-button-mobile' }}
        >
            <MenuItem onClick={handlePhotosClose} component={Link} to="/fotos/ensaios">
                Ensaios
            </MenuItem>
            <MenuItem onClick={handlePhotosClose} component={Link} to="/fotos/ao-vivo">
                Ao Vivo
            </MenuItem>
        </Menu>

        {/* Botão para abrir o sub-menu de Vídeos */}
        <MenuItem
            id="videos-button-mobile"
            aria-controls={videosOpen ? 'videos-menu-mobile' : undefined}
            aria-haspopup="true"
            aria-expanded={videosOpen ? 'true' : undefined}
            onClick={handleVideosClick}
        >
            Vídeos
        </MenuItem>
        
        {/* Sub-menu de Vídeos (Mobile) */}
        <Menu
            id="videos-menu-mobile"
            anchorEl={videosAnchorEl}
            open={videosOpen}
            onClose={handleVideosClose}
            MenuListProps={{ 'aria-labelledby': 'videos-button-mobile' }}
        >
            <MenuItem onClick={handleVideosClose} component={Link} to="/videos/clipes">
                Clipes
            </MenuItem>
            <MenuItem onClick={handleVideosClose} component={Link} to="/videos/ao-vivo">
                Ao Vivo
            </MenuItem>
        </Menu>
      </Menu>
    </AppBar>
  );
}

export default Header;