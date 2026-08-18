<template>
  <div
    ref="root"
    class="ky-tab-bar"
    :class="{ 'is-scrollable': isScrollable, 'has-safe-bottom': safeAreaInsetBottom }"
    role="tablist"
    :aria-label="ariaLabel"
  >
    <component
      :is="item.href ? 'a' : 'button'"
      v-for="(item, index) in data"
      :key="item.value ?? index"
      :ref="(element: Element | ComponentPublicInstance | null) => setItemRef(element, index)"
      class="ky-tab-bar__item"
      :class="{ 'is-active': isActive(item, index), 'is-disabled': item.disabled }"
      :style="itemStyle"
      :type="item.href ? undefined : 'button'"
      :href="item.disabled ? undefined : item.href"
      :target="item.disabled ? undefined : item.target"
      :rel="item.disabled ? undefined : item.rel"
      role="tab"
      :disabled="item.href ? undefined : item.disabled"
      :aria-disabled="item.disabled || undefined"
      :aria-selected="isActive(item, index)"
      :aria-current="isActive(item, index) && item.href ? 'page' : undefined"
      :tabindex="item.disabled ? -1 : index === focusableIndex ? 0 : -1"
      @click="select($event, item, index)"
      @keydown.left.prevent="moveFocus(index, -1)"
      @keydown.right.prevent="moveFocus(index, 1)"
    >
      <span
        v-if="resolveItemIcon(item, index) || $slots.icon"
        class="ky-tab-bar__icon"
        aria-hidden="true"
      >
        <slot name="icon" :item="item" :index="index" :active="isActive(item, index)">
          <KyIcon
            v-if="resolveItemIcon(item, index)"
            source="iconfont"
            :name="resolveItemIcon(item, index) || ''"
            :size="18"
          />
        </slot>
      </span>
      <span class="ky-tab-bar__label">{{ item.label ?? item.title }}</span>
      <slot
        v-if="item.badge !== undefined || $slots.badge"
        name="badge"
        :item="item"
        :index="index"
        :active="isActive(item, index)"
        :badge="item.badge"
      >
        <span class="ky-tab-bar__badge">{{ item.badge }}</span>
      </slot>
    </component>
    <span
      class="ky-tab-bar__indicator"
      :class="{ 'is-animated': animated && indicatorReady }"
      :style="indicatorStyle"
      aria-hidden="true"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type ComponentPublicInstance,
} from 'vue';
import KyIcon from '../icon';
import type { TabBarItem, TabBarProps, TabBarValue } from './tab-bar';

defineOptions({ name: 'KyTabBar' });
const props = withDefaults(defineProps<TabBarProps>(), {
  current: 0,
  fixedCount: 4,
  animated: true,
  safeAreaInsetBottom: false,
  ariaLabel: '标签导航',
});
const emit = defineEmits<{
  'update:modelValue': [value: TabBarValue];
  'update:current': [value: TabBarValue];
  change: [value: TabBarValue, index: number, item: TabBarItem];
  click: [item: TabBarItem, index: number, event: MouseEvent];
}>();

const root = ref<HTMLElement | null>(null);
const itemRefs = ref<Array<HTMLElement | null>>([]);
const indicatorPosition = ref(0);
const indicatorVisible = ref(false);
const indicatorReady = ref(false);
let indicatorReadyFrame: number | undefined;
let resizeObserver: ResizeObserver | undefined;
const activeValue = computed(() => props.modelValue ?? props.current);
const focusableIndex = computed(() => {
  const currentIndex = activeIndex();
  return currentIndex >= 0 ? currentIndex : props.data.findIndex((item) => !item.disabled);
});
// 数据超出固定展示数量时启用横向滚动，保证移动端标签仍可完整访问。
const isScrollable = computed(
  () => props.scrollable ?? (props.fixedCount > 0 && props.data.length > props.fixedCount),
);
const itemStyle = computed(() => {
  if (isScrollable.value || props.fixedCount <= 0) return undefined;
  return { flexBasis: 100 / Math.max(1, props.fixedCount) + '%' };
});
const indicatorStyle = computed(() => ({
  opacity: indicatorVisible.value ? 1 : 0,
  transform: 'translate3d(' + indicatorPosition.value + 'px, 0, 0) translateX(-50%)',
}));

