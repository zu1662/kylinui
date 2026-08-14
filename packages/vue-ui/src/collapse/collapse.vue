<template>
  <div class="ky-collapse" :class="{ 'is-bordered': border }"><slot /></div>
</template>
<script setup lang="ts">
import { computed, provide, ref, toRef } from 'vue';
import { COLLAPSE_KEY, type CollapseName, type CollapseProps } from './collapse';
defineOptions({ name: 'KyCollapse' });
const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false,
  border: true,
});
const emit = defineEmits<{
  'update:modelValue': [CollapseName | CollapseName[] | null];
  change: [CollapseName | CollapseName[] | null];
}>();
const ids = ref<symbol[]>([]);
// 未命名项在注册时分配稳定递增的隐式名称，避免前置项删除或插入导致展开状态漂移。
let implicitSeed = 0;
const implicitNames = new Map<symbol, CollapseName>();
const activeNames = computed<CollapseName[]>(() =>
  Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue === null || props.modelValue === undefined || props.modelValue === ''
      ? []
      : [props.modelValue],
);
function register(id: symbol) {
  if (!ids.value.includes(id)) {
    ids.value.push(id);
    implicitNames.set(id, implicitSeed);
    implicitSeed += 1;
  }
}
function unregister(id: symbol) {
  ids.value = ids.value.filter((item) => item !== id);
  implicitNames.delete(id);
}
function resolveName(id: symbol, explicit?: CollapseName) {
  return explicit ?? implicitNames.get(id) ?? ids.value.indexOf(id);
}
function toggle(name: CollapseName, expanded: boolean) {
  const next: CollapseName | CollapseName[] | null = props.accordion
    ? expanded
      ? name
      : null
    : expanded
      ? [...new Set([...activeNames.value, name])]
      : activeNames.value.filter((item) => item !== name);
  emit('update:modelValue', next);
  emit('change', next);
}
provide(COLLAPSE_KEY, {
  activeNames,
  accordion: toRef(props, 'accordion'),
  register,
  unregister,
  resolveName,
  toggle,
});
</script>
