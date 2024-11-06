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

const events = [
  {id :1, title: 'Event 1', description: 'coffee1', image:coffee},
  {id :2, title: 'Event 2', description: 'coffee2', image:coffee },
  {id :3, title: 'Event 3', description: 'aaaa', image:coffee },
  {id :4, title: 'Event 4', description: 'aaaa', image:coffee },
  {id :5, title: 'Event 5', description: 'aaaa', image:coffee },
  {id :6, title: 'Event 6', description: 'aaaa', image:coffee },
  {id :7, title: 'Event 7', description: 'aaaa', image:coffee },
  {id :8, title: 'Event 8', description: 'aaaa', image:coffee },
  {id :9, title: 'Event 9', description: 'aaaa', image:coffee },
  {id :10, title: 'Event 10', description: 'aaaa', image:coffee},
  {id :11, title: 'Event 11', description: 'aaaa', image:coffee},
  {id :12, title: 'Event 12', description: 'aaaa', image:coffee},
]

export default function ImgMediaCard() {
  const navigate = useNavigate();

  return (
    //cards for advertisement, picture and button
    <Container style={{ maxWidth:'100%', margin: 'auto auto' }}>
      <Button variant="text" onClick={() => navigate('/Menu')}>Come Back Main Menu</Button>
      <Grid container spacing={0} >
      { events.map((event) => (
        <Grid display="flex" item xs={12} sm={3} md={3} key = {event.id} justifyContent="center" alignItems="center" >
          <Card sx={{maxWidth:"70%", mt:2}}>
            <CardMedia 
              component="img"
              alt={event.title}
              height="204"
              image={event.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color='#5d4037' textAlign="center">
                  {event.title}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary', }}>
                {event.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small"  onClick={() => navigate('/Discounts')}>Buy</Button>
            </CardActions>
            </Card>
          </Grid>
      ))}
    </Grid>
   </Container>
  );
}
