import React from 'react';
import Image from 'next/image';
import { Box, Stack, Container, Typography } from '@mui/material';
// import { sadSDCharacter } from '@assets/Images';

function Custom404() {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack direction={'row'} alignItems="center" justifyContent={'center'}>
        <Stack spacing={2}>
          <Typography variant="h2">404</Typography>
          <Typography variant="h1">잠깐!</Typography>
          <Typography variant="h2">여기는 없는 페이지다 뮤!</Typography>
          <Typography>에러페이지는 위험하니 뒤로 돌아가라 뮤!</Typography>
        </Stack>
        <Box width={{ xs: 200, sm: 300 }}>
          {/* <Image layout="responsive" src={sadSDCharacter} alt="sd_character image" /> */}
        </Box>
      </Stack>
    </Container>
  );
}

export default Custom404;
