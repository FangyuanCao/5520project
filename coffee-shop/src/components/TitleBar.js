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
import Popover from '@mui/material/Popover';

const pages = ['Menu', 'About us', 'More'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
          <Button color="white" onClick={() => navigate('/AboutUs')} >About Us</Button>
          <Button color="white" onClick={() => navigate('/More')} >More</Button>
          </Box>
          <Button color="white" onClick={() => navigate('/login')} >Login</Button>
          <Button aria-describedby={id} variant="contained" color="white" onClick={handleClick}>
            Shopping Cart
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;