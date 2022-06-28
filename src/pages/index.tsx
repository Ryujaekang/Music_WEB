import React from 'react';
import Layout from '@components/layout';
import { Paper, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Banner, Top100 } from '@components/home';
import { ContainerBox, SwiperCard } from '@components/common';
import axios from '@lib/customAxios';
import { Album } from 'types/album';
import { Chart } from 'types/chart';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import useRequest from '@lib/useRequest';

interface HomeProps {
  top100: Chart;
  newAlbumList: Album[];
  channel: any;
}

function Home({ top100, newAlbumList, channel }: HomeProps) {
  const { trackList: top100TrackList } = top100 || {};

  // const channelIdAry = channel.list.map((item) => item.id).toString();
  const newAlbumIdAry = newAlbumList.map((item) => item.id).toString();

  // const { data: channelLikes } = useRequest({
  //   url: `/api/like`,
  //   params: { type: 'album', ids: channelIdAry },
  // });

  const { data: newAlbumLikes } = useRequest({
    url: `/api/like`,
    params: { type: 'album', ids: newAlbumIdAry },
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
        <Top100 trackList={top100TrackList || []} />
      </ContainerBox>
      {/* <ContainerBox>
        <Typography variant="h6" component="div">
          {`${channel.channelInfo.displayName}`}
        </Typography>
        <SwiperCard items={channel.list} likeInfoList={channelLikes?.likeInfoList} />
      </ContainerBox> */}
      <ContainerBox>
        <Typography variant="h6" component="div">
          <NextLink href={'/new/track'}>최신음악</NextLink> <FontAwesomeIcon icon={faAngleRight} />
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
  const { data: Top100 } = await axios.get('/track/rank/now', {
    params: { size: 20 },
  });
  const { data: newAlbum } = await axios.get('/album/new', {
    params: { size: 8 },
  });
  // const { data: channel } = await axios.get('/channel');

  return {
    props: {
      top100: Top100.data,
      newAlbumList: newAlbum.data.list,
      // channel: channel.data,
    }, // will be passed to the page component as props
    revalidate: 3600, // In seconds
  };
}

export default Home;
