<template>
  <div
    class="ky-checkbox-group"
    :class="`ky-checkbox-group--${direction}`"
    role="group"
    :aria-label="ariaLabel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, type PropType } from 'vue';
import { CHECKBOX_GROUP_KEY } from './checkbox';
import type {
  CheckboxGroupDirection,
  CheckboxGroupExpose,
  CheckboxGroupToggleAllOptions,
  CheckboxValue,
} from './checkbox';

defineOptions({ name: 'KyCheckboxGroup' });
const props = defineProps({
  modelValue: {
    type: Array as PropType<CheckboxValue[]>,
    default: () => [],
  },
  disabled: { type: Boolean, default: false },
  direction: {
    type: String as PropType<CheckboxGroupDirection>,
    default: 'vertical',
  },
  max: { type: Number, default: undefined },
  name: { type: String, default: undefined },
  ariaLabel: { type: String, default: undefined },
});
const emit = defineEmits<{
  'update:modelValue': [value: CheckboxValue[]];
  change: [value: CheckboxValue[]];
  overlimit: [value: CheckboxValue];
}>();
const items = new Map<CheckboxValue, () => boolean>();

function isSelected(value: CheckboxValue) {
  return props.modelValue.some((item) => Object.is(item, value));
}

function getMax() {
  if (props.max === undefined || !Number.isFinite(props.max)) return undefined;
  return Math.max(0, Math.floor(props.max));
}

function update(value: CheckboxValue[]) {
  const unchanged =
    value.length === props.modelValue.length &&
    value.every((item, index) => Object.is(item, props.modelValue[index]));
  if (unchanged) return;
  emit('update:modelValue', value);
  emit('change', value);
}

function toggle(value: CheckboxValue, checked: boolean) {
  const next = props.modelValue.filter((item) => !Object.is(item, value));
  if (checked) {
    const max = getMax();
    if (max !== undefined && next.length >= max) {
      emit('overlimit', value);
      return false;
    }
    next.push(value);
  }
  update(next);
  return true;
}

function toggleAll(options: CheckboxGroupToggleAllOptions = {}) {
  if (props.disabled) return;
  const enabledValues = [...items.entries()]
    .filter(([, itemDisabled]) => !itemDisabled())
    .map(([value]) => value);
  if (enabledValues.length === 0) return;

  const allChecked = enabledValues.every(isSelected);
  const checked = options.checked ?? !allChecked;
  if (!checked) {
    update(
      props.modelValue.filter((item) => !enabledValues.some((value) => Object.is(item, value))),
    );
    return;
  }

  // 全选只改变可用子项，已选中的禁用项或暂未挂载值必须保留并计入 max。
  const next = [...props.modelValue];
  const max = getMax();
  enabledValues.forEach((value) => {
    if (next.some((item) => Object.is(item, value))) return;
    if (max !== undefined && next.length >= max) return;
    next.push(value);
  });
  update(next);
}

provide(CHECKBOX_GROUP_KEY, {
  name: () => props.name,
  disabled: () => props.disabled,
  isChecked: (value) => props.modelValue.some((item) => Object.is(item, value)),
  toggle,
  register: (value, itemDisabled) => items.set(value, itemDisabled),
  unregister: (value) => items.delete(value),
});

defineExpose<CheckboxGroupExpose>({ toggleAll });
</script>
