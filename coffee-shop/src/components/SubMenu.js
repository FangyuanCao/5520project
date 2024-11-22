import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useParams, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const SubMenu = () => {
  const [products, setProducts] = useState([]); // 存储商品数据
  const [selectedProduct, setSelectedProduct] = useState(null); // 当前选中的商品
  const [selectedSize, setSelectedSize] = useState(''); // 当前选中的尺寸
  const [price, setPrice] = useState(0); // 根据尺寸更新的价格
  const { category } = useParams(); // 获取类别参数
  const navigate = useNavigate();

  useEffect(() => {
    // 使用 fetch 从后端获取商品数据
    fetch('http://localhost:5000/fetch_products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: category, // 类别参数，例如 "beverage" 或 "food"
        number: 10      // 可选：限制返回的商品数量
      }),
    })
      .then(response => response.json())
      .then(data => setProducts(data.product_list || []))
      .catch(error => console.error('Error fetching products:', error));
  }, [category]);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product); // 打开对话框并设置当前选中的商品
    setSelectedSize(''); // 清除之前选择的尺寸
    setPrice(0); // 初始化价格为0
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null); // 关闭对话框
  };

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size); // 更新选中的尺寸

    // 根据选中的尺寸设置对应的价格
    const sizeIndex = selectedProduct.options.indexOf(size);
    if (sizeIndex !== -1) {
      setPrice(selectedProduct.price[sizeIndex]);
    }
  };

  if (!localStorage.getItem('shoppingCart')) {
    localStorage.setItem('shoppingCart', JSON.stringify([]));
  }
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart'));
    const productWithPrice = {
      ...product,
      selectedSize,
      price
    };
    delete productWithPrice.options;
    cart.push(productWithPrice);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    window.location.reload();
    

  };

  return (
    <Container style={{ maxWidth: '100%', margin: 'auto auto' }}>
      <Button variant="text" onClick={() => navigate('/Menu')}>Back to Categories</Button>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card 
              sx={{ 
                width: 250, // 固定宽度
                height: 350, // 固定高度
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                cursor: 'pointer',
                textAlign: 'center'
              }}
              onClick={() => handleOpenDialog(product)} // 点击卡片时打开弹窗
            >
              <CardMedia
                component="img"
                alt={product.name}
                style={{ width: '100%', height: 140, objectFit: 'cover' }} // 固定图片高度
                image={product.image || 'default_image.jpg'}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
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

      {/* 弹出框显示商品详情 */}
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
              defaultValue={1}
            />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              Price: ${price} {/* 显示根据尺寸更新的价格 */}
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
