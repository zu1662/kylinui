<template>
  <div
    v-if="fixed && placeholder"
    class="ky-nav-bar__placeholder"
    :class="{ 'has-safe-top': hasSafeTop }"
  />
  <header
    class="ky-nav-bar"
    :class="[
      `ky-nav-bar--${theme}`,
      { 'is-fixed': fixed, 'is-sticky': sticky && !fixed, 'has-safe-top': hasSafeTop },
    ]"
    :style="{ zIndex }"
  >
    <button
      v-if="hasLeftContent"
      class="ky-nav-bar__side ky-nav-bar__left"
      type="button"
      :aria-label="hasBackArrow ? '返回' : undefined"
      @click="handleLeftClick"
    >
      <slot name="left"
        ><KyIcon v-if="hasBackArrow" name="chevron-left" :size="20" />{{ leftText }}</slot
      >
    </button>
    <div v-else class="ky-nav-bar__side-placeholder" aria-hidden="true" />
    <div class="ky-nav-bar__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <button
      v-if="rightText || $slots.right"
      class="ky-nav-bar__side ky-nav-bar__right"
      type="button"
      @click="emit('click-right')"
    >
      <slot name="right">{{ rightText }}</slot>
    </button>
    <div v-else class="ky-nav-bar__side-placeholder" aria-hidden="true" />
  </header>
</template>
<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import KyIcon from '../icon';
import type { NavBarProps } from './nav-bar';

defineOptions({ name: 'KyNavBar' });
const props = withDefaults(defineProps<NavBarProps>(), {
  title: '',
  leftText: '',
  rightText: '',
  leftArrow: false,
  showBack: false,
  safeAreaInsetTop: false,
  safeTop: false,
  theme: 'light',
  sticky: false,
  fixed: false,
  placeholder: false,
  zIndex: 1,
});
const emit = defineEmits<{ 'click-left': []; 'click-right': [] }>();
const slots = useSlots();

const hasBackArrow = computed(() => props.leftArrow || props.showBack);
const hasSafeTop = computed(() => props.safeAreaInsetTop || props.safeTop);
const hasLeftContent = computed(
  () => hasBackArrow.value || Boolean(props.leftText) || Boolean(slots.left),
);
const backPending = ref(false);

async function handleLeftClick() {
  if (backPending.value) return;

  if (!props.beforeBack) {
    emit('click-left');
    return;
  }

  backPending.value = true;
  try {
    const result = await props.beforeBack();
    if (result !== false) emit('click-left');
  } finally {
    backPending.value = false;
  }
}
</script>
