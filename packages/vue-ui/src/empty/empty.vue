<template>
  <div class="ky-empty">
    <div
      class="ky-empty__image"
      :class="'ky-empty__image--' + image"
      :style="imageStyle"
      aria-hidden="true"
    >
      <slot name="image"
        ><span class="ky-empty__symbol">{{ symbol }}</span></slot
      >
    </div>
    <h3 v-if="title || $slots.title" class="ky-empty__title">
      <slot name="title">{{ title }}</slot>
    </h3>
    <p v-if="resolvedDescription || $slots.description" class="ky-empty__description">
      <slot name="description">{{ resolvedDescription }}</slot>
    </p>
    <div v-if="$slots.action || $slots.default" class="ky-empty__actions">
      <slot name="action"><slot /></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useConfigProvider } from '../config-provider';
import type { EmptyProps } from './empty';
defineOptions({ name: 'KyEmpty' });
const props = withDefaults(defineProps<EmptyProps>(), {
  image: 'default',
  imageSize: 112,
  title: '',
  description: undefined,
});
const { locale } = useConfigProvider();
const unit = (value: number | string) => (typeof value === 'number' ? value + 'px' : value);
const imageStyle = computed(() => ({
  width: unit(props.imageSize),
  height: unit(props.imageSize),
}));
const resolvedDescription = computed(() => props.description ?? locale.value.emptyDescription);
const symbol = computed(
  () => ({ default: '?', search: '?', network: '?', error: '!' })[props.image],
);
</script>
