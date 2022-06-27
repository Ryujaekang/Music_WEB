import React, { useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Checkbox, Typography, IconButton, Link, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import { albumDefaultImage } from '@assets/Images';

interface PlaylistCardProps {
  id: number;
  title: string;
  writer: string;
  like: {
    isLike: boolean;
    amount: number;
  };
}

function PlaylistCard({ title, writer, like }: PlaylistCardProps) {
  const [hover, setHover] = useState(false);
  const [checked, setChecked] = useState(like.isLike);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{ position: 'relative', flex: 1 }}
      >
        <Box
          sx={{
            display: hover ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
            background: 'linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0.502))',
            opacity: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconButton>
            <FontAwesomeIcon icon={faPlay} size="2x" color="#fff" />
          </IconButton>
          <Stack
            direction="row"
            sx={{ position: 'absolute', bottom: 0, left: 0, alignItems: 'center' }}
          >
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              color="primary"
              icon={
                <FontAwesomeIcon icon={faHeartRE} style={{ fontSize: '2rem', color: '#fff' }} />
              }
              checkedIcon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: '2rem' }} />}
            />
            <Typography color="#fff">{like.amount}</Typography>
          </Stack>
        </Box>
        <Image layout="responsive" src={albumDefaultImage} alt="default image" />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography>{title}</Typography>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography>{writer}</Typography>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              color="primary"
              icon={
                <FontAwesomeIcon icon={faHeartRE} style={{ fontSize: '1.6rem', color: '#000' }} />
              }
              checkedIcon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.6rem' }} />}
            />
            <Typography>{like.amount}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}

export default PlaylistCard;
