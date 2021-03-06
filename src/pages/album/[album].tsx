import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layout';
import {
  BasicLoading,
  ChoiceSlide,
  ContainerBox,
  MobileTrackList,
  PlayGroupChip,
  TrackTable,
} from '@components/common';
import Image from 'next/image';
import { albumDefaultImage } from '@assets/Images';
import { useTheme } from '@mui/material/styles';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Rating,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompactDisc,
  faChevronRight,
  faHeart,
  faAngleDown,
  faAngleUp,
  faAngleRight,
  faVideo,
  faDownload,
  faPlus,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRE } from '@fortawesome/free-regular-svg-icons';
import axios from '@lib/customAxios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { AlbumDetail } from 'types/album';

interface AlbumProps {
  albumData: AlbumDetail;
}

function Album({ albumData }: AlbumProps) {
  const { query, isFallback } = useRouter();
  const { album } = query;
  const {
    id,
    name,
    description,
    albumType,
    releaseDate,
    publisherName,
    thinkerName,
    image,
    trackList,
    artistInfo,
  } = albumData || {};

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [rating, setRating] = useState<number | null>(0);

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
          <Box width={{ xs: 160, sm: 200 }}>
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
              <Typography>{albumType}</Typography>
              <Typography variant="h6">{name}</Typography>
              <Typography>{artistInfo.name}</Typography>
              <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                <Typography>{releaseDate}</Typography>
              </Stack>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <Stack direction={{ xs: 'column', sm: 'row' }}>
                <Stack direction="row" alignItems="center" paddingRight={3}>
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
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating
                    name="simple-controlled"
                    size="large"
                    color="primary"
                    precision={0.5}
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <Typography>0</Typography>
                  <Typography color="text.secondary">{`??? 0???`}</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
                <Tooltip title="????????????">
                  <IconButton sx={{ color: 'text.secondary' }}>
                    <FontAwesomeIcon icon={faShareAlt} style={{ fontSize: '2rem' }} />
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
            <Tab label="?????????" sx={{ fontSize: '1.6rem' }} />
            <Tab label="????????????" sx={{ fontSize: '1.6rem' }} />
          </Tabs>
        </Box>
      </ContainerBox>
      {
        {
          0: (
            <ContainerBox>
              <Box
                display="flex"
                sx={{ justifyContent: 'flex-end', paddingTop: 3, paddingBottom: 3 }}
              >
                <PlayGroupChip
                  rows={trackList}
                  selected={selected}
                  onChangeSelected={onChangeSelected}
                />
              </Box>
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
            <>
              <ContainerBox>
                <Collapse in={show} collapsedSize={320}>
                  <Typography marginBottom={2}>????????????</Typography>
                  <Stack spacing={1} marginBottom={4}>
                    <Stack direction={'row'} spacing={6}>
                      <Typography color="text.secondary">??????</Typography>
                      <Typography>{albumType}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={6}>
                      <Typography color="text.secondary">??????</Typography>
                      <Typography>{''}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">?????????</Typography>
                      <Typography>{releaseDate}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">?????????</Typography>
                      <Typography>{publisherName}</Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={4}>
                      <Typography color="text.secondary">?????????</Typography>
                      <Typography>{thinkerName}</Typography>
                    </Stack>
                  </Stack>
                  <Typography>????????????</Typography>
                  <Stack sx={{ marginTop: 2 }}>
                    {description?.map((val, i) =>
                      val ? <Typography key={i}>{val}</Typography> : <br />
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
                <Typography variant="h6" marginBottom={2}>
                  Track List
                </Typography>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FontAwesomeIcon size="lg" icon={faAngleDown} />}
                    aria-controls="panel-content"
                    id="panel-header"
                  >
                    <Typography sx={{ width: '4%', flexShrink: 0, color: 'text.secondary' }}>
                      1
                    </Typography>
                    <Typography>TOMBOY</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper
                      elevation={6}
                      sx={{ alignContent: 'center', padding: 2, marginBottom: 2 }}
                    >
                      <Stack direction="row" spacing={6}>
                        <Stack spacing={1} color="text.secondary">
                          <Typography>??????</Typography>
                          <Typography>??????</Typography>
                          <Typography>??????</Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>??????</Typography>
                          <Typography>??????, Poptime, JENCI</Typography>
                          <Typography>Poptime, JENCI, ??????</Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                    <Stack>
                      <Typography>Look at you ??? ??? ????????? ???</Typography>
                      <Typography>Ya took off hook</Typography>
                      <Typography>????????? Coke like brrr</Typography>
                      <Typography>Look at my toe ?????? Ex ?????? Tattoo</Typography>
                      <Typography>I got to drink up now ?????? ?????? ?????? ??????</Typography>
                      <br />
                      <Typography>Look at you ??? ??? ????????? ???</Typography>
                      <Typography>Ya took off hook</Typography>
                      <Typography>????????? Coke like brrr</Typography>
                      <Typography>Look at my toe ?????? Ex ?????? Tattoo</Typography>
                      <Typography>I got to drink up now ?????? ?????? ?????? ??????</Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<FontAwesomeIcon size="lg" icon={faAngleDown} />}
                    aria-controls="panel-content"
                    id="panel-header"
                  >
                    <Typography sx={{ width: '4%', flexShrink: 0, color: 'text.secondary' }}>
                      2
                    </Typography>
                    <Typography>????????? ???</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper
                      elevation={6}
                      sx={{ alignContent: 'center', padding: 2, marginBottom: 2 }}
                    >
                      <Stack direction="row" spacing={6}>
                        <Stack spacing={1} color="text.secondary">
                          <Typography>??????</Typography>
                          <Typography>??????</Typography>
                          <Typography>??????</Typography>
                        </Stack>
                        <Stack spacing={1}>
                          <Typography>??????</Typography>
                          <Typography>??????, Poptime, JENCI</Typography>
                          <Typography>Poptime, JENCI, ??????</Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                    <Stack>
                      <Typography>Look at you ??? ??? ????????? ???</Typography>
                      <Typography>Ya took off hook</Typography>
                      <Typography>????????? Coke like brrr</Typography>
                      <Typography>Look at my toe ?????? Ex ?????? Tattoo</Typography>
                      <Typography>I got to drink up now ?????? ?????? ?????? ??????</Typography>
                      <br />
                      <Typography>Look at you ??? ??? ????????? ???</Typography>
                      <Typography>Ya took off hook</Typography>
                      <Typography>????????? Coke like brrr</Typography>
                      <Typography>Look at my toe ?????? Ex ?????? Tattoo</Typography>
                      <Typography>I got to drink up now ?????? ?????? ?????? ??????</Typography>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </ContainerBox>
            </>
          ),
        }[value]
      }
      <ChoiceSlide selected={selected} />
    </>
  );
}

Album.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { album } = params;
  try {
    const { data } = await axios.get(`/album/${album}`);
    return data ? { props: { albumData: data.data } } : { notFound: true };
  } catch (error) {
    // The Twitter API most likely died
    console.error(error);
    return { notFound: true };
  }
};

export default Album;
