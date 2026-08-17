<template>
  <label class="ky-radio" :class="{ 'is-checked': checked, 'is-disabled': effectiveDisabled }">
    <input
      type="radio"
      :name="group?.name() || name"
      :value="String(value)"
      :checked="checked"
      :disabled="effectiveDisabled"
      :aria-label="label"
      @change="select"
    />
    <span class="ky-radio__mark" aria-hidden="true"><i /></span>
    <span
      ><slot>{{ label }}</slot></span
    >
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { RADIO_GROUP_KEY, type RadioProps } from './radio';

defineOptions({ name: 'KyRadio' });
const props = defineProps<RadioProps>();
const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean];
  change: [value: string | number | boolean];
}>();
const group = inject(RADIO_GROUP_KEY, undefined);
const checked = computed(() =>
  group ? group.isChecked(props.value) : Object.is(props.modelValue, props.value),
);
const effectiveDisabled = computed(() => props.disabled || group?.disabled() || false);

function select() {
  if (effectiveDisabled.value) return;
  if (group) group.select(props.value);
  else emit('update:modelValue', props.value);
  emit('change', props.value);
}
</script>
