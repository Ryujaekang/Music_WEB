import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Copyright } from '@components/common';
import { useColorMode } from '@theme/index';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function SignUp() {
  const router = useRouter();
  const { mode, toggleColorMode } = useColorMode();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('M');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const res = await axios
      .post('/api/signup', {
        name: data.get('name'),
        gender: data.get('gender'),
        phoneNumber: data.get('phoneNumber'),
        email: data.get('email'),
        password: data.get('password'),
      })
      .then((data) => data.data)
      .catch(() => enqueueSnackbar('회원가입에 실패하였습니다.', { variant: 'error' }));

    if (res.result === 'SUCCESS') {
      enqueueSnackbar('회원가입하였습니다..', { variant: 'success' });
      router.push('/auth/login');
    }

    if (res.result === 'FAIL' || !res) {
      enqueueSnackbar(res.message.error, { variant: 'error' });
    }
  };

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phoneNumber]);

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
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel id="demo-controlled-radio-buttons-group">성별</FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="gender"
                value={gender}
                onChange={handleChangeGender}
              >
                <FormControlLabel value="M" control={<Radio />} label="남자" />
                <FormControlLabel value="F" control={<Radio />} label="여자" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-phone"
                name="phoneNumber"
                required
                fullWidth
                id="phoneNumber"
                label="휴대폰 번호"
                value={phoneNumber}
                onChange={handleChangePhoneNumber}
                inputProps={{ maxLength: 13 }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="마케팅 이용동의(선택)"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            회원가입
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" component="div">
                <NextLink href="/auth/login">이미 회원가입이 되었습니까?</NextLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default SignUp;
