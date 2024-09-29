import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { autocompleteClasses } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
export default function LoginGrid() {
  const navigate = useNavigate();

  return (
    <Container maxWidth={false} style={{maxWidth: '600px',alignItems: 'center', justifyContent:"center" }}>
    <Box sx={{display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '80vh'}}>
      <Grid container spacing={2}>
      <Grid size={12} >
        <Typography 
        gutterBottom variant="h3" 
        component="div" 
        onClick={() => navigate('/')}
        sx={{
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: '#5d4037',
          justifyContent: "center"
        }}
        >
          Coffee shop
        </Typography>
        </Grid>
        <Grid size={6}>
            <Typography
            gutterBottom variant="h5" 
            component="div" 
            onClick={() => navigate('/login')}
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.3rem',
              color: '#5d4037',
              justifyContent: "center"
            }}
            >
              SIGN IN
            </Typography>
        </Grid>
        <Grid size={6}>
        <Typography
            gutterBottom variant="h5" 
            component="div" 
            onClick={() => navigate('/SignUp')}
            sx={{
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '.3rem',
              color: '#5d4037',
              justifyContent: "center"
            }}
            >
              SIGN UP
            </Typography>
        </Grid>
        <Grid size={12}>
          <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
               id="outlined-required"
               label="Account Name" 
               variant="outlined" 
               />
          </Box>
        </Grid>
        <Grid size={12}>
        <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
               id="outlined-required"
               label="Email Adress" 
               variant="outlined" 
               />
          </Box>
        </Grid>
        <Grid size={12}>
        <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
               id="outlined-required"
               label="PassWord" 
               variant="outlined" 
               />
          </Box>
        </Grid>
        <Grid size={12}>
        <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
               id="outlined-required"
               label="Confirm New Password" 
               variant="outlined" 
               />
          </Box>
        </Grid>
        <Grid size={12}   container justifyContent ='center'>
          <Box
          >
            <Button variant="contained" sx={{width:400, height: 50,  color: '#5d4037', fontSize: "30px"}}>Create Account</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}