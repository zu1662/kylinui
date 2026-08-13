<template>
  <KyConfigProvider
    :theme="theme"
    :theme-vars="themeVars"
    :theme-vars-scope="themeVarsScope"
    :z-index="zIndex"
  >
    <section class="config-provider-usage">
      <p class="config-provider-usage__eyebrow">{{ themeLabel }}</p>
      <h3>局部主题预览</h3>
      <p>当前容器通过 ConfigProvider 切换主题，并覆盖品牌强调色与中号圆角。</p>
      <KySpace fill>
        <KyButton block @click="show = true">打开弹出层</KyButton>
        <KyTag variant="solid">{{ themeVarsScope }} scope</KyTag>
      </KySpace>
      <KyPopup v-model="show" position="bottom" round>
        <div class="config-provider-usage__popup">
          <strong>全局浮层层级：{{ zIndex }}</strong>
          <p>未显式设置 zIndex 的 Popup 会读取 ConfigProvider 的全局起始值。</p>
          <KyButton block @click="show = false">关闭</KyButton>
        </div>
      </KyPopup>
    </section>
  </KyConfigProvider>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyButton from '../../button';
import KyPopup from '../../popup';
import KySpace from '../../space';
import KyTag from '../../tag';
import { resolveKylinTheme, type KylinTheme } from '../../theme';
import KyConfigProvider from '../index';
import type { ConfigProviderThemeVarsScope } from '../config-provider';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const show = ref(false);
const theme = computed<KylinTheme>(() => resolveKylinTheme(props.configProps.theme));
const themeVarsScope = computed<ConfigProviderThemeVarsScope>(() =>
  props.configProps.themeVarsScope === 'global' ? 'global' : 'local',
);
const zIndex = computed(() => Number(props.configProps.zIndex) || 900);
const themeVars = {
  colorBrandStrong: '#1757a6',
  colorBrand900: '#123f7a',
  radiusMd: '999px',
};
const themeLabel = computed(
  () =>
    ({ jade: '温润青玉', ocean: '海盐蓝', sunset: '暖杏丹霞', midnight: '星夜紫' })[theme.value],
);
</script>

<style scoped lang="less">
.config-provider-usage {
  min-height: 300px;
  padding: var(--ky-space-5);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-page-bg);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.config-provider-usage h3 {
  margin: 0 0 var(--ky-space-2);
}

.config-provider-usage p {
  margin: 0 0 var(--ky-space-5);
  color: var(--ky-color-text-secondary);
  line-height: 1.7;
}

.config-provider-usage__eyebrow {
  margin-bottom: var(--ky-space-2) !important;
  color: var(--ky-color-brand-strong) !important;
  font-size: var(--ky-font-size-assist);
  font-weight: var(--ky-font-semibold);
}

.config-provider-usage__popup {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-5);
}

.config-provider-usage__popup p {
  margin: 0;
}
</style>
