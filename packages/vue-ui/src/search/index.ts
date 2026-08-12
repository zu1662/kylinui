import Search from './search.vue';
import { withInstall } from '../shared/with-install';
export const KySearch = withInstall(Search, 'KySearch');
export default KySearch;
export type { SearchProps, SearchShape } from './search';
