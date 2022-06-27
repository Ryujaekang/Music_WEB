import React, { useEffect, useState } from 'react';

// layout commponent..
import Meta from './Meta';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { drawerWidth, headerHeight, mobileHeaderHeight } from '@app/constant';
import { useAppSelector } from '@app/hooks';
import dynamic from 'next/dynamic';
import Player from '@components/player';

const PlayerWithNoSSR = dynamic(() => import('@components/player'), {
  ssr: false,
});

/*
const PlayerWithNoSSR = (props:any) => {
    console.log('[Props로드]', props.props);
  return <Player props={props.props} />;
};
*/
interface Props {
  children: React.ReactNode;
}

const MainWrapper = styled(Paper)(({ theme, open }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: `calc(100vh - ${headerHeight}px)`,
  marginTop: `${headerHeight}px`,
  [theme.breakpoints.down('sm')]: {
    minHeight: `calc(100vh - ${mobileHeaderHeight}px)`,
    marginTop: `${mobileHeaderHeight}px`,
  },
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: `${drawerWidth}px`,
    },
  }),
  ...(!open && {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: `calc(${theme.spacing(11)} + 1px)`,
    },
  }),
}));

function Layout({ children }: Props) {
  const { miniOpen } = useAppSelector((state) => state.sidebar);

  return (
    <>
      <Meta />
      <Header />
      <MainWrapper open={miniOpen} elevation={0} square>
        <Sidebar />
        <Box component="main">{children}</Box>
        <Footer />
      </MainWrapper>
      <PlayerWithNoSSR />
    </>
  );
}

export default Layout;
