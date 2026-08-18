<template>
  <div class="empty-demo">
    <KyEmpty title="还没有收藏" description="收藏的内容会显示在这里">
      <KyButton size="small">去逛逛</KyButton>
    </KyEmpty>
    <KyEmpty image="network" title="网络连接失败" description="请检查网络后重试">
      <template #action>
        <KyButton size="small" variant="secondary">重新加载</KyButton>
      </template>
    </KyEmpty>
  </div>
</template>

<script setup lang="ts">
import KyButton from '../../button';
import KyEmpty from '../index';
</script>

<style scoped>
.empty-demo {
  display: grid;
  gap: var(--ky-space-6);
  padding: var(--ky-space-4);
}
</style>
