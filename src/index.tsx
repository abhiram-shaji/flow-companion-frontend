import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({
  palette: {
    background: {
      default: '#fffffe', // Background color
    },
    text: {
      primary: '#2b2c34', // Headline and paragraph
    },
    primary: {
      main: '#6246ea', // Button color
      contrastText: '#fffffe', // Button text color
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      color: '#2b2c34', // Headline color
    },
    body1: {
      color: '#2b2c34', // Paragraph color
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
