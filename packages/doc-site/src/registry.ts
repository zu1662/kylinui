import type { ComponentEntry } from './types';

import buttonConfig from '@vue-ui/button/_usage/config';
import ButtonUsage from '@vue-ui/button/_usage/index.vue';
import ButtonDemo from '@vue-ui/button/_demo/basic.vue';
import buttonDoc from '@vue-ui/button/_doc/button.md?raw';
import tagConfig from '@vue-ui/tag/_usage/config';
import TagUsage from '@vue-ui/tag/_usage/index.vue';
import TagDemo from '@vue-ui/tag/_demo/basic.vue';
import tagDoc from '@vue-ui/tag/_doc/tag.md?raw';
import popoverConfig from '@vue-ui/popover/_usage/config';
import PopoverUsage from '@vue-ui/popover/_usage/index.vue';
import PopoverDemo from '@vue-ui/popover/_demo/basic.vue';
import popoverDoc from '@vue-ui/popover/_doc/popover.md?raw';
import toastConfig from '@vue-ui/toast/_usage/config';
import ToastUsage from '@vue-ui/toast/_usage/index.vue';
import ToastDemo from '@vue-ui/toast/_demo/basic.vue';
import toastDoc from '@vue-ui/toast/_doc/toast.md?raw';
import sheetConfig from '@vue-ui/bottom-sheet/_usage/config';
import SheetUsage from '@vue-ui/bottom-sheet/_usage/index.vue';
import SheetDemo from '@vue-ui/bottom-sheet/_demo/basic.vue';
import sheetDoc from '@vue-ui/bottom-sheet/_doc/bottom-sheet.md?raw';
import dialogConfig from '@vue-ui/dialog/_usage/config';
import DialogUsage from '@vue-ui/dialog/_usage/index.vue';
import DialogDemo from '@vue-ui/dialog/_demo/basic.vue';
import dialogDoc from '@vue-ui/dialog/_doc/dialog.md?raw';
import inputConfig from '@vue-ui/input/_usage/config';
import InputUsage from '@vue-ui/input/_usage/index.vue';
import InputDemo from '@vue-ui/input/_demo/basic.vue';
import inputDoc from '@vue-ui/input/_doc/input.md?raw';
import sliderConfig from '@vue-ui/slider/_usage/config';
import SliderUsage from '@vue-ui/slider/_usage/index.vue';
import SliderDemo from '@vue-ui/slider/_demo/basic.vue';
import sliderDoc from '@vue-ui/slider/_doc/slider.md?raw';
import ratingConfig from '@vue-ui/rating/_usage/config';
import RatingUsage from '@vue-ui/rating/_usage/index.vue';
import RatingDemo from '@vue-ui/rating/_demo/basic.vue';
import ratingDoc from '@vue-ui/rating/_doc/rating.md?raw';
import stepperConfig from '@vue-ui/stepper/_usage/config';
import StepperUsage from '@vue-ui/stepper/_usage/index.vue';
import StepperDemo from '@vue-ui/stepper/_demo/basic.vue';
import stepperDoc from '@vue-ui/stepper/_doc/stepper.md?raw';
import switchConfig from '@vue-ui/switch/_usage/config';
import SwitchUsage from '@vue-ui/switch/_usage/index.vue';
import SwitchDemo from '@vue-ui/switch/_demo/basic.vue';
import switchDoc from '@vue-ui/switch/_doc/switch.md?raw';
import checkboxConfig from '@vue-ui/checkbox/_usage/config';
import CheckboxUsage from '@vue-ui/checkbox/_usage/index.vue';
import CheckboxDemo from '@vue-ui/checkbox/_demo/basic.vue';
import checkboxDoc from '@vue-ui/checkbox/_doc/checkbox.md?raw';
import radioConfig from '@vue-ui/radio/_usage/config';
import RadioUsage from '@vue-ui/radio/_usage/index.vue';
import RadioDemo from '@vue-ui/radio/_demo/basic.vue';
import radioDoc from '@vue-ui/radio/_doc/radio.md?raw';
import formCardConfig from '@vue-ui/form-card/_usage/config';
import FormCardUsage from '@vue-ui/form-card/_usage/index.vue';
import FormCardDemo from '@vue-ui/form-card/_demo/basic.vue';
import formCardDoc from '@vue-ui/form-card/_doc/form-card.md?raw';
import stepsConfig from '@vue-ui/steps/_usage/config';
import StepsUsage from '@vue-ui/steps/_usage/index.vue';
import StepsDemo from '@vue-ui/steps/_demo/basic.vue';
import stepsDoc from '@vue-ui/steps/_doc/steps.md?raw';
import systemBarConfig from '@vue-ui/system-bar/_usage/config';
import SystemBarUsage from '@vue-ui/system-bar/_usage/index.vue';
import SystemBarDemo from '@vue-ui/system-bar/_demo/basic.vue';
import systemBarDoc from '@vue-ui/system-bar/_doc/system-bar.md?raw';

