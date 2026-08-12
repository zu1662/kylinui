<template>
  <KyImage v-bind="configProps" :src="source" alt="山谷插画" width="100%" height="240" />
</template>
<script setup lang="ts">
import KyImage from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const source =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="#e7f4ee"/><path d="M0 350L190 170l150 130L500 90l300 300v90H0z" fill="#7fc8a9"/><circle cx="660" cy="100" r="48" fill="#ffd27d"/></svg>',
  );
</script>
