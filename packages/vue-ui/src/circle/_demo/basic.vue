<template>
  <div class="circle-demo">
    <KyCircle :percentage="35" /><KyCircle :percentage="72" :size="120" :stroke-width="10"
      ><template #default="{ percentage }"
        ><strong>{{ percentage }}</strong
        ><small>完成</small></template
      ></KyCircle
    ><KyCircle :percentage="90" :clockwise="false" />
  </div>
</template>
<script setup lang="ts">
import KyCircle from '../index';
</script>
<style scoped>
.circle-demo {
  display: flex;
  padding: 24px 8px;
  align-items: center;
  justify-content: space-around;
}
.circle-demo strong,
.circle-demo small {
  display: block;
  text-align: center;
}
.circle-demo small {
  font-size: var(--ky-font-size-caption);
  color: var(--ky-color-text-secondary);
}
</style>
