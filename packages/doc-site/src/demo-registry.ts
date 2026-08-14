import type { DemoEntry } from './types';

import ConfigProviderDemo from '@vue-ui/config-provider/_demo/basic.vue';
import IconDemo from '@vue-ui/icon/_demo/basic.vue';
import TransitionDemo from '@vue-ui/transition/_demo/basic.vue';
import ButtonDemo from '@vue-ui/button/_demo/basic.vue';
import TagDemo from '@vue-ui/tag/_demo/basic.vue';
import PopoverDemo from '@vue-ui/popover/_demo/basic.vue';
import ToastDemo from '@vue-ui/toast/_demo/basic.vue';
import DialogDemo from '@vue-ui/dialog/_demo/basic.vue';
import InputDemo from '@vue-ui/input/_demo/basic.vue';
import RatingDemo from '@vue-ui/rating/_demo/basic.vue';
import StepperDemo from '@vue-ui/stepper/_demo/basic.vue';
import SwitchDemo from '@vue-ui/switch/_demo/basic.vue';
import CheckboxDemo from '@vue-ui/checkbox/_demo/basic.vue';
import RadioDemo from '@vue-ui/radio/_demo/basic.vue';
import FormCardDemo from '@vue-ui/form-card/_demo/basic.vue';
import StepsDemo from '@vue-ui/steps/_demo/basic.vue';
import PopupDemo from '@vue-ui/popup/_demo/basic.vue';
import ActionSheetDemo from '@vue-ui/action-sheet/_demo/basic.vue';
import TabBarDemo from '@vue-ui/tab-bar/_demo/basic.vue';
import SwiperDemo from '@vue-ui/swiper/_demo/basic.vue';
import PickerDemo from '@vue-ui/picker/_demo/basic.vue';
import CalendarDemo from '@vue-ui/calendar/_demo/basic.vue';
import BadgeDemo from '@vue-ui/badge/_demo/basic.vue';
import DividerDemo from '@vue-ui/divider/_demo/basic.vue';
import SpaceDemo from '@vue-ui/space/_demo/basic.vue';
import GridDemo from '@vue-ui/grid/_demo/basic.vue';
import CellDemo from '@vue-ui/cell/_demo/basic.vue';
import LoadingDemo from '@vue-ui/loading/_demo/basic.vue';
import ProgressDemo from '@vue-ui/progress/_demo/basic.vue';
import EmptyDemo from '@vue-ui/empty/_demo/basic.vue';
import NavBarDemo from '@vue-ui/nav-bar/_demo/basic.vue';
import NoticeBarDemo from '@vue-ui/notice-bar/_demo/basic.vue';
import CountDownDemo from '@vue-ui/count-down/_demo/basic.vue';
import BackTopDemo from '@vue-ui/back-top/_demo/basic.vue';
import CircleDemo from '@vue-ui/circle/_demo/basic.vue';
import CollapseDemo from '@vue-ui/collapse/_demo/basic.vue';
import SearchDemo from '@vue-ui/search/_demo/basic.vue';
import SkeletonDemo from '@vue-ui/skeleton/_demo/basic.vue';
import StickyDemo from '@vue-ui/sticky/_demo/basic.vue';
import ImageDemo from '@vue-ui/image/_demo/basic.vue';
import ImagePreviewDemo from '@vue-ui/image-preview/_demo/basic.vue';
import SidebarDemo from '@vue-ui/sidebar/_demo/basic.vue';
import TextEllipsisDemo from '@vue-ui/text-ellipsis/_demo/basic.vue';
import WatermarkDemo from '@vue-ui/watermark/_demo/basic.vue';
import ListDemo from '@vue-ui/list/_demo/basic.vue';
import HighlightDemo from '@vue-ui/highlight/_demo/basic.vue';
import RollingTextDemo from '@vue-ui/rolling-text/_demo/basic.vue';
import NumberKeyboardDemo from '@vue-ui/number-keyboard/_demo/basic.vue';

