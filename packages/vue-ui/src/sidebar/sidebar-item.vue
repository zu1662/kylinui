<template>
  <component
    :is="href ? 'a' : 'button'"
    ref="element"
    class="ky-sidebar-item"
    :class="{ 'is-active': active, 'is-disabled': disabled }"
    :type="href ? undefined : 'button'"
    :href="disabled ? undefined : href"
    :target="disabled ? undefined : target"
    :rel="disabled ? undefined : rel"
    role="tab"
    :aria-selected="active"
    :aria-current="active && href ? 'page' : undefined"
    :aria-disabled="disabled || undefined"
    :tabindex="disabled ? -1 : active ? 0 : -1"
    :disabled="href ? undefined : disabled"
    @click="handleClick"
  >
    <span v-if="resolvedIcon || $slots.icon" class="ky-sidebar-item__icon" aria-hidden="true">
      <slot name="icon" :active="active" :item-name="resolvedName">
        <KyIcon v-if="resolvedIcon" source="iconfont" :name="resolvedIcon" :size="18" />
      </slot>
    </span>
    <span class="ky-sidebar-item__title"
      ><slot>{{ title }}</slot></span
    >
    <slot name="badge" :active="active" :item-name="resolvedName" :badge="badge" :dot="dot">
      <span v-if="dot" class="ky-sidebar-item__dot" aria-label="有新内容" />
      <span v-else-if="badge !== undefined" class="ky-sidebar-item__badge">{{ badge }}</span>
    </slot>
  </component>
</template>
<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, toRef } from 'vue';
import KyIcon from '../icon';
import { SIDEBAR_KEY, type SidebarItemProps, type SidebarName } from './sidebar';
defineOptions({ name: 'KySidebarItem' });
const props = withDefaults(defineProps<SidebarItemProps>(), {
  name: undefined,
  title: '',
  disabled: false,
  badge: undefined,
  dot: false,
  icon: '',
  activeIcon: '',
  inactiveIcon: '',
  href: '',
  target: undefined,
  rel: undefined,
});
const emit = defineEmits<{ click: [name: SidebarName, event: MouseEvent] }>();
function useSidebarContext() {
  const context = inject(SIDEBAR_KEY);
  if (!context) throw new Error('KySidebarItem 必须在 KySidebar 内使用');
  return context;
}
const context = useSidebarContext();
const id = Symbol('sidebar-item');
const element = ref<HTMLElement | null>(null);
context.register({ id, name: toRef(props, 'name'), disabled: toRef(props, 'disabled'), element });
const resolvedName = computed(() => context.resolveName(id, props.name));
const active = computed(() => context.activeName.value === resolvedName.value);
const resolvedIcon = computed(() =>
  active.value ? props.activeIcon || props.icon : props.inactiveIcon || props.icon,
);
function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', resolvedName.value, event);
  context.select(resolvedName.value, props.disabled);
}
onBeforeUnmount(() => context.unregister(id));
</script>
