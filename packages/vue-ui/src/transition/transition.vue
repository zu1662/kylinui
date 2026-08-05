<template>
  <slot v-if="disabled" />
  <Transition
    v-else
    v-bind="$attrs"
    :name="resolvedName"
    :appear="appear"
    :mode="mode"
    :type="type"
    @before-enter="handleBeforeEnter"
    @after-enter="handleAfterEnter"
    @enter-cancelled="handleEnterCancelled"
    @before-leave="handleBeforeLeave"
    @after-leave="handleAfterLeave"
    @leave-cancelled="handleLeaveCancelled"
    @before-appear="handleBeforeAppear"
    @after-appear="handleAfterAppear"
    @appear-cancelled="handleAppearCancelled"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  resolveTransitionDuration,
  resolveTransitionName,
  type TransitionProps,
} from './transition';

defineOptions({ name: 'KyTransition', inheritAttrs: false });
const props = withDefaults(defineProps<TransitionProps>(), {
  name: 'fade',
  appear: false,
  disabled: false,
});
const emit = defineEmits<{
  'before-enter': [element: Element];
  'after-enter': [element: Element];
  'enter-cancelled': [element: Element];
  'before-leave': [element: Element];
  'after-leave': [element: Element];
  'leave-cancelled': [element: Element];
  'before-appear': [element: Element];
  'after-appear': [element: Element];
  'appear-cancelled': [element: Element];
}>();

const resolvedName = computed(() => resolveTransitionName(props.name));
const previousVariables = new WeakMap<Element, Map<string, { value: string; priority: string }>>();
const durationVariables = [
  '--ky-transition-enter-duration',
  '--ky-transition-leave-duration',
  '--ky-transition-fly-enter-duration',
  '--ky-transition-bounce-leave-duration',
] as const;

function getElementStyle(element: Element) {
  return (element as Element & { style?: CSSStyleDeclaration }).style;
}

/**
 * CSS 动效本身负责真实时长，Vue 会从计算样式识别 transitionend/animationend。
 * 仅在传入 duration 时写入当前元素，避免修改全局 Token 或影响同页其他动画。
 */
function applyDurationVariables(element: Element) {
  if (props.duration === undefined) return;
  const style = getElementStyle(element);
  if (!style) return;

  if (!previousVariables.has(element)) {
    previousVariables.set(
      element,
      new Map(
        durationVariables.map((name) => [
          name,
          { value: style.getPropertyValue(name), priority: style.getPropertyPriority(name) },
        ]),
      ),
    );
  }

  const duration = resolveTransitionDuration(props.duration);
  style.setProperty('--ky-transition-enter-duration', `${duration.enter}ms`);
  style.setProperty('--ky-transition-leave-duration', `${duration.leave}ms`);
  style.setProperty('--ky-transition-fly-enter-duration', `${duration.enter}ms`);
  style.setProperty('--ky-transition-bounce-leave-duration', `${duration.leave}ms`);
}

function restoreDurationVariables(element: Element) {
  const style = getElementStyle(element);
  const previous = previousVariables.get(element);
  if (!style || !previous) return;

  previous.forEach(({ value, priority }, name) => {
    if (value) style.setProperty(name, value, priority);
    else style.removeProperty(name);
  });
  previousVariables.delete(element);
}

function handleBeforeEnter(element: Element) {
  applyDurationVariables(element);
  emit('before-enter', element);
}

function handleAfterEnter(element: Element) {
  restoreDurationVariables(element);
  emit('after-enter', element);
}

function handleEnterCancelled(element: Element) {
  restoreDurationVariables(element);
  emit('enter-cancelled', element);
}

function handleBeforeLeave(element: Element) {
  applyDurationVariables(element);
  emit('before-leave', element);
}

function handleAfterLeave(element: Element) {
  restoreDurationVariables(element);
  emit('after-leave', element);
}

function handleLeaveCancelled(element: Element) {
  restoreDurationVariables(element);
  emit('leave-cancelled', element);
}

function handleBeforeAppear(element: Element) {
  applyDurationVariables(element);
  emit('before-appear', element);
}

function handleAfterAppear(element: Element) {
  restoreDurationVariables(element);
  emit('after-appear', element);
}

function handleAppearCancelled(element: Element) {
  restoreDurationVariables(element);
  emit('appear-cancelled', element);
}
</script>
