<template>
  <div
    v-if="fixed && placeholder"
    class="ky-nav-bar__placeholder"
    :class="{ 'has-safe-top': safeAreaInsetTop }"
  />
  <header
    class="ky-nav-bar"
    :class="{ 'is-fixed': fixed, 'has-safe-top': safeAreaInsetTop }"
    :style="{ zIndex }"
  >
    <button
      v-if="leftArrow || leftText || $slots.left"
      class="ky-nav-bar__side ky-nav-bar__left"
      type="button"
      @click="$emit('click-left')"
    >
      <slot name="left"
        ><KyIcon v-if="leftArrow" name="chevron-left" :size="20" />{{ leftText }}</slot
      >
    </button>
    <div class="ky-nav-bar__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <button
      v-if="rightText || $slots.right"
      class="ky-nav-bar__side ky-nav-bar__right"
      type="button"
      @click="$emit('click-right')"
    >
      <slot name="right">{{ rightText }}</slot>
    </button>
  </header>
</template>
<script setup lang="ts">
import KyIcon from '../icon';
import type { NavBarProps } from './nav-bar';
defineOptions({ name: 'KyNavBar' });
withDefaults(defineProps<NavBarProps>(), {
  title: '',
  leftText: '',
  rightText: '',
  leftArrow: false,
  safeAreaInsetTop: false,
  fixed: false,
  placeholder: false,
  zIndex: 1,
});
defineEmits<{ 'click-left': []; 'click-right': [] }>();
</script>
