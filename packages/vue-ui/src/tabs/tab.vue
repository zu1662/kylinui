<template>
  <Transition :name="animated ? 'ky-tab-panel' : undefined" :duration="duration"
    ><section
      v-if="shouldRender"
      v-show="active"
      :id="panelId"
      class="ky-tab"
      role="tabpanel"
      :aria-labelledby="tabId"
      :tabindex="0"
    >
      <slot /></section
  ></Transition>
</template>
<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, toRef, useId, watch } from 'vue';
import { TABS_KEY, type TabProps } from './tabs';
defineOptions({ name: 'KyTab' });
const props = withDefaults(defineProps<TabProps>(), {
  name: undefined,
  title: '',
  disabled: false,
  badge: undefined,
  dot: false,
  lazyRender: true,
});
function useTabsContext() {
  const context = inject(TABS_KEY);
  if (!context) throw new Error('KyTab 必须在 KyTabs 内使用');
  return context;
}
const context = useTabsContext();
const id = Symbol('tab');
const componentId = useId();
const tabId = `ky-tab-trigger-${componentId}`;
const panelId = `ky-tab-panel-${componentId}`;
context.register({
  id,
  title: toRef(props, 'title'),
  name: toRef(props, 'name'),
  disabled: toRef(props, 'disabled'),
  badge: toRef(props, 'badge'),
  dot: toRef(props, 'dot'),
  tabId,
  panelId,
});
const active = computed(() => context.activeName.value === context.resolveName(id, props.name));
const rendered = ref(active.value);
watch(
  active,
  (value) => {
    if (value) rendered.value = true;
  },
  { immediate: true },
);
const shouldRender = computed(() => !props.lazyRender || rendered.value);
const animated = context.animated;
const duration = computed(() => Math.max(0, context.duration.value));
onBeforeUnmount(() => context.unregister(id));
</script>
