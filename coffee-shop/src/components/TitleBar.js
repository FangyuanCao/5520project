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
import{useEffect,useState } from 'react'
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import { ListItem } from '@mui/material';
import ApiUtil from '../Utils/ApiUtil';

function TitleBar({addToCart}) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cartItems, setCartItems] = React.useState([]);
  const [username, setUsername] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    setCartItems(cart);
  
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
  }
  }, []);
    
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = (username) => {
    navigate('/login'); 
  };
  const handleHistory = (username) => {
    navigate('/Transfer'); 
  };
  
  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/login');
  };

  const removeItem = (idx) => {
    const updatedCartItems = cartItems.filter((item,index) => index !== idx);
    setCartItems(updatedCartItems);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems));
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  // add place order function
  const placeOrder = async ()=>{
    const token = localStorage.getItem('token');
    const cart = JSON.parse(localStorage.getItem('shoppingCart'));
           localStorage.removeItem('shoppingCart');
           

    if (!token){
      alert("Please login!");
      return ;
    }

    if (cart && cart.length > 0) {
      // // Print each item in the shopping cart
      // cart.forEach((item, index) => {
      //   console.log(`Item ${index + 1}:`, item);
      // });
      try{
        const response = await fetch(ApiUtil.API_CUSTOMER_PURCHASING, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({
              'products':cart,
              'subtotal':totalPrice,
          }),
        });
        const data = await response.json();
        if (data) {
          console.log(data);
          //navigate('/Transfer');
          window.location.href = data.url; //'https://www.google.com';
          localStorage.removeItem('shoppingCart');
          
          // setCartItems([]);
        } else {
          
          console.error('Login failed:', data.status);
        }
        console.log(data);

        
      } catch (error) {
        console.error(' error', error);
      }
    } else {
      console.log('Shopping cart is empty!');
    }
  };

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
          {username ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                onClick={handleOpenUserMenu}
                sx={{ color: 'white' }}
              >
                Hello, {username}
              </Button>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={handleHistory}>History</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button color="white" onClick={handleLogin}>Login</Button>
          )}
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
                            cartItems.map((item,index) => (
                            <Box key={index+item.id+item.name+item.selectedSize} display="flex" justifyContent="space-between" alignItems="center"  style={{border:'1px solid #ccc',padding:'10px',margin:'10px 0',backgroundColor : '#a1887f'}}>
                            <Typography>{item.name}</Typography>
                            <Typography>size:{item.selectedSize}</Typography>
                            <Typography>${item.price}</Typography>
                            <Typography>quantity:{item.quantity}</Typography>
                            <Button variant="text" color="black"  onClick={() => removeItem(index)}>Remove</Button>
                            <Divider />
                            </Box>
                            
                              ))
                             ) : (
                               <Typography>No items in cart</Typography>
                             )}
                            
                           
                          </Box>
                        
            </Box>
            <Typography sx={{ p: 2, fontSize:"25px" }}>Total: ${totalPrice}</Typography>
            <Button variant="contained" sx={{width:400, height: 50,  color: '#5d4037', fontSize: "30px"}} onClick={() => placeOrder()}>Checkout</Button>
          </Popover>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TitleBar;