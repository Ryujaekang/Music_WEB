import React, { useRef } from 'react';
import Layout from '@components/layout';
import { Box, Stack, Container, Typography, TextField, Button } from '@mui/material';
import emailjs from '@emailjs/browser';

function Service() {
  const form = useRef();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
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
      <Stack component="form" ref={form} onSubmit={handleSubmit} spacing={2} sx={{ width: '100%' }}>
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
        <TextField
          required
          fullWidth
          id="message"
          label="문의 내용"
          name="message"
          multiline
          rows={6}
        />
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
