import Loading from './loading.vue';
import { withInstall } from '../shared/with-install';
export const KyLoading = withInstall(Loading, 'KyLoading');
export default KyLoading;
export type { LoadingProps, LoadingType } from './loading';
