import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ContentSliderProps {
  children: React.ReactNode[];
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean | { delay: number };
  loop?: boolean;
  effect?: 'slide' | 'fade';
  breakpoints?: SwiperOptions['breakpoints'];
  className?: string;
}

const ContentSlider: React.FC<ContentSliderProps> = ({
  children,
  slidesPerView = 1,
  spaceBetween = 30,
  navigation = true,
  pagination = false,
  autoplay = false,
  loop = false,
  effect = 'slide',
  breakpoints,
  className = '',
}) => {
  const modules = [Navigation, Pagination, Autoplay, EffectFade];

  const autoplayConfig = typeof autoplay === 'object'
    ? { delay: autoplay.delay, disableOnInteraction: false }
    : autoplay
      ? { delay: 5000, disableOnInteraction: false }
      : false;

  return (
    <Swiper
      modules={modules}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      autoplay={autoplayConfig}
      loop={loop}
      effect={effect}
      breakpoints={breakpoints}
      className={`content-slider ${className}`}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContentSlider;
