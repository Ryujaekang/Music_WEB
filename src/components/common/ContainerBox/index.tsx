import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContainerBox = styled(Box)(({ theme }) => ({
  marginBottom: 24,
  maxWidth: 1427,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up('sm')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

export default ContainerBox;
