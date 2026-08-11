<template>
  <span class="ky-count-down" role="timer">
    <slot v-bind="current" :current="current">{{ formatted }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed, onActivated, onBeforeUnmount, onDeactivated, ref, watch } from 'vue';
import {
  formatCountDownTime,
  normalizeCountDownTime,
  parseCountDownTime,
  type CountDownCurrentTime,
  type CountDownProps,
} from './count-down';

defineOptions({ name: 'KyCountDown' });

const props = withDefaults(defineProps<CountDownProps>(), {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false,
});

const emit = defineEmits<{
  change: [currentTime: CountDownCurrentTime];
  finish: [];
}>();

const remain = ref(0);
const current = computed<CountDownCurrentTime>(() => parseCountDownTime(remain.value));
const formatted = computed(() => formatCountDownTime(props.format, current.value));

let frameId: number | undefined;
let endTime = 0;
let counting = false;
let resumeAfterActivated = false;

const inBrowser = typeof window !== 'undefined';

function requestFrame(callback: (timestamp: number) => void): number {
  if (typeof window.requestAnimationFrame === 'function') {
    return window.requestAnimationFrame(callback);
  }

  return window.setTimeout(() => callback(Date.now()), 16);
}

function cancelFrame(id: number): void {
  if (typeof window.cancelAnimationFrame === 'function') {
    window.cancelAnimationFrame(id);
  } else {
    window.clearTimeout(id);
  }
}

function pause(): void {
  counting = false;

  if (frameId !== undefined && inBrowser) {
    cancelFrame(frameId);
    frameId = undefined;
  }
}

function setRemain(value: number): void {
  remain.value = Math.max(0, value);
  emit('change', current.value);

  if (remain.value === 0) {
    pause();
    emit('finish');
  }
}

function isSameSecond(first: number, second: number): boolean {
  return Math.floor(first / 1000) === Math.floor(second / 1000);
}

function tick(): void {
  if (!inBrowser || !counting) return;

  frameId = requestFrame(() => {
    frameId = undefined;
    if (!counting) return;

    const nextRemain = Math.max(0, endTime - Date.now());
    if (props.millisecond || nextRemain === 0 || !isSameSecond(nextRemain, remain.value)) {
      setRemain(nextRemain);
    }

    if (counting && remain.value > 0) tick();
  });
}

function start(): void {
  if (!inBrowser || counting) return;

  endTime = Date.now() + remain.value;
  counting = true;
  tick();
}

function reset(): void {
  pause();
  remain.value = normalizeCountDownTime(props.time);

  if (props.autoStart) start();
}

watch(() => props.time, reset, { immediate: true });

onDeactivated(() => {
  resumeAfterActivated = counting;
  if (counting) pause();
});

onActivated(() => {
  if (resumeAfterActivated) {
    resumeAfterActivated = false;
    start();
  }
});

onBeforeUnmount(pause);

defineExpose({ start, pause, reset });
</script>
