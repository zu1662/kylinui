<template>
  <div>
    <KyButton block @click="visible = true">打开方案说明</KyButton>
    <KyActionSheet
      v-model="visible"
      title="方案说明"
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
const tabs = [{ title: '基础版' }, { title: '进阶版', subTitle: '推荐' }, { title: '专业版' }];
const descriptions = ['包含常用基础能力', '包含扩展能力及优先支持', '包含完整能力及专属服务'];
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
