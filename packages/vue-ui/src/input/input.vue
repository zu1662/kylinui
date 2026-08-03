<template>
  <label class="ky-input" :class="{ 'is-error': error, 'is-disabled': disabled }">
    <span v-if="label" class="ky-input__label">{{ label }}</span>
    <span class="ky-input__control">
      <span v-if="$slots.prefix" class="ky-input__prefix"><slot name="prefix" /></span>
      <input
        :value="modelValue"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error || helper ? messageId : undefined"
        @input="update"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <button
        v-if="clearable && modelValue !== '' && modelValue !== undefined && !disabled && !readonly"
        type="button"
        class="ky-input__clear"
        aria-label="清空输入"
        @click="clear"
      >
        ×
      </button>
      <span v-if="$slots.suffix" class="ky-input__suffix"><slot name="suffix" /></span>
    </span>
    <span v-if="error || helper" :id="messageId" class="ky-input__message">{{
      error || helper
    }}</span>
  </label>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import type { InputProps } from './input';

defineOptions({ name: 'KyInput' });
withDefaults(defineProps<InputProps>(), { type: 'text', modelValue: '' });
const emit = defineEmits<{
  'update:modelValue': [string];
  focus: [FocusEvent];
  blur: [FocusEvent];
  clear: [];
}>();
const messageId = `ky-input-message-${useId()}`;

// 原生 input 保留输入法、自动填充和键盘能力，组件仅归一化事件协议。
function update(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
function clear() {
  emit('update:modelValue', '');
  emit('clear');
}
</script>
