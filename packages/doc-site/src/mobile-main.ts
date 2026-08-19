import { createApp } from 'vue';
import KylinUI, { resolveKylinTheme, setKylinTheme } from '@kylinui/vue';
import MobileApp from './MobileApp.vue';
import './styles/mobile.less';

const search = new URLSearchParams(window.location.search);
const requestedTheme = search.get('theme');
const storedTheme = window.localStorage.getItem('kylin-ui-theme');

setKylinTheme(resolveKylinTheme(requestedTheme ?? storedTheme));
document.documentElement.classList.add('is-mobile-site');
createApp(MobileApp).use(KylinUI).mount('#app');
