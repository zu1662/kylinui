<template>
  <section
    class="ky-collapse-item"
    :class="{ 'is-bordered': border, 'is-disabled': disabled, 'is-expanded': expanded }"
  >
    <button
      type="button"
      class="ky-collapse-item__header"
      :disabled="disabled"
      :aria-expanded="expanded"
      :aria-controls="contentId"
      @click="toggle"
    >
      <span v-if="icon || $slots.icon" class="ky-collapse-item__icon"
        ><slot name="icon"><KyIcon :name="icon" :size="20" /></slot></span
      ><span class="ky-collapse-item__title"
        ><slot name="title">{{ title }}</slot></span
      ><span v-if="value || $slots.value" class="ky-collapse-item__value"
        ><slot name="value">{{ value }}</slot></span
      ><KyIcon class="ky-collapse-item__arrow" name="chevron-down" :size="18" />
    </button>
    <div
      :id="contentId"
      class="ky-collapse-item__wrapper"
      :aria-hidden="!expanded"
      :inert="expanded ? undefined : true"
    >
      <div class="ky-collapse-item__body">
        <div class="ky-collapse-item__content"><slot /></div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useId } from 'vue';
import KyIcon from '../icon';
import { COLLAPSE_KEY, type CollapseItemProps } from './collapse';
defineOptions({ name: 'KyCollapseItem' });
const props = withDefaults(defineProps<CollapseItemProps>(), {
  name: undefined,
  title: '',
  value: '',
  icon: '',
  disabled: false,
  readonly: false,
  border: true,
});
function useCollapseContext() {
  const context = inject(COLLAPSE_KEY);
  if (!context) throw new Error('KyCollapseItem 必须在 KyCollapse 内使用');
  return context;
}
const context = useCollapseContext();
const id = Symbol('collapse-item');
const contentId = `ky-collapse-content-${useId()}`;
context.register(id);
const actualName = computed(() => context.resolveName(id, props.name));
const expanded = computed(() => context.activeNames.value.includes(actualName.value));
function toggle() {
  if (!props.disabled && !props.readonly) context.toggle(actualName.value, !expanded.value);
}
onBeforeUnmount(() => context.unregister(id));
</script>
