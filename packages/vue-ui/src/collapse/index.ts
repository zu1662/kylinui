import Collapse from './collapse.vue';
import CollapseItem from './collapse-item.vue';
import { withInstall } from '../shared/with-install';
export const KyCollapse = withInstall(Collapse, 'KyCollapse');
export const KyCollapseItem = withInstall(CollapseItem, 'KyCollapseItem');
export default KyCollapse;
export type { CollapseItemProps, CollapseName, CollapseProps } from './collapse';
