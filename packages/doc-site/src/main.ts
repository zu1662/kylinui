interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: {
    mobile?: boolean;
  };
}

function isMobileDevice() {
  const navigatorInfo = window.navigator as NavigatorWithUserAgentData;
  if (navigatorInfo.userAgentData?.mobile) {
    return true;
  }

  if (/Android|iPhone|iPad|iPod|Mobile/i.test(navigatorInfo.userAgent)) {
    return true;
  }

  // iPadOS 可能使用桌面版 Safari UA，只能结合触控点数量识别。
  return navigatorInfo.platform === 'MacIntel' && navigatorInfo.maxTouchPoints > 1;
}

function redirectToMobileSite() {
  const target = new URL(`${import.meta.env.BASE_URL}mobile.html`, window.location.origin);
  target.search = window.location.search;
  target.hash = window.location.hash;
  window.location.replace(target);
}

async function bootstrap() {
  const search = new URLSearchParams(window.location.search);
  const isPreview = search.has('preview');

  // 隔离预览必须优先于设备分流，否则文档页内的 iframe 会被重定向到手机首页。
  if (!isPreview && search.get('site') !== 'desktop' && isMobileDevice()) {
    redirectToMobileSite();
    return;
  }

  const [{ createApp }, kylinDesign] = await Promise.all([
    import('vue'),
    import('@kylin-design/vue-ui'),
    import('./styles/index.less'),
  ]);
  const { default: KylinDesign, resolveKylinTheme, setKylinTheme } = kylinDesign;
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
