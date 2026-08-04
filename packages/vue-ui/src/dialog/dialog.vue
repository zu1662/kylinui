<template>
  <Teleport to="body">
    <Transition name="ky-dialog-fade" @after-leave="emitHide">
      <div
        v-if="isVisible"
        class="ky-dialog__overlay"
        :style="{ zIndex: String(zIndex) }"
        @click="handleOverlay"
      >
        <section
          ref="panel"
          class="ky-dialog"
          :style="boxStyle"
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
          :aria-describedby="resolvedDescription ? descriptionId : undefined"
          tabindex="-1"
          @click.stop
          @keydown="handleKeydown"
        >
          <div v-if="$slots.illustration" class="ky-dialog__illustration">
            <slot name="illustration" />
          </div>
          <h2 v-if="title" :id="titleId">{{ title }}</h2>
          <p v-if="resolvedDescription" :id="descriptionId">{{ resolvedDescription }}</p>
          <div v-if="$slots.default" class="ky-dialog__content"><slot /></div>
          <div v-if="enableFooter" class="ky-dialog__actions">
            <KyButton v-if="showCancel" variant="secondary" block @click="cancel">
              {{ cancelText }}
            </KyButton>
            <KyButton
              :variant="danger ? 'danger' : 'primary'"
              block
              :loading="loading"
              @click="emit('confirm')"
            >
              {{ confirmText }}
            </KyButton>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue';
import KyButton from '../button';
import { useLockScroll } from '../shared/use-lock-scroll';
import type { DialogProps } from './dialog';

defineOptions({ name: 'KyDialog' });
const props = withDefaults(defineProps<DialogProps>(), {
  confirmText: '确认',
  cancelText: '取消',
  showCancel: true,
  enableFooter: true,
  closeOnOverlay: false,
  maskClosable: false,
  closeOnEsc: true,
  zIndex: 900,
  boxStyle: () => ({}),
});
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'update:visible': [value: boolean];
  confirm: [];
  cancel: [];
  hide: [];
  onHide: [];
}>();
const panel = ref<HTMLElement | null>(null);
const titleId = `ky-dialog-title-${useId()}`;
const descriptionId = `ky-dialog-desc-${useId()}`;
const isVisible = computed(() => Boolean(props.modelValue || props.visible));
const resolvedDescription = computed(() => props.description ?? props.content ?? '');
const canCloseOnOverlay = computed(() => props.closeOnOverlay || props.maskClosable);
let previousFocus: HTMLElement | null = null;
useLockScroll(isVisible);

watch(isVisible, async (value) => {
  if (value) {
    previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    await nextTick();
    panel.value?.focus();
  } else {
    previousFocus?.focus();
    previousFocus = null;
  }
});

function setVisible(value: boolean) {
  emit('update:modelValue', value);
  emit('update:visible', value);
}

function cancel() {
  if (props.loading) return;
  setVisible(false);
  emit('cancel');
}

function handleOverlay() {
  if (canCloseOnOverlay.value) cancel();
}

function emitHide() {
  emit('hide');
  emit('onHide');
}

// 用 Tab 焦点循环限制键盘导航范围，并允许 Escape 按配置关闭对话框。
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEsc) {
    event.preventDefault();
    cancel();
    return;
  }
  if (event.key !== 'Tab' || !panel.value) return;

  const focusable = Array.from(
    panel.value.querySelectorAll<HTMLElement>(
      'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
    ),
  );
  if (!focusable.length) {
    event.preventDefault();
    panel.value.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
</script>
