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
import{useEffect} from 'react'
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import { ListItem } from '@mui/material';

function TitleBar({addToCart}) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    setCartItems(cart);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems));
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
          <Button color="white" onClick={() => navigate('/FAQs')} >FAQs</Button>
          </Box>
          <Button color="white" onClick={() => navigate('/login')} >Login</Button>
          <Button aria-describedby={id} variant="text" color="white"  onClick={(event) => setAnchorEl(event.currentTarget)}>
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
            <Box>
                        
                          <Box  
                          sx={{ 
                            borderRadius : 2,
                            width:"95%",
                            ml:"2.5%",
                            mt:"2%" }} >
                             {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                            <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center"  style={{border:'1px solid #ccc',padding:'10px',margin:'10px 0',backgroundColor : '#a1887f'}}>
                            <Typography>{item.title}</Typography>
                            <Typography>{item.description}</Typography>
                            <Button variant="text" color="black">Edit</Button>
                            <Button variant="text" color="black"  onClick={() => removeItem(item.id)}>Remove</Button>
                            <Divider />
                            </Box>
                            
                              ))
                             ) : (
                               <Typography>No items in cart</Typography>
                             )}
                            
                           
                          </Box>
                        
            </Box>
            <Typography sx={{ p: 2, fontSize:"25px" }}>Total:</Typography>
            <Button variant="contained" sx={{width:400, height: 50,  color: '#5d4037', fontSize: "30px"}}>Checkout</Button>
          </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TitleBar;