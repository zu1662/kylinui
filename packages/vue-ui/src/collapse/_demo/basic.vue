<template>
  <div class="collapse-demo">
    <KyCollapse v-model="active"
      ><KyCollapseItem name="account" title="账户信息"
        >展示账户、安全与认证相关的补充内容。</KyCollapseItem
      ><KyCollapseItem name="service" title="服务说明"
        >展示服务范围、处理周期与注意事项。</KyCollapseItem
      ><KyCollapseItem name="disabled" title="暂不可用" disabled
        >不可见内容</KyCollapseItem
      ></KyCollapse
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { KyCollapse, KyCollapseItem } from '../index';
const active = ref(['account']);
</script>
<style scoped>
.collapse-demo {
  padding: 16px 0;
}
</style>
