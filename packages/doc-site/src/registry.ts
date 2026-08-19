import type { ComponentEntry } from './types';
import { demoComponents, type DemoSlug } from './demo-registry';

import configProviderConfig from '@vue-ui/config-provider/_usage/config';
import ConfigProviderUsage from '@vue-ui/config-provider/_usage/index.vue';
import configProviderDoc from '@vue-ui/config-provider/_doc/config-provider.md?raw';
import iconConfig from '@vue-ui/icon/_usage/config';
import IconUsage from '@vue-ui/icon/_usage/index.vue';
import iconDoc from '@vue-ui/icon/_doc/icon.md?raw';
import transitionConfig from '@vue-ui/transition/_usage/config';
import TransitionUsage from '@vue-ui/transition/_usage/index.vue';
import transitionDoc from '@vue-ui/transition/_doc/transition.md?raw';
import buttonConfig from '@vue-ui/button/_usage/config';
import ButtonUsage from '@vue-ui/button/_usage/index.vue';
import buttonDoc from '@vue-ui/button/_doc/button.md?raw';
import tagConfig from '@vue-ui/tag/_usage/config';
import TagUsage from '@vue-ui/tag/_usage/index.vue';
import tagDoc from '@vue-ui/tag/_doc/tag.md?raw';
import popoverConfig from '@vue-ui/popover/_usage/config';
import PopoverUsage from '@vue-ui/popover/_usage/index.vue';
import popoverDoc from '@vue-ui/popover/_doc/popover.md?raw';
import toastConfig from '@vue-ui/toast/_usage/config';
import ToastUsage from '@vue-ui/toast/_usage/index.vue';
import toastDoc from '@vue-ui/toast/_doc/toast.md?raw';
import dialogConfig from '@vue-ui/dialog/_usage/config';
import DialogUsage from '@vue-ui/dialog/_usage/index.vue';
import dialogDoc from '@vue-ui/dialog/_doc/dialog.md?raw';
import formConfig from '@vue-ui/form/_usage/config';
import FormUsage from '@vue-ui/form/_usage/index.vue';
import formDoc from '@vue-ui/form/_doc/form.md?raw';
import inputConfig from '@vue-ui/input/_usage/config';
import InputUsage from '@vue-ui/input/_usage/index.vue';
import inputDoc from '@vue-ui/input/_doc/input.md?raw';
import textareaConfig from '@vue-ui/textarea/_usage/config';
import TextareaUsage from '@vue-ui/textarea/_usage/index.vue';
import textareaDoc from '@vue-ui/textarea/_doc/textarea.md?raw';
import uploaderConfig from '@vue-ui/uploader/_usage/config';
import UploaderUsage from '@vue-ui/uploader/_usage/index.vue';
import uploaderDoc from '@vue-ui/uploader/_doc/uploader.md?raw';
import ratingConfig from '@vue-ui/rating/_usage/config';
import RatingUsage from '@vue-ui/rating/_usage/index.vue';
import ratingDoc from '@vue-ui/rating/_doc/rating.md?raw';
import stepperConfig from '@vue-ui/stepper/_usage/config';
import StepperUsage from '@vue-ui/stepper/_usage/index.vue';
import stepperDoc from '@vue-ui/stepper/_doc/stepper.md?raw';
import switchConfig from '@vue-ui/switch/_usage/config';
import SwitchUsage from '@vue-ui/switch/_usage/index.vue';
import switchDoc from '@vue-ui/switch/_doc/switch.md?raw';
import checkboxConfig from '@vue-ui/checkbox/_usage/config';
import CheckboxUsage from '@vue-ui/checkbox/_usage/index.vue';
import checkboxDoc from '@vue-ui/checkbox/_doc/checkbox.md?raw';
import radioConfig from '@vue-ui/radio/_usage/config';
import RadioUsage from '@vue-ui/radio/_usage/index.vue';
import radioDoc from '@vue-ui/radio/_doc/radio.md?raw';
import stepsConfig from '@vue-ui/steps/_usage/config';
import StepsUsage from '@vue-ui/steps/_usage/index.vue';
import stepsDoc from '@vue-ui/steps/_doc/steps.md?raw';
import popupConfig from '@vue-ui/popup/_usage/config';
import PopupUsage from '@vue-ui/popup/_usage/index.vue';
import popupDoc from '@vue-ui/popup/_doc/popup.md?raw';
import actionSheetConfig from '@vue-ui/action-sheet/_usage/config';
import ActionSheetUsage from '@vue-ui/action-sheet/_usage/index.vue';
import actionSheetDoc from '@vue-ui/action-sheet/_doc/action-sheet.md?raw';
import tabBarConfig from '@vue-ui/tab-bar/_usage/config';
import TabBarUsage from '@vue-ui/tab-bar/_usage/index.vue';
import tabBarDoc from '@vue-ui/tab-bar/_doc/tab-bar.md?raw';
import swiperConfig from '@vue-ui/swiper/_usage/config';
import SwiperUsage from '@vue-ui/swiper/_usage/index.vue';
import swiperDoc from '@vue-ui/swiper/_doc/swiper.md?raw';
import pickerConfig from '@vue-ui/picker/_usage/config';
import PickerUsage from '@vue-ui/picker/_usage/index.vue';
import pickerDoc from '@vue-ui/picker/_doc/picker.md?raw';
import calendarConfig from '@vue-ui/calendar/_usage/config';
import CalendarUsage from '@vue-ui/calendar/_usage/index.vue';
import calendarDoc from '@vue-ui/calendar/_doc/calendar.md?raw';
import badgeConfig from '@vue-ui/badge/_usage/config';
import BadgeUsage from '@vue-ui/badge/_usage/index.vue';
import badgeDoc from '@vue-ui/badge/_doc/badge.md?raw';
import dividerConfig from '@vue-ui/divider/_usage/config';
import DividerUsage from '@vue-ui/divider/_usage/index.vue';
import dividerDoc from '@vue-ui/divider/_doc/divider.md?raw';
import spaceConfig from '@vue-ui/space/_usage/config';
import SpaceUsage from '@vue-ui/space/_usage/index.vue';
import spaceDoc from '@vue-ui/space/_doc/space.md?raw';
import gridConfig from '@vue-ui/grid/_usage/config';
import GridUsage from '@vue-ui/grid/_usage/index.vue';
import gridDoc from '@vue-ui/grid/_doc/grid.md?raw';
import cellConfig from '@vue-ui/cell/_usage/config';
import CellUsage from '@vue-ui/cell/_usage/index.vue';
import cellDoc from '@vue-ui/cell/_doc/cell.md?raw';
import loadingConfig from '@vue-ui/loading/_usage/config';
import LoadingUsage from '@vue-ui/loading/_usage/index.vue';
import loadingDoc from '@vue-ui/loading/_doc/loading.md?raw';
import progressConfig from '@vue-ui/progress/_usage/config';
import ProgressUsage from '@vue-ui/progress/_usage/index.vue';
import progressDoc from '@vue-ui/progress/_doc/progress.md?raw';
import emptyConfig from '@vue-ui/empty/_usage/config';
import EmptyUsage from '@vue-ui/empty/_usage/index.vue';
import emptyDoc from '@vue-ui/empty/_doc/empty.md?raw';
import navBarConfig from '@vue-ui/nav-bar/_usage/config';
import NavBarUsage from '@vue-ui/nav-bar/_usage/index.vue';
import navBarDoc from '@vue-ui/nav-bar/_doc/nav-bar.md?raw';
import noticeBarConfig from '@vue-ui/notice-bar/_usage/config';
import NoticeBarUsage from '@vue-ui/notice-bar/_usage/index.vue';
import noticeBarDoc from '@vue-ui/notice-bar/_doc/notice-bar.md?raw';
import countDownConfig from '@vue-ui/count-down/_usage/config';
import CountDownUsage from '@vue-ui/count-down/_usage/index.vue';
import countDownDoc from '@vue-ui/count-down/_doc/count-down.md?raw';
import backTopConfig from '@vue-ui/back-top/_usage/config';
import BackTopUsage from '@vue-ui/back-top/_usage/index.vue';
import backTopDoc from '@vue-ui/back-top/_doc/back-top.md?raw';
import circleConfig from '@vue-ui/circle/_usage/config';
import CircleUsage from '@vue-ui/circle/_usage/index.vue';
import circleDoc from '@vue-ui/circle/_doc/circle.md?raw';
import collapseConfig from '@vue-ui/collapse/_usage/config';
import CollapseUsage from '@vue-ui/collapse/_usage/index.vue';
import collapseDoc from '@vue-ui/collapse/_doc/collapse.md?raw';
import searchConfig from '@vue-ui/search/_usage/config';
import SearchUsage from '@vue-ui/search/_usage/index.vue';
import searchDoc from '@vue-ui/search/_doc/search.md?raw';
import skeletonConfig from '@vue-ui/skeleton/_usage/config';
import SkeletonUsage from '@vue-ui/skeleton/_usage/index.vue';
import skeletonDoc from '@vue-ui/skeleton/_doc/skeleton.md?raw';
import stickyConfig from '@vue-ui/sticky/_usage/config';
import StickyUsage from '@vue-ui/sticky/_usage/index.vue';
import stickyDoc from '@vue-ui/sticky/_doc/sticky.md?raw';
import imageConfig from '@vue-ui/image/_usage/config';
import ImageUsage from '@vue-ui/image/_usage/index.vue';
import imageDoc from '@vue-ui/image/_doc/image.md?raw';
import imagePreviewConfig from '@vue-ui/image-preview/_usage/config';
import ImagePreviewUsage from '@vue-ui/image-preview/_usage/index.vue';
import imagePreviewDoc from '@vue-ui/image-preview/_doc/image-preview.md?raw';
import textEllipsisConfig from '@vue-ui/text-ellipsis/_usage/config';
import TextEllipsisUsage from '@vue-ui/text-ellipsis/_usage/index.vue';
import textEllipsisDoc from '@vue-ui/text-ellipsis/_doc/text-ellipsis.md?raw';
import watermarkConfig from '@vue-ui/watermark/_usage/config';
import WatermarkUsage from '@vue-ui/watermark/_usage/index.vue';
import watermarkDoc from '@vue-ui/watermark/_doc/watermark.md?raw';
import listConfig from '@vue-ui/list/_usage/config';
import ListUsage from '@vue-ui/list/_usage/index.vue';
import listDoc from '@vue-ui/list/_doc/list.md?raw';
import highlightConfig from '@vue-ui/highlight/_usage/config';
import HighlightUsage from '@vue-ui/highlight/_usage/index.vue';
import highlightDoc from '@vue-ui/highlight/_doc/highlight.md?raw';
import rollingTextConfig from '@vue-ui/rolling-text/_usage/config';
import RollingTextUsage from '@vue-ui/rolling-text/_usage/index.vue';
import rollingTextDoc from '@vue-ui/rolling-text/_doc/rolling-text.md?raw';
import numberKeyboardConfig from '@vue-ui/number-keyboard/_usage/config';
import NumberKeyboardUsage from '@vue-ui/number-keyboard/_usage/index.vue';
import numberKeyboardDoc from '@vue-ui/number-keyboard/_doc/number-keyboard.md?raw';

