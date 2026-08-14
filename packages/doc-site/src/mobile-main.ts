import { createApp } from 'vue';
import KylinDesign, { resolveKylinTheme, setKylinTheme } from '@kylin-design/vue-ui';
import MobileApp from './MobileApp.vue';
import './styles/mobile.less';

const search = new URLSearchParams(window.location.search);
const requestedTheme = search.get('theme');
const storedTheme = window.localStorage.getItem('kylin-design-theme');

setKylinTheme(resolveKylinTheme(requestedTheme ?? storedTheme));
document.documentElement.classList.add('is-mobile-site');
createApp(MobileApp).use(KylinDesign).mount('#app');
