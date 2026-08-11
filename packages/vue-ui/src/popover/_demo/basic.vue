<template>
  <KyPopover v-model="visible" placement="bottom">
    <template #reference><KyButton variant="text">选项说明</KyButton></template>
    每个账号最多可添加 2 个选项。
  </KyPopover>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopover from '../index';
const visible = ref(false);
// 简短说明优先使用气泡，复杂内容应改用 Action Sheet。
</script>
