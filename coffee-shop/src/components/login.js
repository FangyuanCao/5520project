import * as React from 'react';
import {useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';


const authenticate = (username, password) => {
  const users = [
    {username:'user', password:'1234' ,belong:'customer'},
    {username:'ad', password:'1234', belong:'admin'}
  ];
  const user = users.find(u => u.username === username && u.password === password);
  return user ? user : null;
};

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
const Login = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const verify = authenticate(username, password);
    if (verify) {
      onLogin(verify);
      if(verify.belong =='customer'){
      navigate('/Discount');
      }
      else if(verify.belong =='admin'){
        navigate('/admin');
      }
    } else {
      alert('Account name or password may not right ');
    }
  };

  return (
    <Container maxWidth={false} style={{maxWidth: '600px',alignItems: 'center', justifyContent:"center" }}>
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
               value={username} onChange = {(e) => setUsername(e.target.value)}
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
               value={password} onChange={(e) => setPassword(e.target.value)}
               variant="outlined" 
               />
          </Box>
        </Grid>
        <Grid size={12}   container justifyContent ='center'>
          <Box
          >
            <Button   type="submit" variant="contained" sx={{width:400, height: 50,  color: '#5d4037', fontSize: "30px"}}>SIGN IN</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}

export default Login;