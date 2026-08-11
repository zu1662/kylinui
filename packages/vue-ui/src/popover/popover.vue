<template>
  <span ref="root" class="ky-popover" @click="handleTrigger">
    <slot />
    <Transition name="ky-popover-fade">
      <span
        v-if="visible"
        class="ky-popover__content"
        :class="[`ky-popover__content--${placement}`, { 'is-closable': closable }]"
        role="tooltip"
        @click.stop
      >
        <slot name="content">{{ content }}</slot>
        <button
          v-if="closable"
          class="ky-popover__close"
          type="button"
          aria-label="关闭气泡提示"
          @click="handleClose"
        >
          <KyIcon name="close" :size="12" />
        </button>
        <i class="ky-popover__arrow" aria-hidden="true" />
      </span>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyIcon from '../icon';
import { useClickOutside } from '../shared/use-click-outside';
import type { PopoverProps } from './popover';

defineOptions({ name: 'KyPopover' });
const props = withDefaults(defineProps<PopoverProps>(), {
  placement: 'top',
  trigger: 'click',
  closeOnOutside: true,
  closable: false,
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
function handleClose() {
  setVisible(false);
}
useClickOutside(root, () => {
  if (props.closeOnOutside && visible.value) setVisible(false);
});
</script>
