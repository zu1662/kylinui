import { computed, onBeforeUnmount, readonly, ref, watch, type Ref, type TeleportProps } from 'vue';

interface OverlayLayerOptions {
  active: Ref<boolean>;
  baseZIndex: Ref<number | string>;
  blocksInteraction?: Ref<boolean>;
  lockScroll?: Ref<boolean>;
  closeOnPopstate?: Ref<boolean>;
  onPopstate?: () => void;
}

interface OverlayLayerEntry {
  baseZIndex: Ref<number | string>;
  blocksInteraction: Ref<boolean>;
  lockScroll: Ref<boolean>;
  closeOnPopstate: Ref<boolean>;
  onPopstate?: () => void;
  zIndex: Ref<number>;
  isTop: Ref<boolean>;
}

export interface OverlayLayerState {
  zIndex: Readonly<Ref<number>>;
  isTop: Readonly<Ref<boolean>>;
}

const layers: OverlayLayerEntry[] = [];
const FALSE_REF = computed(() => false);
const TRUE_REF = computed(() => true);
const OVERLAY_CONTAINER_ATTRIBUTE = 'data-ky-overlay-container';
const HISTORY_STATE_KEY = '__kyOverlayGuard';
const historyToken = `ky-${Date.now()}-${Math.random().toString(36).slice(2)}`;

let overlayContainer: HTMLElement | undefined;
let lockedBody: HTMLElement | undefined;
let previousBodyOverflow = '';
let popstateListening = false;
let historyGuardActive = false;
let suppressNextPopstate = false;
let historyRefreshTimer: number | undefined;

function normalizeZIndex(value: number | string) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : 900;
}

function getTopBlockingLayer() {
  return [...layers].reverse().find((layer) => layer.blocksInteraction.value);
}

function syncLayerState() {
  let cursor = Number.NEGATIVE_INFINITY;
  for (const layer of layers) {
    const baseZIndex = normalizeZIndex(layer.baseZIndex.value);
    cursor = Number.isFinite(cursor) ? Math.max(baseZIndex, cursor + 1) : baseZIndex;
    layer.zIndex.value = cursor;
    layer.isTop.value = false;
  }

  const topLayer = getTopBlockingLayer();
  if (topLayer) topLayer.isTop.value = true;
  syncBodyLock();
  scheduleHistoryGuardRefresh();
}

function syncBodyLock() {
  if (typeof document === 'undefined') return;
  const shouldLock = layers.some((layer) => layer.lockScroll.value);

  if (shouldLock && !lockedBody) {
    lockedBody = document.body;
    previousBodyOverflow = lockedBody.style.overflow;
    lockedBody.style.overflow = 'hidden';
    return;
  }

  if (!shouldLock && lockedBody) {
    lockedBody.style.overflow = previousBodyOverflow;
    lockedBody = undefined;
    previousBodyOverflow = '';
  }
}

function isCurrentHistoryGuard() {
  if (typeof window === 'undefined') return false;
  return window.history.state?.[HISTORY_STATE_KEY] === historyToken;
}

function ensurePopstateListener() {
  if (popstateListening || typeof window === 'undefined') return;
  window.addEventListener('popstate', handlePopstate);
  popstateListening = true;
}

function removePopstateListenerIfIdle() {
  if (
    !popstateListening ||
    typeof window === 'undefined' ||
    layers.length > 0 ||
    historyGuardActive ||
    suppressNextPopstate ||
    isCurrentHistoryGuard()
  ) {
    return;
  }
  window.removeEventListener('popstate', handlePopstate);
  popstateListening = false;
}

function scheduleHistoryGuardRefresh() {
  if (typeof window === 'undefined') return;
  if (historyRefreshTimer) window.clearTimeout(historyRefreshTimer);
  historyRefreshTimer = window.setTimeout(() => {
    historyRefreshTimer = undefined;
    refreshHistoryGuard();
  });
}

