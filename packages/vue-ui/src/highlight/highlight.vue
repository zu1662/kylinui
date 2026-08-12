<template>
  <component :is="tag" class="ky-highlight">
    <template v-for="(chunk, index) in chunks" :key="`${index}-${chunk.text}`">
      <mark v-if="chunk.highlighted" class="ky-highlight__mark">{{ chunk.text }}</mark>
      <span v-else class="ky-highlight__text">{{ chunk.text }}</span>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createHighlightChunks, type HighlightProps } from './highlight';

defineOptions({ name: 'KyHighlight' });

const props = withDefaults(defineProps<HighlightProps>(), {
  text: '',
  keywords: '',
  caseSensitive: false,
  literal: true,
  tag: 'span',
});

const chunks = computed(() =>
  createHighlightChunks(props.text, props.keywords, props.caseSensitive, props.literal),
);
</script>
