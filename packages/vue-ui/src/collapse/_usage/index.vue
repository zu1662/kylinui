<template>
  <KyCollapse v-model="active" v-bind="configProps"
    ><KyCollapseItem name="guide" title="使用说明" value="推荐阅读"
      >折叠面板适合承载补充说明和低频信息。</KyCollapseItem
    ><KyCollapseItem name="accessibility" title="无障碍" value="键盘可用"
      >标题使用原生按钮，可通过键盘切换展开状态。</KyCollapseItem
    ><KyCollapseItem name="disabled" title="禁用项目" disabled
      >当前内容不可展开。</KyCollapseItem
    ></KyCollapse
  >
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KyCollapse, KyCollapseItem } from '../index';
defineProps<{ configProps: Record<string, unknown> }>();
const active = ref(['guide']);
</script>
