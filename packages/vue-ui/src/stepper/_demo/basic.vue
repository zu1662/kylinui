<template>
  <div class="ky-demo-inline">
    <span>参与人数</span><KyStepper v-model="value" :min="1" :max="5" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyStepper from '../index';
const value = ref(1);
// 增减按钮的触控尺寸按移动端热区要求设计。
</script>
