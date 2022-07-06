import { CircularProgress, Container } from '@mui/material';
import React from 'react';

function BasicLoading() {
  return (
    <Container
      sx={{
        display: 'flex',
        height: `calc(100vh - 180px)`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Container>
  );
}

export default BasicLoading;
