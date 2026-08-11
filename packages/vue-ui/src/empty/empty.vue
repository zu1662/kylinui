<template>
  <div class="ky-empty">
    <div
      class="ky-empty__image"
      :class="`ky-empty__image--${image}`"
      :style="imageStyle"
      aria-hidden="true"
    >
      <slot name="image"
        ><span class="ky-empty__symbol">{{ symbol }}</span></slot
      >
    </div>
    <p v-if="description || $slots.description" class="ky-empty__description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.default" class="ky-empty__bottom"><slot /></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { EmptyProps } from './empty';
defineOptions({ name: 'KyEmpty' });
const props = withDefaults(defineProps<EmptyProps>(), {
  image: 'default',
  imageSize: 112,
  description: '暂无内容',
});
const unit = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);
const imageStyle = computed(() => ({
  width: unit(props.imageSize),
  height: unit(props.imageSize),
}));
const symbol = computed(
  () => ({ default: '?', search: '?', network: '?', error: '!' })[props.image],
);
</script>