function itemValue(item: TabBarItem, index: number) {
  return item.value ?? index;
}

function isActive(item: TabBarItem, index: number) {
  return !item.disabled && activeValue.value === itemValue(item, index);
}

function resolveItemIcon(item: TabBarItem, index: number) {
  return isActive(item, index) ? (item.activeIcon ?? item.icon) : (item.inactiveIcon ?? item.icon);
}

function setItemRef(element: Element | ComponentPublicInstance | null, index: number) {
  const item = element instanceof HTMLElement ? element : null;
  const previousItem = itemRefs.value[index];
  if (previousItem && previousItem !== item) resizeObserver?.unobserve(previousItem);
  itemRefs.value[index] = item;
  if (item) resizeObserver?.observe(item);
}

function activeIndex(value = activeValue.value) {
  return props.data.findIndex((item, index) => !item.disabled && itemValue(item, index) === value);
}

// 指示线始终复用同一个元素，通过位移衔接前后激活项，避免切换时重新创建造成跳变。
function updateIndicator(index = activeIndex()) {
  const item = itemRefs.value[index];
  if (!item) {
    indicatorVisible.value = false;
    return;
  }
  indicatorPosition.value = item.offsetLeft + item.offsetWidth / 2;
  indicatorVisible.value = true;
  if (!indicatorReady.value && typeof window !== 'undefined') {
    if (indicatorReadyFrame !== undefined) window.cancelAnimationFrame(indicatorReadyFrame);
    indicatorReadyFrame = window.requestAnimationFrame(() => {
      indicatorReady.value = true;
      indicatorReadyFrame = undefined;
    });
  }
}

// 激活项变化后只滚动当前 TabBar，并将其尽量定位到容器中央。
function reveal(index: number) {
  const scroller = root.value;
  const item = itemRefs.value[index];
  if (!scroller || !item || scroller.scrollWidth <= scroller.clientWidth + 1) return;
  const maximum = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  const itemCenter = item.offsetLeft + item.offsetWidth / 2;
  const target = Math.min(maximum, Math.max(0, itemCenter - scroller.clientWidth / 2));
  scroller.scrollTo({ left: target, behavior: props.animated ? 'smooth' : 'auto' });
}

function select(event: MouseEvent, item: TabBarItem, index: number) {
  if (item.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', item, index, event);
  const value = itemValue(item, index);
  emit('update:modelValue', value);
  emit('update:current', value);
  emit('change', value, index, item);
  reveal(index);
}

// 方向键循环寻找下一个可用标签，并跳过禁用项。
function moveFocus(index: number, direction: -1 | 1) {
  let next = index;
  for (let step = 0; step < props.data.length; step += 1) {
    next = (next + direction + props.data.length) % props.data.length;
    if (!props.data[next]?.disabled) {
      itemRefs.value[next]?.focus();
      return;
    }
  }
}

watch(
  [
    activeValue,
    () => props.data.map((item, index) => [itemValue(item, index), item.disabled]),
    isScrollable,
    () => props.fixedCount,
  ],
  async ([value]) => {
    await nextTick();
    const index = activeIndex(value);
    updateIndicator(index);
    if (index >= 0) reveal(index);
  },
  { immediate: true },
);

onMounted(() => {
  if (typeof ResizeObserver === 'undefined') return;
  resizeObserver = new ResizeObserver(() => updateIndicator());
  if (root.value) resizeObserver.observe(root.value);
  itemRefs.value.forEach((item) => {
    if (item) resizeObserver?.observe(item);
  });
  updateIndicator();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  if (indicatorReadyFrame !== undefined && typeof window !== 'undefined') {
    window.cancelAnimationFrame(indicatorReadyFrame);
  }
});
</script>
