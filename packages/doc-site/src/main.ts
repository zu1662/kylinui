import { createApp } from 'vue';
import KylinDesign, { resolveKylinTheme, setKylinTheme } from '@kylin-design/vue-ui';
import './styles/index.less';

/** 文档正文与手机预览使用不同根组件，iframe 内的 Teleport 会自然限制在移动视口中。 */
async function bootstrap() {
  const search = new URLSearchParams(window.location.search);
  const isPreview = search.has('preview');
  const requestedTheme = search.get('theme');
  const storedTheme = window.localStorage.getItem('kylin-design-theme');
  setKylinTheme(resolveKylinTheme(requestedTheme ?? storedTheme));

  if (isPreview) {
    document.documentElement.classList.add('is-preview');
    // 先安装 Vant 桌面触摸适配器，再挂载预览应用，确保组件初始化时即可监听触摸事件。
    await import('@vant/touch-emulator');
    const { default: PreviewApp } = await import('./PreviewApp.vue');
    createApp(PreviewApp).use(KylinDesign).mount('#app');
    return;
  }

  const { default: App } = await import('./App.vue');
  createApp(App).use(KylinDesign).mount('#app');
}

void bootstrap();
