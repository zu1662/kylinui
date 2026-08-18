import { onBeforeUnmount, readonly, ref, toValue, type MaybeRefOrGetter, type Ref } from 'vue';

export type GestureAxis = 'x' | 'y';

export interface GestureBounds {
  min?: number;
  max?: number;
}

export interface AxisDragSnapshot {
  axis: GestureAxis;
  offset: number;
  rawOffset: number;
  velocity: number;
  duration: number;
  event: PointerEvent | TouchEvent;
}

interface UseAxisDragOptions {
  axis: GestureAxis;
  disabled?: MaybeRefOrGetter<boolean>;
  lockThreshold?: number;
  clickThreshold?: number;
  velocityMaxAge?: number;
  resistance?: number;
  getBounds?: () => GestureBounds;
  onStart?: (snapshot: AxisDragSnapshot) => void;
  onMove?: (snapshot: AxisDragSnapshot) => void;
  onEnd?: (snapshot: AxisDragSnapshot) => void;
  onCancel?: (snapshot: AxisDragSnapshot) => void;
}

interface GesturePoint {
  x: number;
  y: number;
  time: number;
}

interface DragSession {
  start: GesturePoint;
  last: GesturePoint;
  event: PointerEvent | TouchEvent;
  axis?: GestureAxis;
  active: boolean;
  pointerId?: number;
  touchId?: number;
  target?: HTMLElement;
  velocity: number;
  velocityTime: number;
}

const DEFAULT_LOCK_THRESHOLD = 6;
const DEFAULT_CLICK_THRESHOLD = 6;
const DEFAULT_VELOCITY_MAX_AGE = 120;
const DEFAULT_RESISTANCE = 0.35;
const CLICK_SUPPRESSION_DURATION = 400;

function eventTime(event: Event) {
  const time = Number(event.timeStamp);
  return Number.isFinite(time) && time > 0 ? time : Date.now();
}

function resolveAxis(deltaX: number, deltaY: number): GestureAxis {
  return Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
}

function axisValue(point: GesturePoint, axis: GestureAxis) {
  return axis === 'x' ? point.x : point.y;
}

/** 超出边界后保留阻尼位移，让拖拽具有可感知但不会失控的回弹反馈。 */
export function applyGestureResistance(
  value: number,
  bounds: GestureBounds = {},
  resistance = DEFAULT_RESISTANCE,
) {
  const ratio = Math.min(1, Math.max(0, resistance));
  const min = bounds.min ?? Number.NEGATIVE_INFINITY;
  const max = bounds.max ?? Number.POSITIVE_INFINITY;
  if (value < min) return min + (value - min) * ratio;
  if (value > max) return max + (value - max) * ratio;
  return value;
}

/** 判断位移或末速度是否足以提交一次滑动。 */
export function shouldCommitGesture(
  offset: number,
  velocity: number,
  distanceThreshold: number,
  velocityThreshold: number,
) {
  return Math.abs(offset) >= distanceThreshold || Math.abs(velocity) >= velocityThreshold;
}

/**
 * 管理拖动后的点击抑制，避免手指滑动结束时触发卡片、选项或遮罩的 click。
 * 抑制窗口只覆盖浏览器紧随 pointerup/touchend 合成 click 的短暂阶段。
 */
export function useGestureClickGuard() {
  let suppressedUntil = 0;
  let clearTimer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    suppressedUntil = 0;
    if (clearTimer) clearTimeout(clearTimer);
    clearTimer = undefined;
  }

  function suppress(duration = CLICK_SUPPRESSION_DURATION) {
    if (clearTimer) clearTimeout(clearTimer);
    suppressedUntil = Date.now() + Math.max(0, duration);
    clearTimer = setTimeout(clear, Math.max(0, duration));
  }

  function guard(event: MouseEvent) {
    if (Date.now() > suppressedUntil) return false;
    event.preventDefault();
    event.stopPropagation();
    return true;
  }

  onBeforeUnmount(clear);
  return { suppress, guard, clear };
}

/** 监听系统减少动态效果设置，供依赖 JavaScript 时长或自动播放的组件使用。 */
export function useReducedMotion(): Readonly<Ref<boolean>> {
  const reduced = ref(false);
  let mediaQuery: MediaQueryList | undefined;

  function sync(event?: MediaQueryListEvent) {
    reduced.value = event?.matches ?? mediaQuery?.matches ?? false;
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    sync();
    if (typeof mediaQuery.addEventListener === 'function')
      mediaQuery.addEventListener('change', sync);
    else mediaQuery.addListener(sync);
  }

  onBeforeUnmount(() => {
    if (!mediaQuery) return;
    if (typeof mediaQuery.removeEventListener === 'function') {
      mediaQuery.removeEventListener('change', sync);
    } else {
      mediaQuery.removeListener(sync);
    }
  });

  return readonly(reduced);
}

