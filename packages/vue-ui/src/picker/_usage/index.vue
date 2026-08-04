<template>
  <div>
    <KyPicker
      v-model="values"
      :columns="columns"
      v-bind="configProps"
      @confirm="confirmed = $event.values.map(readText).join(' ')"
    />
    <p class="picker-usage__result">已确认：{{ confirmed }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyPicker from '../index';
import type { PickerOption } from '../picker';

defineProps<{ configProps: Record<string, unknown> }>();
const columns = [
  [
    { text: '今天', value: 'today' },
    { text: '明天', value: 'tomorrow' },
    { text: '后天', value: 'after-tomorrow' },
  ],
  ['上午', '下午', '晚上'],
];
const values = ref<PickerOption[]>([columns[0][0], columns[1][0]]);
const confirmed = ref('今天 上午');
function readText(value: PickerOption) {
  return typeof value === 'object' ? String(value.text ?? value.value ?? '') : String(value);
}
</script>

<style scoped lang="less">
.picker-usage__result {
  margin: 16px 0 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
