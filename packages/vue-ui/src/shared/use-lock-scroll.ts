import { onBeforeUnmount, watch, type Ref } from 'vue';

let lockCount = 0;
let previousOverflow = '';

// 服务端渲染期间没有 document，初始为可见的浮层在 SSR 阶段不能锁定滚动；
// 引用计数保持为 0，避免 hydration 后计数不一致导致页面滚动被永久锁死。
/** 使用引用计数锁定页面滚动，确保多个浮层叠加时不会提前解锁。 */
export function useLockScroll(visible: Ref<boolean>) {
  const lock = () => {
    if (typeof document === 'undefined') return;
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    lockCount += 1;
  };
  const unlock = () => {
    if (typeof document === 'undefined') return;
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
