import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import { Stack, Button, Link, Typography, useMediaQuery, Grid } from '@mui/material';
import {
  ChoiceSlide,
  ContainerBox,
  CustomSelect,
  CustomTab,
  MobileTrackList,
  PlayGroupChip,
  ServiceOFF,
  SwiperArtistCard,
  SwiperCard,
  ThumbnailCard,
  TrackTable,
} from '@components/common';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import axios from '@lib/customAxios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-light-svg-icons';
import { GetStaticPaths, GetStaticProps, GetServerSideProps } from 'next';
import { AllSearch } from 'types/search';

interface SearchProps {
  searchData: AllSearch;
}

function Search({ searchData }: SearchProps) {
  const { query } = useRouter();
  const { track, album, artist, lyrics } = searchData || {};
  const { type, keyword } = query;
  const theme = useTheme();
  const [tabType, setTabType] = useState(tabItem[0].value);
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const [selected, setSelected] = useState<string[]>([]);

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  return (
    <>
      <ContainerBox sx={{ marginTop: 2 }}>
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            검색
          </Typography>
          {/* {smUp ? (
            <CustomTab item={tabItem} type={tabType} setType={setTabType} />
          ) : (
            <CustomSelect item={tabItem} type={tabType} setType={setTabType} />
          )} */}
        </Stack>
      </ContainerBox>
      {
        {
          all: (
            <>
              {track.trackList.length > 0 && (
                <ContainerBox>
                  <Typography variant="h6" component="div">
                    <NextLink
                      href={`/search/track?keyword=${keyword}`}
                    >{`곡 (${track.count})`}</NextLink>{' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Typography>
                  {smUp ? (
                    <TrackTable
                      rows={track.trackList}
                      selected={selected}
                      onChangeSelected={onChangeSelected}
                    />
                  ) : (
                    <MobileTrackList
                      rows={track.trackList}
                      selected={selected}
                      onChangeSelected={onChangeSelected}
                    />
                  )}
                </ContainerBox>
              )}
              {album.albumList.length > 0 && (
                <ContainerBox>
                  <Typography variant="h6" component="div">
                    <NextLink
                      href={`/search/album?keyword=${keyword}`}
                    >{`앨범 (${album.count})`}</NextLink>{' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Typography>
                  <SwiperCard items={album.albumList} />
                </ContainerBox>
              )}
              {artist.artistList.length > 0 && (
                <ContainerBox>
                  <Typography variant="h6" component="div">
                    <NextLink
                      href={`/search/artist?keyword=${keyword}`}
                    >{`아티스트 (${artist.count})`}</NextLink>{' '}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Typography>
                  <SwiperArtistCard items={artist.artistList} />
                </ContainerBox>
              )}
            </>
          ),
          track: <div>안녕</div>,
        }[tabType]
      }
    </>
  );
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  try {
    const { data } = await axios.get(`/search/${query.type}`, {
      params: { keyword: query.keyword },
    });

    return data ? { props: { searchData: data.data } } : { notFound: true };
  } catch (error) {
    // The Twitter API most likely died
    console.error(error);
    return { notFound: true };
  }
};

export default Search;

let tabItem = [
  {
    name: '통합검색',
    value: 'all',
  },
  {
    name: '곡',
    value: 'track',
  },
  {
    name: '앨범',
    value: 'album',
  },
  {
    name: '아티스트',
    value: 'artist',
  },
  {
    name: '뮤직비디오',
    value: 'video',
  },
  {
    name: '가사',
    value: 'lyrics',
  },
];
