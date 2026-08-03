<template>
  <div>
    <KyButton @click="visible = true">打开底部浮层</KyButton>
    <KyBottomSheet v-model="visible" v-bind="configProps">
      <div class="sheet-demo-list"><div v-for="name in names" :key="name">{{ name }}</div></div>
      <template #footer><KyButton block @click="visible = false">完成</KyButton></template>
    </KyBottomSheet>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyBottomSheet from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const visible = ref(false);
const names = ['北京', '上海', '杭州'];
// 页脚固定在安全区上方，列表内容保持独立滚动区域。
</script>
