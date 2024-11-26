import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, Box } from "@mui/material";
import coffeeImage from "./picture/coffee.jpg"; 


const categories = [
  { name: "beverage", image: coffeeImage },
  { name: "food", image: coffeeImage },
  { name: "special", image: coffeeImage },
];

const Menu = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/SubMenu/${category}`);
  };

  return (

  
    <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height:'86vh' }} >
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
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper
            elevation={4}
            sx={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              borderRadius: 3,
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f0f0",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.8)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            >
              <Box
                sx={{
                  border: "2px solid #fff", 
                  padding: "8px 16px", 
                  borderRadius: "8px",
                  display: "inline-block", 
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Menu;
