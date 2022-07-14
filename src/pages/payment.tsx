import * as React from 'react';
import Layout from '@components/layout';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Link,
  GlobalStyles,
  Container,
} from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import { Copyright } from '@components/common';

const tiers = [
  {
    title: '무료',
    price: '0',
    description: ['무제한 듣기', '오프라인 재생'],
    buttonText: '선택하기',
    buttonVariant: 'outlined',
  },
  {
    title: '프로',
    subheader: '가장 인기있는',
    price: '4990',
    description: ['무료 기능 제공', 'VIP 특별 선물 제공'],
    buttonText: '선택하기',
    buttonVariant: 'contained',
  },
  {
    title: '기업',
    price: '29900',
    description: ['자세한 사항 문의'],
    buttonText: '선택하기',
    buttonVariant: 'outlined',
  },
];

function Payment() {
  return (
    <>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          음원 서비스
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          임시 가격표 입니다.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /원
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant as 'outlined' | 'contained'}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

Payment.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Payment;
