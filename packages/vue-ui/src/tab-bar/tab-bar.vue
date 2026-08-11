<template>
  <div
    ref="root"
    class="ky-tab-bar"
    :class="{ 'is-scrollable': isScrollable }"
    role="tablist"
    :aria-label="ariaLabel"
  >
    <button
      v-for="(item, index) in data"
      :key="item.value ?? index"
      :ref="(element) => setItemRef(element, index)"
      class="ky-tab-bar__item"
      :class="{ 'is-active': isActive(item, index) }"
      :style="itemStyle"
      type="button"
      role="tab"
      :disabled="item.disabled"
      :aria-selected="isActive(item, index)"
      :tabindex="isActive(item, index) ? 0 : -1"
      @click="select(item, index)"
      @keydown.left.prevent="moveFocus(index, -1)"
      @keydown.right.prevent="moveFocus(index, 1)"
    >
      <span v-if="item.icon || $slots.icon" class="ky-tab-bar__icon" aria-hidden="true">
        <slot name="icon" :item="item" :index="index">
          <KyIcon source="iconfont" v-if="item.icon" :name="item.icon" :size="18" />
        </slot>
      </span>
      <span class="ky-tab-bar__label">{{ item.label ?? item.title }}</span>
      <span v-if="item.badge !== undefined" class="ky-tab-bar__badge">{{ item.badge }}</span>
    </button>
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
  ariaLabel: '标签导航',
});
const emit = defineEmits<{
  'update:modelValue': [value: TabBarValue];
  'update:current': [value: TabBarValue];
  change: [value: TabBarValue, index: number, item: TabBarItem];
  click: [item: TabBarItem, index: number];
}>();

const root = ref<HTMLElement | null>(null);
const itemRefs = ref<Array<HTMLButtonElement | null>>([]);
const indicatorPosition = ref(0);
const indicatorVisible = ref(false);
const indicatorReady = ref(false);
let indicatorReadyFrame: number | undefined;
let resizeObserver: ResizeObserver | undefined;
const activeValue = computed(() => props.modelValue ?? props.current);
// 数据超出固定展示数量时启用横向滚动，保证移动端标签仍可完整访问。
const isScrollable = computed(
  () => props.scrollable ?? (props.fixedCount > 0 && props.data.length > props.fixedCount),
);
const itemStyle = computed(() => {
  if (isScrollable.value || props.fixedCount <= 0) return undefined;
  return { flexBasis: `${100 / Math.max(1, props.fixedCount)}%` };
});
const indicatorStyle = computed(() => ({
  opacity: indicatorVisible.value ? 1 : 0,
  transform: `translate3d(${indicatorPosition.value}px, 0, 0) translateX(-50%)`,
}));

function itemValue(item: TabBarItem, index: number) {
  return item.value ?? index;
}

function isActive(item: TabBarItem, index: number) {
  return activeValue.value === itemValue(item, index);
}

function setItemRef(element: Element | ComponentPublicInstance | null, index: number) {
  const item = element instanceof HTMLButtonElement ? element : null;
  const previousItem = itemRefs.value[index];

  if (previousItem && previousItem !== item) resizeObserver?.unobserve(previousItem);
  itemRefs.value[index] = item;
  if (item) resizeObserver?.observe(item);
}

function activeIndex(value = activeValue.value) {
  return props.data.findIndex((item, index) => itemValue(item, index) === value);
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

// 激活项变化后将其滚动到可视区域中央，兼顾点击与键盘切换场景。
function reveal(index: number) {
  if (!isScrollable.value) return;
  itemRefs.value[index]?.scrollIntoView({
    behavior: props.animated ? 'smooth' : 'auto',
    block: 'nearest',
    inline: 'center',
  });
}

function select(item: TabBarItem, index: number) {
  emit('click', item, index);
  if (item.disabled) return;
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
      select(props.data[next], next);
      return;
    }
  }
}

watch(
  [
    activeValue,
    () => props.data.map((item, index) => itemValue(item, index)),
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
