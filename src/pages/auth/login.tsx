import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '@components/common';
import { useColorMode } from '@theme/index';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getProviders, getCsrfToken, signIn, getSession } from 'next-auth/react';

function Login({ providers, csrfToken }) {
  const router = useRouter();
  const { mode, toggleColorMode } = useColorMode();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const response = await signIn('credentials', {
      email,
      password,
    });

    console.log('response', response);
    // mode === 'light' && toggleColorMode();
  };

  // useEffect(() => {
  //   mode === 'dark' && toggleColorMode();
  // }, []);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="자동 로그인"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" component="div">
                <NextLink href="/">비밀번호 찾기</NextLink>
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component="div">
                <NextLink href="/signup">회원가입</NextLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {Object.values(providers).map((provider) => {
        // console.log('provider', provider);
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </div>
        );
      })}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}

export default Login;
