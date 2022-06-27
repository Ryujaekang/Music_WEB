import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Avatar,
  Stack,
  Typography,
  IconButton,
  Checkbox,
  useTheme,
  Link,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faMusic,
  faCaretUp,
  faCaretDown,
  faHeart,
  faEllipsisV,
  faHorizontalRule,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import { CustomMenu } from '..';
import { trackItem } from 'pages/api/chart';
import Image from 'next/image';
import WaveRanking from '../WaveRanking';

function MobileTrackCard({
  adult,
  albumId,
  albumImage,
  artistId,
  artistName,
  id,
  image,
  name,
  rank,
  wave,
}: trackItem) {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box
      sx={{
        width: '100%',
        paddingLeft: 1,
        paddingRight: 1,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={{ bgcolor: grey[500], alignItems: 'center', justifyContent: 'center' }}
          variant="rounded"
        >
          {albumImage ? (
            <Image layout="fill" src={albumImage} alt="default image" />
          ) : (
            <FontAwesomeIcon icon={faMusic} style={{ fontSize: '1.8rem' }} />
          )}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{rank}</Typography>
          <WaveRanking wave={wave} />
        </Box>
        <Box
          sx={{
            flexWrap: 'wrap',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'start',
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="subtitle1"
            title={name}
            sx={{
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            title={artistName}
            sx={{
              color: 'text.secondary',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {artistName}
          </Typography>
        </Box>
        <IconButton
          aria-label="show more"
          title="메뉴 더보기"
          color="inherit"
          onClick={handleClickMenu}
        >
          <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '1.8rem' }} />.
        </IconButton>
        <CustomMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Stack>
    </Box>
  );
}

export default MobileTrackCard;
