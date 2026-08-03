import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

type GestureAxis = 'x' | 'y';

interface GestureState {
  target: Element | null;
  scrollElement: HTMLElement | null;
  axis: GestureAxis | null;
  startX: number;
  startY: number;
  startScrollLeft: number;
  startScrollTop: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
}

const DRAG_THRESHOLD = 5;
const STOP_VELOCITY = 0.02;
const FRICTION = 0.92;
const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  '[contenteditable="true"]',
  '[data-no-touch-scroll]',
].join(',');

function createInitialState(): GestureState {
  return {
    target: null,
    scrollElement: null,
    axis: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
  };
}

function isScrollable(element: HTMLElement, axis: GestureAxis) {
  const style = window.getComputedStyle(element);
  const overflow = axis === 'x' ? style.overflowX : style.overflowY;
  const hasScrollableOverflow = /auto|scroll|overlay/.test(overflow);
  const hasOverflow =
    axis === 'x'
      ? element.scrollWidth > element.clientWidth + 1
      : element.scrollHeight > element.clientHeight + 1;

  return hasScrollableOverflow && hasOverflow;
}

function canScrollTowards(element: HTMLElement, axis: GestureAxis, delta: number) {
  const position = axis === 'x' ? element.scrollLeft : element.scrollTop;
  const maximum =
    axis === 'x'
      ? element.scrollWidth - element.clientWidth
      : element.scrollHeight - element.clientHeight;

  if (delta < 0) return position > 0;
  if (delta > 0) return position < maximum;
  return true;
}

/**
 * 从触摸起点向上查找真正可滚动的区域。
 * 内层滚动区域到达边界后会继续查找父级，避免抽屉、列表等嵌套场景卡住。
 */
function findScrollElement(target: Element, root: HTMLElement, axis: GestureAxis, delta: number) {
  let current: Element | null = target;
  let fallback: HTMLElement | null = null;

  while (current && root.contains(current)) {
    if (current instanceof HTMLElement && isScrollable(current, axis)) {
      fallback ??= current;
      if (canScrollTowards(current, axis, delta)) return current;
    }

    if (current === root) break;
    current = current.parentElement;
  }

  return fallback;
}

function readTouch(event: TouchEvent) {
  return event.touches.item(0) ?? event.changedTouches.item(0);
}

/**
 * 为手机预览页补充桌面拖拽滚动。
 * Vant touch-emulator 负责把鼠标转换为合成 TouchEvent，本 Hook 只处理合成事件；
 * 真实手机上的可信触摸事件仍交给浏览器原生滚动，避免出现双重位移。
 */
