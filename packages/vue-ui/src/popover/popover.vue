<template>
  <span ref="root" class="ky-popover" @click="handleTrigger">
    <slot name="reference" />
    <Transition name="ky-popover-fade">
      <span v-if="visible" class="ky-popover__content" :class="`ky-popover__content--${placement}`" role="tooltip" @click.stop>
        <slot />
        <i class="ky-popover__arrow" aria-hidden="true" />
      </span>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useClickOutside } from '../shared/use-click-outside';
import type { PopoverProps } from './popover';

defineOptions({ name: 'KyPopover' });
const props = withDefaults(defineProps<PopoverProps>(), {
  placement: 'top',
  trigger: 'click',
  closeOnOutside: true,
});
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();
const root = ref<HTMLElement | null>(null);
const visible = computed(() => props.modelValue ?? false);

// 只通过 v-model 修改显隐状态，便于业务侧保持单一数据源。
function setVisible(value: boolean) {
  emit('update:modelValue', value);
}
function handleTrigger() {
  if (props.trigger === 'click') setVisible(!visible.value);
}
useClickOutside(root, () => {
  if (props.closeOnOutside && visible.value) setVisible(false);
});
</script>
