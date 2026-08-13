<template>
  <div
    class="ky-grid-item"
    :class="{ 'is-square': context?.square.value, 'has-gutter': context?.hasGutter.value }"
  >
    <component
      :is="url ? 'a' : 'div'"
      class="ky-grid-item__content"
      :class="contentClasses"
      :href="url || undefined"
      :role="isClickable && !url ? 'button' : undefined"
      :tabindex="isClickable && !url ? 0 : undefined"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <slot>
        <KyBadge v-if="hasIcon" :content="badge" :dot="dot" class="ky-grid-item__badge">
          <slot name="icon">
            <KyIcon
              v-if="icon"
              class="ky-grid-item__icon"
              :name="icon"
              source="iconfont"
              :size="context?.iconSize.value ?? 28"
            />
          </slot>
        </KyBadge>
        <slot name="text">
          <span v-if="text" class="ky-grid-item__text">{{ text }}</span>
        </slot>
      </slot>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue';
import KyBadge from '../badge';
import KyIcon from '../icon';
import type { GridItemProps } from './grid';
import { GRID_KEY } from './grid-context';

defineOptions({ name: 'KyGridItem' });

const props = withDefaults(defineProps<GridItemProps>(), {
  text: '',
  icon: '',
  badge: '',
  dot: false,
  url: '',
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const slots = useSlots();
const context = inject(GRID_KEY);

const hasIcon = computed(() => Boolean(props.icon || slots.icon));
const isClickable = computed(() => Boolean(context?.clickable.value || props.url));
const contentClasses = computed(() => ({
  'is-center': context?.center.value,
  'is-clickable': isClickable.value,
  'is-bordered': context?.border.value,
  'is-surrounded': context?.border.value && context?.hasGutter.value,
  'is-horizontal': context?.direction.value === 'horizontal',
  'is-reverse': context?.reverse.value,
}));

function handleClick(event: MouseEvent) {
  emit('click', event);
}

function handleKeydown(event: KeyboardEvent) {
  if (!isClickable.value || props.url || (event.key !== 'Enter' && event.key !== ' ')) return;
  event.preventDefault();
  const target = event.currentTarget;
  if (target instanceof HTMLElement) target.click();
}
</script>