export const demoComponents = [
  {
    slug: 'config-provider',
    group: '基础组件',
    title: 'ConfigProvider 全局配置',
    demo: ConfigProviderDemo,
  },
  {
    slug: 'back-top',
    group: '导航组件',
    title: 'BackTop 返回顶部',
    demo: BackTopDemo,
  },
  {
    slug: 'circle',
    group: '反馈组件',
    title: 'Circle 环形进度',
    demo: CircleDemo,
  },
  {
    slug: 'collapse',
    group: '展示组件',
    title: 'Collapse 折叠面板',
    demo: CollapseDemo,
  },
  {
    slug: 'search',
    group: '表单组件',
    title: 'Search 搜索',
    demo: SearchDemo,
  },
  {
    slug: 'skeleton',
    group: '反馈组件',
    title: 'Skeleton 骨架屏',
    demo: SkeletonDemo,
  },
  {
    slug: 'sticky',
    group: '导航组件',
    title: 'Sticky 粘性布局',
    demo: StickyDemo,
  },
  {
    slug: 'image',
    group: '展示组件',
    title: 'Image 图片',
    demo: ImageDemo,
  },
  {
    slug: 'image-preview',
    group: '展示组件',
    title: 'ImagePreview 图片预览',
    demo: ImagePreviewDemo,
  },
  {
    slug: 'sidebar',
    group: '导航组件',
    title: 'Sidebar 侧边导航',
    demo: SidebarDemo,
  },
  {
    slug: 'text-ellipsis',
    group: '展示组件',
    title: 'TextEllipsis 文本省略',
    demo: TextEllipsisDemo,
  },
  {
    slug: 'watermark',
    group: '展示组件',
    title: 'Watermark 水印',
    demo: WatermarkDemo,
  },
  {
    slug: 'list',
    group: '反馈组件',
    title: 'List 列表加载',
    demo: ListDemo,
  },
  {
    slug: 'highlight',
    group: '展示组件',
    title: 'Highlight 关键词高亮',
    demo: HighlightDemo,
  },
  {
    slug: 'rolling-text',
    group: '展示组件',
    title: 'RollingText 数字翻牌',
    demo: RollingTextDemo,
  },
  {
    slug: 'number-keyboard',
    group: '表单组件',
    title: 'NumberKeyboard 数字键盘',
    demo: NumberKeyboardDemo,
  },
  {
    slug: 'badge',
    group: '基础组件',
    title: 'Badge 徽标',
    demo: BadgeDemo,
  },
  {
    slug: 'divider',
    group: '基础组件',
    title: 'Divider 分割线',
    demo: DividerDemo,
  },
  {
    slug: 'space',
    group: '基础组件',
    title: 'Space 间距',
    demo: SpaceDemo,
  },
  {
    slug: 'grid',
    group: '展示组件',
    title: 'Grid 宫格',
    demo: GridDemo,
  },
  {
    slug: 'cell',
    group: '展示组件',
    title: 'Cell 单元格',
    demo: CellDemo,
  },
  {
    slug: 'loading',
    group: '反馈组件',
    title: 'Loading 加载',
    demo: LoadingDemo,
  },
  {
    slug: 'progress',
    group: '反馈组件',
    title: 'Progress 进度条',
    demo: ProgressDemo,
  },
  {
    slug: 'empty',
    group: '反馈组件',
    title: 'Empty 空状态',
    demo: EmptyDemo,
  },
  {
    slug: 'nav-bar',
    group: '导航组件',
    title: 'NavBar 导航栏',
    demo: NavBarDemo,
  },
  {
    slug: 'notice-bar',
    group: '反馈组件',
    title: 'NoticeBar 通知栏',
    demo: NoticeBarDemo,
  },
  {
    slug: 'count-down',
    group: '展示组件',
    title: 'CountDown 倒计时',
    demo: CountDownDemo,
  },
  {
    slug: 'transition',
    group: '基础组件',
    title: 'Transition 动画',
    demo: TransitionDemo,
  },
  {
    slug: 'icon',
    group: '基础组件',
    title: 'Icon 图标',
    demo: IconDemo,
  },
  {
    slug: 'popup',
    group: '反馈组件',
    title: 'Popup 弹出层',
    demo: PopupDemo,
  },
  {
    slug: 'action-sheet',
    group: '反馈组件',
    title: 'Action Sheet 动作面板',
    demo: ActionSheetDemo,
  },
  {
    slug: 'picker',
    group: '表单组件',
    title: 'Picker 滚动选择器',
    demo: PickerDemo,
  },
  {
    slug: 'calendar',
    group: '表单组件',
    title: 'Calendar 日历',
    demo: CalendarDemo,
  },
  {
    slug: 'tab-bar',
    group: '导航组件',
    title: 'Tab Bar 标签导航',
    demo: TabBarDemo,
  },
  {
    slug: 'swiper',
    group: '展示组件',
    title: 'Swiper 轮播',
    demo: SwiperDemo,
  },
  {
    slug: 'button',
    group: '基础组件',
    title: 'Button 按钮',
    demo: ButtonDemo,
  },
  {
    slug: 'tag',
    group: '基础组件',
    title: 'Tag 标签',
    demo: TagDemo,
  },
  {
    slug: 'popover',
    group: '反馈组件',
    title: 'Popover 气泡',
    demo: PopoverDemo,
  },
  {
    slug: 'toast',
    group: '反馈组件',
    title: 'Toast 轻提示',
    demo: ToastDemo,
  },
  {
    slug: 'dialog',
    group: '反馈组件',
    title: 'Dialog 对话框',
    demo: DialogDemo,
  },
  {
    slug: 'input',
    group: '表单组件',
    title: 'Input 输入框',
    demo: InputDemo,
  },
  {
    slug: 'rating',
    group: '表单组件',
    title: 'Rating 评分器',
    demo: RatingDemo,
  },
  {
    slug: 'stepper',
    group: '表单组件',
    title: 'Stepper 步进器',
    demo: StepperDemo,
  },
  {
    slug: 'switch',
    group: '表单组件',
    title: 'Switch 开关',
    demo: SwitchDemo,
  },
  {
    slug: 'checkbox',
    group: '表单组件',
    title: 'Checkbox 复选框',
    demo: CheckboxDemo,
  },
  {
    slug: 'radio',
    group: '表单组件',
    title: 'Radio 单选框',
    demo: RadioDemo,
  },
  {
    slug: 'form-card',
    group: '流程组件',
    title: 'Form Card 表单卡片',
    demo: FormCardDemo,
  },
  {
    slug: 'steps',
    group: '流程组件',
    title: 'Steps 步骤器',
    demo: StepsDemo,
  },
] as const satisfies readonly DemoEntry[];

export type DemoSlug = (typeof demoComponents)[number]['slug'];
