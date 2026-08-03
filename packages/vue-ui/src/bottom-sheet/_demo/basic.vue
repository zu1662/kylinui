<template>
  <KyButton variant="secondary" @click="visible = true">选择出行城市</KyButton>
  <KyBottomSheet v-model="visible" title="选择城市"><p>最多可选择 2 个目的地，确认后将更新行程路线。</p></KyBottomSheet>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyBottomSheet from '../index';
const visible = ref(false);
// 示例展示适合移动端单手操作的底部选择容器。
</script>
