import NoticeBar from './notice-bar.vue';
import { withInstall } from '../shared/with-install';
export const KyNoticeBar = withInstall(NoticeBar, 'KyNoticeBar');
export default KyNoticeBar;
export type { NoticeBarMode, NoticeBarProps } from './notice-bar';
