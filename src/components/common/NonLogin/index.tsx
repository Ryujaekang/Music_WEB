import React from 'react';
import Image from 'next/image';
import { Box, Stack, Container, Typography, Button } from '@mui/material';
import { signIn } from 'next-auth/react';

function NonLogin() {
  return (
    <Container
      sx={{
        display: 'flex',
        height: `calc(100vh - 180px)`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack direction={'row'} alignItems="center">
        <Stack spacing={2}>
          <Typography variant="h1" fontWeight={500}>
            잠시만요~!
          </Typography>
          <Typography variant="h2">로그인이 필요한 페이지입니다.</Typography>
          <Button variant="text" sx={{ fontSize: '1.8rem' }} onClick={() => signIn()}>
            로그인하러가기
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default NonLogin;
