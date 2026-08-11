<template>
  <div class="ky-space-demo">
    <section>
      <h3>基础用法</h3>
      <KySpace>
        <KyButton>按钮</KyButton>
        <KyButton>按钮</KyButton>
        <KyButton>按钮</KyButton>
        <KyButton>按钮</KyButton>
      </KySpace>
    </section>

    <section>
      <h3>垂直排列</h3>
      <KySpace direction="vertical" fill>
        <KyButton block>按钮</KyButton>
        <KyButton block>按钮</KyButton>
        <KyButton block>按钮</KyButton>
      </KySpace>
    </section>

    <section>
      <h3>自定义间距</h3>
      <div class="ky-space-demo__sizes">
        <KySpace :size="20">
          <KyButton>按钮</KyButton>
          <KyButton>按钮</KyButton>
          <KyButton>按钮</KyButton>
        </KySpace>
        <KySpace size="3rem">
          <KyButton>按钮</KyButton>
          <KyButton>按钮</KyButton>
          <KyButton>按钮</KyButton>
        </KySpace>
      </div>
    </section>

    <section>
      <h3>对齐方式</h3>
      <KySpace wrap class="ky-space-demo__align-options">
        <KyRadio
          v-for="option in alignOptions"
          :key="option"
          v-model="selectedAlign"
          :value="option"
          :label="option"
          name="space-align"
        />
      </KySpace>
      <KySpace :align="align" class="ky-space-demo__align-preview">
        <KyButton>{{ align }}</KyButton>
        <div class="ky-space-demo__block">Block</div>
      </KySpace>
    </section>

    <section>
      <h3>自动换行</h3>
      <KySpace wrap>
        <KyButton v-for="item in 8" :key="item">按钮</KyButton>
      </KySpace>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyButton from '../../button';
import KyRadio from '../../radio';
import KySpace from '../index';
import type { SpaceAlign } from '../space';

const alignOptions: SpaceAlign[] = ['start', 'center', 'end', 'baseline'];
const selectedAlign = ref<string | number | boolean>('center');
function isSpaceAlign(value: string | number | boolean): value is SpaceAlign {
  return typeof value === 'string' && alignOptions.some((option) => option === value);
}

const align = computed<SpaceAlign>(() =>
  isSpaceAlign(selectedAlign.value) ? selectedAlign.value : 'center',
);
</script>

<style scoped lang="less">
.ky-space-demo {
  display: grid;
  gap: var(--ky-space-6);
  width: 100%;
}

.ky-space-demo section {
  min-width: 0;
}

.ky-space-demo :deep(.ky-button:not(.is-block)) {
  min-width: auto;
  padding-inline: var(--ky-space-5);
}

.ky-space-demo h3 {
  margin: 0 0 var(--ky-space-3);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
  font-weight: var(--ky-font-medium);
}

.ky-space-demo__sizes {
  display: grid;
  gap: var(--ky-space-4);
}

.ky-space-demo__align-options {
  margin-bottom: var(--ky-space-4);
}

.ky-space-demo__align-preview {
  padding: var(--ky-space-4);
  background: var(--ky-color-subtle-bg);
}

.ky-space-demo__block {
  padding: var(--ky-space-8) var(--ky-space-5);
  background: var(--ky-color-surface);
}
</style>
