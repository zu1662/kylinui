<template>
  <Teleport to="body">
    <Transition name="ky-dialog-fade">
      <div v-if="modelValue" class="ky-dialog__overlay" @click="handleOverlay">
        <section
          ref="panel"
          class="ky-dialog"
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
          @click.stop
        >
          <div v-if="$slots.illustration" class="ky-dialog__illustration">
            <slot name="illustration" />
          </div>
          <h2 :id="titleId">{{ title }}</h2>
          <p v-if="description" :id="descriptionId">{{ description }}</p>
          <div v-if="$slots.default" class="ky-dialog__content"><slot /></div>
          <div class="ky-dialog__actions">
            <KyButton v-if="showCancel" variant="secondary" block @click="cancel">{{
              cancelText
            }}</KyButton>
            <KyButton
              :variant="danger ? 'danger' : 'primary'"
              block
              :loading="loading"
              @click="$emit('confirm')"
              >{{ confirmText }}</KyButton
            >
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, toRef, useId, watch } from 'vue';
import KyButton from '../button';
import { useLockScroll } from '../shared/use-lock-scroll';
import type { DialogProps } from './dialog';

defineOptions({ name: 'KyDialog' });
const props = withDefaults(defineProps<DialogProps>(), {
  confirmText: '确认',
  cancelText: '取消',
  showCancel: true,
  closeOnOverlay: false,
});
const emit = defineEmits<{ 'update:modelValue': [boolean]; confirm: []; cancel: [] }>();
const panel = ref<HTMLElement | null>(null);
const titleId = `ky-dialog-title-${useId()}`;
const descriptionId = `ky-dialog-desc-${useId()}`;
useLockScroll(toRef(props, 'modelValue'));

// 打开后将焦点移入对话框，键盘用户可以立即感知当前上下文。
watch(
  () => props.modelValue,
  async (value) => {
    if (value) {
      await nextTick();
      panel.value?.focus();
    }
  },
);
function cancel() {
  emit('update:modelValue', false);
  emit('cancel');
}
function handleOverlay() {
  if (props.closeOnOverlay && !props.loading) cancel();
}
</script>
