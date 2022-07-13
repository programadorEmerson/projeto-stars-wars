import React from 'react';
import { ToastContainer } from 'react-toastify';
import { CssBaseline, ThemeProvider } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HomePage from './pages/home';
import theme from './styles';

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <ToastContainer />
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
