import type { UsageConfig } from '../../usage';
import { transitionNames } from '../transition';

function escapeAttribute(value: unknown) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

export default {
  name: 'Transition 动画',
  component: 'KyTransition',
  description: '为单个元素提供淡入、滑动、缩放和弹性等标准进出场效果。',
  props: [
    {
      name: 'name',
      label: '动画名称',
      type: 'select',
      defaultValue: 'fade-up',
      options: [...transitionNames],
    },
    {
      name: 'duration',
      label: '动画时长',
      type: 'number',
      defaultValue: 300,
      min: 0,
      max: 1200,
      step: 25,
    },
    {
      name: 'appear',
      label: '初次播放',
      type: 'boolean',
      defaultValue: true,
    },
    {
      name: 'disabled',
      label: '禁用动画',
      type: 'boolean',
      defaultValue: false,
    },
  ],
  generateCode(values) {
    const attributes = [
      `name="${escapeAttribute(values.name)}"`,
      `:duration="${Number(values.duration)}"`,
      values.appear ? 'appear' : '',
      values.disabled ? 'disabled' : '',
    ].filter(Boolean);

    return `<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<template>
  <button type="button" @click="visible = !visible">切换动画</button>
  <KyTransition
${attributes.map((attribute) => `    ${attribute}`).join('\n')}
  >
    <div v-if="visible">动画内容</div>
  </KyTransition>
</template>`;
  },
} satisfies UsageConfig;
