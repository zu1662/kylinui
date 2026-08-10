<template>
  <div class="iconx-usage">
    <KyIconX v-bind="resolvedProps" label="当前选择的字体图标" />
    <span>支持尺寸、颜色、角度和旋转动画。</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import KyIconX from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const resolvedProps = computed(() => ({
  ...props.configProps,
  name: String(props.configProps.name ?? 'arrow-right'),
}));
</script>

<style scoped lang="less">
.iconx-usage {
  display: grid;
  gap: 20px;
  min-height: 220px;
  place-content: center;
  justify-items: center;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
