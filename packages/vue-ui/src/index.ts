import type { App } from 'vue';
import './style/index.less';
import './style/components.less';

import { KyButton } from './button';
import { KyIcon } from './icon';
import { KyTransition } from './transition';
import { KyTag } from './tag';
import { KyPopover } from './popover';
import { KyToast } from './toast';
import { KyDialog } from './dialog';
import { KyInput } from './input';
import { KySlider } from './slider';
import { KyRating } from './rating';
import { KyStepper } from './stepper';
import { KySwitch } from './switch';
import { KyCheckbox } from './checkbox';
import { KyRadio } from './radio';
import { KyFormCard } from './form-card';
import { KySteps } from './steps';
import { KySystemBar } from './system-bar';
import { KyPopup } from './popup';
import { KyActionSheet } from './action-sheet';
import { KyTabBar } from './tab-bar';
import { KySwiper } from './swiper';
import { KyPicker } from './picker';

// 全量安装入口与按需导出共用同一份组件集合，避免注册遗漏。
const components = [
  KyButton,
  KyIcon,
  KyTransition,
  KyTag,
  KyPopover,
  KyToast,
  KyDialog,
  KyInput,
  KySlider,
  KyRating,
  KyStepper,
  KySwitch,
  KyCheckbox,
  KyRadio,
  KyFormCard,
  KySteps,
  KySystemBar,
  KyPopup,
  KyActionSheet,
  KyTabBar,
  KySwiper,
  KyPicker,
];

export default {
  install(app: App) {
    components.forEach((component) => app.use(component));
  },
};

export * from './button';
export * from './icon';
export * from './transition';
export * from './tag';
export * from './popover';
export * from './toast';
export * from './dialog';
export * from './input';
export * from './slider';
export * from './rating';
export * from './stepper';
export * from './switch';
export * from './checkbox';
export * from './radio';
export * from './form-card';
export * from './steps';
export * from './system-bar';
export * from './popup';
export * from './action-sheet';
export * from './tab-bar';
export * from './swiper';
export * from './picker';
