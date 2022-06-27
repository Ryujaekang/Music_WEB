import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import { ContainerBox } from '@components/common';
import Image from 'next/image';
import { albumDefaultImage } from '@assets/Images';
import {
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompactDisc,
  faChevronRight,
  faHeart,
  faAngleDown,
  faAngleUp,
  faVideo,
  faDownload,
  faPlus,
  faShareAlt,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import axios from '@lib/customAxios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Track as TrackType } from 'types/track';

interface TrackProps {
  trackData: TrackType;
}

function Track({ trackData }: TrackProps) {
  const { query, isFallback } = useRouter();
  const { track } = query;
  const {
    id,
    name,
    url,
    description,
    lyricser,
    composer,
    arranger,
    lyricsInfo,
    artistInfo,
    albumInfo,
  } = trackData || {};

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeShow = () => {
    setShow((prev) => !prev);
  };

  if (isFallback) {
    return (
      <Container
        sx={{
          display: 'flex',
          height: `calc(100vh - 180px)`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <ContainerBox sx={{ marginTop: 4 }}>
        <Stack direction="row" spacing={4}>
          <Box width={{ xs: 160, sm: 200 }}>
            <Image
              layout="responsive"
              src={albumInfo.image ? albumInfo.image : albumDefaultImage}
              alt="default image"
              width={0}
              height={0}
            />
          </Box>
          <Stack flex="1" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="h6">{name}</Typography>
              <Typography>{artistInfo.name}</Typography>
              <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                <FontAwesomeIcon icon={faCompactDisc} size="lg" />
                <Typography>{albumInfo.name}</Typography>
                <FontAwesomeIcon icon={faChevronRight} />
              </Stack>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <Stack direction="row" alignItems="center">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  color="primary"
                  icon={<FontAwesomeIcon icon={faHeartRE} style={{ fontSize: '1.6rem' }} />}
                  checkedIcon={<FontAwesomeIcon icon={faHeart} style={{ fontSize: '1.6rem' }} />}
                />
                <Typography>0</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
                <Tooltip title="뮤직비디오 보기">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon={faVideo} style={{ fontSize: '2rem' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="다운로드">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon={faDownload} style={{ fontSize: '2rem' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="플레이리스트 담기">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon={faPlus} style={{ fontSize: '2rem' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="공유하기">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon={faShareNodes} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ContainerBox>
      <ContainerBox>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChangeValue}>
            <Tab label="가사" sx={{ fontSize: '1.6rem' }} />
          </Tabs>
        </Box>
        <Collapse in={show} collapsedSize={220}>
          <Stack spacing={2} sx={{ marginTop: 4 }}>
            {lyricsInfo ? (
              lyricsInfo.lyrics?.map((val, i) => (
                <Box key={i}>
                  <Typography>{val.textOriginal}</Typography>
                  <Typography>{val.textPron}</Typography>
                </Box>
              ))
            ) : (
              <Typography>가사 미등록</Typography>
            )}
          </Stack>
        </Collapse>
        <Box display="flex" height={50} alignItems="center" justifyContent="center">
          <IconButton onClick={handleChangeShow}>
            <FontAwesomeIcon icon={show ? faAngleUp : faAngleDown} />
          </IconButton>
        </Box>
        <Divider />
      </ContainerBox>
      <ContainerBox>
        <Stack spacing={1} marginBottom={4}>
          <Stack direction={'row'} spacing={4}>
            <Typography color="text.secondary">작사</Typography>
            <Typography>{lyricser}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={4}>
            <Typography color="text.secondary">작곡</Typography>
            <Typography>{composer}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={4}>
            <Typography color="text.secondary">편곡</Typography>
            <Typography>{arranger}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={4}>
            <Typography color="text.secondary">장르</Typography>
            <Typography>{''}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={4}>
            <Typography color="text.secondary">태그</Typography>
            <Typography>{''}</Typography>
          </Stack>
        </Stack>
        <Divider />
      </ContainerBox>
      <ContainerBox>
        <Typography variant="h6">이 곡과 유사한</Typography>
      </ContainerBox>
    </>
  );
}

Track.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { track } = params;
  try {
    const { data } = await axios.get(`/track/${track}`);
    return data ? { props: { trackData: data.data } } : { notFound: true };
  } catch (error) {
    // The Twitter API most likely died
    console.error(error);
    return { notFound: true };
  }
};

export default Track;
