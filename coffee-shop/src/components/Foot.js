import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function foot() {
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
</Box>

  );
}
