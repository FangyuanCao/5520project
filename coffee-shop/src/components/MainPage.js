import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {useNavigate} from 'react-router-dom';
import ads from './picture/adsPicture.jpg';
import coffee from './picture/coffee.jpg';

export default function ImgMediaCard() {
  const navigate = useNavigate();
  return (
    //cards for advertisement, picture and button
    <Container maxWidth={false} style={{ maxWidth: '1300px', margin: 'auto auto' }}>
    <Grid container spacing = {1} justifyContent={"center"}>
    <Card sx={{width:1220, mt:2}} >
      <CardMedia
        component="img"
        alt="advertisement"
        height="280"
        image={ads}
      />
      </Card>

    </Grid>
    <Grid container spacing={2}  justifyContent="center" >
        <Grid item xs={12} sm={6} md={6}>
    <Card sx={{width:600, mt:2}} >
      <CardMedia
        component="img"
        alt="picture1"
        height="280"
        image={coffee}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          About us
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This is a card describes coffee shop story
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  onClick={() => navigate('/AboutUs')}>Click IT</Button>
      </CardActions>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      <Card sx={{width:600, mt:2}} >
      <CardMedia
        component="img"
        alt="picture1"
        height="280"
        image={coffee}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Order
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This is a card people can order coffee here
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate('/Menu')}>Order here</Button>
      </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{width:600}} >
      <CardMedia
        component="img"
        alt="picture1"
        height="280"
        image={coffee}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sign up
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This is a card people can sign up account here
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate('/SignUp')}>Sign Up</Button>
      </CardActions>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{width:600}} >
      <CardMedia
        component="img"
        alt="picture1"
        height="280"
        image={coffee}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Rewards
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This is a card display special rewards
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate('/Discount')}>CLICK It</Button>
      </CardActions>
      </Card>
    </Grid>
    </Grid>
   </Container>

    
  );
}
