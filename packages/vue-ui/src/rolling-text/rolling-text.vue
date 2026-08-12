<template>
  <span ref="root" class="ky-rolling-text" role="img" :aria-label="formattedValue">
    <template v-for="character in characters" :key="character.key">
      <span
        v-if="character.digit"
        class="ky-rolling-text__digit"
        aria-hidden="true"
        :style="digitStyle(character)"
      >
        <span
          class="ky-rolling-text__track"
          :class="{
            'is-ready': phase === 'ready',
            'is-playing': phase === 'playing',
          }"
          :style="trackStyle(character)"
          @transitionend="handleTransitionEnd($event, character)"
        >
          <span
            v-for="(digit, index) in digitSequence(character)"
            :key="`${character.key}-${index}`"
            class="ky-rolling-text__number"
          >
            {{ digit }}
          </span>
        </span>
      </span>
      <span v-else class="ky-rolling-text__symbol" aria-hidden="true">{{ character.value }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  createRollingCharacters,
  formatRollingNumber,
  type RollingTextCharacter,
  type RollingTextProps,
} from './rolling-text';

defineOptions({ name: 'KyRollingText' });

const props = withDefaults(defineProps<RollingTextProps>(), {
  value: 0,
  startValue: undefined,
  duration: 1000,
  autoStart: true,
  direction: 'up',
  minIntegerDigits: 1,
  decimalPlaces: 0,
  thousands: false,
  stagger: true,
});

const emit = defineEmits<{ finish: [] }>();
type RollingPhase = 'idle' | 'ready' | 'playing';

const REDUCED_MOTION_DURATION = 160;

const root = ref<HTMLElement | null>(null);
const phase = ref<RollingPhase>('idle');
const reducedMotion = ref(false);
let playToken = 0;
let pendingDigits = 0;
let completionTimer: ReturnType<typeof setTimeout> | undefined;
let mediaQuery: MediaQueryList | undefined;

const normalizedDuration = computed(() => Math.max(0, Number(props.duration) || 0));
const normalizedStartValue = computed(() => props.startValue ?? 0);
const formattedValue = computed(() =>
  formatRollingNumber(props.value, props.decimalPlaces, props.minIntegerDigits, props.thousands),
);
const characters = computed(() =>
  createRollingCharacters(
    normalizedStartValue.value,
    props.value,
    props.decimalPlaces,
    props.minIntegerDigits,
    props.thousands,
  ),
);
const digitCount = computed(() => characters.value.filter((character) => character.digit).length);
const maxStaggerDelay = computed(() =>
  props.stagger ? Math.max(0, digitCount.value - 1) * STAGGER_DELAY : 0,
);

function digitSequence(character: RollingTextCharacter): number[] {
  const sequence = [character.startDigit];
  let digit = character.startDigit;

  do {
    digit = props.direction === 'up' ? (digit + 1) % 10 : (digit + 9) % 10;
    sequence.push(digit);
  } while (digit !== character.endDigit);

  return sequence;
}

const STAGGER_DELAY = 48;

function digitStyle(character: RollingTextCharacter): CSSProperties {
  const delay = props.stagger ? character.digitIndex * STAGGER_DELAY : 0;

  return {
    '--ky-rolling-text-delay': `${delay}ms`,
  } as CSSProperties;
}

function trackStyle(character: RollingTextCharacter): CSSProperties {
  const sequenceLength = digitSequence(character).length;

  return {
    '--ky-rolling-text-duration': `${normalizedDuration.value}ms`,
    '--ky-rolling-text-offset': `${Math.max(0, sequenceLength - 1) * -1}em`,
  } as CSSProperties;
}

function clearCompletionTimer() {
  if (completionTimer === undefined) return;
  clearTimeout(completionTimer);
  completionTimer = undefined;
}

function complete(token: number) {
  if (token !== playToken || phase.value !== 'playing') return;
  clearCompletionTimer();
  pendingDigits = 0;
  phase.value = 'idle';
  emit('finish');
}

function scheduleCompletion(token: number) {
  clearCompletionTimer();
  const duration = reducedMotion.value ? REDUCED_MOTION_DURATION : normalizedDuration.value;
  const delay = reducedMotion.value ? 0 : maxStaggerDelay.value;
  // transitionend 可能因页面切到后台或浏览器优化而丢失，定时兜底确保组件最终回到稳定状态。
  completionTimer = setTimeout(() => complete(token), duration + delay + 80);
}

function handleTransitionEnd(event: TransitionEvent, character: RollingTextCharacter) {
  if (
    event.target !== event.currentTarget ||
    event.propertyName !== 'transform' ||
    !character.digit ||
    phase.value !== 'playing'
  ) {
    return;
  }

  pendingDigits -= 1;

  if (pendingDigits <= 0) {
    complete(playToken);
  }
}

async function start() {
  const token = ++playToken;
  clearCompletionTimer();
  pendingDigits = 0;

  if (normalizedDuration.value === 0 || digitCount.value === 0) {
    phase.value = 'idle';
    emit('finish');
    return;
  }

  phase.value = 'ready';
  await nextTick();
  // 读取布局会同步提交“无过渡的起点”；不要依赖 iframe 中可能被节流的动画帧回调。
  void root.value?.offsetHeight;

  if (token !== playToken) return;

  pendingDigits = digitCount.value;
  phase.value = 'playing';
  await nextTick();

  if (token !== playToken) return;
  scheduleCompletion(token);
}

function reset() {
  playToken += 1;
  clearCompletionTimer();
  pendingDigits = 0;
  phase.value = 'idle';
}

function syncReducedMotion(event?: MediaQueryListEvent) {
  reducedMotion.value = event?.matches ?? mediaQuery?.matches ?? false;

  if (phase.value === 'playing') {
    scheduleCompletion(playToken);
  }
}

watch(
  () => [
    props.value,
    props.startValue,
    props.duration,
    props.direction,
    props.minIntegerDigits,
    props.decimalPlaces,
    props.thousands,
    props.stagger,
  ],
  () => {
    reset();
    if (props.autoStart) void start();
  },
);

watch(
  () => props.autoStart,
  (autoStart) => {
    if (autoStart) {
      void start();
    } else {
      reset();
    }
  },
);

onMounted(() => {
  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    syncReducedMotion();
    mediaQuery.addEventListener?.('change', syncReducedMotion);
  }

  if (props.autoStart) void start();
});

onBeforeUnmount(() => {
  playToken += 1;
  clearCompletionTimer();
  mediaQuery?.removeEventListener?.('change', syncReducedMotion);
});

defineExpose({ start, reset });
</script>
