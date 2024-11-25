import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export default function Foot() {
  const navigate = useNavigate();
  return (
<Box 
    sx={{
      width: "100%",
      height: 80,
      bgcolor: 'primary.main', 
      display: 'flex', 
      alignItems: 'center',
    }}>
    <Typography variant="h6" color="white">
    All rights reserved.
  </Typography>
  <Box sx={{ position: 'fixed', bottom: 16, right: 16, color: '#5d4037' }}>
          <Button color="white" onClick={() => navigate('/AdminLogin')} >Admin entry</Button>
          </Box>
  </Box>



  );
}
