<template>
  <section class="mobile-simulator" :class="{ 'mobile-simulator--compact': compact }">
    <header class="mobile-simulator__toolbar">
      <div class="mobile-simulator__meta">
        <span class="mobile-simulator__title">
          <i aria-hidden="true" />
          {{ title }}
        </span>
        <small><b aria-hidden="true">↕</b> 鼠标拖动可模拟触摸滑动</small>
      </div>
      <button type="button" aria-label="重新加载手机预览" title="重新加载" @click="reload">
        ↻
      </button>
    </header>

    <div class="mobile-simulator__device">
      <div class="mobile-simulator__speaker" aria-hidden="true" />
      <div class="mobile-simulator__status" aria-hidden="true">
        <span>9:41</span>
        <span class="mobile-simulator__signals">● 5G</span>
      </div>
      <div class="mobile-simulator__viewport">
        <iframe
          ref="iframe"
          :src="src"
          :title="title"
          loading="eager"
          allow="clipboard-write"
          @load="$emit('load')"
        />
      </div>
      <div class="mobile-simulator__home" aria-hidden="true" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    src: string;
    title: string;
    compact?: boolean;
  }>(),
  {
    compact: false,
  },
);

defineEmits<{ load: [] }>();

const iframe = ref<HTMLIFrameElement | null>(null);

/** 重新加载 iframe，便于快速恢复演示组件的内部状态。 */
function reload() {
  const frameWindow = iframe.value?.contentWindow;
  if (frameWindow) frameWindow.location.reload();
}

/** 统一封装同源消息发送，配置实验台无需直接操作 iframe DOM。 */
function postMessage(message: unknown) {
  iframe.value?.contentWindow?.postMessage(message, window.location.origin);
}

defineExpose({ postMessage, reload });
</script>
