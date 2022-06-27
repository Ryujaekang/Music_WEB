import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import Image from 'next/image';

export interface ArtistCardProps {
  id: number;
  name: string;
  englishName: string;
  image: string | null;
  country: number;
}

function ArtistCard({ id, name, englishName, image, country }: ArtistCardProps) {
  return (
    <Stack spacing={1} alignItems={'center'}>
      <Avatar sx={{ width: 100, height: 100 }}>
        <Image layout="fill" src={image} alt="default image" />
      </Avatar>
      <Typography
        title={`${name} (${englishName})`}
        sx={{
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >{`${name} (${englishName})`}</Typography>
      <Typography color={'text.secondary'}>{country}</Typography>
    </Stack>
  );
}

export default ArtistCard;
