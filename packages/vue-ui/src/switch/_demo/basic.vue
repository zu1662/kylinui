<template>
  <div class="ky-demo-stack">
    <KySwitch
      v-model="notice"
      label="接收状态变更提醒"
      :before-change="confirmChange"
      @change-error="message = '切换失败，请稍后重试'"
    />
    <KySwitch v-model="network" label="仅 Wi-Fi 下同步" active-value="wifi" inactive-value="all" />
    <span>{{ message }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KySwitch from '../index';
import type { SwitchValue } from '../switch';
const notice = ref<SwitchValue>(true);
const network = ref<SwitchValue>('wifi');
const message = ref('异步确认期间会锁定开关');

async function confirmChange() {
  await new Promise((resolve) => window.setTimeout(resolve, 600));
  message.value = '设置已保存';
  return true;
}
</script>
