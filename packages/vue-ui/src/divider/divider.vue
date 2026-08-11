<template>
  <div
    class="ky-divider"
    :class="[
      `ky-divider--${contentPosition}`,
      { 'is-dashed': dashed, 'is-hairline': hairline, 'is-vertical': vertical },
    ]"
    role="separator"
  >
    <span v-if="$slots.default && !vertical" class="ky-divider__content"><slot /></span>
  </div>
</template>
<script setup lang="ts">
import type { DividerProps } from './divider';
defineOptions({ name: 'KyDivider' });
withDefaults(defineProps<DividerProps>(), {
  dashed: false,
  hairline: true,
  contentPosition: 'center',
  vertical: false,
});
</script>
