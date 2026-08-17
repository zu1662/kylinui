<template>
  <label class="ky-input" :class="{ 'is-error': error, 'is-disabled': disabled }">
    <span v-if="label" class="ky-input__label">{{ label }}</span>
    <span class="ky-input__control">
      <span v-if="$slots.prefix" class="ky-input__prefix"><slot name="prefix" /></span>
      <input
        ref="inputRef"
        :value="modelValue"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        :minlength="minLength"
        :inputmode="inputMode"
        :autocomplete="autoComplete"
        :enterkeyhint="enterKeyHint"
        :autofocus="autofocus"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error || helper ? messageId : undefined"
        @input="update"
        @compositionstart="startComposition"
        @compositionend="endComposition"
        @focus="$emit('focus', $event)"
        @blur="blur"
      />
      <button
        v-if="clearable && modelValue !== '' && modelValue !== undefined && !disabled && !readonly"
        type="button"
        class="ky-input__clear"
        aria-label="清空输入"
        @click="clear"
      >
        <KyIcon source="iconfont" name="clear" :size="18" />
      </button>
      <span v-if="$slots.suffix" class="ky-input__suffix"><slot name="suffix" /></span>
    </span>
    <span v-if="error || helper || showCounter" class="ky-input__footer">
      <span v-if="error || helper" :id="messageId" class="ky-input__message">{{
        error || helper
      }}</span>
      <span v-if="showCounter" class="ky-input__count" aria-live="polite">
        {{ inputLength }}/{{ maxLength }}
      </span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue';
import KyIcon from '../icon';
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
const messageId = `ky-input-message-${useId()}`;
const inputRef = ref<HTMLInputElement | null>(null);
const inputLength = computed(() => String(props.modelValue ?? '').length);
const showCounter = computed(
  () => props.showWordLimit && typeof props.maxLength === 'number' && props.maxLength >= 0,
);
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
  compositionValue = input.value;
  commit(input, props.formatTrigger === 'onChange');
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
