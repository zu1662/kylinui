import type { ComponentEntry } from './types';

import iconConfig from '@vue-ui/icon/_usage/config';
import IconUsage from '@vue-ui/icon/_usage/index.vue';
import IconDemo from '@vue-ui/icon/_demo/basic.vue';
import iconDoc from '@vue-ui/icon/_doc/icon.md?raw';
import transitionConfig from '@vue-ui/transition/_usage/config';
import TransitionUsage from '@vue-ui/transition/_usage/index.vue';
import TransitionDemo from '@vue-ui/transition/_demo/basic.vue';
import transitionDoc from '@vue-ui/transition/_doc/transition.md?raw';
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
import popupConfig from '@vue-ui/popup/_usage/config';
import PopupUsage from '@vue-ui/popup/_usage/index.vue';
import PopupDemo from '@vue-ui/popup/_demo/basic.vue';
import popupDoc from '@vue-ui/popup/_doc/popup.md?raw';
import actionSheetConfig from '@vue-ui/action-sheet/_usage/config';
import ActionSheetUsage from '@vue-ui/action-sheet/_usage/index.vue';
import ActionSheetDemo from '@vue-ui/action-sheet/_demo/basic.vue';
import actionSheetDoc from '@vue-ui/action-sheet/_doc/action-sheet.md?raw';
import tabBarConfig from '@vue-ui/tab-bar/_usage/config';
import TabBarUsage from '@vue-ui/tab-bar/_usage/index.vue';
import TabBarDemo from '@vue-ui/tab-bar/_demo/basic.vue';
import tabBarDoc from '@vue-ui/tab-bar/_doc/tab-bar.md?raw';
import swiperConfig from '@vue-ui/swiper/_usage/config';
import SwiperUsage from '@vue-ui/swiper/_usage/index.vue';
import SwiperDemo from '@vue-ui/swiper/_demo/basic.vue';
import swiperDoc from '@vue-ui/swiper/_doc/swiper.md?raw';
import pickerConfig from '@vue-ui/picker/_usage/config';
import PickerUsage from '@vue-ui/picker/_usage/index.vue';
import PickerDemo from '@vue-ui/picker/_demo/basic.vue';
import pickerDoc from '@vue-ui/picker/_doc/picker.md?raw';

