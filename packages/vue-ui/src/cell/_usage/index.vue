<template>
  <KyCellGroup title="效果预览" inset>
    <KyCell v-bind="configProps" />
  </KyCellGroup>
</template>

<script setup lang="ts">
import { KyCell, KyCellGroup } from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
</script>
