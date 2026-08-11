<template>
  <div class="popup-demo">
    <KyButton block @click="visible = true">打开底部弹层</KyButton>
    <KyPopup v-model="visible" position="bottom" round aria-label="内容详情">
      <article class="popup-demo__content">
        <h3>内容详情</h3>
        <p>底部弹层适合展示补充信息、筛选条件或快捷操作。</p>
        <KyButton block @click="visible = false">关闭弹层</KyButton>
      </article>
    </KyPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopup from '../index';

const visible = ref(false);
</script>

<style scoped lang="less">
.popup-demo__content {
  padding: 24px 20px var(--ky-safe-bottom);
}

.popup-demo__content h3,
.popup-demo__content p {
  margin-top: 0;
}

.popup-demo__content p {
  margin-bottom: 24px;
  color: var(--ky-color-text-secondary);
}
</style>
