import React, { useState } from 'react';
import Layout from '@components/layout';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import {
  ChoiceSlide,
  ContainerBox,
  CustomSelect,
  CustomTab,
  MobileTrackList,
  NonLogin,
  PlayGroupChip,
  ServiceOFF,
  ThumbnailCard,
  TrackTable,
} from '@components/common';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import useRequest from '@lib/useRequest';

function History() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const [tabType, setTabType] = useState(tabItem[0].value);
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const { data } = useRequest({
    url: `/api/my/history`,
    params: { token: session?.accessToken },
  });

  const trackList = data ? data.list : [];

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  if (typeof window !== 'undefined' && loading) return null;

  if (!session) {
    return <NonLogin />;
  }

  return (
    <>
      <ContainerBox sx={{ marginTop: 2 }}>
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            최근들은
          </Typography>
          {smUp ? (
            <CustomTab item={tabItem} type={tabType} setType={setTabType} />
          ) : (
            <CustomSelect item={tabItem} type={tabType} setType={setTabType} />
          )}
        </Stack>
      </ContainerBox>
      <ContainerBox>
        <Stack direction={smUp ? 'row' : 'column'} spacing={1} justifyContent="flex-end">
          <PlayGroupChip rows={trackList} selected={selected} onChangeSelected={onChangeSelected} />
        </Stack>
      </ContainerBox>
      <ContainerBox>
        {
          {
            track: smUp ? (
              <TrackTable
                rows={trackList}
                selected={selected}
                onChangeSelected={onChangeSelected}
              />
            ) : (
              <MobileTrackList
                rows={trackList}
                selected={selected}
                onChangeSelected={onChangeSelected}
              />
            ),
            // playlist: (
            //   <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            //     {trackList.map((item, i) => (
            //       <Grid item xs={2} sm={2} md={2} key={i}>
            //         <ThumbnailCard
            //           key={i}
            //           id={item.id}
            //           image={item.image}
            //           name={item.name}
            //           artistId={item.artistId}
            //           artistName={item.artistName}
            //         />
            //       </Grid>
            //     ))}
            //   </Grid>
            // ),
          }[tabType]
        }
      </ContainerBox>
      <ChoiceSlide selected={selected} />
    </>
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
  // {
  //   name: '플레이리스트',
  //   value: 'playlist',
  // },
  // {
  //   name: '뮤직비디오',
  //   value: 'video',
  // },
];
