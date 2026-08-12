<template>
  <div class="rolling-text-demo">
    <section>
      <h4>基础用法</h4>
      <KyRollingText :key="baseKey" :value="2486" :min-integer-digits="4" />
      <button type="button" @click="baseKey += 1">重新播放</button>
    </section>

    <section>
      <h4>向下滚动</h4>
      <KyRollingText :key="downKey" :value="731" direction="down" :min-integer-digits="3" />
      <button type="button" @click="downKey += 1">重新播放</button>
    </section>

    <section>
      <h4>金额格式</h4>
      <KyRollingText
        :key="amountKey"
        :value="12864.5"
        :start-value="9800"
        :decimal-places="2"
        thousands
      />
      <button type="button" @click="amountKey += 1">重新播放</button>
    </section>

    <section>
      <h4>手动控制</h4>
      <KyRollingText
        ref="manualRollingText"
        :auto-start="false"
        :value="2026"
        :min-integer-digits="4"
        @finish="status = '播放完成'"
      />
      <div class="rolling-text-demo__actions">
        <button type="button" @click="playManual">播放</button>
        <button type="button" @click="resetManual">重置</button>
      </div>
      <p class="rolling-text-demo__status" aria-live="polite">{{ status }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyRollingText, { type RollingTextInstance } from '../index';

const baseKey = ref(0);
const downKey = ref(0);
const amountKey = ref(0);
const manualRollingText = ref<RollingTextInstance | null>(null);
const status = ref('等待播放');

function playManual() {
  status.value = '播放中';
  manualRollingText.value?.start();
}

function resetManual() {
  status.value = '已重置';
  manualRollingText.value?.reset();
}
</script>

<style scoped lang="less">
.rolling-text-demo {
  display: grid;
  gap: var(--ky-space-6);
}

.rolling-text-demo section {
  display: grid;
  gap: var(--ky-space-3);
  justify-items: start;
}

.rolling-text-demo h4,
.rolling-text-demo p {
  margin: 0;
}

.rolling-text-demo__actions {
  display: flex;
  gap: var(--ky-space-2);
}

.rolling-text-demo button {
  min-height: 36px;
  padding: 0 var(--ky-space-4);
  color: var(--ky-color-brand-strong);
  cursor: pointer;
  background: var(--ky-color-brand-soft);
  border: 0;
  border-radius: var(--ky-radius-sm);
}

.rolling-text-demo__status {
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}
</style>
