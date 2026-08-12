<template>
  <div class="ky-tabs" :class="[`ky-tabs--${type}`, { 'is-shrink': shrink }]">
    <div
      class="ky-tabs__nav-wrap"
      :class="{ 'is-sticky': sticky }"
      :style="sticky ? { top: unit(offsetTop) } : undefined"
    >
      <div ref="nav" class="ky-tabs__nav" role="tablist" @keydown="onKeydown">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="ky-tabs__tab"
          :class="{
            'is-active': activeName === resolveRecordName(tab),
            'is-disabled': tab.disabled.value,
          }"
          role="tab"
          :id="tab.tabId"
          :aria-controls="tab.panelId"
          :aria-selected="activeName === resolveRecordName(tab)"
          :disabled="tab.disabled.value"
          :tabindex="activeName === resolveRecordName(tab) ? 0 : -1"
          @click="select(resolveRecordName(tab), tab.disabled.value)"
        >
          <span class="ky-tabs__title" :class="{ 'is-ellipsis': ellipsis }">{{
            tab.title.value
          }}</span
          ><sup v-if="tab.dot.value" class="ky-tabs__dot" aria-label="有新内容" /><sup
            v-else-if="tab.badge.value !== undefined"
            class="ky-tabs__badge"
            >{{ tab.badge.value }}</sup
          >
        </button>
      </div>
    </div>
    <div class="ky-tabs__content"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { computed, provide, ref, shallowRef, toRef, watch } from 'vue';
import { TABS_KEY, type TabName, type TabRecord, type TabsProps } from './tabs';
defineOptions({ name: 'KyTabs' });
const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  type: 'line',
  animated: false,
  ellipsis: true,
  shrink: false,
  sticky: false,
  offsetTop: 0,
  duration: 220,
});
const emit = defineEmits<{
  'update:modelValue': [name: TabName];
  change: [name: TabName];
  clickTab: [payload: { name: TabName; title: string; disabled: boolean }];
}>();
const tabs = shallowRef<TabRecord[]>([]);
const nav = ref<HTMLDivElement | null>(null);
const internalName = ref<TabName>();
const activeName = computed(() => props.modelValue ?? internalName.value);
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
function resolveName(id: symbol, explicit?: TabName) {
  return explicit ?? tabs.value.findIndex((tab) => tab.id === id);
}
function resolveRecordName(tab: TabRecord) {
  return resolveName(tab.id, tab.name.value);
}
function ensureActive() {
  if (props.modelValue !== undefined) return;
  const valid = tabs.value.some(
    (tab) => resolveRecordName(tab) === internalName.value && !tab.disabled.value,
  );
  if (!valid) {
    const first = tabs.value.find((tab) => !tab.disabled.value);
    internalName.value = first ? resolveRecordName(first) : undefined;
  }
}
function register(record: TabRecord) {
  if (!tabs.value.some((tab) => tab.id === record.id)) tabs.value = [...tabs.value, record];
  ensureActive();
}
function unregister(id: symbol) {
  tabs.value = tabs.value.filter((tab) => tab.id !== id);
  ensureActive();
}
function select(name: TabName, disabled = false) {
  const tab = tabs.value.find((item) => resolveRecordName(item) === name);
  emit('clickTab', { name, title: tab?.title.value ?? '', disabled });
  if (disabled || activeName.value === name) return;
  internalName.value = name;
  emit('update:modelValue', name);
  emit('change', name);
}
function onKeydown(event: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const enabled = tabs.value.filter((tab) => !tab.disabled.value);
  if (!enabled.length) return;
  event.preventDefault();
  const current = enabled.findIndex((tab) => resolveRecordName(tab) === activeName.value);
  const nextIndex =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? enabled.length - 1
        : event.key === 'ArrowLeft'
          ? (current - 1 + enabled.length) % enabled.length
          : (current + 1) % enabled.length;
  select(resolveRecordName(enabled[nextIndex]));
  requestAnimationFrame(() => {
    const buttons = nav.value?.querySelectorAll<HTMLButtonElement>('.ky-tabs__tab:not(:disabled)');
    buttons?.[nextIndex]?.focus();
  });
}
watch(() => props.modelValue, ensureActive);
provide(TABS_KEY, {
  activeName,
  animated: toRef(props, 'animated'),
  duration: toRef(props, 'duration'),
  register,
  unregister,
  resolveName,
  select,
});
</script>
