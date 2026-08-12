import Pagination from './pagination.vue';
import { withInstall } from '../shared/with-install';
export const KyPagination = withInstall(Pagination, 'KyPagination');
export default KyPagination;
export type { PaginationItem, PaginationMode, PaginationProps } from './pagination';
export { clampPage, getPaginationItems } from './pagination';
