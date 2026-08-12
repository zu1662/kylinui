import List from './list.vue';
import { withInstall } from '../shared/with-install';

export const KyList = withInstall(List, 'KyList');
export default KyList;
export type { ListDirection, ListProps } from './list';
