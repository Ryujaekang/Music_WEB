import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import {
  BasicLoading,
  ChoiceSlide,
  ContainerBox,
  MobileTrackList,
  PlayGroupChip,
  ThumbnailCard,
  TrackTable,
} from '@components/common';
import Image from 'next/image';
import { albumDefaultImage } from '@assets/Images';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faShareAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRE } from '@fortawesome/free-regular-svg-icons';
import { orange } from '@mui/material/colors';
import axios from '@lib/customAxios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArtistDetail } from 'types/artist';

interface ArtistProps {
  artistData: ArtistDetail;
}

function Artist({ artistData }: ArtistProps) {
  const { query, isFallback } = useRouter();
  const { artist } = query;
  const {
    id,
    name,
    englishName,
    debut,
    birthday,
    country,
    agency,
    image,
    albumList,
    trackList,
    biosInfo,
  } = artistData || {};

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(4.5);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeShow = () => {
    setShow((prev) => !prev);
  };

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  if (isFallback) {
    return <BasicLoading />;
  }

  return (
    <>
      <ContainerBox sx={{ marginTop: 4 }}>
        <Stack direction="row" spacing={4}>
          <Box width={{ xs: 160, sm: 200 }} sx={{ borderRadius: '50%', overflow: 'hidden' }}>
            <Image
              layout="responsive"
              src={image ? image : albumDefaultImage}
              alt="default image"
              width={0}
              height={0}
            />
          </Box>
          <Stack flex="1" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="h6">{`${name} (${englishName})`}</Typography>
              <Stack direction="row" alignItems="center" paddingRight={3}>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  sx={{ color: orange[500] }}
                  icon={<FontAwesomeIcon icon={faStarRE} style={{ fontSize: '1.6rem' }} />}
                  checkedIcon={
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ fontSize: '1.6rem', color: orange[500] }}
                    />
                  }
                />
                <Typography>0</Typography>
              </Stack>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <Stack>
                <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                  <Typography sx={{ fontSize: '1.4rem' }}>{country}</Typography>
                  <Typography sx={{ fontSize: '1.4rem' }}>{debut}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                  {/* <Typography sx={{ fontSize: '1.4rem' }}>여성/솔로</Typography> */}
                  <Typography sx={{ fontSize: '1.4rem' }}>{agency}</Typography>
                </Stack>
              </Stack>
              <Tooltip title="공유하기">
                <IconButton sx={{ color: 'text.secondary' }}>
                  <FontAwesomeIcon icon={faShareAlt} style={{ fontSize: '2rem' }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </ContainerBox>
      <ContainerBox>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChangeValue}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="곡" sx={{ fontSize: '1.6rem' }} />
            <Tab label="앨범" sx={{ fontSize: '1.6rem' }} />
            <Tab label="비디오" sx={{ fontSize: '1.6rem' }} />
            <Tab label="상세정보" sx={{ fontSize: '1.6rem' }} />
          </Tabs>
        </Box>
      </ContainerBox>
      {
        {
          0: (
            <ContainerBox>
              <Stack
                direction={smUp ? 'row' : 'column'}
                spacing={1}
                justifyContent="space-between"
                marginBottom={2}
              >
                <Stack direction="row" spacing={2}>
                  <Link
                    component="button"
                    variant="body2"
                    color="primary"
                    underline="always"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    최신순
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    underline="none"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    인기순
                  </Link>
                  <Link
                    component="button"
                    variant="body2"
                    color="inherit"
                    underline="none"
                    onClick={() => {
                      console.info("I'm a button.");
                    }}
                  >
                    가나다순
                  </Link>
                </Stack>
                <PlayGroupChip
                  rows={trackList}
                  selected={selected}
                  onChangeSelected={onChangeSelected}
                />
              </Stack>
              {smUp ? (
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
              )}
            </ContainerBox>
          ),
          1: (
            <ContainerBox>
              <Stack direction="row" spacing={2} marginBottom={2}>
                <Link
                  component="button"
                  variant="body2"
                  color="primary"
                  underline="always"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  최신순
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  color="inherit"
                  underline="none"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  인기순
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  color="inherit"
                  underline="none"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  가나다순
                </Link>
              </Stack>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {albumList.map((item, i) => (
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
            </ContainerBox>
          ),
          3: (
            <>
              <ContainerBox>
                <Collapse in={show} collapsedSize={200}>
                  <Typography marginBottom={2}>활동정보</Typography>
                  <Stack spacing={1} marginBottom={4}>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">국적</Typography>
                      <Typography>{country}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">생일</Typography>
                      <Typography>{birthday}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">데뷔</Typography>
                      <Typography>{debut}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">유형</Typography>
                      <Typography>{''}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">장르</Typography>
                      <Typography>{''}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">소속사</Typography>
                      <Typography>{agency}</Typography>
                    </Stack>
                  </Stack>
                </Collapse>
                <Box display="flex" height={50} alignItems="center" justifyContent="center">
                  <IconButton onClick={handleChangeShow}>
                    <FontAwesomeIcon icon={show ? faAngleUp : faAngleDown} />
                  </IconButton>
                </Box>
                <Stack direction="row" spacing={6} marginBottom={4}>
                  <Stack spacing={1} color="text.secondary">
                    <Typography>SNS</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    {/* <Typography>유튜브 http://www.youtube.com/user/CJESGUMMY</Typography> */}
                  </Stack>
                </Stack>
                <Divider />
              </ContainerBox>
              <ContainerBox>
                <Collapse in={show} collapsedSize={140}>
                  <Typography>아티스트 소개</Typography>
                  {/* 백엔드 오류로 인한 임시적인 주석 처리 - 22.07.21 */}
                  {/* <Stack sx={{ marginTop: 2 }}>
                    {biosInfo.content?.map((val, i) => (
                      <Typography key={i}>{val}</Typography>
                    ))}
                  </Stack> */}
                </Collapse>
                <Box display="flex" height={50} alignItems="center" justifyContent="center">
                  <IconButton onClick={handleChangeShow}>
                    <FontAwesomeIcon icon={show ? faAngleUp : faAngleDown} />
                  </IconButton>
                </Box>
                <Divider />
              </ContainerBox>
            </>
          ),
        }[value]
      }
      <ChoiceSlide selected={selected} />
    </>
  );
}

Artist.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { artist } = params;
  try {
    const { data } = await axios.get(`/artist/${artist}`);
    return data ? { props: { artistData: data.data } } : { notFound: true };
  } catch (error) {
    // The Twitter API most likely died
    console.error(error);
    return { notFound: true };
  }
};

export default Artist;
