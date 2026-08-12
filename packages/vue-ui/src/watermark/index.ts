import Watermark from './watermark.vue';
import { withInstall } from '../shared/with-install';
export const KyWatermark = withInstall(Watermark, 'KyWatermark');
export default KyWatermark;
export type { WatermarkProps } from './watermark';
export { escapeWatermarkText } from './watermark';
