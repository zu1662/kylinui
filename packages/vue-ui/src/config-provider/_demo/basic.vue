<template>
  <div class="ky-config-provider-demo">
    <section>
      <h3>主题切换</h3>
      <KySpace wrap>
        <KyButton
          v-for="option in KYLIN_THEME_OPTIONS"
          :key="option.value"
          :variant="theme === option.value ? 'primary' : 'secondary'"
          @click="theme = option.value"
        >
          {{ option.label }}
        </KyButton>
      </KySpace>
      <KyConfigProvider :theme="theme" :theme-vars="themeVars">
        <article class="ky-config-provider-demo__preview">
          <KyTag variant="solid">{{ theme }}</KyTag>
          <h4>订单提交成功</h4>
          <p>ConfigProvider 可在同一页面中创建独立的主题作用域。</p>
          <KyButton block>查看详情</KyButton>
        </article>
      </KyConfigProvider>
    </section>

    <section>
      <h3>全局 CSS 变量与浮层层级</h3>
      <KyConfigProvider
        theme="ocean"
        theme-vars-scope="global"
        :z-index="1600"
        :theme-vars="{ radiusMd: '999px' }"
      >
        <KyButton @click="show = true">打开全局配置弹层</KyButton>
        <KyPopup v-model="show" position="bottom" round>
          <div class="ky-config-provider-demo__popup">
            <strong>Popup 使用全局层级 1600</strong>
            <KyButton block @click="show = false">关闭</KyButton>
          </div>
        </KyPopup>
      </KyConfigProvider>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import KyPopup from '../../popup';
import KySpace from '../../space';
import KyTag from '../../tag';
import { KYLIN_THEME_OPTIONS, type KylinTheme } from '../../theme';
import KyConfigProvider from '../index';

const theme = ref<KylinTheme>('jade');
const show = ref(false);
const themeVars = {
  colorBrandStrong: '#1757a6',
  colorBrand900: '#123f7a',
  radiusMd: '999px',
};
</script>

<style scoped lang="less">
.ky-config-provider-demo {
  display: grid;
  gap: var(--ky-space-6);
}

.ky-config-provider-demo h3 {
  margin: 0 0 var(--ky-space-3);
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.ky-config-provider-demo__preview {
  display: grid;
  gap: var(--ky-space-3);
  margin-top: var(--ky-space-4);
  padding: var(--ky-space-5);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.ky-config-provider-demo__preview h4,
.ky-config-provider-demo__preview p {
  margin: 0;
}

.ky-config-provider-demo__preview p {
  color: var(--ky-color-text-secondary);
  line-height: 1.7;
}

.ky-config-provider-demo__popup {
  display: grid;
  gap: var(--ky-space-4);
  padding: var(--ky-space-5);
}
</style>
