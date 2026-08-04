<template>
  <KyPopup
    :model-value="modelValue"
    position="bottom"
    :close-on-overlay="false"
    :safe-area="false"
    :z-index="zIndex"
    :animation="animation"
    :duration="duration"
    panel-class="ky-popup__panel--transparent"
    :aria-label="title || '底部浮层'"
    @update:model-value="setVisible"
    @click-overlay="handleOverlay"
  >
    <section class="ky-bottom-sheet" :style="{ maxHeight: height }">
      <div class="ky-bottom-sheet__handle" aria-hidden="true" />
      <header v-if="title || showClose || $slots.header" class="ky-bottom-sheet__header">
        <slot name="header"
          ><h2>{{ title }}</h2></slot
        >
        <button
          v-if="showClose"
          type="button"
          class="ky-bottom-sheet__close"
          aria-label="关闭浮层"
          @click="close"
        >
          ×
        </button>
      </header>
      <div class="ky-bottom-sheet__body"><slot /></div>
      <footer v-if="$slots.footer" class="ky-bottom-sheet__footer">
        <slot name="footer" />
      </footer>
    </section>
  </KyPopup>
</template>

<script setup lang="ts">
import KyPopup from '../popup';
import type { BottomSheetProps } from './bottom-sheet';

defineOptions({ name: 'KyBottomSheet' });
const props = withDefaults(defineProps<BottomSheetProps>(), {
  closeOnOverlay: true,
  showClose: true,
  height: '80vh',
  zIndex: 800,
});
const emit = defineEmits<{ 'update:modelValue': [boolean]; close: [] }>();

function setVisible(value: boolean) {
  emit('update:modelValue', value);
  if (!value) emit('close');
}

function close() {
  emit('update:modelValue', false);
  emit('close');
}

// 遮罩关闭必须显式开启，重要选择流程可以通过配置禁止误触关闭。
function handleOverlay() {
  if (props.closeOnOverlay) close();
}
</script>
