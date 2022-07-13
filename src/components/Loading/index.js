/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/prop-types */
import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import { AlertRoot, ContentContainer } from './styles';

function TransitionDown(props) {
  return <Slide { ...props } direction="down" />;
}

export const Loading = ({
  trigger,
  message = 'Carregando...',
}) => (
  <Snackbar
    anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
    open={ trigger }
    TransitionComponent={ TransitionDown }
  >
    <AlertRoot icon={ false }>
      <ContentContainer>
        <CircularProgress />
        <Typography>{message}</Typography>
      </ContentContainer>
    </AlertRoot>
  </Snackbar>
);
