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
          @blur="blur"
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
import { computed, inject, nextTick, ref, useId } from 'vue';
import { FORM_ITEM_KEY } from '../form/context';
import KyIcon from '../icon';
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
const inputRef = ref<HTMLInputElement | null>(null);
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
let composing = false;
let compositionValue: string | undefined;

function update(event: Event) {
  const input = event.target as HTMLInputElement;
  if (compositionValue !== undefined && input.value === compositionValue) {
    compositionValue = undefined;
    return;
  }
  compositionValue = undefined;
  if (composing) return;
  commit(input, props.formatTrigger === 'onChange');
}

function startComposition() {
  composing = true;
}

// 中文输入法结束后主动提交一次；仅跳过值相同的后续 input，避免吞掉下一次真实输入。
function endComposition(event: CompositionEvent) {
  composing = false;
  const input = event.target as HTMLInputElement;
  commit(input, props.formatTrigger === 'onChange');
  compositionValue = input.value;
}

function commit(input: HTMLInputElement, shouldFormat: boolean) {
  const raw = input.value;
  const cursor = input.selectionStart ?? raw.length;
  const formatted = shouldFormat && props.formatter ? props.formatter(raw) : raw;

  if (formatted !== raw) {
    const nextCursor = props.formatter ? props.formatter(raw.slice(0, cursor)).length : cursor;
    input.value = formatted;
    void nextTick(() => {
      if (document.activeElement === input && input.type !== 'number') {
        const normalizedCursor = Math.min(nextCursor, formatted.length);
        input.setSelectionRange(normalizedCursor, normalizedCursor);
      }
    });
  }

  // formatter 可能产生空格等展示字符，此时保持字符串；未格式化的数字模型继续兼容原有回写规则。
  const value =
    typeof props.modelValue === 'number' && !props.formatter && formatted !== ''
      ? Number(formatted)
      : formatted;
  emit('update:modelValue', value);
}

function blur(event: FocusEvent) {
  if (props.formatTrigger === 'onBlur') commit(event.target as HTMLInputElement, true);
  emit('blur', event);
}

function clear() {
  emit('update:modelValue', '');
  emit('clear');
  inputRef.value?.focus();
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
});
</script>
