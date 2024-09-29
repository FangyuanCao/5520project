import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';

const pages = ['Menu', 'About us', 'More'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();

    const handleClick = () => {
      navigate('/');}

  return (
    //title 
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="./"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#5d4037',
              textDecoration: 'none',
            }}
          >
            COFFEE SHOP
          </Typography>
          <Box sx={{ flexGrow: 1, my: 2, color: '#5d4037', display: { xs: 'none', md: 'flex' } }}>
          <Button color="white" onClick={() => navigate('/Menu')} >Menu</Button>
          <Button color="white" onClick={() => navigate('/AboutUs')} >AboutUs</Button>
          <Button color="white" onClick={() => navigate('/More')} >More</Button>
          </Box>
          <Button color="white" onClick={() => navigate('/login')} >Login</Button>
          <Button color="white">Shopping Cart</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;