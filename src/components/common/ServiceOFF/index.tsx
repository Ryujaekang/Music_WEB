import React from 'react';
import Image from 'next/image';
import { Box, Stack, Container, Typography } from '@mui/material';
// import { sdCharacter } from '@assets/Images';

function ServiceOFF() {
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
            잠깐~!
          </Typography>
          <Typography variant="h2">지금은 개발 중인뮤~</Typography>
          <Box>
            <Typography color={'text.secondary'}>현재 개발중인 페이지로</Typography>
            <Typography color={'text.secondary'}>업데이트를 기대해주세요</Typography>
          </Box>
        </Stack>
        <Box width={{ xs: 160, sm: 200 }}>
          {/* <Image layout="responsive" src={sdCharacter} alt="sd_character image" /> */}
        </Box>
      </Stack>
    </Container>
  );
}

export default ServiceOFF;
