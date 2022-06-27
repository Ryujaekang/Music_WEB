import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import styles from './swiperArtistCard.module.scss';

// import required modules
import { Grid, Pagination } from 'swiper';
// import ThumbnailCard, { ThumbnailCardProps } from '../ThumbnailCard';
import ArtistCard, { ArtistCardProps } from '../ArtistCard';
import { useColorMode } from '@theme/index';
import { ArtistSearch } from 'types/search';

interface SwiperArtistCardProps {
  items: ArtistCardProps[];
}

function SwiperArtistCard({ items }: SwiperArtistCardProps) {
  const { mode } = useColorMode();

  return (
    <>
      <Swiper
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 20,
          },
        }}
        modules={[Grid, Pagination]}
        style={{
          '--swiper-pagination-color': mode === 'dark' && '#fff',
          '--swiper-pagination-bullet-inactive-color': mode === 'dark' && '#fff',
        }}
        className={styles.swiper}
      >
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <ArtistCard
                id={item.id}
                name={item.name}
                englishName={item.englishName}
                image={item.image}
                country={item.country}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SwiperArtistCard;
