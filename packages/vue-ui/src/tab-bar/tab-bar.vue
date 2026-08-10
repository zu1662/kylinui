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
          <KyIconX v-if="item.icon" :name="item.icon" :size="18" />
        </slot>
      </span>
      <span class="ky-tab-bar__label">{{ item.label ?? item.title }}</span>
      <span v-if="item.badge !== undefined" class="ky-tab-bar__badge">{{ item.badge }}</span>
      <span v-if="isActive(item, index)" class="ky-tab-bar__indicator" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, type ComponentPublicInstance } from 'vue';
import KyIconX from '../iconx';
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
const activeValue = computed(() => props.modelValue ?? props.current);
// 数据超出固定展示数量时启用横向滚动，保证移动端标签仍可完整访问。
const isScrollable = computed(
  () => props.scrollable ?? (props.fixedCount > 0 && props.data.length > props.fixedCount),
);
const itemStyle = computed(() => {
  if (isScrollable.value || props.fixedCount <= 0) return undefined;
  return { flexBasis: `${100 / Math.max(1, props.fixedCount)}%` };
});

function itemValue(item: TabBarItem, index: number) {
  return item.value ?? index;
}

function isActive(item: TabBarItem, index: number) {
  return activeValue.value === itemValue(item, index);
}

function setItemRef(element: Element | ComponentPublicInstance | null, index: number) {
  itemRefs.value[index] = element instanceof HTMLButtonElement ? element : null;
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
  activeValue,
  async (value) => {
    await nextTick();
    const index = props.data.findIndex((item, itemIndex) => itemValue(item, itemIndex) === value);
    if (index >= 0) reveal(index);
  },
  { immediate: true },
);
</script>
