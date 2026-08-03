import { onBeforeUnmount, watch, type Ref } from 'vue';

let lockCount = 0;
let previousOverflow = '';

/** 使用引用计数锁定页面滚动，确保多个浮层叠加时不会提前解锁。 */
export function useLockScroll(visible: Ref<boolean>) {
  const lock = () => {
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;
  };
  const unlock = () => {
    if (lockCount === 0) return;
    lockCount -= 1;
    if (lockCount === 0) document.body.style.overflow = previousOverflow;
  };

  watch(
    visible,
    (value, oldValue) => {
      if (value && !oldValue) lock();
      if (!value && oldValue) unlock();
    },
    { immediate: true },
  );

  onBeforeUnmount(() => {
    if (visible.value) unlock();
  });
}
