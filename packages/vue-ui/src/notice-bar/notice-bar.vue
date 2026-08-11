<template>
  <div
    v-if="visible"
    class="ky-notice-bar"
    :class="{ 'is-wrapable': wrapable }"
    :style="barStyle"
    role="status"
  >
    <slot name="left-icon"><KyIcon v-if="leftIcon" :name="leftIcon" :size="18" /></slot>
    <div ref="wrap" class="ky-notice-bar__wrap">
      <div
        ref="content"
        class="ky-notice-bar__content"
        :class="{ 'is-scrollable': shouldScroll }"
        :style="contentStyle"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>
    <button
      v-if="mode"
      class="ky-notice-bar__action"
      type="button"
      :aria-label="mode === 'closeable' ? '关闭通知' : '查看详情'"
      @click="handleAction"
    >
      <KyIcon :name="mode === 'closeable' ? 'close' : 'chevron-right'" :size="18" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import KyIcon from '../icon';
import type { NoticeBarProps } from './notice-bar';
defineOptions({ name: 'KyNoticeBar' });
const props = withDefaults(defineProps<NoticeBarProps>(), {
  text: '',
  mode: '',
  color: '',
  background: '',
  leftIcon: 'speaker',
  wrapable: false,
  scrollable: true,
  delay: 1,
  speed: 60,
});
const emit = defineEmits<{ close: []; click: [] }>();
const visible = ref(true);
const wrap = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const distance = ref(0);
const shouldScroll = ref(false);
const duration = computed(() => distance.value / Math.max(1, props.speed));
const barStyle = computed(() => ({
  color: props.color || undefined,
  background: props.background || undefined,
}));
const contentStyle = computed(() =>
  shouldScroll.value
    ? {
        '--ky-notice-distance': `${distance.value}px`,
        '--ky-notice-duration': `${duration.value}s`,
        '--ky-notice-delay': `${props.delay}s`,
      }
    : undefined,
);
const measure = async () => {
  await nextTick();
  if (!wrap.value || !content.value || props.wrapable || !props.scrollable) {
    shouldScroll.value = false;
    return;
  }
  distance.value = content.value.scrollWidth + wrap.value.clientWidth;
  shouldScroll.value = content.value.scrollWidth > wrap.value.clientWidth;
};
onMounted(measure);
watch(() => [props.text, props.wrapable, props.scrollable], measure);
const handleAction = () => {
  if (props.mode === 'closeable') {
    visible.value = false;
    emit('close');
  } else emit('click');
};
</script>
