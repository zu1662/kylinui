<template>
  <div class="popover-usage">
    <KyPopover v-model="visible" v-bind="configProps">
      <KyButton variant="secondary">查看说明</KyButton>
    </KyPopover>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopover from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
// 显隐状态由示例自身维护，配置面板只控制展示属性。
const visible = ref(false);
</script>

<style scoped lang="less">
.popover-usage {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
