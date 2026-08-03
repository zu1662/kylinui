<template><div class="ky-demo-row"><KyRadio v-model="value" value="direct" label="直达" name="route" /><KyRadio v-model="value" value="transfer" label="中转" name="route" /></div></template>
<script setup lang="ts">
import { ref } from 'vue';
import KyRadio from '../index';
const value = ref<string | number | boolean>('direct');
// 单选项同时使用形状和选中状态表达结果。
</script>
