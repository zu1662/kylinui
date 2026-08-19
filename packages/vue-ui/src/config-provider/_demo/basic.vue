<template>
  <div class="config-provider-demo">
    <div ref="portal" class="config-provider-demo__portal" />
    <KyConfigProvider
      theme="ocean"
      :locale="locale"
      :service-defaults="serviceDefaults"
      :teleport="portal || 'body'"
    >
      <section class="config-provider-demo__preview">
        <h3>Locale 与服务默认值</h3>
        <KySearch v-model="keyword" show-action />
        <KySpace fill>
          <KyButton block @click="showToast('顶部 Toast 使用 Provider 默认时长')">Toast</KyButton>
          <KyButton
            block
            variant="secondary"
            @click="showNotify('底部 Notify 使用 Provider 默认类型')"
          >
            Notify
          </KyButton>
          <KyButton block variant="secondary" @click="openDialog">Dialog</KyButton>
          <KyButton block variant="secondary" @click="show = true">Popup</KyButton>
        </KySpace>
      </section>
      <KyPopup v-model="show" position="bottom" round>
        <div class="config-provider-demo__popup">
          <strong>默认 Teleport 容器生效</strong>
          <KyButton block @click="show = false">关闭</KyButton>
        </div>
      </KyPopup>
    </KyConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyButton from '../../button';
import { showConfirm } from '../../dialog';
import { showNotify } from '../../notify';
import KyPopup from '../../popup';
import KySearch from '../../search';
import KySpace from '../../space';
import { showToast } from '../../toast';
import KyConfigProvider from '../index';
import type { ConfigProviderLocale, ConfigProviderServiceDefaults } from '../config-provider';

const portal = ref<HTMLElement | null>(null);
const keyword = ref('');
const show = ref(false);
const locale: Partial<ConfigProviderLocale> = {
  searchPlaceholder: '搜索海盐蓝主题',
  searchActionText: '收起',
};
const serviceDefaults: ConfigProviderServiceDefaults = {
  toast: { position: 'top', duration: 1400 },
  notify: { position: 'bottom', duration: 1800, type: 'success' },
  dialog: { confirmText: '知道了', cancelText: '稍后' },
};
function openDialog() {
  showConfirm({
    title: '服务默认值',
    description: '按钮文案和 Teleport 容器来自 ConfigProvider。',
  });
}
</script>

<style scoped>
.config-provider-demo {
  position: relative;
  min-height: 360px;
  padding: var(--ky-space-4);
}

.config-provider-demo__portal {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.config-provider-demo__portal :deep(*) {
  pointer-events: auto;
}

.config-provider-demo__preview {
  display: grid;
  gap: var(--ky-space-4);
  padding: var(--ky-space-5);
  background: var(--ky-color-page-bg);
  border-radius: var(--ky-radius-lg);
}

.config-provider-demo__preview h3 {
  margin: 0;
}

.config-provider-demo__popup {
  display: grid;
  gap: var(--ky-space-4);
  padding: var(--ky-space-5);
}
</style>
