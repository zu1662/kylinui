<template>
  <component
    :is="clickable || isLink ? 'button' : 'div'"
    class="ky-cell"
    :class="[
      `ky-cell--${size}`,
      {
        'is-bordered': border,
        'is-center': center,
        'is-clickable': clickable || isLink,
        'is-disabled': disabled,
      },
    ]"
    :type="clickable || isLink ? 'button' : undefined"
    :disabled="clickable || isLink ? disabled : undefined"
    @click="$emit('click', $event)"
    ><div v-if="icon || $slots.icon" class="ky-cell__icon">
      <slot name="icon"><KyIcon :name="icon" source="iconfont" /></slot>
    </div>
    <div class="ky-cell__main">
      <div class="ky-cell__title">
        <span v-if="required" class="ky-cell__required" aria-hidden="true">*</span
        ><slot name="title">{{ title }}</slot>
      </div>
      <div v-if="label || $slots.label" class="ky-cell__label">
        <slot name="label">{{ label }}</slot>
      </div>
    </div>
    <div v-if="value !== '' || $slots.value" class="ky-cell__value">
      <slot name="value">{{ value }}</slot>
    </div>
    <slot name="right-icon"><KyIcon v-if="isLink" name="chevron-right" :size="18" /></slot
  ></component>
</template>
<script setup lang="ts">
import KyIcon from '../icon';
import type { CellProps } from './cell';
defineOptions({ name: 'KyCell' });
withDefaults(defineProps<CellProps>(), {
  title: '',
  value: '',
  label: '',
  icon: '',
  size: 'normal',
  border: true,
  center: false,
  clickable: false,
  isLink: false,
  required: false,
  disabled: false,
});
defineEmits<{ click: [event: MouseEvent] }>();
</script>
