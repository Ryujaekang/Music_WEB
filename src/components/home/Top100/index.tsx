import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import styles from './top100.module.scss';

// import required modules
import { Grid, Pagination } from 'swiper';
import { RankingCard } from '@components/common';
import { useColorMode } from '@theme/index';
import { ChartTrack } from 'types/track';
import { Likes } from 'types/like';

interface Top100Props {
  trackList: ChartTrack[];
  likeInfoList: Likes;
}

function Top100({ trackList, likeInfoList }: Top100Props) {
  const { mode } = useColorMode();

  return (
    <>
      <Swiper
        slidesPerView={1}
        grid={{
          rows: 4,
        }}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: { rows: 4 },
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 20,
            grid: { rows: 4 },
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 20,
            grid: { rows: 4 },
          },
        }}
        modules={[Grid, Pagination]}
        style={{
          '--swiper-pagination-color': mode === 'dark' && '#fff',
          '--swiper-pagination-bullet-inactive-color': mode === 'dark' && '#fff',
        }}
        className={styles.swiper}
      >
        {trackList.map((item, i) => {
          return (
            <SwiperSlide
              key={i}
              className={styles.swiperSlide}
              style={{ justifyContent: 'flex-start' }}
            >
              <RankingCard
                adult={item.adult}
                albumId={item.albumId}
                albumImage={item.albumImage}
                artistId={item.artistId}
                artistName={item.artistName}
                id={item.id}
                name={item.name}
                rank={item.rank}
                wave={item.wave}
                musicUrl={item.musicUrl}
                likeInfo={likeInfoList[i]}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Top100;
