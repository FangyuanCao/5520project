import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import theme from './components/theme';
import { ThemeProvider } from '@mui/material/styles';
ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <ThemeProvider theme ={theme}>
      <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

