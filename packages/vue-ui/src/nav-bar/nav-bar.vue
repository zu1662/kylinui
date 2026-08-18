<template>
  <div
    v-if="fixed && placeholder"
    class="ky-nav-bar__placeholder"
    :class="{ 'has-safe-top': hasSafeTop }"
  />
  <header
    class="ky-nav-bar"
    :class="[
      'ky-nav-bar--' + theme,
      { 'is-fixed': fixed, 'is-sticky': sticky && !fixed, 'has-safe-top': hasSafeTop },
    ]"
    :style="{ zIndex }"
  >
    <component
      :is="leftHref ? 'a' : 'button'"
      v-if="hasLeftContent"
      class="ky-nav-bar__side ky-nav-bar__left"
      :class="{ 'is-pending': backPending }"
      :type="leftHref ? undefined : 'button'"
      :href="leftHref || undefined"
      :target="leftTarget"
      :rel="leftRel"
      :aria-label="hasBackArrow ? locale.navBarBackLabel : undefined"
      :aria-busy="backPending || undefined"
      @click="handleLeftClick"
    >
      <slot name="left">
        <KyIcon v-if="hasBackArrow" name="chevron-left" :size="20" />{{ leftText }}
      </slot>
    </component>
    <div v-else class="ky-nav-bar__side-placeholder" aria-hidden="true" />
    <div class="ky-nav-bar__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <component
      :is="rightHref ? 'a' : 'button'"
      v-if="rightText || $slots.right"
      class="ky-nav-bar__side ky-nav-bar__right"
      :type="rightHref ? undefined : 'button'"
      :href="rightHref || undefined"
      :target="rightTarget"
      :rel="rightRel"
      @click="emit('click-right', $event)"
    >
      <slot name="right">{{ rightText }}</slot>
    </component>
    <div v-else class="ky-nav-bar__side-placeholder" aria-hidden="true" />
  </header>
</template>
<script setup lang="ts">
import { computed, ref, useSlots } from 'vue';
import { useConfigProvider } from '../config-provider';
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
  leftHref: '',
  leftTarget: undefined,
  leftRel: undefined,
  rightHref: '',
  rightTarget: undefined,
  rightRel: undefined,
});
const emit = defineEmits<{
  'click-left': [event: MouseEvent];
  'click-right': [event: MouseEvent];
}>();
const slots = useSlots();
const { locale } = useConfigProvider();
const hasBackArrow = computed(() => props.leftArrow || props.showBack);
const hasSafeTop = computed(() => props.safeAreaInsetTop || props.safeTop);
const hasLeftContent = computed(
  () => hasBackArrow.value || Boolean(props.leftText) || Boolean(slots.left),
);
const backPending = ref(false);

function navigate(href: string, target?: string) {
  if (typeof window === 'undefined') return;
  if (target && target !== '_self') window.open(href, target);
  else window.location.assign(href);
}

async function handleLeftClick(event: MouseEvent) {
  if (backPending.value) {
    event.preventDefault();
    return;
  }
  if (!props.beforeBack) {
    emit('click-left', event);
    return;
  }
  event.preventDefault();
  backPending.value = true;
  try {
    const result = await props.beforeBack();
    if (result === false) return;
    emit('click-left', event);
    if (props.leftHref) navigate(props.leftHref, props.leftTarget);
  } finally {
    backPending.value = false;
  }
}
</script>
