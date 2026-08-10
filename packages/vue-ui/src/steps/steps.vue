<template>
  <ol class="ky-steps" :class="`ky-steps--${direction}`">
    <li
      v-for="(item, index) in items"
      :key="item.title + '-' + index"
      :class="`is-${resolveStepStatus(index, current, item.status)}`"
    >
      <span class="ky-steps__node" aria-hidden="true">
        <KyIconX
          v-if="statusIcon(resolveStepStatus(index, current, item.status))"
          :name="statusIcon(resolveStepStatus(index, current, item.status)) || ''"
          :size="14"
        />
        <template v-else>{{ index + 1 }}</template>
      </span>
      <span class="ky-steps__content"
        ><strong>{{ item.title }}</strong
        ><small v-if="item.description">{{ item.description }}</small></span
      >
    </li>
  </ol>
</template>

<script setup lang="ts">
import KyIconX from '../iconx';
import { resolveStepStatus } from './steps';
import type { StepsProps, StepStatus } from './steps';

defineOptions({ name: 'KySteps' });
withDefaults(defineProps<StepsProps>(), { current: 0, direction: 'horizontal' });

// 完成和错误状态使用统一图标辅助表达，避免仅依赖颜色传达流程结果。
function statusIcon(status: StepStatus) {
  if (status === 'finish') return 'tick';
  if (status === 'error') return 'close';
  return undefined;
}
</script>