import badgeConfig from '@vue-ui/badge/_usage/config';
import BadgeUsage from '@vue-ui/badge/_usage/index.vue';
import BadgeDemo from '@vue-ui/badge/_demo/basic.vue';
import badgeDoc from '@vue-ui/badge/_doc/badge.md?raw';
import dividerConfig from '@vue-ui/divider/_usage/config';
import DividerUsage from '@vue-ui/divider/_usage/index.vue';
import DividerDemo from '@vue-ui/divider/_demo/basic.vue';
import dividerDoc from '@vue-ui/divider/_doc/divider.md?raw';
import spaceConfig from '@vue-ui/space/_usage/config';
import SpaceUsage from '@vue-ui/space/_usage/index.vue';
import SpaceDemo from '@vue-ui/space/_demo/basic.vue';
import spaceDoc from '@vue-ui/space/_doc/space.md?raw';
import gridConfig from '@vue-ui/grid/_usage/config';
import GridUsage from '@vue-ui/grid/_usage/index.vue';
import GridDemo from '@vue-ui/grid/_demo/basic.vue';
import gridDoc from '@vue-ui/grid/_doc/grid.md?raw';
import cellConfig from '@vue-ui/cell/_usage/config';
import CellUsage from '@vue-ui/cell/_usage/index.vue';
import CellDemo from '@vue-ui/cell/_demo/basic.vue';
import cellDoc from '@vue-ui/cell/_doc/cell.md?raw';
import loadingConfig from '@vue-ui/loading/_usage/config';
import LoadingUsage from '@vue-ui/loading/_usage/index.vue';
import LoadingDemo from '@vue-ui/loading/_demo/basic.vue';
import loadingDoc from '@vue-ui/loading/_doc/loading.md?raw';
import progressConfig from '@vue-ui/progress/_usage/config';
import ProgressUsage from '@vue-ui/progress/_usage/index.vue';
import ProgressDemo from '@vue-ui/progress/_demo/basic.vue';
import progressDoc from '@vue-ui/progress/_doc/progress.md?raw';
import emptyConfig from '@vue-ui/empty/_usage/config';
import EmptyUsage from '@vue-ui/empty/_usage/index.vue';
import EmptyDemo from '@vue-ui/empty/_demo/basic.vue';
import emptyDoc from '@vue-ui/empty/_doc/empty.md?raw';
import navBarConfig from '@vue-ui/nav-bar/_usage/config';
import NavBarUsage from '@vue-ui/nav-bar/_usage/index.vue';
import NavBarDemo from '@vue-ui/nav-bar/_demo/basic.vue';
import navBarDoc from '@vue-ui/nav-bar/_doc/nav-bar.md?raw';
import noticeBarConfig from '@vue-ui/notice-bar/_usage/config';
import NoticeBarUsage from '@vue-ui/notice-bar/_usage/index.vue';
import NoticeBarDemo from '@vue-ui/notice-bar/_demo/basic.vue';
import noticeBarDoc from '@vue-ui/notice-bar/_doc/notice-bar.md?raw';
import countDownConfig from '@vue-ui/count-down/_usage/config';
import CountDownUsage from '@vue-ui/count-down/_usage/index.vue';
import CountDownDemo from '@vue-ui/count-down/_demo/basic.vue';
import countDownDoc from '@vue-ui/count-down/_doc/count-down.md?raw';
import backTopConfig from '@vue-ui/back-top/_usage/config';
import BackTopUsage from '@vue-ui/back-top/_usage/index.vue';
import BackTopDemo from '@vue-ui/back-top/_demo/basic.vue';
import backTopDoc from '@vue-ui/back-top/_doc/back-top.md?raw';
import circleConfig from '@vue-ui/circle/_usage/config';
import CircleUsage from '@vue-ui/circle/_usage/index.vue';
import CircleDemo from '@vue-ui/circle/_demo/basic.vue';
import circleDoc from '@vue-ui/circle/_doc/circle.md?raw';
import collapseConfig from '@vue-ui/collapse/_usage/config';
import CollapseUsage from '@vue-ui/collapse/_usage/index.vue';
import CollapseDemo from '@vue-ui/collapse/_demo/basic.vue';
import collapseDoc from '@vue-ui/collapse/_doc/collapse.md?raw';
import searchConfig from '@vue-ui/search/_usage/config';
import SearchUsage from '@vue-ui/search/_usage/index.vue';
import SearchDemo from '@vue-ui/search/_demo/basic.vue';
import searchDoc from '@vue-ui/search/_doc/search.md?raw';
import skeletonConfig from '@vue-ui/skeleton/_usage/config';
import SkeletonUsage from '@vue-ui/skeleton/_usage/index.vue';
import SkeletonDemo from '@vue-ui/skeleton/_demo/basic.vue';
import skeletonDoc from '@vue-ui/skeleton/_doc/skeleton.md?raw';
import stickyConfig from '@vue-ui/sticky/_usage/config';
import StickyUsage from '@vue-ui/sticky/_usage/index.vue';
import StickyDemo from '@vue-ui/sticky/_demo/basic.vue';
import stickyDoc from '@vue-ui/sticky/_doc/sticky.md?raw';
import imageConfig from '@vue-ui/image/_usage/config';
import ImageUsage from '@vue-ui/image/_usage/index.vue';
import ImageDemo from '@vue-ui/image/_demo/basic.vue';
import imageDoc from '@vue-ui/image/_doc/image.md?raw';
import imagePreviewConfig from '@vue-ui/image-preview/_usage/config';
import ImagePreviewUsage from '@vue-ui/image-preview/_usage/index.vue';
import ImagePreviewDemo from '@vue-ui/image-preview/_demo/basic.vue';
import imagePreviewDoc from '@vue-ui/image-preview/_doc/image-preview.md?raw';
import paginationConfig from '@vue-ui/pagination/_usage/config';
import PaginationUsage from '@vue-ui/pagination/_usage/index.vue';
import PaginationDemo from '@vue-ui/pagination/_demo/basic.vue';
import paginationDoc from '@vue-ui/pagination/_doc/pagination.md?raw';
import sidebarConfig from '@vue-ui/sidebar/_usage/config';
import SidebarUsage from '@vue-ui/sidebar/_usage/index.vue';
import SidebarDemo from '@vue-ui/sidebar/_demo/basic.vue';
import sidebarDoc from '@vue-ui/sidebar/_doc/sidebar.md?raw';
import textEllipsisConfig from '@vue-ui/text-ellipsis/_usage/config';
import TextEllipsisUsage from '@vue-ui/text-ellipsis/_usage/index.vue';
import TextEllipsisDemo from '@vue-ui/text-ellipsis/_demo/basic.vue';
import textEllipsisDoc from '@vue-ui/text-ellipsis/_doc/text-ellipsis.md?raw';
import watermarkConfig from '@vue-ui/watermark/_usage/config';
import WatermarkUsage from '@vue-ui/watermark/_usage/index.vue';
import WatermarkDemo from '@vue-ui/watermark/_demo/basic.vue';
import watermarkDoc from '@vue-ui/watermark/_doc/watermark.md?raw';
import listConfig from '@vue-ui/list/_usage/config';
import ListUsage from '@vue-ui/list/_usage/index.vue';
import ListDemo from '@vue-ui/list/_demo/basic.vue';
import listDoc from '@vue-ui/list/_doc/list.md?raw';
import highlightConfig from '@vue-ui/highlight/_usage/config';
import HighlightUsage from '@vue-ui/highlight/_usage/index.vue';
import HighlightDemo from '@vue-ui/highlight/_demo/basic.vue';
import highlightDoc from '@vue-ui/highlight/_doc/highlight.md?raw';
import rollingTextConfig from '@vue-ui/rolling-text/_usage/config';
import RollingTextUsage from '@vue-ui/rolling-text/_usage/index.vue';
import RollingTextDemo from '@vue-ui/rolling-text/_demo/basic.vue';
import rollingTextDoc from '@vue-ui/rolling-text/_doc/rolling-text.md?raw';
import numberKeyboardConfig from '@vue-ui/number-keyboard/_usage/config';
import NumberKeyboardUsage from '@vue-ui/number-keyboard/_usage/index.vue';
import NumberKeyboardDemo from '@vue-ui/number-keyboard/_demo/basic.vue';
import numberKeyboardDoc from '@vue-ui/number-keyboard/_doc/number-keyboard.md?raw';

