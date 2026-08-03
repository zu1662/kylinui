<template>
  <Teleport to="body">
    <Transition name="ky-toast-fade">
      <div
        v-if="toastState.visible"
        class="ky-toast"
        :class="`ky-toast--${toastState.type}`"
        role="status"
        aria-live="polite"
      >
        <span v-if="toastState.type === 'loading'" class="ky-toast__spinner" aria-hidden="true" />
        <span v-else-if="toastState.type === 'success'" class="ky-toast__icon" aria-hidden="true"
          >✓</span
        >
        <span v-else-if="toastState.type === 'error'" class="ky-toast__icon" aria-hidden="true"
          >!</span
        >
        <span>{{ toastState.message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { toastState } from './toast';

defineOptions({ name: 'KyToast' });
// aria-live 会在消息更新时通知辅助技术，无需额外聚焦浮层。
</script>
