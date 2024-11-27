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
import { useState } from 'react';
import ApiUtil from '../Utils/ApiUtil';


 
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
  const token = 'test_toke_1234'; 
  console.log('Token:', token);
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const handleSignUp = async (event)=>{
    event.preventDefault();
    try {
      const response = await fetch(ApiUtil.API_REGISTRATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_name: accountName,
          password: password,
          user_type: userType
        }),
      });
      const data = await response.json();
      if (data.authentication) {
        localStorage.setItem('token', data.authentication);
        console.log('Token stored:', data.authentication);
      } else {
        console.error('Login failed:', data.status);
      }
      console.log(data);
    } catch (error) {
      console.error(' error !', error);
    }
  };
  return (
    <Container maxWidth={false} style={{maxWidth: '600px',alignItems: 'center', justifyContent:"center" }}>
    <Box sx={{display: 'flex', alignItems: 'center',  justifyContent: 'center', height: '80vh'}}>
      <Grid container spacing={2} component="form" onSubmit = {handleSignUp}>
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
               name="accountName"
               value={accountName}
               onChange={(e) => setAccountName(e.target.value)}
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
               name ="email"
               value = {email}
               onChange={(e) => setEmail(e.target.value)}
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
               label="Password" 
               variant="outlined" 
               type = 'password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
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
               type="password"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               />
          </Box>
        </Grid>
        <Grid size={12}   container justifyContent ='center'>
          <Box
          >
            <Button type="submit" variant="contained" sx={{width:400, height: 50,  color: '#5d4037', fontSize: "30px"}}>Create Account</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}