// 注册表同时驱动导航、实时配置、基础示例与 Markdown 文档。
export const components: ComponentEntry[] = [
  { slug: 'button', group: '基础组件', title: 'Button 按钮', config: buttonConfig, usage: ButtonUsage, demo: ButtonDemo, doc: buttonDoc },
  { slug: 'tag', group: '基础组件', title: 'Tag 标签', config: tagConfig, usage: TagUsage, demo: TagDemo, doc: tagDoc },
  { slug: 'popover', group: '反馈组件', title: 'Popover 气泡', config: popoverConfig, usage: PopoverUsage, demo: PopoverDemo, doc: popoverDoc },
  { slug: 'toast', group: '反馈组件', title: 'Toast 轻提示', config: toastConfig, usage: ToastUsage, demo: ToastDemo, doc: toastDoc },
  { slug: 'bottom-sheet', group: '反馈组件', title: 'Bottom Sheet 底部浮层', config: sheetConfig, usage: SheetUsage, demo: SheetDemo, doc: sheetDoc },
  { slug: 'dialog', group: '反馈组件', title: 'Dialog 对话框', config: dialogConfig, usage: DialogUsage, demo: DialogDemo, doc: dialogDoc },
  { slug: 'input', group: '表单组件', title: 'Input 输入框', config: inputConfig, usage: InputUsage, demo: InputDemo, doc: inputDoc },
  { slug: 'slider', group: '表单组件', title: 'Slider 滑动选择器', config: sliderConfig, usage: SliderUsage, demo: SliderDemo, doc: sliderDoc },
  { slug: 'rating', group: '表单组件', title: 'Rating 评分器', config: ratingConfig, usage: RatingUsage, demo: RatingDemo, doc: ratingDoc },
  { slug: 'stepper', group: '表单组件', title: 'Stepper 步进器', config: stepperConfig, usage: StepperUsage, demo: StepperDemo, doc: stepperDoc },
  { slug: 'switch', group: '表单组件', title: 'Switch 开关', config: switchConfig, usage: SwitchUsage, demo: SwitchDemo, doc: switchDoc },
  { slug: 'checkbox', group: '表单组件', title: 'Checkbox 复选框', config: checkboxConfig, usage: CheckboxUsage, demo: CheckboxDemo, doc: checkboxDoc },
  { slug: 'radio', group: '表单组件', title: 'Radio 单选框', config: radioConfig, usage: RadioUsage, demo: RadioDemo, doc: radioDoc },
  { slug: 'form-card', group: '流程组件', title: 'Form Card 表单卡片', config: formCardConfig, usage: FormCardUsage, demo: FormCardDemo, doc: formCardDoc },
  { slug: 'steps', group: '流程组件', title: 'Steps 步骤器', config: stepsConfig, usage: StepsUsage, demo: StepsDemo, doc: stepsDoc },
  { slug: 'system-bar', group: '导航组件', title: 'System Bar 系统栏', config: systemBarConfig, usage: SystemBarUsage, demo: SystemBarDemo, doc: systemBarDoc },
];
