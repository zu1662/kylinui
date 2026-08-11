<template>
  <component
    :is="url ? 'a' : 'div'"
    class="ky-grid-item"
    :class="{
      'is-square': context?.square.value,
      'is-center': context?.center.value,
      'is-clickable': context?.clickable.value || url,
    }"
    :href="url || undefined"
    @click="$emit('click', $event)"
    ><div class="ky-grid-item__content">
      <KyBadge :content="badge" :dot="dot"
        ><slot name="icon"><KyIcon v-if="icon" :name="icon" source="iconfont" :size="24" /></slot
      ></KyBadge>
      <div v-if="text || $slots.default" class="ky-grid-item__text">
        <slot>{{ text }}</slot>
      </div>
    </div></component
  >
</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import KyBadge from '../badge';
import KyIcon from '../icon';
import type { GridItemProps } from './grid';
defineOptions({ name: 'KyGridItem' });
withDefaults(defineProps<GridItemProps>(), { text: '', icon: '', badge: '', dot: false, url: '' });
defineEmits<{ click: [event: MouseEvent] }>();
const context = inject<{ square: Ref<boolean>; center: Ref<boolean>; clickable: Ref<boolean> }>(
  'ky-grid',
);
</script>
