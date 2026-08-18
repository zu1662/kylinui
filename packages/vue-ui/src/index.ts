import type { App } from 'vue';
import './style/index.less';
import './style/components.less';
import { setServiceAppContext } from './shared/service-app-context';

import { KyConfigProvider } from './config-provider';
import { KyButton } from './button';
import { KyIcon } from './icon';
import { KyTransition } from './transition';
import { KyTag } from './tag';
import { KyPopover } from './popover';
import { KyToast } from './toast';
import { KyDialog } from './dialog';
import { KyForm, KyFormItem } from './form';
import { KyInput } from './input';
import { KyTextarea } from './textarea';
import { KyRating } from './rating';
import { KyStepper } from './stepper';
import { KySwitch } from './switch';
import { KyCheckbox, KyCheckboxGroup } from './checkbox';
import { KyRadio, KyRadioGroup } from './radio';
import { KyFormCard } from './form-card';
import { KySteps } from './steps';
import { KyPopup } from './popup';
import { KyActionSheet } from './action-sheet';
import { KyTabBar } from './tab-bar';
import { KySwiper } from './swiper';
import { KyPicker } from './picker';
import { KyCalendar } from './calendar';
import { KyBadge } from './badge';
import { KyDivider } from './divider';
import { KySpace } from './space';
import { KyGrid, KyGridItem } from './grid';
import { KyCell, KyCellGroup } from './cell';
import { KyLoading } from './loading';
import { KyProgress } from './progress';
import { KyEmpty } from './empty';
import { KyNavBar } from './nav-bar';
import { KyNoticeBar } from './notice-bar';
import { KyCountDown } from './count-down';
import { KyBackTop } from './back-top';
import { KyCircle } from './circle';
import { KyCollapse, KyCollapseItem } from './collapse';
import { KySearch } from './search';
import { KySkeleton } from './skeleton';
import { KySticky } from './sticky';
import { KyImage } from './image';
import { KyImagePreview } from './image-preview';
import { KySidebar, KySidebarItem } from './sidebar';
import { KyTextEllipsis } from './text-ellipsis';
import { KyWatermark } from './watermark';
import { KyList } from './list';
import { KyHighlight } from './highlight';
import { KyRollingText } from './rolling-text';
import { KyNumberKeyboard } from './number-keyboard';

// 全量安装入口与按需导出共用同一份组件集合，避免注册遗漏。
const components = [
  KyConfigProvider,
  KyButton,
  KyIcon,
  KyTransition,
  KyTag,
  KyPopover,
  KyToast,
  KyDialog,
  KyForm,
  KyFormItem,
  KyInput,
  KyTextarea,
  KyRating,
  KyStepper,
  KySwitch,
  KyCheckbox,
  KyCheckboxGroup,
  KyRadio,
  KyRadioGroup,
  KyFormCard,
  KySteps,
  KyPopup,
  KyActionSheet,
  KyTabBar,
  KySwiper,
  KyPicker,
  KyCalendar,
  KyBadge,
  KyDivider,
  KySpace,
  KyGrid,
  KyGridItem,
  KyCell,
  KyCellGroup,
  KyLoading,
  KyProgress,
  KyEmpty,
  KyNavBar,
  KyNoticeBar,
  KyCountDown,
  KyBackTop,
  KyCircle,
  KyCollapse,
  KyCollapseItem,
  KySearch,
  KySkeleton,
  KySticky,
  KyImage,
  KyImagePreview,
  KySidebar,
  KySidebarItem,
  KyTextEllipsis,
  KyWatermark,
  KyList,
  KyHighlight,
  KyRollingText,
  KyNumberKeyboard,
];

export default {
  install(app: App) {
    setServiceAppContext(app);
    components.forEach((component) => app.use(component));
  },
};

export * from './config-provider';
export * from './button';
export * from './icon';
export * from './transition';
export * from './tag';
export * from './popover';
export * from './toast';
export * from './dialog';
export * from './form';
export * from './input';
export * from './textarea';
export * from './rating';
export * from './stepper';
export * from './switch';
export * from './checkbox';
export * from './radio';
export * from './form-card';
export * from './steps';
export * from './popup';
export * from './action-sheet';
export * from './tab-bar';
export * from './swiper';
export * from './picker';
export * from './calendar';
export * from './badge';
export * from './divider';
export * from './space';
export * from './grid';
export * from './cell';
export * from './loading';
export * from './progress';
export * from './empty';
export * from './nav-bar';
export * from './notice-bar';
export * from './count-down';
export * from './back-top';
export * from './circle';
export * from './collapse';
export * from './search';
export * from './skeleton';
export * from './sticky';
export * from './image';
export * from './image-preview';
export * from './sidebar';
export * from './text-ellipsis';
export * from './watermark';
export * from './list';
export * from './highlight';
export * from './rolling-text';
export * from './number-keyboard';

export * from './theme';
