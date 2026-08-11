<template>
  <div class="count-down-usage">
    <KyCountDown v-bind="previewProps" />
    <p v-if="usesFallbackMillisecondFormat" class="count-down-usage__hint">
      当前格式未包含毫秒占位符，预览已自动使用 {{ previewProps.format }}。
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import KyCountDown from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();

const usesFallbackMillisecondFormat = computed(() => {
  const format = String(props.configProps.format ?? 'HH:mm:ss');
  return props.configProps.millisecond === true && !format.includes('S');
});

const previewProps = computed(() => {
  if (!usesFallbackMillisecondFormat.value) return props.configProps;

  const format = String(props.configProps.format ?? 'HH:mm:ss');
  return {
    ...props.configProps,
    format: `${format}:SSS`,
  };
});
</script>

<style scoped>
.count-down-usage {
  display: grid;
  gap: 10px;
  justify-items: start;
}

.count-down-usage__hint {
  margin: 0;
  font-size: var(--ky-font-size-caption);
  line-height: 18px;
  color: var(--ky-color-text-secondary);
}
</style>
