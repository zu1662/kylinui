<template>
  <button
    ref="element"
    type="button"
    class="ky-sidebar-item"
    :class="{ 'is-active': active, 'is-disabled': disabled }"
    role="tab"
    :aria-selected="active"
    :aria-disabled="disabled || undefined"
    :tabindex="active ? 0 : -1"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="ky-sidebar-item__title"
      ><slot>{{ title }}</slot></span
    ><span v-if="dot" class="ky-sidebar-item__dot" aria-label="有新内容" /><span
      v-else-if="badge !== undefined"
      class="ky-sidebar-item__badge"
      >{{ badge }}</span
    >
  </button>
</template>
<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, toRef } from 'vue';
import { SIDEBAR_KEY, type SidebarItemProps, type SidebarName } from './sidebar';
defineOptions({ name: 'KySidebarItem' });
const props = withDefaults(defineProps<SidebarItemProps>(), {
  name: undefined,
  title: '',
  disabled: false,
  badge: undefined,
  dot: false,
});
const emit = defineEmits<{ click: [name: SidebarName] }>();
function useSidebarContext() {
  const context = inject(SIDEBAR_KEY);
  if (!context) throw new Error('KySidebarItem 必须在 KySidebar 内使用');
  return context;
}
const context = useSidebarContext();
const id = Symbol('sidebar-item');
const element = ref<HTMLButtonElement | null>(null);
context.register({ id, name: toRef(props, 'name'), disabled: toRef(props, 'disabled'), element });
const resolvedName = computed(() => context.resolveName(id, props.name));
const active = computed(() => context.activeName.value === resolvedName.value);
function handleClick() {
  if (props.disabled) return;
  emit('click', resolvedName.value);
  context.select(resolvedName.value, props.disabled);
}
onBeforeUnmount(() => context.unregister(id));
</script>
