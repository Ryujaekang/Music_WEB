import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Stack,
  Box,
  Switch,
  Paper,
  Slide,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons';
import { drawerWidth } from '@app/constant';

// redux-toolkit
import { useAppSelector, useAppDispatch } from '@app/hooks';
import { setPlaylist } from '@components/player/playerSlice';

function ChoiceSlide({ selected }) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const playMusic = (selected) => {
    console.log('playMusic', selected);
    let temp = [];
    selected.map((val) => {
      temp.push({
        name: val.name,
        trackId: val.id,
        musicSrc: val.musicUrl,
        cover: val.albumImage,
        singer: val.artistName,
      });
    });

    dispatch(setPlaylist(temp));
  };

  return (
    <Slide direction="up" in={selected.length ? true : false}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 24,
          width: '100vw',
          [theme.breakpoints.up('sm')]: {
            width: `calc(100vw - ${drawerWidth}px)`,
          },
        }}
      >
        <Paper
          sx={{
            borderRadius: 4,
            margin: 2,
          }}
          elevation={4}
        >
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ padding: 2, alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography>{`선택된 ${selected.length} 곡을`}</Typography>
            <Stack direction="row" spacing={2}>
              {/* {BoxItem.map((val, i) => (
                <ButtonBox key={i} name={val.name} icon={val.icon} onClick={val.onClick} />
              ))} */}
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => playMusic(selected)}>
                  <FontAwesomeIcon icon={faPlay} />
                </IconButton>
                <Typography onClick={() => playMusic(selected)} sx={{ cursor: 'pointer' }}>
                  재생
                </Typography>
              </Stack>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => console.log('다운로드')}>
                  <FontAwesomeIcon icon={faDownload} />
                </IconButton>
                <Typography onClick={() => console.log('다운로드')} sx={{ cursor: 'pointer' }}>
                  다운로드
                </Typography>
              </Stack>
              <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => console.log('담기')}>
                  <FontAwesomeIcon icon={faPlus} />
                </IconButton>
                <Typography onClick={() => console.log('담기')} sx={{ cursor: 'pointer' }}>
                  담기
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Slide>
  );
}

export default ChoiceSlide;
