<template>
  <div class="rolling-text-usage">
    <KyRollingText ref="rollingText" v-bind="configProps" />
    <button type="button" @click="replay">重新播放</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyRollingText, { type RollingTextInstance } from '../index';

defineProps<{ configProps: Record<string, unknown> }>();

const rollingText = ref<RollingTextInstance | null>(null);

function replay() {
  rollingText.value?.start();
}
</script>

<style scoped lang="less">
.rolling-text-usage {
  display: grid;
  gap: var(--ky-space-5);
  justify-items: start;
}

.rolling-text-usage button {
  min-height: 36px;
  padding: 0 var(--ky-space-4);
  color: var(--ky-color-brand-strong);
  cursor: pointer;
  background: var(--ky-color-brand-soft);
  border: 0;
  border-radius: var(--ky-radius-sm);
}
</style>
