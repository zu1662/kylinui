<template>
  <div class="ky-cell-demo">
    <section>
      <h3>基础用法</h3>
      <KyCellGroup>
        <KyCell title="联系人" value="麒麟用户" />
        <KyCell title="手机号" value="138****0000" label="仅用于接收服务通知" required />
        <KyCell value="仅展示右侧内容时会占满整行" />
      </KyCellGroup>
    </section>

    <section>
      <h3>卡片与交互</h3>
      <KyCellGroup title="账户设置" inset>
        <KyCell title="个人资料" icon="info" is-link />
        <KyCell title="通知设置" icon="bell" value="已开启" is-link arrow-direction="down" />
        <KyCell title="不可操作" value="已禁用" is-link disabled />
      </KyCellGroup>
    </section>

    <section>
      <h3>大尺寸与插槽</h3>
      <KyCellGroup inset>
        <KyCell title="会员权益" label="2026 年 12 月 31 日到期" size="large" center>
          <template #value>高级会员</template>
          <template #extra><span class="ky-cell-demo__status">生效中</span></template>
        </KyCell>
      </KyCellGroup>
    </section>
  </div>
</template>

<script setup lang="ts">
import { KyCell, KyCellGroup } from '../index';
</script>

<style scoped>
.ky-cell-demo {
  display: grid;
  gap: var(--ky-space-5);
  padding-block: var(--ky-space-2) var(--ky-space-5);
}

.ky-cell-demo h3 {
  margin: 0;
  padding: 0 var(--ky-space-4) var(--ky-space-2);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
  font-weight: var(--ky-font-medium);
}

.ky-cell-demo__status {
  padding: var(--ky-space-1) var(--ky-space-2);
  color: var(--ky-color-brand-strong);
  font-size: var(--ky-font-size-assist);
  line-height: 1;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-pill);
}
</style>
