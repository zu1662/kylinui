<template>
  <Teleport to="body">
    <Transition name="ky-toast-fade">
      <div
        v-if="toastState.visible"
        class="ky-toast-layer"
        :class="{ 'is-blocking': toastState.forbidClick }"
        :style="{ zIndex: String(toastState.zIndex) }"
      >
        <div
          class="ky-toast"
          :class="[`ky-toast--${toastState.type}`, `ky-toast--${toastState.position}`]"
          role="status"
          aria-live="polite"
        >
          <KyIcon source="iconfont"
            v-if="toastState.type === 'loading'"
            class="ky-toast__spinner"
            name="loading"
            :size="18"
            spin
          />
          <KyIcon source="iconfont"
            v-else-if="toastState.type === 'success'"
            class="ky-toast__icon"
            name="checked"
            :size="20"
          />
          <KyIcon source="iconfont"
            v-else-if="toastState.type === 'error'"
            class="ky-toast__icon"
            name="clear"
            :size="20"
          />
          <span>{{ toastState.message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import KyIcon from '../icon';
import { toastState } from './toast';

defineOptions({ name: 'KyToast' });
// aria-live 使用 polite，避免普通提示打断读屏软件正在播报的内容。
</script>
