type MutableTouchList = TouchList & Touch[];

let installed = false;
let activeTarget: Element | null = null;
let mousePressed = false;

function createTouchPoint(target: EventTarget, event: MouseEvent): Touch {
  return {
    identifier: 1,
    target,
    clientX: event.clientX,
    clientY: event.clientY,
    screenX: event.screenX,
    screenY: event.screenY,
    pageX: event.pageX,
    pageY: event.pageY,
    radiusX: 0,
    radiusY: 0,
    rotationAngle: 0,
    force: mousePressed ? 0.5 : 0,
  } as Touch;
}

function createTouchList(touch?: Touch): TouchList {
  const list = (touch ? [touch] : []) as MutableTouchList;
  list.item = (index: number) => list[index] ?? null;
  return list;
}

function dispatchTouch(type: 'touchstart' | 'touchmove' | 'touchend', mouseEvent: MouseEvent) {
  const target = activeTarget;
  if (!target) return;

  const touch = createTouchPoint(target, mouseEvent);
  const activeTouches = type === 'touchend' ? createTouchList() : createTouchList(touch);
  const event = new Event(type, { bubbles: true, cancelable: true });

  Object.defineProperties(event, {
    touches: { value: activeTouches },
    targetTouches: { value: activeTouches },
    changedTouches: { value: createTouchList(touch) },
    altKey: { value: mouseEvent.altKey },
    ctrlKey: { value: mouseEvent.ctrlKey },
    metaKey: { value: mouseEvent.metaKey },
    shiftKey: { value: mouseEvent.shiftKey },
  });

  target.dispatchEvent(event);
}

/**
 * 在不支持触摸事件的桌面浏览器中，将鼠标拖动转换为合成 TouchEvent。
 * 始终向按下时的元素派发事件，保证拖出元素后仍能完成当前手势。
 */
export function installDesktopTouchEmulator() {
  if (installed || 'ontouchstart' in window) return;
  installed = true;

  window.addEventListener(
    'mousedown',
    (event) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      if (event.target.closest('[data-no-touch-simulate]')) return;

      mousePressed = true;
      activeTarget = event.target;
      dispatchTouch('touchstart', event);
    },
    true,
  );

  window.addEventListener(
    'mousemove',
    (event) => {
      if (!mousePressed) return;
      dispatchTouch('touchmove', event);
    },
    true,
  );

  window.addEventListener(
    'mouseup',
    (event) => {
      if (!mousePressed) return;
      mousePressed = false;
      dispatchTouch('touchend', event);
      activeTarget = null;
    },
    true,
  );
}
