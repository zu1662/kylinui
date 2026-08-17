<template>
  <label
    class="ky-switch"
    :class="[
      `ky-switch--${size}`,
      {
        'is-checked': checked,
        'is-disabled': effectiveDisabled,
        'is-loading': loading || pending,
      },
    ]"
  >
    <span class="ky-switch__label"
      ><slot>{{ label }}</slot></span
    >
    <input
      type="checkbox"
      role="switch"
      :checked="checked"
      :disabled="effectiveDisabled"
      :aria-label="label"
      :aria-busy="loading || pending"
      @click.prevent="toggle"
    />
    <span class="ky-switch__track" aria-hidden="true"><span class="ky-switch__thumb" /></span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SwitchProps, SwitchValue } from './switch';

defineOptions({ name: 'KySwitch' });
const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'medium',
  activeValue: true,
  inactiveValue: false,
});
const emit = defineEmits<{
  'update:modelValue': [value: SwitchValue];
  change: [value: SwitchValue];
  changeError: [error: unknown];
}>();
const pending = ref(false);
const checked = computed(() => Object.is(props.modelValue, props.activeValue));
const effectiveDisabled = computed(() => props.disabled || props.loading || pending.value);

// 异步守卫执行期间锁定原生控件，避免快速点击启动多个并发切换。
async function toggle() {
  if (effectiveDisabled.value) return;
  const nextValue = checked.value ? props.inactiveValue : props.activeValue;
  if (!props.beforeChange) {
    emit('update:modelValue', nextValue);
    emit('change', nextValue);
    return;
  }
  pending.value = true;
  try {
    const accepted = await props.beforeChange(nextValue);
    if (!accepted) return;
    emit('update:modelValue', nextValue);
    emit('change', nextValue);
  } catch (error) {
    emit('changeError', error);
  } finally {
    pending.value = false;
  }
}
</script>
