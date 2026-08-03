<template>
  <KyPopover v-model="visible" placement="bottom">
    <template #reference><KyButton variant="text">行李规则</KyButton></template>
    每人可携带 2 件随身行李。
  </KyPopover>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopover from '../index';
const visible = ref(false);
// 简短说明优先使用气泡，复杂内容应改用底部浮层。
</script>
