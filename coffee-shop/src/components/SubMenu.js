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
// import allImages from './picture/all';
// import foodImages from './picture/food';
// import specialImages from './picture/specials';

const SubMenu = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [allImages, setAllImage] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  // console.log(category);
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



    const importAllImages = (requireContext) => {
      const images = {};
      requireContext.keys().forEach((key) => {
        const imageName = key.replace('./', ''); // Remove './' from file name
        images[imageName] = requireContext(key);
      });
      return images;
    };
    
    const allImages = importAllImages(require.context('./picture/all', false, /\.(png|jpe?g|svg)$/));
    setAllImage(allImages);
    console.log(allImages);
      
  }, [category]);
  useEffect(() => {
    if (selectedProduct) {
      const defaultSize = selectedProduct.selectedSize || (selectedProduct.options && selectedProduct.options.length > 0 ? selectedProduct.options[0] : 'S');
      setSelectedSize(defaultSize);
      setQuantity(selectedProduct.quantity || 1);
      const sizeIndex = selectedProduct.options.indexOf(defaultSize);
      if (sizeIndex !== -1) {
        setPrice(selectedProduct.price[sizeIndex] * (selectedProduct.quantity || 1));
      }
    }
  }, [selectedProduct]);

  if (!localStorage.getItem('shoppingCart')) {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
  }

  const handleOpenDialog = (product) => {
    console.log(product);
    setSelectedProduct(product);
    setSelectedSize(product.options && product.options.length > 0 ? product.options[0] : 'S');
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
      setPrice(selectedProduct.price[sizeIndex] * quantity);
    }
  };
  const handleQuantityChange = (event) => {
    //const qty = event.target.value;
    const qty = Math.max(1, event.target.value);
    setQuantity(qty);

    const sizeIndex = selectedProduct.options.indexOf(selectedSize);
    if (sizeIndex !== -1) {
      setPrice(selectedProduct.price[sizeIndex] * qty);
    }
  };

  if (!localStorage.getItem('shoppingCart')) {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
  }
  const addToCart = (product) => {
    console.log(selectedProduct);
    console.log(localStorage.getItem('shoppingCart'));

    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    const productWithPrice = {
      ...product,
      selectedSize,
      price,
      quantity
    };
    delete productWithPrice.options;
    cart.push(productWithPrice);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    window.location.reload();
    

  };

  return (
    <Container sx={{ maxWidth: '100%', Height:'100%', margin: 'auto auto', mt: 4 }}>
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
                image={
                  allImages[`${product.name}.png`]
                  ? allImages[`${product.name}.png`]
                  : allImages[`${product.name}.jpg`]
                  ? allImages[`${product.name}.jpg`]
                  : coffeeImage
                }
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
                <MenuItem key={index} value={option} onClick={handleSizeChange}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              label="Quantity"
              fullWidth
              margin="dense"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Price: ${price}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" color="primary"  onClick={() => addToCart(selectedProduct)}>Add to Cart</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default SubMenu;
