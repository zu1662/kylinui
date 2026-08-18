<template>
  <KyEmpty v-bind="configProps">
    <template #action>
      <KyButton size="small" @click="retryCount += 1"
        >重新加载{{ retryCount ? ' ' + retryCount : '' }}</KyButton
      >
    </template>
  </KyEmpty>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyEmpty from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const retryCount = ref(0);
</script>
