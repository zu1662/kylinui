<template>
  <div class="popup-usage">
    <KyButton @click="visible = true">打开弹层</KyButton>
    <KyPopup v-model="visible" v-bind="configProps" aria-label="配置预览">
      <div class="popup-usage__panel">
        <strong>配置预览</strong>
        <p>当前 Popup 参数由文档站控制面板实时传入。</p>
        <KyButton block @click="visible = false">关闭</KyButton>
      </div>
    </KyPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopup from '../index';

defineProps<{ configProps: Record<string, unknown> }>();
const visible = ref(false);
</script>

<style scoped lang="less">
.popup-usage__panel {
  width: min(320px, calc(100vw - 40px));
  min-height: 180px;
  padding: 24px 20px;
}

.popup-usage__panel p {
  margin: 12px 0 24px;
  color: var(--ky-color-text-secondary);
}
</style>
