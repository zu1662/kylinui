<template>
  <KyCellGroup title="基础信息" inset
    ><KyCell title="联系人" value="麒麟用户" is-link /><KyCell
      title="手机号"
      value="138****0000"
      label="仅用于接收服务通知"
      required /><KyCell title="禁用项" value="不可操作" disabled
  /></KyCellGroup>
</template>
<script setup lang="ts">
import { KyCell, KyCellGroup } from '../index';
</script>
<style scoped>
.demo-target {
  display: inline-grid;
  min-width: 64px;
  height: 40px;
  padding: 0 12px;
  place-items: center;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-sm);
}
.ky-demo-stack {
  display: grid;
  gap: 20px;
}
.demo-count b {
  display: inline-grid;
  min-width: 30px;
  height: 30px;
  place-items: center;
  color: #fff;
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}
</style>
