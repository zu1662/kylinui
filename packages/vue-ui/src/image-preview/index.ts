import ImagePreview from './image-preview.vue';
import { withInstall } from '../shared/with-install';

export const KyImagePreview = withInstall(ImagePreview, 'KyImagePreview');
export default KyImagePreview;
export {
  closeImagePreview,
  imagePreviewServiceState,
  showImagePreview,
  useImagePreview,
} from './service';
export type {
  ImagePreviewChangePayload,
  ImagePreviewExpose,
  ImagePreviewInstance,
  ImagePreviewItem,
  ImagePreviewProps,
  ImagePreviewScalePayload,
  ImagePreviewSource,
} from './image-preview';
export type { ImagePreviewOptions } from './service';
export { normalizeImagePreviewIndex, normalizeImagePreviewItem } from './image-preview';
