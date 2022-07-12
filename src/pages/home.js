import { Box } from '@mui/material';
import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import { StarWarsProvider } from '../context/starsWarsContext';

function HomePage() {
  return (
    <StarWarsProvider>
      <Box
        sx="0.5rem 0"
        display="flex"
        flexDirection="column"
        width="100%"
        alignItems="center"
        justifyContent="center"
        padding="1rem 0.5rem"
      >
        <Header />
        <Table />
      </Box>
    </StarWarsProvider>
  );
}

export default HomePage;
