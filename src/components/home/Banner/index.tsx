import React from 'react';
import { Box } from '@mui/material';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './banner.module.scss';
import Image from 'next/image';

function Banner() {
  return (
    <Swiper
      pagination={{
        type: 'fraction',
        clickable: true,
      }}
      centeredSlides={true}
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      // loop={true}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className={styles.swiper}
    >
      <SwiperSlide className={styles.swiperSlide}>
        <Image
          layout="fill"
          src={'https://cdn.pixabay.com/photo/2022/03/25/23/47/bible-7092020_960_720.jpg'}
          alt="default image"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Banner;
