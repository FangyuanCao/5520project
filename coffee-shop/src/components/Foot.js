import * as React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
      dark: '#0066CC',
    },
  },
});

export default function foot() {
  return (
    <ThemeProvider theme={theme}>
      <Box 
    sx={{
      width: "100%",
      height: 80,
      bgcolor: 'primary.main', 
      display: 'flex', 
      alignItems: 'center',
    }}>
    <Typography variant="h6" color="white">
    This is a footer text  for copy right
  </Typography>
    </Box>
    </ThemeProvider>
  );
}
