<template>
  <Teleport to="body">
    <Transition name="ky-overlay">
      <div v-if="modelValue" class="ky-bottom-sheet__overlay" @click="handleOverlay">
        <Transition name="ky-sheet">
          <section class="ky-bottom-sheet" :style="{ maxHeight: height }" role="dialog" aria-modal="true" :aria-label="title || '底部浮层'" @click.stop>
            <div class="ky-bottom-sheet__handle" aria-hidden="true" />
            <header v-if="title || showClose || $slots.header" class="ky-bottom-sheet__header">
              <slot name="header"><h2>{{ title }}</h2></slot>
              <button v-if="showClose" type="button" class="ky-bottom-sheet__close" aria-label="关闭浮层" @click="close">×</button>
            </header>
            <div class="ky-bottom-sheet__body"><slot /></div>
            <footer v-if="$slots.footer" class="ky-bottom-sheet__footer"><slot name="footer" /></footer>
          </section>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useLockScroll } from '../shared/use-lock-scroll';
import type { BottomSheetProps } from './bottom-sheet';

defineOptions({ name: 'KyBottomSheet' });
const props = withDefaults(defineProps<BottomSheetProps>(), {
  closeOnOverlay: true,
  showClose: true,
  height: '80vh',
});
const emit = defineEmits<{ 'update:modelValue': [boolean]; close: [] }>();
useLockScroll(toRef(props, 'modelValue'));

function close() {
  emit('update:modelValue', false);
  emit('close');
}
// 遮罩关闭必须显式开启，重要选择流程可以通过配置禁止误触关闭。
function handleOverlay() {
  if (props.closeOnOverlay) close();
}
</script>
