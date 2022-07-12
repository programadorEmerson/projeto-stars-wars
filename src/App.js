import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import HomePage from './pages/home';
import theme from './styles';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
