import React, { useState, useRef, useEffect } from 'react';
import Layout from '@components/layout';
import { Box, Typography, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ContainerBox,
  PlayGroupChip,
  TrackTable,
  CustomSelect,
  CustomTab,
  ChoiceSlide,
  MobileTrackList,
} from '@components/common';
import axios from '@lib/customAxios';
import { Chart as ChartType } from 'types/chart';
import moment from 'moment';
import 'moment/locale/ko';
import { useRouter } from 'next/router';
import useRequest from '@lib/useRequest';
import { GetStaticPaths, GetStaticProps } from 'next';

interface ChartProps {
  chartData: ChartType;
}

function Chart({ chartData }: ChartProps) {
  const router = useRouter();
  const { type } = router.query;

  const { date, genre, layout, trackList } = chartData || {};
  const basicTimeType = tabItem.filter((item) => item.value === type);
  const [timeType, setTimeType] = useState(basicTimeType[0].value);
  const [genreType, setGenreType] = useState(genre);
  const [dateType, setDateType] = useState(layout?.dateList ? layout.dateList[0] : null);
  const [selected, setSelected] = useState<string[]>([]);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { data } = useRequest(
    {
      url: `/api/chart`,
      params: { type: router.query.type, genre: genreType, date: dateType },
    },
    { fallbackData: chartData }
  );

  const chartIdAry = data.trackList.map((item) => item.id).toString();

  const { data: chartLikes } = useRequest(
    chartIdAry
      ? {
          url: `/api/likeShow`,
          params: { type: 'track', ids: chartIdAry },
        }
      : null
  );

  const onChangeSelected = (val: string[]) => {
    setSelected(val);
  };

  useEffect(() => {
    const defaultDate = data.layout.dateList;
    defaultDate && setDateType(defaultDate[0]);
  }, [type]);

  return (
    <>
      <ContainerBox sx={{ marginTop: 2 }}>
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            뮤직차트
          </Typography>
          {smDown ? (
            <CustomSelect
              item={tabItem}
              typeString={'link'}
              type={timeType}
              setType={setTimeType}
            />
          ) : (
            <CustomTab item={tabItem} type={timeType} setType={setTimeType} />
          )}
        </Stack>
      </ContainerBox>
      <ContainerBox>
        <Stack direction={smDown ? 'column' : 'row'} spacing={1} justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            {
              {
                now: <Typography>{moment(date).format('l hh:mm')}</Typography>,
                day: (
                  <CustomSelect
                    item={layout?.genreList}
                    typeString="genre"
                    type={genreType}
                    setType={setGenreType}
                  />
                ),
                week: (
                  <>
                    <CustomSelect
                      item={layout?.genreList}
                      typeString="genre"
                      type={genreType}
                      setType={setGenreType}
                    />
                    {/* <CustomSelect
                      item={layout.dateList}
                      typeString="year"
                      type={yearType}
                      setType={setYearType}
                    /> */}
                    <CustomSelect
                      item={layout?.dateList}
                      typeString="week"
                      type={dateType}
                      setType={setDateType}
                    />
                  </>
                ),
                month: (
                  <>
                    <CustomSelect
                      item={layout?.genreList}
                      typeString="genre"
                      type={genreType}
                      setType={setGenreType}
                    />
                    {/* <CustomSelect
                      item={layout.dateList}
                      typeString="year"
                      type={yearType}
                      setType={setYearType}
                    /> */}
                    <CustomSelect
                      item={layout?.dateList}
                      typeString="month"
                      type={dateType}
                      setType={setDateType}
                    />
                  </>
                ),
              }[timeType]
            }
          </Stack>
          <PlayGroupChip
            rows={data.trackList}
            selected={selected}
            onChangeSelected={onChangeSelected}
          />
        </Stack>
      </ContainerBox>
      <ContainerBox>
        {smDown ? (
          <MobileTrackList
            rows={data.trackList}
            selected={selected}
            onChangeSelected={onChangeSelected}
          />
        ) : (
          <TrackTable
            tableHead={tableHead}
            rows={data.trackList}
            selected={selected}
            onChangeSelected={onChangeSelected}
            likeInfo={chartLikes?.likeInfoList}
          />
        )}
      </ContainerBox>
      <ChoiceSlide selected={selected} />
    </>
  );
}

Chart.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { type: 'now' } },
      { params: { type: 'day' } },
      { params: { type: 'week' } },
      { params: { type: 'month' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await axios.get(`/track/rank/${params.type}`).then((res) => res.data);

  return {
    props: {
      chartData: data,
    }, // will be passed to the page component as props
    revalidate: 3600, // In seconds
  };
};

export default Chart;

let tabItem = [
  {
    name: '실시간',
    value: 'now',
  },
  {
    name: '일간',
    value: 'day',
  },
  {
    name: '주간',
    value: 'week',
  },
  {
    name: '월간',
    value: 'month',
  },
];

const tableHead = [
  {
    id: 'thumbnail',
    numeric: false,
    disablePadding: true,
  },
  {
    id: 'rank',
    numeric: false,
    disablePadding: true,
  },
  {
    id: 'trackName',
    numeric: false,
    disablePadding: false,
    label: '곡명',
  },
  {
    id: 'artistName',
    numeric: false,
    disablePadding: false,
    label: '아티스트명',
  },
  {
    id: 'albumName',
    numeric: false,
    disablePadding: false,
    label: '앨범명',
  },
  {
    id: 'good',
    numeric: false,
    disablePadding: false,
    label: '좋아요',
  },
  {
    id: 'other',
    numeric: false,
    disablePadding: true,
  },
];
