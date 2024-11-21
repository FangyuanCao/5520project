import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import coffeeImage from './picture/coffee.jpg';

const SubMenu = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [price, setPrice] = useState(0);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/fetch_products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: category,
        number: 10,
      }),
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.product_list || []))
      .catch((error) => console.error('Error fetching products:', error));
  }, [category]);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setPrice(0);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);

    const sizeIndex = selectedProduct.options.indexOf(size);
    if (sizeIndex !== -1) {
      setPrice(selectedProduct.price[sizeIndex]);
    }
  };

  return (
    <Container sx={{ maxWidth: '100%', margin: 'auto auto', mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate('/Menu')} sx={{ mb: 2 }}>
        Back to Categories
      </Button>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          color: '#5d4037',
        }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                width: '100%',
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 4,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => handleOpenDialog(product)}
            >
              <CardMedia
                component="img"
                alt={product.name}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                image={coffeeImage}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.type}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedProduct && (
        <Dialog open={Boolean(selectedProduct)} onClose={handleCloseDialog}>
          <DialogTitle>{selectedProduct.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{selectedProduct.type}</Typography>
            <TextField
              select
              label="Size"
              fullWidth
              margin="dense"
              value={selectedSize}
              onChange={handleSizeChange}
              helperText="Please select your size"
            >
              {selectedProduct.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              label="Quantity"
              fullWidth
              margin="dense"
              defaultValue={1}
            />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Price: ${price}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default SubMenu;
