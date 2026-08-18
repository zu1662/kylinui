<template>
  <FieldShell
    class="ky-input"
    :embedded="Boolean(formItem)"
    :label="label"
    :helper="helper"
    :error="displayError"
    :disabled="effectiveDisabled"
    :control-id="controlId"
    :message-id="messageId"
    :show-extra="showCounter"
  >
    <template #control>
      <span class="ky-input__control">
        <span v-if="$slots.prefix" class="ky-input__prefix"><slot name="prefix" /></span>
        <input
          ref="inputRef"
          data-ky-field-control
          :id="controlId"
          :value="modelValue"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          :disabled="effectiveDisabled"
          :readonly="effectiveReadonly"
          :maxlength="maxLength"
          :minlength="minLength"
          :inputmode="inputMode"
          :autocomplete="autoComplete"
          :enterkeyhint="enterKeyHint"
          :autofocus="autofocus"
          :aria-label="ariaLabel"
          :aria-required="formItem?.required.value || undefined"
          :aria-invalid="Boolean(displayError)"
          :aria-describedby="describedBy"
          @input="update"
          @compositionstart="startComposition"
          @compositionend="endComposition"
          @focus="$emit('focus', $event)"
          @blur="handleBlur"
        />
        <button
          v-if="
            clearable &&
            modelValue !== '' &&
            modelValue !== undefined &&
            !effectiveDisabled &&
            !effectiveReadonly
          "
          type="button"
          class="ky-input__clear"
          aria-label="清空输入"
          @pointerdown.prevent
          @click="clear"
        >
          <KyIcon source="iconfont" name="clear" :size="18" />
        </button>
        <span v-if="$slots.suffix" class="ky-input__suffix"><slot name="suffix" /></span>
      </span>
    </template>
    <template #extra>
      <span :id="counterId" aria-live="polite">{{ inputLength }}/{{ maxLength }}</span>
    </template>
  </FieldShell>
</template>

<script setup lang="ts">
import { computed, inject, useId } from 'vue';
import { FORM_ITEM_KEY } from '../form/context';
import KyIcon from '../icon';
import { useTextInputControl } from '../shared/use-text-input-control';
import FieldShell from '../form/field-shell.vue';
import type { InputProps } from './input';

defineOptions({ name: 'KyInput' });
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  modelValue: '',
  formatTrigger: 'onChange',
});
const emit = defineEmits<{
  'update:modelValue': [string | number];
  focus: [FocusEvent];
  blur: [FocusEvent];
  clear: [];
}>();
const generatedId = useId();
const formItem = inject(FORM_ITEM_KEY, undefined);
const controlId = computed(() => props.id ?? formItem?.controlId ?? 'ky-input-' + generatedId);
const messageId = 'ky-input-message-' + generatedId;
const counterId = 'ky-input-count-' + generatedId;
const displayError = computed(() => formItem?.errorMessage.value || props.error || '');
const effectiveDisabled = computed(() => props.disabled || formItem?.disabled.value || false);
const effectiveReadonly = computed(() => props.readonly || formItem?.readonly.value || false);
const inputLength = computed(() => String(props.modelValue ?? '').length);
const showCounter = computed(
  () => props.showWordLimit && typeof props.maxLength === 'number' && props.maxLength >= 0,
);
const describedBy = computed(() => {
  const ids: string[] = [];
  if (formItem?.hasMessage.value) ids.push(formItem.messageId);
  else if (props.error || props.helper) ids.push(messageId);
  if (showCounter.value) ids.push(counterId);
  return ids.length ? ids.join(' ') : undefined;
});
const {
  inputRef,
  update,
  startComposition,
  endComposition,
  blur: commitBlur,
  clear,
  focus,
  blurInput,
  select,
} = useTextInputControl({
  getModelValue: () => props.modelValue,
  getFormatter: () => props.formatter,
  getFormatTrigger: () => props.formatTrigger,
  preserveNumber: true,
  onValue: (value) => emit('update:modelValue', value),
  onClear: () => emit('clear'),
});

function handleBlur(event: FocusEvent) {
  commitBlur(event);
  emit('blur', event);
}

defineExpose({ focus, blur: blurInput, select });
</script>