export function useDesktopTouchScroll(rootRef: Ref<HTMLElement | null>) {
  const isDragging = ref(false);
  let state = createInitialState();
  let momentumFrame = 0;
  let suppressNextClick = false;
  let suppressClickTimer = 0;

  function stopMomentum() {
    if (momentumFrame) cancelAnimationFrame(momentumFrame);
    momentumFrame = 0;
  }

  function startMomentum(element: HTMLElement, axis: GestureAxis, initialVelocity: number) {
    let velocity = initialVelocity;

    function step() {
      velocity *= FRICTION;
      if (Math.abs(velocity) < STOP_VELOCITY || !element.isConnected) {
        momentumFrame = 0;
        return;
      }

      const previous = axis === 'x' ? element.scrollLeft : element.scrollTop;
      if (axis === 'x') element.scrollLeft += velocity * 16;
      else element.scrollTop += velocity * 16;

      const current = axis === 'x' ? element.scrollLeft : element.scrollTop;
      if (current === previous) {
        momentumFrame = 0;
        return;
      }

      momentumFrame = requestAnimationFrame(step);
    }

    momentumFrame = requestAnimationFrame(step);
  }

  function handleTouchStart(event: TouchEvent) {
    // 合成事件的 isTrusted 为 false；真实触摸设备继续使用浏览器原生手势。
    if (event.isTrusted || event.touches.length !== 1) return;

    const root = rootRef.value;
    const touch = readTouch(event);
    const target = event.target instanceof Element ? event.target : null;
    if (!root || !touch || !target || !root.contains(target)) return;
    if (target.closest(INTERACTIVE_SELECTOR)) return;

    stopMomentum();
    state = {
      ...createInitialState(),
      target,
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      lastTime: performance.now(),
    };
  }

  function handleTouchMove(event: TouchEvent) {
    if (event.isTrusted || !state.target) return;

    const root = rootRef.value;
    const touch = readTouch(event);
    if (!root || !touch) return;

    const deltaX = touch.clientX - state.startX;
    const deltaY = touch.clientY - state.startY;

    if (!state.axis) {
      if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;

      const preferredAxis: GestureAxis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
      const fallbackAxis: GestureAxis = preferredAxis === 'x' ? 'y' : 'x';
      const preferredDelta = preferredAxis === 'x' ? -deltaX : -deltaY;
      const fallbackDelta = fallbackAxis === 'x' ? -deltaX : -deltaY;

      state.scrollElement = findScrollElement(state.target, root, preferredAxis, preferredDelta);
      state.axis = state.scrollElement ? preferredAxis : fallbackAxis;
      state.scrollElement ??= findScrollElement(state.target, root, fallbackAxis, fallbackDelta);

      if (!state.scrollElement) {
        state.axis = null;
        return;
      }

      state.startScrollLeft = state.scrollElement.scrollLeft;
      state.startScrollTop = state.scrollElement.scrollTop;
    }

    const axis = state.axis;
    const scrollElement = state.scrollElement;
    if (!axis || !scrollElement) return;

    const previous = axis === 'x' ? scrollElement.scrollLeft : scrollElement.scrollTop;
    if (axis === 'x') scrollElement.scrollLeft = state.startScrollLeft - deltaX;
    else scrollElement.scrollTop = state.startScrollTop - deltaY;

    const current = axis === 'x' ? scrollElement.scrollLeft : scrollElement.scrollTop;
    if (current !== previous) {
      event.preventDefault();
      state.moved = true;
      isDragging.value = true;
    }

    const now = performance.now();
    const elapsed = Math.max(now - state.lastTime, 1);
    const currentPoint = axis === 'x' ? touch.clientX : touch.clientY;
    const lastPoint = axis === 'x' ? state.lastX : state.lastY;
    state.velocity = -(currentPoint - lastPoint) / elapsed;
    state.lastX = touch.clientX;
    state.lastY = touch.clientY;
    state.lastTime = now;
  }

  function finishGesture(withMomentum: boolean) {
    const { axis, scrollElement, velocity, moved } = state;

    if (moved) {
      suppressNextClick = true;
      window.clearTimeout(suppressClickTimer);
      suppressClickTimer = window.setTimeout(() => {
        suppressNextClick = false;
      }, 350);
    }

    if (withMomentum && moved && axis && scrollElement) {
      startMomentum(scrollElement, axis, velocity);
    }

    state = createInitialState();
    isDragging.value = false;
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!event.isTrusted && state.target) finishGesture(true);
  }

  function handleTouchCancel(event: TouchEvent) {
    if (!event.isTrusted && state.target) finishGesture(false);
  }

  function handleClick(event: MouseEvent) {
    if (!suppressNextClick) return;

    suppressNextClick = false;
    window.clearTimeout(suppressClickTimer);
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  onMounted(() => {
    const root = rootRef.value;
    if (!root) return;

    root.addEventListener('touchstart', handleTouchStart, { passive: true });
    root.addEventListener('touchmove', handleTouchMove, { passive: false });
    root.addEventListener('touchend', handleTouchEnd, { passive: true });
    root.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    root.addEventListener('click', handleClick, true);
  });

  onBeforeUnmount(() => {
    const root = rootRef.value;
    stopMomentum();
    window.clearTimeout(suppressClickTimer);

    if (!root) return;
    root.removeEventListener('touchstart', handleTouchStart);
    root.removeEventListener('touchmove', handleTouchMove);
    root.removeEventListener('touchend', handleTouchEnd);
    root.removeEventListener('touchcancel', handleTouchCancel);
    root.removeEventListener('click', handleClick, true);
  });

  return { isDragging };
}