// 注册表同时驱动导航、实时配置、基础示例与 Markdown 文档。
export const components: ComponentEntry[] = [
  {
    slug: 'back-top',
    group: '导航组件',
    title: 'BackTop 返回顶部',
    config: backTopConfig,
    usage: BackTopUsage,
    demo: BackTopDemo,
    doc: backTopDoc,
  },
  {
    slug: 'circle',
    group: '反馈组件',
    title: 'Circle 环形进度',
    config: circleConfig,
    usage: CircleUsage,
    demo: CircleDemo,
    doc: circleDoc,
  },
  {
    slug: 'collapse',
    group: '展示组件',
    title: 'Collapse 折叠面板',
    config: collapseConfig,
    usage: CollapseUsage,
    demo: CollapseDemo,
    doc: collapseDoc,
  },
  {
    slug: 'search',
    group: '表单组件',
    title: 'Search 搜索',
    config: searchConfig,
    usage: SearchUsage,
    demo: SearchDemo,
    doc: searchDoc,
  },
  {
    slug: 'skeleton',
    group: '反馈组件',
    title: 'Skeleton 骨架屏',
    config: skeletonConfig,
    usage: SkeletonUsage,
    demo: SkeletonDemo,
    doc: skeletonDoc,
  },
  {
    slug: 'sticky',
    group: '导航组件',
    title: 'Sticky 粘性布局',
    config: stickyConfig,
    usage: StickyUsage,
    demo: StickyDemo,
    doc: stickyDoc,
  },
  {
    slug: 'image',
    group: '展示组件',
    title: 'Image 图片',
    config: imageConfig,
    usage: ImageUsage,
    demo: ImageDemo,
    doc: imageDoc,
  },
  {
    slug: 'image-preview',
    group: '展示组件',
    title: 'ImagePreview 图片预览',
    config: imagePreviewConfig,
    usage: ImagePreviewUsage,
    demo: ImagePreviewDemo,
    doc: imagePreviewDoc,
  },
  {
    slug: 'pagination',
    group: '导航组件',
    title: 'Pagination 分页',
    config: paginationConfig,
    usage: PaginationUsage,
    demo: PaginationDemo,
    doc: paginationDoc,
  },
  {
    slug: 'sidebar',
    group: '导航组件',
    title: 'Sidebar 侧边导航',
    config: sidebarConfig,
    usage: SidebarUsage,
    demo: SidebarDemo,
    doc: sidebarDoc,
  },
  {
    slug: 'text-ellipsis',
    group: '展示组件',
    title: 'TextEllipsis 文本省略',
    config: textEllipsisConfig,
    usage: TextEllipsisUsage,
    demo: TextEllipsisDemo,
    doc: textEllipsisDoc,
  },
  {
    slug: 'watermark',
    group: '展示组件',
    title: 'Watermark 水印',
    config: watermarkConfig,
    usage: WatermarkUsage,
    demo: WatermarkDemo,
    doc: watermarkDoc,
  },
  {
    slug: 'list',
    group: '反馈组件',
    title: 'List 列表加载',
    config: listConfig,
    usage: ListUsage,
    demo: ListDemo,
    doc: listDoc,
  },
  {
    slug: 'highlight',
    group: '展示组件',
    title: 'Highlight 关键词高亮',
    config: highlightConfig,
    usage: HighlightUsage,
    demo: HighlightDemo,
    doc: highlightDoc,
  },
  {
    slug: 'rolling-text',
    group: '展示组件',
    title: 'RollingText 数字翻牌',
    config: rollingTextConfig,
    usage: RollingTextUsage,
    demo: RollingTextDemo,
    doc: rollingTextDoc,
  },
  {
    slug: 'number-keyboard',
    group: '表单组件',
    title: 'NumberKeyboard 数字键盘',
    config: numberKeyboardConfig,
    usage: NumberKeyboardUsage,
    demo: NumberKeyboardDemo,
    doc: numberKeyboardDoc,
  },
  {
    slug: 'badge',
    group: '基础组件',
    title: 'Badge 徽标',
    config: badgeConfig,
    usage: BadgeUsage,
    demo: BadgeDemo,
    doc: badgeDoc,
  },
  {
    slug: 'divider',
    group: '基础组件',
    title: 'Divider 分割线',
    config: dividerConfig,
    usage: DividerUsage,
    demo: DividerDemo,
    doc: dividerDoc,
  },
  {
    slug: 'space',
    group: '基础组件',
    title: 'Space 间距',
    config: spaceConfig,
    usage: SpaceUsage,
    demo: SpaceDemo,
    doc: spaceDoc,
  },
  {
    slug: 'grid',
    group: '展示组件',
    title: 'Grid 宫格',
    config: gridConfig,
    usage: GridUsage,
    demo: GridDemo,
    doc: gridDoc,
  },
  {
    slug: 'cell',
    group: '展示组件',
    title: 'Cell 单元格',
    config: cellConfig,
    usage: CellUsage,
    demo: CellDemo,
    doc: cellDoc,
  },
  {
    slug: 'loading',
    group: '反馈组件',
    title: 'Loading 加载',
    config: loadingConfig,
    usage: LoadingUsage,
    demo: LoadingDemo,
    doc: loadingDoc,
  },
  {
    slug: 'progress',
    group: '反馈组件',
    title: 'Progress 进度条',
    config: progressConfig,
    usage: ProgressUsage,
    demo: ProgressDemo,
    doc: progressDoc,
  },
  {
    slug: 'empty',
    group: '反馈组件',
    title: 'Empty 空状态',
    config: emptyConfig,
    usage: EmptyUsage,
    demo: EmptyDemo,
    doc: emptyDoc,
  },
  {
    slug: 'nav-bar',
    group: '导航组件',
    title: 'NavBar 导航栏',
    config: navBarConfig,
    usage: NavBarUsage,
    demo: NavBarDemo,
    doc: navBarDoc,
  },
  {
    slug: 'notice-bar',
    group: '反馈组件',
    title: 'NoticeBar 通知栏',
    config: noticeBarConfig,
    usage: NoticeBarUsage,
    demo: NoticeBarDemo,
    doc: noticeBarDoc,
  },
  {
    slug: 'count-down',
    group: '展示组件',
    title: 'CountDown 倒计时',
    config: countDownConfig,
    usage: CountDownUsage,
    demo: CountDownDemo,
    doc: countDownDoc,
  },
  {
    slug: 'transition',
    group: '基础组件',
    title: 'Transition 动画',
    config: transitionConfig,
    usage: TransitionUsage,
    demo: TransitionDemo,
    doc: transitionDoc,
  },
  {
    slug: 'icon',
    group: '基础组件',
    title: 'Icon 图标',
    config: iconConfig,
    usage: IconUsage,
    demo: IconDemo,
    doc: iconDoc,
  },
  {
    slug: 'popup',
    group: '反馈组件',
    title: 'Popup 弹出层',
    config: popupConfig,
    usage: PopupUsage,
    demo: PopupDemo,
    doc: popupDoc,
  },
  {
    slug: 'action-sheet',
    group: '反馈组件',
    title: 'Action Sheet 动作面板',
    config: actionSheetConfig,
    usage: ActionSheetUsage,
    demo: ActionSheetDemo,
    doc: actionSheetDoc,
  },
  {
    slug: 'picker',
    group: '表单组件',
    title: 'Picker 滚动选择器',
    config: pickerConfig,
    usage: PickerUsage,
    demo: PickerDemo,
    doc: pickerDoc,
  },
  {
    slug: 'tab-bar',
    group: '导航组件',
    title: 'Tab Bar 标签导航',
    config: tabBarConfig,
    usage: TabBarUsage,
    demo: TabBarDemo,
    doc: tabBarDoc,
  },
  {
    slug: 'swiper',
    group: '展示组件',
    title: 'Swiper 轮播',
    config: swiperConfig,
    usage: SwiperUsage,
    demo: SwiperDemo,
    doc: swiperDoc,
  },
  {
    slug: 'button',
    group: '基础组件',
    title: 'Button 按钮',
    config: buttonConfig,
    usage: ButtonUsage,
    demo: ButtonDemo,
    doc: buttonDoc,
  },
  {
    slug: 'tag',
    group: '基础组件',
    title: 'Tag 标签',
    config: tagConfig,
    usage: TagUsage,
    demo: TagDemo,
    doc: tagDoc,
  },
  {
    slug: 'popover',
    group: '反馈组件',
    title: 'Popover 气泡',
    config: popoverConfig,
    usage: PopoverUsage,
    demo: PopoverDemo,
    doc: popoverDoc,
  },
  {
    slug: 'toast',
    group: '反馈组件',
    title: 'Toast 轻提示',
    config: toastConfig,
    usage: ToastUsage,
    demo: ToastDemo,
    doc: toastDoc,
  },
  {
    slug: 'dialog',
    group: '反馈组件',
    title: 'Dialog 对话框',
    config: dialogConfig,
    usage: DialogUsage,
    demo: DialogDemo,
    doc: dialogDoc,
  },
  {
    slug: 'input',
    group: '表单组件',
    title: 'Input 输入框',
    config: inputConfig,
    usage: InputUsage,
    demo: InputDemo,
    doc: inputDoc,
  },
  {
    slug: 'slider',
    group: '表单组件',
    title: 'Slider 滑动选择器',
    config: sliderConfig,
    usage: SliderUsage,
    demo: SliderDemo,
    doc: sliderDoc,
  },
  {
    slug: 'rating',
    group: '表单组件',
    title: 'Rating 评分器',
    config: ratingConfig,
    usage: RatingUsage,
    demo: RatingDemo,
    doc: ratingDoc,
  },
  {
    slug: 'stepper',
    group: '表单组件',
    title: 'Stepper 步进器',
    config: stepperConfig,
    usage: StepperUsage,
    demo: StepperDemo,
    doc: stepperDoc,
  },
  {
    slug: 'switch',
    group: '表单组件',
    title: 'Switch 开关',
    config: switchConfig,
    usage: SwitchUsage,
    demo: SwitchDemo,
    doc: switchDoc,
  },
  {
    slug: 'checkbox',
    group: '表单组件',
    title: 'Checkbox 复选框',
    config: checkboxConfig,
    usage: CheckboxUsage,
    demo: CheckboxDemo,
    doc: checkboxDoc,
  },
  {
    slug: 'radio',
    group: '表单组件',
    title: 'Radio 单选框',
    config: radioConfig,
    usage: RadioUsage,
    demo: RadioDemo,
    doc: radioDoc,
  },
  {
    slug: 'form-card',
    group: '流程组件',
    title: 'Form Card 表单卡片',
    config: formCardConfig,
    usage: FormCardUsage,
    demo: FormCardDemo,
    doc: formCardDoc,
  },
  {
    slug: 'steps',
    group: '流程组件',
    title: 'Steps 步骤器',
    config: stepsConfig,
    usage: StepsUsage,
    demo: StepsDemo,
    doc: stepsDoc,
  },
];
