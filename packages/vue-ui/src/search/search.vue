<template>
  <form class="ky-search" role="search" @submit.prevent="submit">
    <div
      class="ky-search__field"
      :class="[`ky-search__field--${shape}`, { 'is-disabled': disabled }]"
    >
      <span v-if="label || $slots.label" class="ky-search__label"
        ><slot name="label">{{ label }}</slot></span
      ><span class="ky-search__magnifier" aria-hidden="true" /><input
        ref="inputRef"
        class="ky-search__input"
        type="search"
        :value="modelValue"
        :name="name"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        :readonly="readonly"
        :autofocus="autofocus"
        @input="update"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      /><button
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        class="ky-search__clear"
        aria-label="清空搜索内容"
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
      <slot name="action">{{ actionText }}</slot>
    </button>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyIcon from '../icon';
import type { SearchProps } from './search';
defineOptions({ name: 'KySearch' });
const props = withDefaults(defineProps<SearchProps>(), {
  modelValue: '',
  label: '',
  placeholder: '请输入搜索关键词',
  shape: 'round',
  name: '',
  maxlength: undefined,
  clearable: true,
  showAction: false,
  actionText: '取消',
  disabled: false,
  readonly: false,
  autofocus: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [value: string];
  clear: [];
  action: [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();
const inputRef = ref<HTMLInputElement | null>(null);
function update(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
function submit() {
  if (!props.disabled) emit('search', props.modelValue);
}
function clear() {
  emit('update:modelValue', '');
  emit('clear');
  inputRef.value?.focus();
}
function action() {
  if (!props.disabled) emit('action', props.modelValue);
}
defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() });
</script>
