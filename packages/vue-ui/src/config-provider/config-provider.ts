import {
  computed,
  inject,
  type CSSProperties,
  type InjectionKey,
  type Ref,
  type TeleportProps,
} from 'vue';
import type { DialogServiceOptions } from '../dialog';
import type { ImagePreviewOptions } from '../image-preview';
import type { ToastOptions } from '../toast';
import type { KylinTheme } from '../theme';

export type ConfigProviderTag = keyof HTMLElementTagNameMap;
export type ConfigProviderThemeVarsScope = 'local' | 'global';
export type ConfigProviderThemeVarValue = string | number;
export type ConfigProviderThemeVars = Record<string, ConfigProviderThemeVarValue>;
export type ConfigProviderTeleport = TeleportProps['to'] | false;

export interface ConfigProviderLocale {
  searchPlaceholder: string;
  searchActionText: string;
  searchClearLabel: string;
  searchLoadingText: string;
  searchSuggestionsLabel: string;
  imageLoadingText: string;
  imageErrorText: string;
  skeletonLoadingLabel: string;
  emptyDescription: string;
  navBarBackLabel: string;
}

export const ZH_CN_LOCALE: ConfigProviderLocale = {
  searchPlaceholder: '请输入搜索关键词',
  searchActionText: '取消',
  searchClearLabel: '清空搜索内容',
  searchLoadingText: '搜索中',
  searchSuggestionsLabel: '搜索建议',
  imageLoadingText: '图片加载中',
  imageErrorText: '图片加载失败',
  skeletonLoadingLabel: '内容加载中',
  emptyDescription: '暂无内容',
  navBarBackLabel: '返回',
};

export interface ConfigProviderServiceDefaults {
  toast?: Partial<ToastOptions>;
  dialog?: Partial<DialogServiceOptions>;
  imagePreview?: Partial<ImagePreviewOptions>;
}

export interface ConfigProviderProps {
  tag?: ConfigProviderTag;
  theme?: KylinTheme;
  zIndex?: number;
  themeVars?: ConfigProviderThemeVars;
  themeVarsScope?: ConfigProviderThemeVarsScope;
  locale?: Partial<ConfigProviderLocale>;
  serviceDefaults?: ConfigProviderServiceDefaults;
  teleport?: ConfigProviderTeleport;
}

export interface ConfigProviderContext {
  theme: Readonly<Ref<KylinTheme>>;
  zIndex: Readonly<Ref<number | undefined>>;
  themeVars: Readonly<Ref<ConfigProviderThemeVars>>;
  themeVarsScope: Readonly<Ref<ConfigProviderThemeVarsScope>>;
  locale: Readonly<Ref<ConfigProviderLocale>>;
  serviceDefaults: Readonly<Ref<ConfigProviderServiceDefaults>>;
  teleport: Readonly<Ref<ConfigProviderTeleport>>;
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderContext> =
  Symbol('ky-config-provider');

export function useConfigProvider() {
  const context = inject(CONFIG_PROVIDER_KEY, undefined);
  return {
    context,
    locale: computed(() => context?.locale.value ?? ZH_CN_LOCALE),
    teleport: computed(() => context?.teleport.value ?? 'body'),
    serviceDefaults: computed(() => context?.serviceDefaults.value ?? {}),
  };
}

function toKebabCase(value: string) {
  return value
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/** 将 themeVars 中的 camelCase 键转换为 --ky-* CSS 自定义属性。 */
export function mapThemeVarsToStyle(themeVars: ConfigProviderThemeVars): CSSProperties {
  return Object.fromEntries(
    Object.entries(themeVars).map(([key, value]) => {
      const normalizedKey = key.startsWith('--ky-') ? key : '--ky-' + toKebabCase(key);
      return [normalizedKey, String(value)];
    }),
  ) as CSSProperties;
}
