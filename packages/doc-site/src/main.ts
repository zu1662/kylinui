import { createApp } from 'vue';
import KylinDesign from '@kylin-design/vue-ui';
import './styles/index.less';

/** 文档正文与手机预览使用不同根组件，iframe 内的 Teleport 会自然限制在移动视口中。 */
async function bootstrap() {
  const isPreview = new URLSearchParams(window.location.search).has('preview');

  if (isPreview) {
    document.documentElement.classList.add('is-preview');
    // Vant 文档站同类方案会把桌面鼠标事件转换为 touch 事件，方便验证移动端手势组件。
    await import('@vant/touch-emulator');
    const { default: PreviewApp } = await import('./PreviewApp.vue');
    createApp(PreviewApp).use(KylinDesign).mount('#app');
    return;
  }

  const { default: App } = await import('./App.vue');
  createApp(App).use(KylinDesign).mount('#app');
}

void bootstrap();
