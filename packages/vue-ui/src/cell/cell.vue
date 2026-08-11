<template>
  <component
    :is="isClickable ? 'button' : 'div'"
    class="ky-cell"
    :class="[
      `ky-cell--${size}`,
      {
        'is-bordered': border,
        'is-center': center,
        'is-clickable': isClickable,
        'is-disabled': disabled,
        'has-title': hasMain,
        'has-value': hasValue,
      },
    ]"
    :type="isClickable ? 'button' : undefined"
    :disabled="isClickable ? disabled : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <div v-if="icon || slots.icon" class="ky-cell__left-icon">
      <slot name="icon"><KyIcon :name="icon" size="var(--ky-cell-icon-size)" /></slot>
    </div>

    <div v-if="hasMain" class="ky-cell__main">
      <div v-if="hasTitle" class="ky-cell__title">
        <span v-if="required" class="ky-cell__required" aria-hidden="true">*</span>
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasLabel" class="ky-cell__label">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>

    <div v-if="hasValue" class="ky-cell__value">
      <slot name="value"
        ><slot>{{ value }}</slot></slot
      >
    </div>

    <div v-if="isLink || slots['right-icon']" class="ky-cell__right-icon">
      <slot name="right-icon">
        <KyIcon :name="arrowIcon" size="var(--ky-cell-right-icon-size)" />
      </slot>
    </div>

    <div v-if="slots.extra" class="ky-cell__extra">
      <slot name="extra" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import KyIcon from '../icon';
import type { CellProps } from './cell';

defineOptions({ name: 'KyCell' });
const props = withDefaults(defineProps<CellProps>(), {
  title: '',
  value: '',
  label: '',
  icon: '',
  size: 'normal',
  border: true,
  center: false,
  clickable: null,
  isLink: false,
  arrowDirection: 'right',
  required: false,
  disabled: false,
});
const emit = defineEmits<{ click: [event: MouseEvent] }>();
const slots = useSlots();

const hasTitle = computed(() => props.title !== '' || Boolean(slots.title));
const hasLabel = computed(() => props.label !== '' || Boolean(slots.label));
const hasMain = computed(() => hasTitle.value || hasLabel.value);
const hasValue = computed(() => props.value !== '' || Boolean(slots.value || slots.default));
const isClickable = computed(() => props.clickable ?? props.isLink);
const arrowIcon = computed(() => `chevron-${props.arrowDirection}`);

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>
