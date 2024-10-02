import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import coffee from './picture/coffee.jpg';


export default function RowAndColumnSpacing() {
  return (
<Box sx={{ width: '100%', height: '100%',mt:5,px:10}}> {/* 设置 Box 高度为全屏 */}
  <Grid container>
    <Grid item xs={6}> {/* 左侧占据屏幕的一半 */}
      <Box sx={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color='#5d4037' textAlign="left" >


        Welcome to [Coffee Shop Name]!

At [Coffee Shop Name], we believe every cup of coffee tells a story. Established in [Year] by [Founder’s Name], our mission is to serve high-quality coffee in a warm and inviting atmosphere.

We carefully select premium coffee beans from around the world, using both traditional and modern brewing methods to ensure each cup is exceptional.

Join us for a quiet moment or a lively chat with friends, and don’t miss our regular events and workshops. We’re excited to share our passion for coffee with you
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={6}> {/* 右侧占据屏幕的另一半 */}

    <Card sx={{width:"60%",mt:5,px:5}} >
      <CardMedia
        component="img"
        alt="advertisement"
        height="360"
        image={coffee}
      />
      </Card>

    </Grid>
  </Grid>
</Box>
  );
}