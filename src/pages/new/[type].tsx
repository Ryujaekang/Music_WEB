import React, { useState, useEffect } from 'react';
import Layout from '@components/layout';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import {
  ChoiceSlide,
  ContainerBox,
  CustomSelect,
  CustomTab,
  MobileTrackList,
  PlayGroupChip,
  ThumbnailCard,
  TrackTable,
} from '@components/common';
import { useTheme } from '@mui/material/styles';
import axios from '@lib/customAxios';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { TrackList } from 'types/track';

interface NewProps {
  newData: {
    type: 'track' | 'album' | 'video';
    list: TrackList[];
  };
}

function New({ newData }: NewProps) {
  const router = useRouter();
  const [tabType, setTabType] = useState(newData.type);
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  useEffect(() => {
    router.push(`/new/${tabType}`);
  }, [tabType]);

  return (
    <>
      <ContainerBox sx={{ marginTop: 2 }}>
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            최신음악
          </Typography>
          {smUp ? (
            <CustomTab item={tabItem} type={tabType} setType={setTabType} />
          ) : (
            <CustomSelect item={tabItem} typeString={'link'} type={tabType} setType={setTabType} />
          )}
        </Stack>
      </ContainerBox>
      {tabType === 'track' && (
        <ContainerBox>
          <Stack direction={smUp ? 'row' : 'column'} spacing={1} justifyContent="flex-end">
            <PlayGroupChip
              rows={newData.list}
              selected={selected}
              onChangeSelected={onChangeSelected}
            />
          </Stack>
        </ContainerBox>
      )}
      <ContainerBox>
        {
          {
            track: smUp ? (
              <TrackTable
                rows={newData.list}
                selected={selected}
                onChangeSelected={onChangeSelected}
              />
            ) : (
              <MobileTrackList
                rows={newData.list}
                selected={selected}
                onChangeSelected={onChangeSelected}
              />
            ),
            album: (
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {newData.list.map((item, i) => (
                  <Grid item xs={2} sm={2} md={2} key={i}>
                    <ThumbnailCard
                      key={i}
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      artistId={item.artistId}
                      artistName={item.artistName}
                    />
                  </Grid>
                ))}
              </Grid>
            ),
            video: <Typography>뮤직비디오는 아직 준비되지 않았습니다.</Typography>,
          }[tabType]
        }
      </ContainerBox>
      <ChoiceSlide selected={selected} />
    </>
  );
}

New.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { type: 'track' } },
      { params: { type: 'album' } },
      // { params: { type: 'video' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(`/${params.type}/new`).then((res) => res.data);

  return {
    props: {
      newData: data,
    }, // will be passed to the page component as props
    revalidate: 3600, // In seconds
  };
};

export default New;

let tabItem = [
  {
    name: '곡',
    value: 'track',
  },
  {
    name: '앨범',
    value: 'album',
  },
  {
    name: '뮤직비디오',
    value: 'video',
  },
];
