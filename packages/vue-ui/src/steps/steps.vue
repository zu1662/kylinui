<template>
  <ol class="ky-steps" :class="`ky-steps--${direction}`">
    <li v-for="(item, index) in items" :key="item.title + '-' + index" :class="`is-${resolveStepStatus(index, current, item.status)}`">
      <span class="ky-steps__node" aria-hidden="true">{{ symbol(resolveStepStatus(index, current, item.status), index) }}</span>
      <span class="ky-steps__content"><strong>{{ item.title }}</strong><small v-if="item.description">{{ item.description }}</small></span>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { resolveStepStatus } from './steps';
import type { StepsProps, StepStatus } from './steps';

defineOptions({ name: 'KySteps' });
withDefaults(defineProps<StepsProps>(), { current: 0, direction: 'horizontal' });

// 完成和错误状态使用符号辅助表达，避免仅依赖颜色传达流程结果。
function symbol(status: StepStatus, index: number) {
  if (status === 'finish') return '✓';
  if (status === 'error') return '!';
  return String(index + 1);
}
</script>
