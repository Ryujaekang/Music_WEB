import React, { useState, useEffect } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignInAlt, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Paper,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import MenuList from './MenuList';
import { drawerWidth } from '@app/constant';
import { useColorMode } from '@theme/index';
import { useSession, signIn, signOut } from 'next-auth/react';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { openToggle, miniOpenToggle } from './sidebarSlice';
// import { MuOnSymbolDark, MuOnSymbolWhite } from '@assets/Images';

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
});

const MiniDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: any) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

function Sidebar() {
  const { data: session, status } = useSession();
  const { open, miniOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const { mode } = useColorMode();
  const isColormode = Boolean(mode === 'dark');

  useEffect(() => {
    lgUp ? dispatch(miniOpenToggle(true)) : dispatch(miniOpenToggle(false));
  }, [lgUp]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (open) {
      dispatch(openToggle(false));
    }
  }, [router.asPath]);

  const handleSidebarClose = () => {
    dispatch(openToggle(false));
  };

  const handleMiniDrawerToggle = () => {
    dispatch(miniOpenToggle(!miniOpen));
  };

  const content = (
    <Paper
      component="nav"
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {smUp ? (
          <IconButton
            onClick={handleMiniDrawerToggle}
            sx={{
              marginLeft: '12px',
              marginRight: '26px',
            }}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: '1.6rem' }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleSidebarClose}
            sx={{
              marginLeft: '12px',
              marginRight: '26px',
            }}
          >
            <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1.6rem' }} />
          </IconButton>
        )}
        <Typography variant="h5" paddingLeft={1} fontWeight={600} sx={{ cursor: 'pointer' }}>
          <NextLink href={'/'}>Music WEB</NextLink>
        </Typography>
      </Box>
      <MenuList />
      <Box sx={{ width: '100%', padding: '0px 16px 10px 16px' }}>
        {session ? (
          <ListItemButton onClick={() => signOut()}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '1.8rem' }} />
            </ListItemIcon>
            <ListItemText primary="로그아웃" />
          </ListItemButton>
        ) : (
          <ListItemButton onClick={() => signIn()}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faSignInAlt} style={{ fontSize: '1.8rem' }} />
            </ListItemIcon>
            <ListItemText primary="로그인" />
          </ListItemButton>
        )}
      </Box>
    </Paper>
  );

  if (smUp) {
    return (
      <MiniDrawer
        anchor="left"
        open={miniOpen}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            width: drawerWidth,
          },
        }}
        variant="permanent"
      >
        {content}
      </MiniDrawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={handleSidebarClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          width: drawerWidth,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

export default Sidebar;
