<template>
  <div>
    <KyTimePicker
      v-model="value"
      min-time="08:30:00"
      max-time="22:00:00"
      v-bind="configProps"
      @confirm="confirmed = $event.value"
    />
    <p class="time-picker-usage__result">已确认：{{ confirmed }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyTimePicker from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const value = ref('14:30');
const confirmed = ref(value.value);
</script>

<style scoped lang="less">
.time-picker-usage__result {
  margin: var(--ky-space-4) 0 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
