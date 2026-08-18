<template>
  <div class="ky-demo-stack">
    <KyTextarea
      v-model="note"
      label="补充说明"
      placeholder="请输入补充说明"
      helper="输入内容后高度会自动扩展"
      :max-length="120"
      show-word-limit
      :autosize="{ minRows: 2, maxRows: 5 }"
    />
    <KyTextarea
      model-value="当前内容不符合提交要求"
      label="错误状态"
      error="请补充至少 10 个字符"
      :rows="2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyTextarea from '../index';

const note = ref('');
</script>
