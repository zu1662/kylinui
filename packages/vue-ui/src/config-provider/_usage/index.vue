<template>
  <div class="config-provider-usage-shell">
    <div ref="teleportTarget" class="config-provider-usage-shell__portal" />
    <KyConfigProvider
      :theme="theme"
      :theme-vars="themeVars"
      :theme-vars-scope="themeVarsScope"
      :z-index="zIndex"
      :locale="locale"
      :service-defaults="serviceDefaults"
      :teleport="teleportTarget || 'body'"
    >
      <section class="config-provider-usage">
        <p class="config-provider-usage__eyebrow">{{ themeLabel }}</p>
        <h3>局部配置预览</h3>
        <KySearch v-model="keyword" />
        <KySpace fill>
          <KyButton block @click="show = true">打开 Popup</KyButton>
          <KyButton block variant="secondary" @click="openToast">服务式 Toast</KyButton>
        </KySpace>
        <KyPopup v-model="show" position="bottom" round>
          <div class="config-provider-usage__popup">
            <strong>浮层已进入自定义容器</strong>
            <p>Popup 未显式传 teleport，因此读取最近的 ConfigProvider。</p>
            <KyButton block @click="show = false">关闭</KyButton>
          </div>
        </KyPopup>
      </section>
    </KyConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyButton from '../../button';
import KyPopup from '../../popup';
import KySearch from '../../search';
import KySpace from '../../space';
import { showToast } from '../../toast';
import { resolveKylinTheme, type KylinTheme } from '../../theme';
import KyConfigProvider from '../index';
import type {
  ConfigProviderLocale,
  ConfigProviderServiceDefaults,
  ConfigProviderThemeVarsScope,
} from '../config-provider';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const show = ref(false);
const keyword = ref('');
const teleportTarget = ref<HTMLElement | null>(null);
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
const locale: Partial<ConfigProviderLocale> = { searchPlaceholder: '搜索当前主题中的组件' };
const serviceDefaults: ConfigProviderServiceDefaults = {
  toast: { position: 'top', duration: 1200 },
};
const themeLabel = computed(
  () =>
    ({ jade: '温润青玉', ocean: '海盐蓝', sunset: '暖杏丹霞', midnight: '星夜紫' })[theme.value],
);
function openToast() {
  showToast('Toast 继承了位置、时长和 Teleport 容器');
}
</script>

<style scoped lang="less">
.config-provider-usage-shell {
  position: relative;
  min-height: 360px;
}

.config-provider-usage-shell__portal {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.config-provider-usage-shell__portal :deep(*) {
  pointer-events: auto;
}

.config-provider-usage {
  min-height: 320px;
  padding: var(--ky-space-5);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-page-bg);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.config-provider-usage h3 {
  margin: 0 0 var(--ky-space-3);
}

.config-provider-usage__eyebrow {
  margin: 0 0 var(--ky-space-2);
  color: var(--ky-color-brand-strong);
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
  color: var(--ky-color-text-secondary);
}
</style>
