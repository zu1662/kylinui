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
import { provide, useId, type PropType } from 'vue';
import { RADIO_GROUP_KEY } from './radio';
import type { RadioGroupDirection, RadioValue } from './radio';

defineOptions({ name: 'KyRadioGroup' });
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValue>,
    default: undefined,
  },
  name: { type: String, default: undefined },
  disabled: { type: Boolean, default: false },
  direction: {
    type: String as PropType<RadioGroupDirection>,
    default: 'vertical',
  },
  ariaLabel: { type: String, default: undefined },
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
