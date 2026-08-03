import { onBeforeUnmount, onMounted, type Ref } from 'vue';

/** 监听目标元素外部的指针事件，适用于气泡等轻量浮层。 */
export function useClickOutside(
  target: Ref<HTMLElement | null>,
  handler: (event: PointerEvent) => void,
) {
  const listener = (event: PointerEvent) => {
    const element = target.value;
    if (element && !element.contains(event.target as Node)) handler(event);
  };

  onMounted(() => document.addEventListener('pointerdown', listener));
  onBeforeUnmount(() => document.removeEventListener('pointerdown', listener));
}
