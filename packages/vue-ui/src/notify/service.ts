import { createVNode, reactive, render } from 'vue';
import { getGlobalServiceDefaults, getGlobalTeleport } from '../shared/global-config-provider';
import { getGlobalZIndex } from '../shared/global-z-index';
import { getOverlayContainer } from '../shared/overlay-manager';
import { applyServiceAppContext } from '../shared/service-app-context';
import NotifyHost from './host.vue';
import type {
  NotifyInstance,
  NotifyOptions,
  NotifyPosition,
  NotifyProps,
  NotifyType,
} from './notify';

interface NotifyQueueItem {
  id: number;
  show: boolean;
  options: Required<
    Pick<
      NotifyProps,
      | 'message'
      | 'type'
      | 'duration'
      | 'position'
      | 'offset'
      | 'zIndex'
      | 'icon'
      | 'showIcon'
      | 'closeable'
      | 'closeIcon'
      | 'closeOnClick'
      | 'safeAreaInsetTop'
      | 'safeAreaInsetBottom'
      | 'className'
    >
  > &
    Pick<NotifyProps, 'teleport'>;
  onOpened?: () => void;
  onClose?: () => void;
  closed: boolean;
}

const defaultOptions: NotifyQueueItem['options'] = {
  message: '',
  type: 'primary',
  duration: 3000,
  position: 'top',
  offset: 0,
  zIndex: 1000,
  icon: '',
  showIcon: true,
  closeable: false,
  closeIcon: 'close',
  closeOnClick: false,
  safeAreaInsetTop: true,
  safeAreaInsetBottom: true,
  teleport: undefined,
  className: '',
};

let currentOptions = { ...defaultOptions };
let hasCustomDefaultZIndex = false;
const defaultOptionsMap = new Map<NotifyType, Partial<NotifyOptions>>();
let seed = 0;
let hostElement: HTMLDivElement | undefined;

export const notifyQueue = reactive<NotifyQueueItem[]>([]);

function parseOptions(options: string | number | NotifyOptions = ''): NotifyOptions {
  return typeof options === 'object' ? options : { message: options };
}

function ensureNotifyHost() {
  if (typeof document === 'undefined' || hostElement) return;
  hostElement = document.createElement('div');
  hostElement.dataset.kyNotifyHost = '';
  document.body.appendChild(hostElement);
  render(applyServiceAppContext(createVNode(NotifyHost)), hostElement);
}

function getItem(id: number) {
  return notifyQueue.find((item) => item.id === id);
}

function closeItem(item: NotifyQueueItem) {
  if (!item.show || item.closed) return;
  item.show = false;
  item.closed = true;
  item.onClose?.();
}

export function mountNotifyHost() {
  ensureNotifyHost();
}

export function showNotify(options: string | number | NotifyOptions = ''): NotifyInstance {
  ensureNotifyHost();
  const parsed = parseOptions(options);
  const providerDefaults = getGlobalServiceDefaults('notify');
  const type = parsed.type ?? providerDefaults.type ?? currentOptions.type;
  const position = (parsed.position ??
    providerDefaults.position ??
    currentOptions.position) as NotifyPosition;
  const merged = {
    ...currentOptions,
    ...providerDefaults,
    zIndex:
      providerDefaults.zIndex ??
      (hasCustomDefaultZIndex ? currentOptions.zIndex : getGlobalZIndex(1000)),
    ...defaultOptionsMap.get(type),
    ...parsed,
    type,
    position,
    teleport:
      parsed.teleport ??
      providerDefaults.teleport ??
      currentOptions.teleport ??
      getGlobalTeleport(getOverlayContainer()),
  } as NotifyQueueItem['options'];

  let item = notifyQueue.at(-1);
  if (item) {
    // 替换当前通知时更新 key，让相同参数的连续调用也能重新进入并重置计时。
    item.id = ++seed;
    item.options = merged;
    item.onOpened = parsed.onOpened;
    item.onClose = parsed.onClose;
    item.closed = false;
    item.show = true;
  } else {
    item = reactive({
      id: ++seed,
      show: true,
      options: merged,
      onOpened: parsed.onOpened,
      onClose: parsed.onClose,
      closed: false,
    }) as NotifyQueueItem;
    notifyQueue.push(item);
  }

  const id = item.id;
  return {
    close: () => {
      const target = getItem(id);
      if (target) closeItem(target);
    },
    get message() {
      return getItem(id)?.options.message ?? '';
    },
    set message(value: string | number) {
      const target = getItem(id);
      if (target) target.options.message = value;
    },
  };
}

function createTypedNotify(type: NotifyType) {
  return (options: string | number | NotifyOptions = '') =>
    showNotify({ ...parseOptions(options), type });
}

export const showPrimaryNotify = createTypedNotify('primary');
export const showSuccessNotify = createTypedNotify('success');
export const showWarningNotify = createTypedNotify('warning');
export const showDangerNotify = createTypedNotify('danger');

export function closeNotify() {
  const item = notifyQueue.at(-1);
  if (item) closeItem(item);
}

export function setNotifyVisible(id: number, visible: boolean) {
  const item = getItem(id);
  if (!item) return;
  if (visible) {
    item.show = true;
    item.closed = false;
  } else {
    closeItem(item);
  }
}

export function handleNotifyOpened(id: number) {
  getItem(id)?.onOpened?.();
}

export function handleNotifyClosed(id: number) {
  const index = notifyQueue.findIndex((item) => item.id === id);
  if (index >= 0) notifyQueue.splice(index, 1);
}

export function setNotifyDefaultOptions(options: NotifyOptions): void;
export function setNotifyDefaultOptions(type: NotifyType, options: NotifyOptions): void;
export function setNotifyDefaultOptions(type: NotifyType | NotifyOptions, options?: NotifyOptions) {
  if (typeof type === 'string') {
    defaultOptionsMap.set(type, { ...options });
    return;
  }
  if (Object.hasOwn(type, 'zIndex')) hasCustomDefaultZIndex = type.zIndex !== undefined;
  currentOptions = { ...currentOptions, ...type };
}

export function resetNotifyDefaultOptions(type?: NotifyType) {
  if (type) {
    defaultOptionsMap.delete(type);
    return;
  }
  currentOptions = { ...defaultOptions };
  hasCustomDefaultZIndex = false;
  defaultOptionsMap.clear();
}

/** 提供适合 setup 中使用的消息通知调用集合。 */
export function useNotify() {
  return {
    show: showNotify,
    primary: showPrimaryNotify,
    success: showSuccessNotify,
    warning: showWarningNotify,
    danger: showDangerNotify,
    close: closeNotify,
  };
}
