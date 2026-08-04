<template>
  <div class="icon-usage">
    <KyIcon v-bind="resolvedProps" label="配置预览图标" />
    <span>可通过配置面板切换图标效果</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import KyIcon from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();
// name 是 Icon 的必填属性，文档站配置异常时使用稳定的默认图标兜底。
const resolvedProps = computed(() => ({
  ...props.configProps,
  name: String(props.configProps.name ?? 'arrow-right'),
}));
</script>

<style scoped lang="less">
.icon-usage {
  display: grid;
  gap: 20px;
  min-height: 220px;
  place-content: center;
  justify-items: center;
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
