import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Toolbar as MuiToolbar,
  AppBar as MuiAppBar,
  IconButton,
  InputBase,
  Badge,
  Checkbox,
  TextField,
  Autocomplete,
  InputAdornment,
  useTheme,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSearch,
  faSun,
  faMoon,
  faBell,
  faUserCircle,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { drawerWidth, headerHeight, mobileHeaderHeight } from '@app/constant';
import { useColorMode } from '@theme/index';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import useRequest from '@lib/useRequest';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { openToggle } from '@components/layout/Sidebar/sidebarSlice';

import MobileMenu from './MobileMenu';
import DarkWhiteSwitch from './DarkWhiteSwitch';
import { useRouter } from 'next/router';
import axios from 'axios';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: any) => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      paddingLeft: `${drawerWidth}px`,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(11)} + 1px)`,
      marginLeft: `calc(${theme.spacing(11)} + 1px)`,
    },
  }),
}));

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  minHeight: `${headerHeight}px`,
  [theme.breakpoints.down('sm')]: {
    minHeight: `${mobileHeaderHeight}px`,
  },
}));

interface SerachKeyword {
  keyword: string;
}

function Header() {
  const router = useRouter();
  const theme = useTheme();
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { open, miniOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [searchOpen, setSearchOpen] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSidebarOpen = () => {
    dispatch(openToggle(!open));
  };

  const { data: searchData = [] } = useRequest(
    inputValue
      ? {
          url: `/api/search`,
          params: { keyword: inputValue },
        }
      : null
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const searchLoading = searchOpen && searchData?.length === 0;

  return (
    <>
      <AppBar position="fixed" open={miniOpen} elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
            onClick={handleSidebarOpen}
          >
            <FontAwesomeIcon icon={faBars} style={{ fontSize: '1.8rem' }} />
          </IconButton>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            value={value}
            open={searchOpen}
            onOpen={() => {
              setSearchOpen(true);
            }}
            onClose={() => {
              setSearchOpen(false);
            }}
            onChange={(event: any, newValue: string) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            disableClearable
            options={searchData}
            getOptionLabel={(option) => (option.keyword ? option.keyword : '')}
            loading={searchLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="검색…"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  endAdornment: searchLoading ? (
                    <React.Fragment>
                      {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ) : (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                  ),
                }}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === 'enter') && e.target.value) {
                    router.push(`/search/all?keyword=${e.target.value}`);
                  }
                }}
              />
            )}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.keyword, inputValue);
              const parts = parse(option.keyword, matches);

              return (
                <li {...props}>
                  <div>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                          color: part.highlight
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              );
            }}
            sx={{
              width: 300,
              backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <DarkWhiteSwitch />
            {/* <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <FontAwesomeIcon icon={faBell} style={{ fontSize: '2rem' }} />
              </Badge>
            </IconButton> */}
            {!session && (
              <IconButton
                size="large"
                aria-label="account of current user"
                color="inherit"
                onClick={() => signIn()}
              >
                <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '2rem' }} />
              </IconButton>
            )}
            {session?.user && (
              <IconButton
                size="large"
                aria-label="account of current user"
                color="inherit"
                // onClick={() => signOut()}
              >
                <Avatar alt="Remy Sharp" src={session.user.image} sx={{ width: 24, height: 24 }} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.8rem' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
      />
    </>
  );
}

export default Header;
