import RollingText from './rolling-text.vue';
import { withInstall } from '../shared/with-install';

export const KyRollingText = withInstall(RollingText, 'KyRollingText');
export default KyRollingText;
export type {
  RollingTextCharacter,
  RollingTextDirection,
  RollingTextExpose,
  RollingTextInstance,
  RollingTextProps,
  RollingTextValue,
} from './rolling-text';
export {
  createRollingCharacters,
  formatRollingNumber,
  normalizeRollingNumber,
} from './rolling-text';
