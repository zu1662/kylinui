import { withInstall } from '../shared/with-install';
import ConfigProvider from './config-provider.vue';

export const KyConfigProvider = withInstall(ConfigProvider, 'KyConfigProvider');
export default KyConfigProvider;
export * from './config-provider';
