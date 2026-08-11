import Cell from './cell.vue';
import CellGroup from './cell-group.vue';
import { withInstall } from '../shared/with-install';
export const KyCell = withInstall(Cell, 'KyCell');
export const KyCellGroup = withInstall(CellGroup, 'KyCellGroup');
export default KyCell;
export type { CellGroupProps, CellProps } from './cell';