function refreshHistoryGuard() {
  if (typeof window === 'undefined') return;
  const currentHistory = window.history;
  const topLayer = getTopBlockingLayer();
  const shouldGuard = Boolean(topLayer?.closeOnPopstate.value && topLayer.onPopstate);
  const isCurrentGuard = isCurrentHistoryGuard();

  if (shouldGuard) {
    ensurePopstateListener();
    if (!isCurrentGuard) {
      const currentState =
        currentHistory.state && typeof currentHistory.state === 'object'
          ? currentHistory.state
          : {};
      currentHistory.pushState(
        { ...currentState, [HISTORY_STATE_KEY]: historyToken },
        '',
        window.location.href,
      );
    }
    historyGuardActive = true;
    return;
  }

  historyGuardActive = false;
  if (!isCurrentGuard) {
    removePopstateListenerIfIdle();
    return;
  }
  suppressNextPopstate = true;
  currentHistory.back();
}

function handlePopstate() {
  if (suppressNextPopstate) {
    suppressNextPopstate = false;
    historyGuardActive = false;
    scheduleHistoryGuardRefresh();
    removePopstateListenerIfIdle();
    return;
  }
  if (!historyGuardActive) return;

  historyGuardActive = false;
  const topLayer = getTopBlockingLayer();
  if (topLayer?.closeOnPopstate.value) topLayer.onPopstate?.();
  // Vue 的受控状态会在当前事件结束后刷新，延迟重建哨兵以免把刚关闭的浮层再次注册。
  scheduleHistoryGuardRefresh();
}

function registerLayer(layer: OverlayLayerEntry) {
  if (layers.includes(layer)) return;
  layers.push(layer);
  syncLayerState();
}

function unregisterLayer(layer: OverlayLayerEntry) {
  const index = layers.indexOf(layer);
  if (index < 0) return;
  layers.splice(index, 1);
  layer.isTop.value = false;
  syncLayerState();
}

/**
 * 为 Popup、Dialog 等浮层统一分配层级，并集中处理顶层交互、滚动锁与移动端返回。
 * active 应覆盖退出动画周期，避免下层浮层在上层尚未离场时提前成为可交互层。
 */
export function useOverlayManager(options: OverlayLayerOptions): OverlayLayerState {
  const layer: OverlayLayerEntry = {
    baseZIndex: options.baseZIndex,
    blocksInteraction: options.blocksInteraction ?? TRUE_REF,
    lockScroll: options.lockScroll ?? FALSE_REF,
    closeOnPopstate: options.closeOnPopstate ?? FALSE_REF,
    onPopstate: options.onPopstate,
    zIndex: ref(normalizeZIndex(options.baseZIndex.value)),
    isTop: ref(false),
  };

  watch(
    options.active,
    (active) => {
      if (active) registerLayer(layer);
      else unregisterLayer(layer);
    },
    { immediate: true },
  );
  watch(
    [options.baseZIndex, layer.blocksInteraction, layer.lockScroll, layer.closeOnPopstate],
    syncLayerState,
  );

  onBeforeUnmount(() => unregisterLayer(layer));

  return {
    zIndex: readonly(layer.zIndex),
    isTop: readonly(layer.isTop),
  };
}

/** 默认浮层统一 Teleport 到该容器；SSR 阶段回退为 body 选择器。 */
export function getOverlayContainer(): TeleportProps['to'] {
  if (typeof document === 'undefined') return 'body';
  if (overlayContainer?.isConnected) return overlayContainer;

  const existing = document.querySelector<HTMLElement>(`[${OVERLAY_CONTAINER_ATTRIBUTE}]`);
  overlayContainer = existing ?? document.createElement('div');
  if (!existing) {
    overlayContainer.setAttribute(OVERLAY_CONTAINER_ATTRIBUTE, '');
    document.body.appendChild(overlayContainer);
  }
  return overlayContainer;
}
