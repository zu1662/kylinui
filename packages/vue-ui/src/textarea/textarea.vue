<template>
  <FieldShell
    class="ky-textarea"
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
      <span class="ky-textarea__control">
        <textarea
          ref="textareaRef"
          data-ky-field-control
          :id="controlId"
          :value="modelValue"
          :name="name"
          :placeholder="placeholder"
          :disabled="effectiveDisabled"
          :readonly="effectiveReadonly"
          :rows="effectiveRows"
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
          @blur="$emit('blur', $event)"
        />
      </span>
    </template>
    <template #extra>
      <span :id="counterId" aria-live="polite">{{ inputLength }}/{{ maxLength }}</span>
    </template>
  </FieldShell>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, useId, watch } from 'vue';
import { FORM_ITEM_KEY } from '../form/context';
import FieldShell from '../form/field-shell.vue';
import type { TextareaAutosizeOptions, TextareaProps } from './textarea';

defineOptions({ name: 'KyTextarea' });

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  rows: 3,
});
const emit = defineEmits<{
  'update:modelValue': [string];
  focus: [FocusEvent];
  blur: [FocusEvent];
}>();
const generatedId = useId();
const formItem = inject(FORM_ITEM_KEY, undefined);
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const controlId = computed(() => props.id ?? formItem?.controlId ?? 'ky-textarea-' + generatedId);
const messageId = 'ky-textarea-message-' + generatedId;
const counterId = 'ky-textarea-count-' + generatedId;
const displayError = computed(() => formItem?.errorMessage.value || props.error || '');
const effectiveDisabled = computed(() => props.disabled || formItem?.disabled.value || false);
const effectiveReadonly = computed(() => props.readonly || formItem?.readonly.value || false);
const inputLength = computed(() => props.modelValue.length);
const effectiveRows = computed(() => {
  if (!props.autosize || props.autosize === true) return props.rows;
  return Math.max(1, props.autosize.minRows ?? props.rows);
});
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
  const textarea = event.target as HTMLTextAreaElement;
  if (compositionValue !== undefined && textarea.value === compositionValue) {
    compositionValue = undefined;
    resize();
    return;
  }
  compositionValue = undefined;
  if (composing) return;
  emit('update:modelValue', textarea.value);
  resize();
}

function startComposition() {
  composing = true;
}

function endComposition(event: CompositionEvent) {
  composing = false;
  const textarea = event.target as HTMLTextAreaElement;
  compositionValue = textarea.value;
  emit('update:modelValue', textarea.value);
  resize();
}

function resize() {
  const textarea = textareaRef.value;
  if (!textarea || !props.autosize || typeof window === 'undefined') return;
  const options: TextareaAutosizeOptions = props.autosize === true ? {} : props.autosize;
  const styles = window.getComputedStyle(textarea);
  const lineHeight =
    Number.parseFloat(styles.lineHeight) || Number.parseFloat(styles.fontSize) * 1.5;
  const verticalPadding =
    Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom);
  const minRows = Math.max(1, options.minRows ?? props.rows);
  const maxRows = Math.max(minRows, options.maxRows ?? Number.POSITIVE_INFINITY);
  const minHeight = minRows * lineHeight + verticalPadding;
  const maxHeight = maxRows * lineHeight + verticalPadding;

  textarea.style.height = 'auto';
  const nextHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
  textarea.style.height = nextHeight + 'px';
  textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
}

function resetHeight() {
  const textarea = textareaRef.value;
  if (!textarea) return;
  textarea.style.height = '';
  textarea.style.overflowY = '';
}

onMounted(() => resize());
watch(
  () => [props.modelValue, props.rows, props.autosize],
  () => void nextTick(() => (props.autosize ? resize() : resetHeight())),
  { deep: true },
);

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
});
</script>
