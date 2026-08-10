import Icon from './icon.vue';
import { withInstall } from '../shared/with-install';

export const KyIcon = withInstall(Icon, 'KyIcon');
export default KyIcon;
export { resolveIconPaths, resolveIconSize } from './icon';
export type { IconProps, IconSize, IconSource } from './icon';
export { iconfontNames, isIconfontName } from './iconfont';
export type { IconfontName } from './iconfont';
