<template>
  <div class="popup-demo">
    <KyButton block @click="visible = true">打开底部弹层</KyButton>
    <KyPopup v-model="visible" position="bottom" round aria-label="内容详情">
      <article class="popup-demo__content">
        <h3>内容详情</h3>
        <p>底部弹层适合展示补充信息、筛选条件或快捷操作。</p>
        <div class="popup-demo__actions">
          <KyButton variant="secondary" block @click="openNested(true)"> 打开嵌套弹层 </KyButton>
          <KyButton variant="secondary" block @click="openNested(false)">
            打开无遮罩嵌套层
          </KyButton>
          <KyButton block @click="visible = false">关闭弹层</KyButton>
        </div>
      </article>
    </KyPopup>

    <KyPopup
      v-model="nestedVisible"
      position="center"
      :overlay="nestedOverlay"
      round
      aria-label="嵌套弹层"
    >
      <article class="popup-demo__nested">
        <h3>嵌套弹层</h3>
        <p>层级由 Overlay Manager 自动分配，返回或遮罩点击只关闭当前顶层。</p>
        <KyButton block @click="nestedVisible = false">关闭当前层</KyButton>
      </article>
    </KyPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopup from '../index';

const visible = ref(false);
const nestedVisible = ref(false);
const nestedOverlay = ref(true);

function openNested(overlay: boolean) {
  nestedOverlay.value = overlay;
  nestedVisible.value = true;
}
</script>

<style scoped lang="less">
.popup-demo__content {
  padding: 24px 20px var(--ky-safe-bottom);
}

.popup-demo__nested {
  width: min(300px, calc(100vw - 48px));
  padding: 24px 20px;
}

.popup-demo__actions {
  display: grid;
  gap: var(--ky-space-3);
}

.popup-demo__content h3,
.popup-demo__content p,
.popup-demo__nested h3,
.popup-demo__nested p {
  margin-top: 0;
}

.popup-demo__content p,
.popup-demo__nested p {
  margin-bottom: 24px;
  color: var(--ky-color-text-secondary);
}
</style>
