<template>
  <div class="ky-sidebar" role="tablist" aria-orientation="vertical" @keydown="onKeydown">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed, provide, ref, shallowRef, watch } from 'vue';
import {
  SIDEBAR_KEY,
  type SidebarItemRecord,
  type SidebarName,
  type SidebarProps,
} from './sidebar';
defineOptions({ name: 'KySidebar' });
const props = withDefaults(defineProps<SidebarProps>(), { modelValue: undefined });
const emit = defineEmits<{
  'update:modelValue': [name: SidebarName];
  change: [name: SidebarName, index: number];
}>();
const items = shallowRef<SidebarItemRecord[]>([]);
const internalName = ref<SidebarName>();
const activeName = computed(() => props.modelValue ?? internalName.value);
function resolveName(id: symbol, explicit?: SidebarName) {
  return explicit ?? items.value.findIndex((item) => item.id === id);
}
function ensureActive() {
  if (props.modelValue !== undefined) return;
  const valid = items.value.some(
    (item) => resolveName(item.id, item.name.value) === internalName.value && !item.disabled.value,
  );
  if (!valid) {
    const first = items.value.find((item) => !item.disabled.value);
    internalName.value = first ? resolveName(first.id, first.name.value) : undefined;
  }
}
function register(record: SidebarItemRecord) {
  if (!items.value.some((item) => item.id === record.id)) items.value = [...items.value, record];
  ensureActive();
}
function unregister(id: symbol) {
  items.value = items.value.filter((item) => item.id !== id);
  ensureActive();
}
function select(name: SidebarName, disabled = false) {
  if (disabled || name === activeName.value) return;
  if (props.modelValue === undefined) internalName.value = name;
  const index = items.value.findIndex((item) => resolveName(item.id, item.name.value) === name);
  emit('update:modelValue', name);
  emit('change', name, index);
}
function onKeydown(event: KeyboardEvent) {
  if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  const available = items.value.filter((item) => !item.disabled.value && item.element.value);
  const current = available.findIndex((item) => item.element.value === event.target);
  if (current < 0 || !available.length) return;
  event.preventDefault();
  const target =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? available.length - 1
        : (current + (event.key === 'ArrowDown' ? 1 : -1) + available.length) % available.length;
  const record = available[target];
  if (!record) return;
  record.element.value?.focus();
  select(resolveName(record.id, record.name.value), record.disabled.value);
}
provide(SIDEBAR_KEY, { activeName, register, unregister, resolveName, select });
watch(() => items.value.map((item) => item.disabled.value), ensureActive);
</script>
