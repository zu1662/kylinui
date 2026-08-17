<template>
  <label
    class="ky-checkbox"
    :class="{
      'is-checked': checked,
      'is-disabled': effectiveDisabled,
      'is-indeterminate': indeterminate,
    }"
  >
    <input
      type="checkbox"
      :name="group?.name() || name"
      :value="value === undefined ? undefined : String(value)"
      :checked="checked"
      :disabled="effectiveDisabled"
      :aria-label="label"
      :aria-checked="indeterminate ? 'mixed' : checked"
      @change="update"
    />
    <span class="ky-checkbox__mark" aria-hidden="true">
      <KyIcon source="iconfont" :name="indeterminate ? 'reduce' : 'tick'" :size="14" />
    </span>
    <span
      ><slot>{{ label }}</slot></span
    >
  </label>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted } from 'vue';
import KyIcon from '../icon';
import { CHECKBOX_GROUP_KEY, type CheckboxProps } from './checkbox';

defineOptions({ name: 'KyCheckbox' });
const props = withDefaults(defineProps<CheckboxProps>(), { modelValue: false });
const emit = defineEmits<{ 'update:modelValue': [boolean]; change: [boolean] }>();
const group = inject(CHECKBOX_GROUP_KEY, undefined);
const checked = computed(() =>
  group && props.value !== undefined ? group.isChecked(props.value) : props.modelValue,
);
const effectiveDisabled = computed(() => props.disabled || group?.disabled() || false);

onMounted(() => {
  if (group && props.value !== undefined)
    group.register(props.value, () => effectiveDisabled.value);
});

onBeforeUnmount(() => {
  if (group && props.value !== undefined) group.unregister(props.value);
});

function update(event: Event) {
  const value = (event.target as HTMLInputElement).checked;
  if (group && props.value !== undefined) {
    const accepted = group.toggle(props.value, value);
    if (!accepted) {
      (event.target as HTMLInputElement).checked = checked.value;
      return;
    }
  } else emit('update:modelValue', value);
  emit('change', value);
}
</script>
