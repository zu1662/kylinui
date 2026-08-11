<template>
  <section class="ky-cell-group" :class="{ 'is-inset': inset }">
    <div v-if="title || $slots.title" class="ky-cell-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      class="ky-cell-group__content"
      :class="{ 'is-inset': inset, 'is-bordered': border && !inset }"
    >
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CellGroupProps } from './cell';

defineOptions({ name: 'KyCellGroup' });
withDefaults(defineProps<CellGroupProps>(), { title: '', inset: false, border: true });
</script>
