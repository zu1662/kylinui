<template>
  <KyHighlight v-bind="configProps" />
</template>

<script setup lang="ts">
import KyHighlight from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
</script>
