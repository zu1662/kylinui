import Grid from './grid.vue';
import GridItem from './grid-item.vue';
import { withInstall } from '../shared/with-install';
export const KyGrid = withInstall(Grid, 'KyGrid');
export const KyGridItem = withInstall(GridItem, 'KyGridItem');
export default KyGrid;
export type { GridItemProps, GridProps } from './grid';
