<template>
  <span class="ky-count-down" role="timer"
    ><slot :current="current">{{ formatted }}</slot></span
  >
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CountDownCurrent, CountDownProps } from './count-down';
defineOptions({ name: 'KyCountDown' });
const props = withDefaults(defineProps<CountDownProps>(), {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false,
});
const emit = defineEmits<{ change: [current: CountDownCurrent]; finish: [] }>();
const remain = ref(Math.max(0, props.time));
let timer: number | undefined;
let endAt = 0;
const current = computed<CountDownCurrent>(() => {
  const total = Math.max(0, remain.value);
  const days = Math.floor(total / 86400000);
  const hours = Math.floor(total / 3600000) % 24;
  const minutes = Math.floor(total / 60000) % 60;
  const seconds = Math.floor(total / 1000) % 60;
  return { total, days, hours, minutes, seconds, milliseconds: total % 1000 };
});
const pad = (value: number, length = 2) => String(value).padStart(length, '0');
const formatted = computed(() => {
  // ??????????? 0-23???? DD ????????????
  const hours = props.format.includes('DD')
    ? current.value.hours
    : current.value.hours + current.value.days * 24;
  return props.format
    .replace('DD', pad(current.value.days))
    .replace('HH', pad(hours))
    .replace('mm', pad(current.value.minutes))
    .replace('ss', pad(current.value.seconds))
    .replace('SSS', pad(current.value.milliseconds, 3));
});
const clear = () => {
  if (timer !== undefined) {
    window.clearInterval(timer);
    timer = undefined;
  }
};
const tick = () => {
  remain.value = Math.max(0, endAt - Date.now());
  emit('change', current.value);
  if (remain.value <= 0) {
    clear();
    emit('finish');
  }
};
const start = () => {
  if (remain.value <= 0 || timer !== undefined) return;
  endAt = Date.now() + remain.value;
  timer = window.setInterval(tick, props.millisecond ? 30 : 250);
  tick();
};
const pause = clear;
const reset = () => {
  clear();
  remain.value = Math.max(0, props.time);
  if (props.autoStart) start();
};
defineExpose({ start, pause, reset });
watch(() => props.time, reset);
onMounted(() => {
  if (props.autoStart) start();
});
onBeforeUnmount(clear);
</script>
