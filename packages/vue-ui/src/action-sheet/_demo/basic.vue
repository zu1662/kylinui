<template>
  <div>
    <KyButton block @click="visible = true">打开行李规则</KyButton>
    <KyActionSheet
      v-model="visible"
      title="行李规则"
      :tabs="tabs"
      :active-tab="activeTab"
      confirm-text="确认并继续"
      cancel-text="暂不选择"
      @update:active-tab="activeTab = $event"
      @confirm="visible = false"
    >
      <div class="action-sheet-demo__content">
        <strong>{{ tabs[activeTab].title }}</strong>
        <p>{{ descriptions[activeTab] }}</p>
      </div>
    </KyActionSheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyActionSheet from '../index';

const visible = ref(false);
const activeTab = ref(0);
const tabs = [{ title: '经济舱' }, { title: '公务舱', subTitle: '推荐' }, { title: '头等舱' }];
const descriptions = [
  '含 20kg 免费托运行李',
  '含 30kg 免费托运行李及优先登机',
  '含 40kg 免费托运行李及专属服务',
];
</script>

<style scoped lang="less">
.action-sheet-demo__content {
  min-height: 180px;
  padding: 24px 4px;
}

.action-sheet-demo__content p {
  color: var(--ky-color-text-secondary);
}
</style>
