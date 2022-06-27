import React, { useState } from 'react';
import Layout from '@components/layout';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import {
  ChoiceSlide,
  ContainerBox,
  CustomSelect,
  CustomTab,
  MobileTrackList,
  PlayGroupChip,
  ServiceOFF,
  ThumbnailCard,
  TrackTable,
} from '@components/common';
import { useTheme } from '@mui/material/styles';

function History() {
  const [tabType, setTabType] = useState(tabItem[0].value);
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  const rows = [];

  return (
    <ServiceOFF />
    // <>
    //   <ContainerBox sx={{ marginTop: 2 }}>
    //     <Stack direction="row" spacing={1} alignItems={'center'}>
    //       <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
    //         최근들은
    //       </Typography>
    //       {smUp ? (
    //         <CustomTab item={tabItem} type={tabType} setType={setTabType} />
    //       ) : (
    //         <CustomSelect item={tabItem} type={tabType} setType={setTabType} />
    //       )}
    //     </Stack>
    //   </ContainerBox>
    //   <ContainerBox>
    //     <Stack direction={smUp ? 'row' : 'column'} spacing={1} justifyContent="flex-end">
    //       <PlayGroupChip />
    //     </Stack>
    //   </ContainerBox>
    //   <ContainerBox>
    //     {
    //       {
    //         track: smUp ? (
    //           <TrackTable rows={rows} selected={selected} onChangeSelected={onChangeSelected} />
    //         ) : (
    //           <MobileTrackList
    //             rows={rows}
    //             selected={selected}
    //             onChangeSelected={onChangeSelected}
    //           />
    //         ),
    //         playlist: (
    //           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //             {trackCardItem.map((item, i) => (
    //               <Grid item xs={2} sm={2} md={2} key={i}>
    //                 <ThumbnailCard
    //                   key={i}
    //                   id={item.id}
    //                   image={item.imgUrl}
    //                   name={item.trackName}
    //                   artistName={item.artist}
    //                 />
    //               </Grid>
    //             ))}
    //           </Grid>
    //         ),
    //       }[tabType]
    //     }
    //   </ContainerBox>
    //   <ChoiceSlide selected={selected} />
    // </>
  );
}

History.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default History;

let tabItem = [
  {
    name: '곡',
    value: 'track',
  },
  {
    name: '플레이리스트',
    value: 'playlist',
  },
  {
    name: '뮤직비디오',
    value: 'video',
  },
];

let trackCardItem = [
  {
    id: 1,
    imgUrl: '',
    trackName: 'ˣ‿ˣ (SMiLEY)',
    artist: 'EP • YENA (최예나)',
  },
  {
    id: 2,
    imgUrl: '',
    trackName: '사랑하는 척 (REVIBE Vol.7)',
    artist: '앨범 • 바이브 및 소향',
  },
  {
    id: 3,
    imgUrl: '',
    trackName: 'Midnight Guest',
    artist: 'EP • fromis_9',
  },
  {
    id: 4,
    imgUrl: '',
    trackName: 'The Feels',
    artist: '앨범 • TWICE',
  },
  {
    id: 5,
    imgUrl: '',
    trackName: 'Cant Control Myself',
    artist: '싱글 • 태연 (TAEYEON)',
  },

  {
    id: 6,
    imgUrl: '',
    trackName: 'Cant Control Myself',
    artist: '싱글 • 태연 (TAEYEON)',
  },
  {
    id: 7,
    imgUrl: '',
    trackName: '중년 트로트 가요',
    artist: '앨범 • 진성',
  },
  {
    id: 8,
    imgUrl: '',
    trackName: 'WHEE',
    artist: 'EP • 휘인',
  },
];
