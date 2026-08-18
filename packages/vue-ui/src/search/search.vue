<template>
  <div class="ky-search" :class="{ 'has-suggestions': suggestionsVisible }">
    <form class="ky-search__form" role="search" @submit.prevent="submit">
      <div
        class="ky-search__field"
        :class="['ky-search__field--' + shape, { 'is-disabled': disabled, 'is-loading': loading }]"
      >
        <span v-if="label || $slots.label" class="ky-search__label">
          <slot name="label">{{ label }}</slot>
        </span>
        <span class="ky-search__magnifier" aria-hidden="true" />
        <input
          ref="inputRef"
          class="ky-search__input"
          type="search"
          :value="modelValue"
          :name="name"
          :placeholder="resolvedPlaceholder"
          :maxlength="resolvedMaxLength"
          :inputmode="inputMode"
          :autocomplete="autoComplete"
          :enterkeyhint="enterKeyHint"
          :disabled="disabled"
          :readonly="readonly"
          :autofocus="autofocus"
          :aria-busy="loading || undefined"
          :aria-controls="suggestionsVisible ? suggestionsId : undefined"
          :aria-expanded="hasSuggestions ? suggestionsVisible : undefined"
          @input="update"
          @compositionstart="startComposition"
          @compositionend="endComposition"
          @focus="$emit('focus', $event)"
          @blur="handleBlur"
          @keydown.enter="handleEnter"
        />
        <span v-if="loading" class="ky-search__loading" :aria-label="locale.searchLoadingText">
          <slot name="loading"><KyLoading :size="16" /></slot>
        </span>
        <button
          v-else-if="clearable && modelValue && !disabled && !readonly"
          type="button"
          class="ky-search__clear"
          :aria-label="locale.searchClearLabel"
          @pointerdown.prevent
          @click="clear"
        >
          <KyIcon name="close" :size="14" />
        </button>
      </div>
      <button
        v-if="showAction"
        type="button"
        class="ky-search__action"
        :disabled="disabled"
        @click="action"
      >
        <slot name="action">{{ resolvedActionText }}</slot>
      </button>
    </form>
    <div
      v-if="suggestionsVisible"
      :id="suggestionsId"
      class="ky-search__suggestions"
      role="listbox"
      :aria-label="locale.searchSuggestionsLabel"
    >
      <slot name="suggestions" :keyword="modelValue" :select="selectSuggestion">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion.value"
          type="button"
          class="ky-search__suggestion"
          role="option"
          :disabled="suggestion.disabled"
          :aria-disabled="suggestion.disabled || undefined"
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion.label ?? suggestion.value }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId, useSlots } from 'vue';
import { useConfigProvider } from '../config-provider';
import KyIcon from '../icon';
import KyLoading from '../loading';
import { useTextInputControl } from '../shared/use-text-input-control';
import type { SearchProps, SearchSuggestion } from './search';

defineOptions({ name: 'KySearch' });
const props = withDefaults(defineProps<SearchProps>(), {
  modelValue: '',
  label: '',
  placeholder: undefined,
  shape: 'round',
  name: '',
  maxLength: undefined,
  maxlength: undefined,
  inputMode: 'search',
  autoComplete: 'off',
  enterKeyHint: 'search',
  formatTrigger: 'onChange',
  clearable: true,
  showAction: false,
  actionText: undefined,
  loading: false,
  suggestions: () => [],
  showSuggestions: false,
  disabled: false,
  readonly: false,
  autofocus: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [value: string];
  clear: [];
  cancel: [value: string];
  action: [value: string];
  suggestion: [suggestion: SearchSuggestion];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const slots = useSlots();
const { locale } = useConfigProvider();
const suggestionsId = 'ky-search-suggestions-' + useId();
const resolvedPlaceholder = computed(() => props.placeholder ?? locale.value.searchPlaceholder);
const resolvedActionText = computed(() => props.actionText ?? locale.value.searchActionText);
const resolvedMaxLength = computed(() => props.maxLength ?? props.maxlength);
const hasSuggestions = computed(() => props.suggestions.length > 0 || Boolean(slots.suggestions));
const suggestionsVisible = computed(() => props.showSuggestions && hasSuggestions.value);
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
  onValue: (value) => emit('update:modelValue', String(value)),
  onClear: () => emit('clear'),
});

function handleBlur(event: FocusEvent) {
  commitBlur(event);
  emit('blur', event);
}

function handleEnter(event: KeyboardEvent) {
  if (event.isComposing) return;
  event.preventDefault();
  submit();
}

function submit() {
  if (props.disabled || props.readonly || props.loading) return;
  emit('search', inputRef.value?.value ?? props.modelValue);
}

function action() {
  if (props.disabled) return;
  emit('cancel', props.modelValue);
  emit('action', props.modelValue);
}

function selectSuggestion(suggestion: SearchSuggestion) {
  if (suggestion.disabled) return;
  emit('update:modelValue', suggestion.value);
  emit('suggestion', suggestion);
  inputRef.value?.focus();
}

defineExpose({ focus, blur: blurInput, select });
</script>
