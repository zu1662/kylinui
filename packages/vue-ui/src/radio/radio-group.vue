<template>
  <div
    class="ky-radio-group"
    :class="`ky-radio-group--${direction}`"
    role="radiogroup"
    :aria-label="ariaLabel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, useId } from 'vue';
import { RADIO_GROUP_KEY, type RadioGroupProps, type RadioValue } from './radio';

defineOptions({ name: 'KyRadioGroup' });
const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'vertical',
  disabled: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: RadioValue];
  change: [value: RadioValue];
}>();
const fallbackName = `ky-radio-group-${useId()}`;

provide(RADIO_GROUP_KEY, {
  name: () => props.name || fallbackName,
  disabled: () => props.disabled,
  isChecked: (value) => Object.is(props.modelValue, value),
  select: (value) => {
    emit('update:modelValue', value);
    emit('change', value);
  },
});
</script>
