<template>
  <div>
    <KyButton block @click="visible = true">打开动作面板</KyButton>
    <KyActionSheet
      v-model="visible"
      v-bind="configProps"
      :actions="actions"
      cancel-text="取消"
      @select="selected = $event.name"
    />
    <p class="action-sheet-usage__result">当前选择：{{ selected }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyActionSheet from '../index';
import type { ActionSheetAction } from '../action-sheet';

defineProps<{ configProps: Record<string, unknown> }>();
const visible = ref(false);
const selected = ref('尚未选择');
const actions: ActionSheetAction[] = [
  { name: '购买额外行李', description: '适合托运行李较多的旅客' },
  { name: '预约贵宾休息室', description: '开放时间 07:00 - 23:00' },
  { name: '删除当前服务', danger: true },
];
</script>

<style scoped lang="less">
.action-sheet-usage__result {
  margin: 16px 0 0;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
