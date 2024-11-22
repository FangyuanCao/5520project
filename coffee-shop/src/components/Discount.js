import React from 'react';
import { Grid, Box, Typography, Button, Paper } from '@mui/material';
import coffee from "./picture/coffee.jpg";
import {useNavigate} from 'react-router-dom';
import TitleBar from './TitleBar';
const Discount = () => {
  const navigate = useNavigate();
  const rewards = [
    { id: 1,name: 'Free coffee 1', price: 0, image: 'reward1.png' },
    { id: 2,name: 'Free coffee 2', price: 0, image: 'reward2.png' },
    { id: 3,name: 'Free coffee 3', price: 0, image: 'reward3.png' },
  ];
  if (!localStorage.getItem('shoppingCart')) {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
  }
  const addToCart = (reward) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    cart.push(reward);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    window.location.reload();
  };


  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      {/* 上半部分 */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Special Discount Offer!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Enjoy amazing discounts on your favorite items.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/Menu')}>
            Order Now
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
            }}
            alt="Discount Offer"
            src={coffee}
          />
        </Grid>
      </Grid>

      {/* 下半部分：Rewards & Offers */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Rewards & Offers
        </Typography>
        <Grid container spacing={2}>
          {rewards.map((reward) => (
            <Grid item xs={12} sm={4} key={reward.id}>
              <Paper
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: '100%',
                    height: 'auto',
                  }}
                  alt={reward.title}
                  src={coffee}
                />
                <Typography variant="h6" gutterBottom>
                  {reward.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  $ {reward.price}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => addToCart(reward)}>
                  Add to Cart
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Discount;
