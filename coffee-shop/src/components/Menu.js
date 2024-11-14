import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box } from '@mui/material';

// 定义类别
const categories = ["beverage", "food", "special"];

const Menu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // 跳转到SubMenu并传递类别参数
    navigate(`/SubMenu/${category}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container direction="column" alignItems="center" spacing={1}>
        <Box sx={{
          width: "100%",
          height: 80,
          bgcolor: 'primary.second',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}>
          <Typography variant="h3" color='#5d4037' textAlign="center">
            Categories
          </Typography>
        </Box>
      </Grid>

      {categories.map((category, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: "#fff",
              cursor: 'pointer'
            }}
            onClick={() => handleCategoryClick(category)}
          >
            <Typography variant="h5" textAlign="center">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Menu;
