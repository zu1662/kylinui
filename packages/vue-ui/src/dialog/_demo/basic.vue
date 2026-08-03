<template>
  <KyButton variant="danger" @click="visible = true">删除当前行程</KyButton>
  <KyDialog
    v-model="visible"
    title="确认删除行程？"
    description="删除后无法恢复，请谨慎操作。"
    danger
    confirm-text="删除"
    @confirm="visible = false"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyDialog from '../index';
const visible = ref(false);
// 危险操作通过标题、说明和按钮文案共同传达风险。
</script>
