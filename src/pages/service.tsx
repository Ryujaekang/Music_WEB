import React from 'react';
import Layout from '@components/layout';
import { Box, Stack, Container, Typography, TextField, Button } from '@mui/material';

function Service() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');

    // const response = await signIn('credentials', {
    //   email,
    //   password,
    // });

    // console.log('response', response);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{ width: '100%' }}>
        <Typography variant="h6" component="div">
          서비스 문의하기
        </Typography>
        <TextField
          required
          fullWidth
          id="email"
          label="이메일"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField id="content" label="문의 내용" name="content" multiline rows={6} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Button type="submit" variant="contained" sx={{ width: 260 }}>
            문의하기
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

Service.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Service;
