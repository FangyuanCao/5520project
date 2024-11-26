import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import ApiUtil from '../../Utils/ApiUtil'
import Alert from '@mui/material/Alert';

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
export default function  Login() {
  const navigate = useNavigate();
  const token = 'test_toke_1234'; 
  const [username, inputUsername] = useState('');
  const [password, inputPassword] = useState('');
  const [displayAlert, setDisplayAlert] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch(ApiUtil.API_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_name: username,
          password: password,
          user_type: 'customer',
        }),
      });
      const data = await response.json();
      if (data.authentication) {
        localStorage.setItem('token', data.authentication);
        localStorage.setItem('username', username);
        console.log('Token stored:', data.authentication);
        
            navigate('/Admin/orders');
            window.location.reload();
      } else {
        setDisplayAlert(true);
        console.error('Login failed:', data.status);
      }
      console.log(data);
    } catch (error) {
      console.error(' error', error);
    }
    }

  return (
    <Container maxWidth={false} style={{maxWidth: '600px',alignItems: 'center', justifyContent:"center" }}>
    {displayAlert&& (<Alert severity="warning" onClose={() => setDisplayAlert(false)}>Invaild username or name </Alert>)}
    <Box 
      component="form"
      onSubmit={handleSubmit}
      sx={{display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '80vh'}}>
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
        <Grid size={12}>
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
              Admin Login
            </Typography>
        </Grid>
        
        <Grid size={12} onSubmit={handleSubmit}>
          <Box
              component="form"
              sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
              noValidate
              autoComplete="off"
            >
              <TextField
               id="outlined-required"
               label="Account Name" 
               value={username} 
               onChange = {(event) => inputUsername(event.target.value)}
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
               value={password}
                onChange={(event) => inputPassword(event.target.value)}
               variant="outlined" 
               />
          </Box>
        </Grid>
        <Grid size={12} container justifyContent ='center'>
          <Box
          >
            <Button type="submit" variant="contained" sx={{width:400, height: 50,  color: '#5d4037', fontSize: "30px"}}>SIGN IN</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}

