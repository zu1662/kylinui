<template>
  <div class="number-keyboard-demo">
    <section>
      <h3>基础用法</h3>
      <KyCellGroup>
        <KyCell title="弹出默认键盘" is-link @click="openKeyboard('default')" />
        <KyCell title="弹出带右侧栏的键盘" is-link @click="openKeyboard('custom')" />
        <KyCell title="弹出身份证号键盘" is-link @click="openKeyboard('id-number')" />
        <KyCell title="弹出带标题的键盘" is-link @click="openKeyboard('title')" />
      </KyCellGroup>
    </section>

    <section>
      <h3>按键配置</h3>
      <KyCellGroup>
        <KyCell title="弹出配置多个按键的键盘" is-link @click="openKeyboard('multiple')" />
        <KyCell title="弹出随机数字键盘" is-link @click="openKeyboard('random')" />
      </KyCellGroup>
    </section>

    <section>
      <h3>双向绑定</h3>
      <KyCellGroup>
        <KyCell
          title="输入值"
          :value="value || '点此输入'"
          is-link
          @click="openKeyboard('bind-value')"
        />
      </KyCellGroup>
      <p class="number-keyboard-demo__hint">最多输入 6 位数字</p>
    </section>

    <KyNumberKeyboard
      v-model="keyboardValue"
      v-model:visible="visible"
      :theme="keyboardOptions.theme"
      :title="keyboardOptions.title"
      :extra-key="keyboardOptions.extraKey"
      :close-text="keyboardOptions.closeText"
      :maxlength="keyboardOptions.maxlength"
      :random-key-order="keyboardOptions.randomKeyOrder"
      @input="handleInput"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { KyCell, KyCellGroup } from '../../cell';
import { showToast } from '../../toast';
import KyNumberKeyboard from '../index';
import type { NumberKeyboardExtraKey, NumberKeyboardTheme } from '../number-keyboard';

type KeyboardScenario =
  'default' | 'custom' | 'id-number' | 'title' | 'multiple' | 'random' | 'bind-value';

interface KeyboardOptions {
  theme: NumberKeyboardTheme;
  title: string;
  extraKey: NumberKeyboardExtraKey;
  closeText: string;
  maxlength: number;
  randomKeyOrder: boolean;
}

const value = ref('');
const demoValue = ref('');
const visible = ref(false);
const scenario = ref<KeyboardScenario>('default');

const keyboardValue = computed({
  get: () => (scenario.value === 'bind-value' ? value.value : demoValue.value),
  set: (nextValue: string) => {
    if (scenario.value === 'bind-value') value.value = nextValue;
    else demoValue.value = nextValue;
  },
});

const keyboardOptions = computed<KeyboardOptions>(() => {
  const options: KeyboardOptions = {
    theme: 'default',
    title: '',
    extraKey: '',
    closeText: '',
    maxlength: Number.POSITIVE_INFINITY,
    randomKeyOrder: false,
  };

  switch (scenario.value) {
    case 'custom':
      return { ...options, theme: 'custom', extraKey: '.', closeText: '完成' };
    case 'id-number':
      return { ...options, extraKey: 'X', closeText: '完成' };
    case 'title':
      return { ...options, title: '键盘标题', extraKey: '.', closeText: '完成' };
    case 'multiple':
      return {
        ...options,
        theme: 'custom',
        extraKey: ['00', '.'],
        closeText: '完成',
      };
    case 'random':
      return { ...options, randomKeyOrder: true };
    case 'bind-value':
      return { ...options, maxlength: 6 };
    default:
      return options;
  }
});

function openKeyboard(nextScenario: KeyboardScenario) {
  scenario.value = nextScenario;
  demoValue.value = '';
  visible.value = true;
}

function handleInput(key: string) {
  if (scenario.value !== 'bind-value') showToast(`输入：${key}`);
}

function handleDelete() {
  if (scenario.value !== 'bind-value') showToast('删除');
}
</script>

<style scoped lang="less">
.number-keyboard-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding-block: var(--ky-space-2) 320px;
}

.number-keyboard-demo h3 {
  margin: 0;
  padding: 0 var(--ky-space-4) var(--ky-space-2);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
  font-weight: var(--ky-font-medium);
}

.number-keyboard-demo__hint {
  margin: var(--ky-space-2) var(--ky-space-4) 0;
  color: var(--ky-color-text-tertiary);
  font-size: var(--ky-font-size-assist);
}
</style>
