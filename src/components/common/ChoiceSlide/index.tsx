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

const ButtonBox = ({ name, icon }) => (
  <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
    <IconButton>
      <FontAwesomeIcon icon={icon} />
    </IconButton>
    <Typography sx={{ cursor: 'pointer' }}>{name}</Typography>
  </Stack>
);

const BoxItem = [
  {
    name: '재생',
    icon: faPlay,
  },
  {
    name: '다운로드',
    icon: faDownload,
  },
  {
    name: '담기',
    icon: faPlus,
  },
];

function ChoiceSlide({ selected }) {
  const theme = useTheme();
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
            <Typography>{`선택된 ${0} 곡을`}</Typography>
            <Stack direction="row" spacing={2}>
              {BoxItem.map((val, i) => (
                <ButtonBox key={i} name={val.name} icon={val.icon} />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Slide>
  );
}

export default ChoiceSlide;
