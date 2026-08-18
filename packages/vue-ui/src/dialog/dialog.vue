<template>
  <KyPopup
    :model-value="isVisible"
    position="center"
    :close-on-overlay="false"
    :close-on-popstate="!loading"
    :safe-area="false"
    :z-index="resolvedZIndex"
    :animation="animation"
    :duration="duration"
    panel-class="ky-popup__panel--transparent"
    role="alertdialog"
    :aria-label="title ? null : '对话框'"
    :aria-labelledby="title ? titleId : undefined"
    :aria-describedby="resolvedDescription ? descriptionId : undefined"
    @update:model-value="setVisible"
    @click-overlay="handleOverlay"
    @closed="emitHide"
  >
    <section ref="panel" class="ky-dialog" :style="boxStyle" tabindex="-1" @keydown="handleKeydown">
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
  </KyPopup>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue';
import KyButton from '../button';
import KyPopup from '../popup';
import { getGlobalZIndex } from '../shared/global-z-index';
import type { DialogProps } from './dialog';

defineOptions({ name: 'KyDialog' });
const props = withDefaults(defineProps<DialogProps>(), {
  confirmText: '确认',
  cancelText: '取消',
  showCancel: true,
  enableFooter: true,
  closeOnOverlay: false,
  closeOnEsc: true,
  zIndex: undefined,
  boxStyle: () => ({}),
});
const resolvedZIndex = computed(() => props.zIndex ?? getGlobalZIndex(900));
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  confirm: [];
  cancel: [];
  hide: [];
}>();
const panel = ref<HTMLElement | null>(null);
const titleId = `ky-dialog-title-${useId()}`;
const descriptionId = `ky-dialog-desc-${useId()}`;
const isVisible = computed(() => Boolean(props.modelValue));
const resolvedDescription = computed(() => props.description ?? '');
let previousFocus: HTMLElement | null = null;
let focusTaskId = 0;

// immediate 保证初始即为可见状态时也完成焦点进入；SSR 阶段没有 document，直接跳过焦点管理。
watch(
  isVisible,
  (value) => {
    if (typeof document === 'undefined') return;
    const taskId = ++focusTaskId;
    if (value) {
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      void nextTick(() => {
        window.requestAnimationFrame(() => {
          if (taskId === focusTaskId && isVisible.value) panel.value?.focus();
        });
      });
      return;
    }
    previousFocus?.focus();
    previousFocus = null;
  },
  { immediate: true },
);

function setVisible(value: boolean) {
  emit('update:modelValue', value);
}

function cancel() {
  if (props.loading) return;
  setVisible(false);
  emit('cancel');
}

function handleOverlay() {
  if (props.closeOnOverlay) cancel();
}

function emitHide() {
  emit('hide');
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
