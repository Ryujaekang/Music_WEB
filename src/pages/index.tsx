import React from 'react';
import Layout from '@components/layout';
import { Paper, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Banner, Top100 } from '@components/home';
import { BasicLoading, ContainerBox, SwiperCard } from '@components/common';
import customAxios from '@lib/customAxios';
import { Album } from 'types/album';
import { Chart } from 'types/chart';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import useRequest from '@lib/useRequest';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Axios from 'axios';

interface HomeProps {
  top100: Chart;
  newAlbumList: Album[];
}

function Home({ top100, newAlbumList }: HomeProps) {
  const { trackList: top100TrackList } = top100 || {};
  const { data: session } = useSession();

  const top100IdAry = top100TrackList.map((item) => item.id).toString();
  const newAlbumIdAry = newAlbumList.map((item) => item.id).toString();

  const { data: top100Likes } = useRequest({
    url: `/api/likeShow`,
    params: { type: 'track', ids: top100IdAry, token: session?.accessToken },
  });

  const { data: newAlbumLikes } = useRequest({
    url: `/api/likeShow`,
    params: { type: 'album', ids: newAlbumIdAry, token: session?.accessToken },
  });

  return (
    <>
      <ContainerBox>
        <Banner />
      </ContainerBox>
      <ContainerBox>
        <Typography variant="h6" component="div">
          <NextLink href={'/chart/now'}>TOP 100</NextLink> <FontAwesomeIcon icon={faAngleRight} />
        </Typography>
        <Top100 trackList={top100TrackList || []} likeInfoList={top100Likes?.likeInfoList} />
      </ContainerBox>
      <ContainerBox>
        <Typography variant="h6" component="div">
          <NextLink href={'/new/album'}>최신음악</NextLink> <FontAwesomeIcon icon={faAngleRight} />
        </Typography>
        <SwiperCard items={newAlbumList} likeInfoList={newAlbumLikes?.likeInfoList} />
      </ContainerBox>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const { data: Top100 } = await customAxios.get('/track/rank/now', {
    params: { size: 20 },
  });
  const { data: newAlbum } = await customAxios.get('/album/new', {
    params: { size: 8 },
  });

  return {
    props: {
      top100: Top100.data,
      newAlbumList: newAlbum.data.list,
    }, // will be passed to the page component as props
    revalidate: 3600, // In seconds
  };
}

export default Home;
