<template>
  <div class="number-keyboard-demo">
    <section>
      <span>当前金额</span>
      <strong>{{ value || '0.00' }}</strong>
    </section>
    <div class="number-keyboard-demo__actions">
      <KyButton block @click="open('default')">默认键盘</KyButton>
      <KyButton block variant="secondary" plain @click="open('custom')">带侧栏键盘</KyButton>
    </div>
    <KyNumberKeyboard
      v-model="value"
      v-model:visible="visible"
      :theme="theme"
      :extra-key="theme === 'custom' ? ['00', '.'] : '.'"
      title="请输入支付金额"
      :maxlength="10"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyNumberKeyboard from '../index';
import type { NumberKeyboardTheme } from '../number-keyboard';

const value = ref('');
const visible = ref(false);
const theme = ref<NumberKeyboardTheme>('default');

function open(nextTheme: NumberKeyboardTheme) {
  theme.value = nextTheme;
  visible.value = true;
}
</script>

<style scoped lang="less">
.number-keyboard-demo {
  display: grid;
  gap: var(--ky-space-4);
}

.number-keyboard-demo section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ky-space-4);
  background: var(--ky-color-surface);
  border-radius: var(--ky-radius-md);
}

.number-keyboard-demo section span {
  color: var(--ky-color-text-secondary);
}

.number-keyboard-demo section strong {
  font-size: var(--ky-font-size-display);
}

.number-keyboard-demo__actions {
  display: grid;
  gap: var(--ky-space-3);
}
</style>
