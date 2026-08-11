<template>
  <div class="popover-demo">
    <KyPopover
      v-model="visible"
      placement="bottom"
      content="每个账号最多可添加 2 个选项。"
      closable
    >
      <KyButton variant="text">选项说明</KyButton>
    </KyPopover>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopover from '../index';
const visible = ref(false);
// 简短说明优先使用气泡，复杂内容应改用 Action Sheet。
</script>

<style scoped lang="less">
.popover-demo {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
