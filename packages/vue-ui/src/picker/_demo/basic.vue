<template>
  <KyPicker
    v-model="selected"
    title="选择里程"
    :columns="mileage"
    :default-index="2"
    :visible-item-count="5"
    @confirm="message = `已选择 ${String($event.values[0])}`"
  />
  <p class="picker-demo__message">{{ message }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyPicker from '../index';
import type { PickerOption } from '../picker';

const mileage = ['500 公里', '1000 公里', '1500 公里', '2000 公里', '2500 公里'];
const selected = ref<PickerOption[]>(['1500 公里']);
const message = ref('上下拖动或滚轮切换选项');
</script>

<style scoped lang="less">
.picker-demo__message {
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