/**
 * 单轴拖动 composable：归一化 PointerEvent 与 TouchEvent，负责方向锁、速度、边界阻尼、
 * pointer capture、取消、点击抑制和卸载清理。缩放等多指能力应由独立 composable 组合。
 */
export function useAxisDrag(options: UseAxisDragOptions) {
  const dragging = ref(false);
  const clickGuard = useGestureClickGuard();
  let session: DragSession | undefined;
  let stopListeners: (() => void) | undefined;

  const lockThreshold = Math.max(0, options.lockThreshold ?? DEFAULT_LOCK_THRESHOLD);
  const clickThreshold = Math.max(0, options.clickThreshold ?? DEFAULT_CLICK_THRESHOLD);
  const velocityMaxAge = Math.max(0, options.velocityMaxAge ?? DEFAULT_VELOCITY_MAX_AGE);
  const resistance = options.resistance ?? DEFAULT_RESISTANCE;

  function snapshot(current: GesturePoint, event: PointerEvent | TouchEvent): AxisDragSnapshot {
    const activeSession = session;
    const rawOffset = activeSession
      ? axisValue(current, options.axis) - axisValue(activeSession.start, options.axis)
      : 0;
    return {
      axis: options.axis,
      rawOffset,
      offset: applyGestureResistance(rawOffset, options.getBounds?.(), resistance),
      velocity: activeSession?.velocity ?? 0,
      duration: activeSession ? Math.max(0, current.time - activeSession.start.time) : 0,
      event,
    };
  }

  function releaseCapture(activeSession: DragSession) {
    if (activeSession.pointerId === undefined || !activeSession.target) return;
    try {
      if (activeSession.target.hasPointerCapture?.(activeSession.pointerId)) {
        activeSession.target.releasePointerCapture(activeSession.pointerId);
      }
    } catch {
      // 元素可能已在手势期间卸载，capture 会由浏览器自动释放。
    }
  }

  function capturePointer(activeSession: DragSession) {
    if (activeSession.pointerId === undefined || !activeSession.target) return;
    try {
      if (!activeSession.target.hasPointerCapture?.(activeSession.pointerId)) {
        activeSession.target.setPointerCapture?.(activeSession.pointerId);
      }
    } catch {
      // 文档站触摸模拟器创建的 PointerEvent 不一定拥有可捕获的原生指针。
    }
  }

  function cleanup(activeSession = session) {
    stopListeners?.();
    stopListeners = undefined;
    if (activeSession) releaseCapture(activeSession);
    session = undefined;
    dragging.value = false;
  }

  function update(point: GesturePoint, event: PointerEvent | TouchEvent) {
    const activeSession = session;
    if (!activeSession) return;

    const deltaX = point.x - activeSession.start.x;
    const deltaY = point.y - activeSession.start.y;
    if (!activeSession.axis && Math.hypot(deltaX, deltaY) >= lockThreshold) {
      activeSession.axis = resolveAxis(deltaX, deltaY);
    }

    const previousAxisValue = axisValue(activeSession.last, options.axis);
    const currentAxisValue = axisValue(point, options.axis);
    const elapsed = point.time - activeSession.last.time;
    if (elapsed > 0 && currentAxisValue !== previousAxisValue) {
      activeSession.velocity = (currentAxisValue - previousAxisValue) / elapsed;
      activeSession.velocityTime = point.time;
    }
    activeSession.last = point;
    activeSession.event = event;

    if (activeSession.axis !== options.axis) return;
    if (event.cancelable) event.preventDefault();

    const currentSnapshot = snapshot(point, event);
    if (!activeSession.active) {
      // 延迟到方向锁定后再捕获；pointerdown 立即 capture 会把子元素的普通 click 重定向到拖动容器。
      capturePointer(activeSession);
      activeSession.active = true;
      dragging.value = true;
      options.onStart?.(currentSnapshot);
    }
    options.onMove?.(currentSnapshot);
  }

  function finish(event: PointerEvent | TouchEvent, cancelled: boolean, point?: GesturePoint) {
    const activeSession = session;
    if (!activeSession) return;
    if (point) update(point, event);

    const current = point ?? activeSession.last;
    if (current.time - activeSession.velocityTime > velocityMaxAge) activeSession.velocity = 0;
    const currentSnapshot = snapshot(current, event);
    const movedDistance = Math.hypot(
      current.x - activeSession.start.x,
      current.y - activeSession.start.y,
    );
    const wasActive = activeSession.active;

    cleanup(activeSession);
    if (movedDistance >= clickThreshold) clickGuard.suppress();
    if (!wasActive) return;
    if (cancelled) options.onCancel?.(currentSnapshot);
    else options.onEnd?.(currentSnapshot);
  }

  function cancel(notify = true) {
    const activeSession = session;
    if (!activeSession) return;
    if (!notify) {
      cleanup(activeSession);
      return;
    }
    finish(activeSession.event, true);
  }

  function begin(point: GesturePoint, event: PointerEvent | TouchEvent) {
    cancel();
    session = {
      start: point,
      last: point,
      event,
      active: false,
      velocity: 0,
      velocityTime: point.time,
    };
  }

  function startPointer(event: PointerEvent) {
    if (
      toValue(options.disabled) ||
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0)
    ) {
      return;
    }

    const target = event.currentTarget as HTMLElement;
    begin({ x: event.clientX, y: event.clientY, time: eventTime(event) }, event);
    if (!session) return;
    session.pointerId = event.pointerId;
    session.target = target;

    function move(moveEvent: PointerEvent) {
      if (!session || moveEvent.pointerId !== session.pointerId) return;
      update({ x: moveEvent.clientX, y: moveEvent.clientY, time: eventTime(moveEvent) }, moveEvent);
    }

    function end(endEvent: PointerEvent) {
      if (!session || endEvent.pointerId !== session.pointerId) return;
      finish(endEvent, false, {
        x: endEvent.clientX,
        y: endEvent.clientY,
        time: eventTime(endEvent),
      });
    }

    function cancelPointer(cancelEvent: PointerEvent) {
      if (!session || cancelEvent.pointerId !== session.pointerId) return;
      finish(cancelEvent, true, {
        x: cancelEvent.clientX,
        y: cancelEvent.clientY,
        time: eventTime(cancelEvent),
      });
    }

    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', cancelPointer);
    stopListeners = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', cancelPointer);
    };
  }

  function startTouch(event: TouchEvent) {
    const pointerEventsAvailable = typeof window !== 'undefined' && 'PointerEvent' in window;
    if (
      toValue(options.disabled) ||
      (event.isTrusted && pointerEventsAvailable) ||
      event.touches.length !== 1
    ) {
      return;
    }

    const touch = event.touches.item(0);
    if (!touch) return;
    begin({ x: touch.clientX, y: touch.clientY, time: eventTime(event) }, event);
    if (!session) return;
    session.touchId = touch.identifier;

    function findTouch(list: TouchList) {
      if (!session) return undefined;
      return Array.from(list).find((item) => item.identifier === session?.touchId);
    }

    function move(moveEvent: TouchEvent) {
      const currentTouch = findTouch(moveEvent.touches);
      if (!currentTouch) return;
      update(
        { x: currentTouch.clientX, y: currentTouch.clientY, time: eventTime(moveEvent) },
        moveEvent,
      );
    }

    function end(endEvent: TouchEvent) {
      const changedTouch = findTouch(endEvent.changedTouches);
      if (!changedTouch) return;
      finish(endEvent, false, {
        x: changedTouch.clientX,
        y: changedTouch.clientY,
        time: eventTime(endEvent),
      });
    }

    function cancelTouch(cancelEvent: TouchEvent) {
      const changedTouch = findTouch(cancelEvent.changedTouches);
      if (!changedTouch && cancelEvent.changedTouches.length) return;
      finish(
        cancelEvent,
        true,
        changedTouch
          ? {
              x: changedTouch.clientX,
              y: changedTouch.clientY,
              time: eventTime(cancelEvent),
            }
          : undefined,
      );
    }

    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    window.addEventListener('touchcancel', cancelTouch);
    stopListeners = () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
      window.removeEventListener('touchcancel', cancelTouch);
    };
  }

  onBeforeUnmount(() => cancel(false));

  return {
    dragging: readonly(dragging),
    startPointer,
    startTouch,
    guardClick: clickGuard.guard,
    cancel,
  };
}
