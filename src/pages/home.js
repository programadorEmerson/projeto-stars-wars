import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import VideoPlayer from 'react-background-video-player';
import { Loading } from '../components/Loading';
import Header from '../components/Header';
import Table from '../components/Table';
import { StarWarsProvider } from '../context/starsWarsContext';
import intro from '../assets/movie-intro.mp4';
import AlertNotification from '../components/AlertNotification';

const TIMEOUT = 12000;

function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false);
      AlertNotification({
        type: 'success',
        message: 'Seja bem vindo',
      });
    }, TIMEOUT);
  }, []);

  return (
    <StarWarsProvider>
      <Loading
        trigger={ showIntro }
        message="Que a Força esteja com você! Carregando..."
      />
      {showIntro && (
        <VideoPlayer
          className="video"
          src={ intro }
          autoPlay
          muted
          onEnd={ () => setShowIntro(false) }
        />
      )}
      {!showIntro && (
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
      )}
    </StarWarsProvider>
  );
}

export default HomePage;
