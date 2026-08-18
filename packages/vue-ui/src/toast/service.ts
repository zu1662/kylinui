import { createVNode, reactive, render } from 'vue';
import { getGlobalServiceDefaults, getGlobalTeleport } from '../shared/global-config-provider';
import { getGlobalZIndex } from '../shared/global-z-index';
import ToastHost from './host.vue';
import {
  toastState,
  type ToastInstance,
  type ToastOptions,
  type ToastPosition,
  type ToastProps,
  type ToastType,
} from './toast';

interface ToastQueueItem {
  id: number;
  show: boolean;
  options: Required<
    Pick<
      ToastProps,
      | 'message'
      | 'type'
      | 'icon'
      | 'iconSize'
      | 'loadingType'
      | 'duration'
      | 'position'
      | 'wordBreak'
      | 'zIndex'
      | 'forbidClick'
      | 'overlay'
      | 'closeOnClick'
      | 'className'
    >
  > &
    Pick<ToastProps, 'teleport'>;
  onOpened?: () => void;
  onClose?: () => void;
  closed: boolean;
}

const defaultOptions: ToastQueueItem['options'] = {
  message: '',
  type: 'text',
  icon: '',
  iconSize: 'var(--ky-toast-icon-size)',
  loadingType: 'circular',
  duration: 2000,
  position: 'center',
  wordBreak: 'break-all',
  zIndex: 1000,
  forbidClick: false,
  overlay: false,
  closeOnClick: false,
  teleport: undefined,
  className: '',
};

let currentOptions = { ...defaultOptions };
let hasCustomDefaultZIndex = false;
const defaultOptionsMap = new Map<ToastType, Partial<ToastOptions>>([['loading', { duration: 0 }]]);
let allowMultiple = false;
let seed = 0;
let hostElement: HTMLDivElement | undefined;

export const toastQueue = reactive<ToastQueueItem[]>([]);

function parseOptions(options: string | number | ToastOptions = ''): ToastOptions {
  return typeof options === 'object' ? options : { message: options };
}

function normalizeType(type: ToastType | undefined): ToastType {
  return type === 'fail' ? 'error' : (type ?? 'text');
}

function normalizePosition(position: ToastPosition | undefined): ToastPosition {
  return position === 'middle' ? 'center' : (position ?? 'center');
}

function ensureToastHost() {
  if (typeof document === 'undefined' || hostElement) return;
  hostElement = document.createElement('div');
  hostElement.dataset.kyToastHost = '';
  document.body.appendChild(hostElement);
  render(createVNode(ToastHost), hostElement);
}

function syncLegacyState(item?: ToastQueueItem) {
  const active = item ?? [...toastQueue].reverse().find((toast) => toast.show);
  toastState.visible = Boolean(active?.show);
  toastState.message = String(active?.options.message ?? '');
  toastState.type = active?.options.type ?? 'text';
  toastState.position = active?.options.position ?? 'bottom';
  toastState.zIndex = active?.options.zIndex ?? 1000;
  toastState.forbidClick = active?.options.forbidClick ?? false;
}

function getItem(id: number) {
  return toastQueue.find((item) => item.id === id);
}

function closeItem(item: ToastQueueItem) {
  if (!item.show || item.closed) return;
  item.show = false;
  item.closed = true;
  item.onClose?.();
  syncLegacyState();
}

export function mountToastHost() {
  ensureToastHost();
}

export function showToast(options: string | number | ToastOptions = ''): ToastInstance {
  ensureToastHost();
  const parsed = parseOptions(options);
  const providerDefaults = getGlobalServiceDefaults('toast');
  const type = normalizeType(parsed.type ?? providerDefaults.type ?? currentOptions.type);
  const merged = {
    ...currentOptions,
    ...providerDefaults,
    zIndex:
      providerDefaults.zIndex ??
      (hasCustomDefaultZIndex ? currentOptions.zIndex : getGlobalZIndex(1000)),
    ...defaultOptionsMap.get(type),
    ...parsed,
    type,
    position: normalizePosition(
      parsed.position ?? providerDefaults.position ?? currentOptions.position,
    ),
    teleport:
      parsed.teleport ??
      providerDefaults.teleport ??
      currentOptions.teleport ??
      getGlobalTeleport('body'),
  } as ToastQueueItem['options'];
  if (allowMultiple) {
    const baseZIndex = Number(merged.zIndex);
    if (Number.isFinite(baseZIndex)) merged.zIndex = baseZIndex + toastQueue.length;
  }

  let item = !allowMultiple ? toastQueue.find((toast) => toast.show) : undefined;
  if (item) {
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
    }) as ToastQueueItem;
    toastQueue.push(item);
  }

  syncLegacyState(item);
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
      if (!target) return;
      target.options.message = value;
      syncLegacyState(target);
    },
  };
}

function createTypedToast(type: ToastType) {
  return (options: string | number | ToastOptions = '') =>
    showToast({ ...parseOptions(options), type });
}

export const showLoadingToast = createTypedToast('loading');
export const showSuccessToast = createTypedToast('success');
export const showFailToast = createTypedToast('error');

/** 兼容旧版名称；默认保持加载提示不会自动关闭。 */
export const showLoading = showLoadingToast;

export function closeToast(all = false) {
  if (!toastQueue.length) return;
  if (all) {
    toastQueue.forEach(closeItem);
    return;
  }
  const item = allowMultiple ? toastQueue.find((toast) => toast.show) : toastQueue.at(-1);
  if (item) closeItem(item);
}

/** 兼容旧版名称。 */
export const hideToast = closeToast;

export function setToastVisible(id: number, visible: boolean) {
  const item = getItem(id);
  if (!item) return;
  if (visible) {
    item.show = true;
    item.closed = false;
    syncLegacyState(item);
  } else {
    closeItem(item);
  }
}

export function handleToastOpened(id: number) {
  getItem(id)?.onOpened?.();
}

export function handleToastClosed(id: number) {
  const index = toastQueue.findIndex((item) => item.id === id);
  if (index >= 0) toastQueue.splice(index, 1);
  syncLegacyState();
}

export function allowMultipleToast(value = true) {
  allowMultiple = value;
}

export function setToastDefaultOptions(options: ToastOptions): void;
export function setToastDefaultOptions(type: ToastType, options: ToastOptions): void;
export function setToastDefaultOptions(type: ToastType | ToastOptions, options?: ToastOptions) {
  if (typeof type === 'string') {
    defaultOptionsMap.set(normalizeType(type), { ...options });
    return;
  }
  if (Object.hasOwn(type, 'zIndex')) hasCustomDefaultZIndex = type.zIndex !== undefined;
  currentOptions = { ...currentOptions, ...type };
}

export function resetToastDefaultOptions(type?: ToastType) {
  if (type) {
    defaultOptionsMap.delete(normalizeType(type));
    if (normalizeType(type) === 'loading') defaultOptionsMap.set('loading', { duration: 0 });
    return;
  }
  currentOptions = { ...defaultOptions };
  hasCustomDefaultZIndex = false;
  defaultOptionsMap.clear();
  defaultOptionsMap.set('loading', { duration: 0 });
}

/** 提供适合 setup 中使用的服务式调用集合。 */
export function useToast() {
  return {
    show: showToast,
    loading: showLoadingToast,
    success: showSuccessToast,
    fail: showFailToast,
    close: closeToast,
    hide: hideToast,
  };
}
