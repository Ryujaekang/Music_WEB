import React from 'react';
import Layout from '@components/layout';
import { Stack, Typography, Link, useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ContainerBox, ServiceOFF } from '@components/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ChipItem from '@components/common/PlayGroupChip/ChipItem';
import PlaylistCard from '@components/playlist/PlaylistCard';

function Playlist() {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <ServiceOFF />
    // <>
    //   <ContainerBox sx={{ marginTop: 2 }}>
    //     <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
    //       플레이리스트
    //     </Typography>
    //   </ContainerBox>
    //   <ContainerBox>
    //     <Stack direction={smUp ? 'row' : 'column'} spacing={1} justifyContent="space-between">
    //       <Stack direction="row" spacing={2}>
    //         <Link
    //           component="button"
    //           variant="body2"
    //           color="primary"
    //           underline="always"
    //           onClick={() => {
    //             console.info("I'm a button.");
    //           }}
    //         >
    //           편집순
    //         </Link>
    //         <Link
    //           component="button"
    //           variant="body2"
    //           color="inherit"
    //           underline="none"
    //           onClick={() => {
    //             console.info("I'm a button.");
    //           }}
    //         >
    //           좋아요순
    //         </Link>
    //       </Stack>
    //       <ChipItem name={'만들기'} icon={faPlus} handleClick={handleClick} />
    //     </Stack>
    //   </ContainerBox>
    //   <ContainerBox>
    //     <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //       {trackCardItem.map((item, i) => (
    //         <Grid item xs={4} sm={4} md={4} key={i}>
    //           <PlaylistCard id={item.id} title={item.title} writer={item.writer} like={item.like} />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </ContainerBox>
    // </>
  );
}

Playlist.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Playlist;

let trackCardItem = [
  {
    id: 1,
    title: '아이유 모음곡',
    writer: '류재강',
    like: {
      isLike: true,
      amount: 5,
    },
  },
  {
    id: 2,
    title: '플레이리스트 모음곡',
    writer: '누굴까?',
    like: {
      isLike: false,
      amount: 10,
    },
  },
  {
    id: 3,
    title: '아무거나',
    writer: '나그네',
    like: {
      isLike: true,
      amount: 20,
    },
  },
  {
    id: 4,
    title: '정리중',
    writer: '??',
    like: {
      isLike: false,
      amount: 0,
    },
  },
];
