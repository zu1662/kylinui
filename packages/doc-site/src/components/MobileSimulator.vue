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
        <span>{{ currentTime }}</span>
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
import { onBeforeUnmount, onMounted, ref } from 'vue';

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
const currentTime = ref(formatCurrentTime());
let minuteAlignmentTimer: number | undefined;
let clockTimer: number | undefined;

/** 使用浏览器所在设备的本地时间生成状态栏时钟。 */
function formatCurrentTime(date = new Date()) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function updateCurrentTime() {
  currentTime.value = formatCurrentTime();
}

/** 先对齐到下一分钟，再按分钟更新，避免长时间停留后状态栏时间出现偏差。 */
function startClock() {
  updateCurrentTime();
  const delayToNextMinute = 60_000 - (Date.now() % 60_000);
  minuteAlignmentTimer = window.setTimeout(() => {
    updateCurrentTime();
    clockTimer = window.setInterval(updateCurrentTime, 60_000);
  }, delayToNextMinute);
}

function stopClock() {
  if (minuteAlignmentTimer !== undefined) window.clearTimeout(minuteAlignmentTimer);
  if (clockTimer !== undefined) window.clearInterval(clockTimer);
}

onMounted(startClock);
onBeforeUnmount(stopClock);

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
