<template>
  <div class="transition-usage">
    <KyButton size="small" @click="visible = !visible">
      {{ visible ? '播放退出动画' : '播放进入动画' }}
    </KyButton>
    <div class="transition-usage__stage">
      <KyTransition v-bind="transitionProps">
        <div v-if="visible" class="transition-usage__card">
          <span>{{ transitionProps.name }}</span>
          <strong>让状态变化更自然</strong>
          <small>{{ transitionProps.duration }}ms</small>
        </div>
      </KyTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyButton from '../../button';
import KyTransition from '../index';
import type { TransitionName } from '../transition';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const visible = ref(true);
const transitionProps = computed(() => ({
  name: String(props.configProps.name ?? 'fade-up') as TransitionName,
  duration: Number(props.configProps.duration ?? 300),
  appear: Boolean(props.configProps.appear),
  disabled: Boolean(props.configProps.disabled),
}));
</script>

<style scoped lang="less">
.transition-usage {
  display: grid;
  gap: var(--ky-space-4);
  width: 100%;
}

.transition-usage__stage {
  display: grid;
  min-height: 210px;
  padding: var(--ky-space-5);
  overflow: hidden;
  place-items: center;
  background:
    radial-gradient(
      circle at 20% 10%,
      color-mix(in srgb, var(--ky-color-brand) 16%, transparent),
      transparent 38%
    ),
    var(--ky-color-subtle-bg);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.transition-usage__card {
  display: grid;
  gap: var(--ky-space-2);
  width: min(100%, 240px);
  padding: var(--ky-space-5);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-surface);
  border: 1px solid color-mix(in srgb, var(--ky-color-brand) 24%, transparent);
  border-radius: var(--ky-radius-lg);
  box-shadow: var(--ky-shadow-card);
  transform-origin: center;
}

.transition-usage__card span,
.transition-usage__card small {
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.transition-usage__card strong {
  font-size: var(--ky-font-size-body-strong);
}
</style>
