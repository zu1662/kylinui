import Image from './image.vue';
import { withInstall } from '../shared/with-install';
export const KyImage = withInstall(Image, 'KyImage');
export default KyImage;
export type { ImageFit, ImageProps } from './image';
export { resolveImageSize } from './image';
