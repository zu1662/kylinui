<template>
  <KyTextarea v-model="value" v-bind="configProps" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyTextarea from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const value = ref('请在工作日 18:00 后联系，我会及时确认具体安排。');
</script>
