import Swiper from './swiper.vue';
import { withInstall } from '../shared/with-install';

export const KySwiper = withInstall(Swiper, 'KySwiper');
export default KySwiper;
export type { SwiperItem, SwiperProps } from './swiper';
