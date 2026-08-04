import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

type GestureAxis = 'x' | 'y';

interface GestureState {
  target: Element | null;
  axis: GestureAxis | null;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
}

const DRAG_THRESHOLD = 5;
const STOP_VELOCITY = 0.02;
const FRICTION = 0.92;
const CLICK_SUPPRESS_DURATION = 350;
const NATIVE_GESTURE_SELECTOR = [
  'input',
  'select',
  'textarea',
  '[contenteditable]:not([contenteditable="false"])',
  '[draggable="true"]',
  '[data-no-touch-scroll]',
].join(',');

function createInitialState(): GestureState {
  return {
    target: null,
    axis: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
  };
}

function getScrollPosition(element: HTMLElement, axis: GestureAxis) {
  return axis === 'x' ? element.scrollLeft : element.scrollTop;
}

function setScrollPosition(element: HTMLElement, axis: GestureAxis, value: number) {
  if (axis === 'x') element.scrollLeft = value;
  else element.scrollTop = value;
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
  const position = getScrollPosition(element, axis);
  const maximum =
    axis === 'x'
      ? element.scrollWidth - element.clientWidth
      : element.scrollHeight - element.clientHeight;

  if (delta < 0) return position > 0;
  if (delta > 0) return position < maximum;
  return false;
}

/**
 * 从触摸起点向上查找当前方向真正可滚动的区域。
 * 已到边界的内层列表会被跳过，手势可以继续传递给外层页面。
 */
function findScrollElement(target: Element, root: HTMLElement, axis: GestureAxis, delta: number) {
  let current: Element | null = target;

  while (current && root.contains(current)) {
    if (
      current instanceof HTMLElement &&
      isScrollable(current, axis) &&
      canScrollTowards(current, axis, delta)
    ) {
      return current;
    }

    if (current === root) break;
    current = current.parentElement;
  }

  return null;
}

/**
 * 消费一次增量滚动，并把到达边界后剩余的距离继续传递给父级滚动容器。
 * 每次 touchmove 都重新查找容器，因此反向拖动时也能自然回到内层列表。
 */
function scrollByDelta(target: Element, root: HTMLElement, axis: GestureAxis, delta: number) {
  let searchStart: Element | null = target;
  let remaining = delta;
  let moved = false;

  while (searchStart && root.contains(searchStart) && Math.abs(remaining) > 0.5) {
    const scrollElement = findScrollElement(searchStart, root, axis, remaining);
    if (!scrollElement) break;

    const before = getScrollPosition(scrollElement, axis);
    setScrollPosition(scrollElement, axis, before + remaining);
    const consumed = getScrollPosition(scrollElement, axis) - before;

    if (consumed !== 0) {
      moved = true;
      remaining -= consumed;
    }

    if (scrollElement === root) break;
    searchStart = scrollElement.parentElement;
  }

  return moved;
}

function readTouch(event: TouchEvent) {
  return event.touches.item(0) ?? event.changedTouches.item(0);
}

function isRelatedTarget(eventTarget: EventTarget | null, gestureTarget: Element | null) {
  if (!(eventTarget instanceof Element) || !gestureTarget) return false;
  return (
    eventTarget === gestureTarget ||
    eventTarget.contains(gestureTarget) ||
    gestureTarget.contains(eventTarget)
  );
}

/**
 * 为手机预览页补充桌面拖拽滚动。
 * Vant touch-emulator 负责把鼠标转换为合成 TouchEvent，本 Hook 只处理合成事件；
 * 真实手机上的可信触摸事件仍交给浏览器原生滚动，避免出现双重位移。
 */
export function useDesktopTouchScroll(rootRef: Ref<HTMLElement | null>) {
  const isDragging = ref(false);
  let state = createInitialState();
  let boundRoot: HTMLElement | null = null;
  let momentumFrame = 0;
  let suppressedClickTarget: Element | null = null;
  let suppressClickTimer = 0;

  function stopMomentum() {
    if (momentumFrame) cancelAnimationFrame(momentumFrame);
    momentumFrame = 0;
  }

  function clearClickSuppression() {
    suppressedClickTarget = null;
    window.clearTimeout(suppressClickTimer);
  }

  function scheduleClickSuppression(target: Element) {
    suppressedClickTarget = target;
    window.clearTimeout(suppressClickTimer);
    suppressClickTimer = window.setTimeout(clearClickSuppression, CLICK_SUPPRESS_DURATION);
  }

  function startMomentum(
    target: Element,
    root: HTMLElement,
    axis: GestureAxis,
    initialVelocity: number,
  ) {
    let velocity = initialVelocity;

    function step() {
      velocity *= FRICTION;
      if (Math.abs(velocity) < STOP_VELOCITY || !target.isConnected || !root.isConnected) {
        momentumFrame = 0;
        return;
      }

      if (!scrollByDelta(target, root, axis, velocity * 16)) {
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

    // 输入、文本编辑、原生拖放等控件保留自身手势；按钮和链接仍可通过拖动页面滚动。
    if (target.closest(NATIVE_GESTURE_SELECTOR)) return;

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

      if (findScrollElement(state.target, root, preferredAxis, preferredDelta)) {
        state.axis = preferredAxis;
      } else if (findScrollElement(state.target, root, fallbackAxis, fallbackDelta)) {
        state.axis = fallbackAxis;
      } else {
        return;
      }
    }

    const axis = state.axis;
    const currentPoint = axis === 'x' ? touch.clientX : touch.clientY;
    const lastPoint = axis === 'x' ? state.lastX : state.lastY;
    const scrollDelta = lastPoint - currentPoint;
    const now = performance.now();
    const elapsed = Math.max(now - state.lastTime, 1);

    if (scrollByDelta(state.target, root, axis, scrollDelta)) {
      event.preventDefault();
      state.moved = true;
      isDragging.value = true;
    }

    state.velocity = scrollDelta / elapsed;
    state.lastX = touch.clientX;
    state.lastY = touch.clientY;
    state.lastTime = now;
  }

  function finishGesture(withMomentum: boolean) {
    const { axis, target, velocity, moved } = state;
    const root = rootRef.value;

    if (moved && target) scheduleClickSuppression(target);
    if (withMomentum && moved && axis && target && root) {
      startMomentum(target, root, axis, velocity);
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
    if (!isRelatedTarget(event.target, suppressedClickTarget)) return;

    clearClickSuppression();
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  onMounted(() => {
    boundRoot = rootRef.value;
    if (!boundRoot) return;

    boundRoot.addEventListener('touchstart', handleTouchStart, { passive: true });
    boundRoot.addEventListener('touchmove', handleTouchMove, { passive: false });
    boundRoot.addEventListener('touchend', handleTouchEnd, { passive: true });
    boundRoot.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    boundRoot.addEventListener('click', handleClick, true);
  });

  onBeforeUnmount(() => {
    stopMomentum();
    clearClickSuppression();

    if (!boundRoot) return;
    boundRoot.removeEventListener('touchstart', handleTouchStart);
    boundRoot.removeEventListener('touchmove', handleTouchMove);
    boundRoot.removeEventListener('touchend', handleTouchEnd);
    boundRoot.removeEventListener('touchcancel', handleTouchCancel);
    boundRoot.removeEventListener('click', handleClick, true);
    boundRoot = null;
  });

  return { isDragging };
}
