<template>
  <div
    class="ky-password-input"
    :class="{
      'is-focused': displayFocused,
      'is-error': Boolean(error),
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-separated': variant === 'separated',
    }"
  >
    <div class="ky-password-input__control">
      <input
        ref="inputRef"
        class="ky-password-input__native"
        :id="controlId"
        :value="normalizedValue"
        type="text"
        :name="name"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="normalizedLength"
        :inputmode="type === 'number' ? 'numeric' : 'text'"
        :autocomplete="autoComplete"
        :autofocus="autofocus"
        :aria-label="ariaLabel || '密码输入框'"
        :aria-invalid="Boolean(error)"
        :aria-describedby="messageId"
        @input="handleInput"
        @compositionstart="startComposition"
        @compositionend="endComposition"
        @focus="handleFocus"
        @blur="handleBlur"
        @click="handleClick"
      />

      <div
        class="ky-password-input__cells"
        :style="{ '--ky-password-input-length': normalizedLength }"
        aria-hidden="true"
      >
        <div
          v-for="index in normalizedLength"
          :key="index"
          class="ky-password-input__cell"
          :class="{
            'is-filled': Boolean(characters[index - 1]),
            'is-current': isCurrent(index - 1),
          }"
        >
          <span v-if="characters[index - 1]" class="ky-password-input__value">
            {{ mask ? '●' : characters[index - 1] }}
          </span>
          <span v-else-if="showCursor && isCurrent(index - 1)" class="ky-password-input__cursor" />
        </div>
      </div>
    </div>

    <div
      v-if="hasMessage"
      :id="messageElementId"
      class="ky-password-input__message"
      :class="{ 'is-error': Boolean(error) }"
    >
      <slot name="info" :error="error" :info="info">{{ error || info }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, useSlots, watch } from 'vue';
import type { PasswordInputProps } from './password-input';

defineOptions({ name: 'KyPasswordInput' });

const props = withDefaults(defineProps<PasswordInputProps>(), {
  modelValue: '',
  length: 6,
  type: 'number',
  mask: true,
  variant: 'joined',
  showCursor: true,
  info: '',
  error: '',
  disabled: false,
  readonly: false,
  autoComplete: 'off',
  autofocus: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  click: [event: MouseEvent];
  complete: [value: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const slots = useSlots();
const internalFocused = ref(false);
const composing = ref(false);
let compositionValue: string | undefined;
const generatedId = useId();
const controlId = computed(() => props.id || `ky-password-input-${generatedId}`);
const messageElementId = computed(() => `${controlId.value}-message`);
const hasMessage = computed(() => Boolean(props.error || props.info || slots.info));
const messageId = computed(() => (hasMessage.value ? messageElementId.value : undefined));
const normalizedLength = computed(() => {
  if (!Number.isFinite(props.length)) return 6;
  return Math.max(1, Math.floor(props.length));
});

function normalizeValue(value: string) {
  const normalized = props.type === 'number' ? value.replace(/\D/g, '') : value;
  return Array.from(normalized).slice(0, normalizedLength.value).join('');
}

const normalizedValue = computed(() => normalizeValue(String(props.modelValue ?? '')));
const characters = computed(() => Array.from(normalizedValue.value));
const displayFocused = computed(() => !props.disabled && (props.focused ?? internalFocused.value));

function isCurrent(index: number) {
  return displayFocused.value && characters.value.length === index;
}

function commitInput(input: HTMLInputElement) {
  const value = normalizeValue(input.value);
  if (input.value !== value) input.value = value;
  emit('update:modelValue', value);
}

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement;
  if (compositionValue !== undefined && input.value === compositionValue) {
    compositionValue = undefined;
    return;
  }
  compositionValue = undefined;
  if (composing.value) return;
  commitInput(input);
}

function startComposition() {
  composing.value = true;
}

function endComposition(event: CompositionEvent) {
  composing.value = false;
  const input = event.target as HTMLInputElement;
  commitInput(input);
  compositionValue = input.value;
}

function moveCaretToEnd() {
  const input = inputRef.value;
  if (!input) return;
  const end = input.value.length;
  input.setSelectionRange(end, end);
}

function handleFocus(event: FocusEvent) {
  internalFocused.value = true;
  moveCaretToEnd();
  emit('focus', event);
}

function handleClick(event: MouseEvent) {
  moveCaretToEnd();
  emit('click', event);
}

function handleBlur(event: FocusEvent) {
  internalFocused.value = false;
  emit('blur', event);
}

let completedValue = '';
watch(normalizedValue, (value) => {
  if (Array.from(value).length === normalizedLength.value) {
    if (value !== completedValue) emit('complete', value);
    completedValue = value;
    return;
  }
  completedValue = '';
});

watch([normalizedLength, () => props.type], () => {
  const value = normalizeValue(String(props.modelValue ?? ''));
  if (value !== props.modelValue) emit('update:modelValue', value);
});

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
});
</script>