type ComponentResources = Pick<ComponentEntry, 'config' | 'usage' | 'doc'>;

const componentResources = {
  'config-provider': {
    config: configProviderConfig,
    usage: ConfigProviderUsage,
    doc: configProviderDoc,
  },
  'back-top': {
    config: backTopConfig,
    usage: BackTopUsage,
    doc: backTopDoc,
  },
  circle: {
    config: circleConfig,
    usage: CircleUsage,
    doc: circleDoc,
  },
  collapse: {
    config: collapseConfig,
    usage: CollapseUsage,
    doc: collapseDoc,
  },
  search: {
    config: searchConfig,
    usage: SearchUsage,
    doc: searchDoc,
  },
  skeleton: {
    config: skeletonConfig,
    usage: SkeletonUsage,
    doc: skeletonDoc,
  },
  sticky: {
    config: stickyConfig,
    usage: StickyUsage,
    doc: stickyDoc,
  },
  image: {
    config: imageConfig,
    usage: ImageUsage,
    doc: imageDoc,
  },
  'image-preview': {
    config: imagePreviewConfig,
    usage: ImagePreviewUsage,
    doc: imagePreviewDoc,
  },
  'text-ellipsis': {
    config: textEllipsisConfig,
    usage: TextEllipsisUsage,
    doc: textEllipsisDoc,
  },
  watermark: {
    config: watermarkConfig,
    usage: WatermarkUsage,
    doc: watermarkDoc,
  },
  list: {
    config: listConfig,
    usage: ListUsage,
    doc: listDoc,
  },
  highlight: {
    config: highlightConfig,
    usage: HighlightUsage,
    doc: highlightDoc,
  },
  'rolling-text': {
    config: rollingTextConfig,
    usage: RollingTextUsage,
    doc: rollingTextDoc,
  },
  'number-keyboard': {
    config: numberKeyboardConfig,
    usage: NumberKeyboardUsage,
    doc: numberKeyboardDoc,
  },
  badge: {
    config: badgeConfig,
    usage: BadgeUsage,
    doc: badgeDoc,
  },
  divider: {
    config: dividerConfig,
    usage: DividerUsage,
    doc: dividerDoc,
  },
  space: {
    config: spaceConfig,
    usage: SpaceUsage,
    doc: spaceDoc,
  },
  grid: {
    config: gridConfig,
    usage: GridUsage,
    doc: gridDoc,
  },
  cell: {
    config: cellConfig,
    usage: CellUsage,
    doc: cellDoc,
  },
  loading: {
    config: loadingConfig,
    usage: LoadingUsage,
    doc: loadingDoc,
  },
  progress: {
    config: progressConfig,
    usage: ProgressUsage,
    doc: progressDoc,
  },
  empty: {
    config: emptyConfig,
    usage: EmptyUsage,
    doc: emptyDoc,
  },
  'nav-bar': {
    config: navBarConfig,
    usage: NavBarUsage,
    doc: navBarDoc,
  },
  'notice-bar': {
    config: noticeBarConfig,
    usage: NoticeBarUsage,
    doc: noticeBarDoc,
  },
  'count-down': {
    config: countDownConfig,
    usage: CountDownUsage,
    doc: countDownDoc,
  },
  transition: {
    config: transitionConfig,
    usage: TransitionUsage,
    doc: transitionDoc,
  },
  icon: {
    config: iconConfig,
    usage: IconUsage,
    doc: iconDoc,
  },
  popup: {
    config: popupConfig,
    usage: PopupUsage,
    doc: popupDoc,
  },
  'action-sheet': {
    config: actionSheetConfig,
    usage: ActionSheetUsage,
    doc: actionSheetDoc,
  },
  picker: {
    config: pickerConfig,
    usage: PickerUsage,
    doc: pickerDoc,
  },
  calendar: {
    config: calendarConfig,
    usage: CalendarUsage,
    doc: calendarDoc,
  },
  'tab-bar': {
    config: tabBarConfig,
    usage: TabBarUsage,
    doc: tabBarDoc,
  },
  swiper: {
    config: swiperConfig,
    usage: SwiperUsage,
    doc: swiperDoc,
  },
  button: {
    config: buttonConfig,
    usage: ButtonUsage,
    doc: buttonDoc,
  },
  tag: {
    config: tagConfig,
    usage: TagUsage,
    doc: tagDoc,
  },
  popover: {
    config: popoverConfig,
    usage: PopoverUsage,
    doc: popoverDoc,
  },
  toast: {
    config: toastConfig,
    usage: ToastUsage,
    doc: toastDoc,
  },
  dialog: {
    config: dialogConfig,
    usage: DialogUsage,
    doc: dialogDoc,
  },
  form: {
    config: formConfig,
    usage: FormUsage,
    doc: formDoc,
  },
  input: {
    config: inputConfig,
    usage: InputUsage,
    doc: inputDoc,
  },
  textarea: {
    config: textareaConfig,
    usage: TextareaUsage,
    doc: textareaDoc,
  },
  uploader: {
    config: uploaderConfig,
    usage: UploaderUsage,
    doc: uploaderDoc,
  },
  rating: {
    config: ratingConfig,
    usage: RatingUsage,
    doc: ratingDoc,
  },
  stepper: {
    config: stepperConfig,
    usage: StepperUsage,
    doc: stepperDoc,
  },
  switch: {
    config: switchConfig,
    usage: SwitchUsage,
    doc: switchDoc,
  },
  checkbox: {
    config: checkboxConfig,
    usage: CheckboxUsage,
    doc: checkboxDoc,
  },
  radio: {
    config: radioConfig,
    usage: RadioUsage,
    doc: radioDoc,
  },
  steps: {
    config: stepsConfig,
    usage: StepsUsage,
    doc: stepsDoc,
  },
} satisfies Record<DemoSlug, ComponentResources>;

export const components: ComponentEntry[] = demoComponents.map((entry) => ({
  ...entry,
  ...componentResources[entry.slug],
}));
