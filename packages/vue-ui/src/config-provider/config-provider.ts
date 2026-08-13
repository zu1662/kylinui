import type { CSSProperties, InjectionKey, Ref } from 'vue';
import type { KylinTheme } from '../theme';

export type ConfigProviderTag = keyof HTMLElementTagNameMap;
export type ConfigProviderThemeVarsScope = 'local' | 'global';
export type ConfigProviderThemeVarValue = string | number;
export type ConfigProviderThemeVars = Record<string, ConfigProviderThemeVarValue>;

export interface ConfigProviderProps {
  tag?: ConfigProviderTag;
  theme?: KylinTheme;
  zIndex?: number;
  themeVars?: ConfigProviderThemeVars;
  themeVarsScope?: ConfigProviderThemeVarsScope;
}

export interface ConfigProviderContext {
  theme: Readonly<Ref<KylinTheme>>;
  zIndex: Readonly<Ref<number | undefined>>;
  themeVars: Readonly<Ref<ConfigProviderThemeVars>>;
  themeVarsScope: Readonly<Ref<ConfigProviderThemeVarsScope>>;
}

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderContext> =
  Symbol('ky-config-provider');

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
      const normalizedKey = key.startsWith('--ky-') ? key : `--ky-${toKebabCase(key)}`;
      return [normalizedKey, String(value)];
    }),
  ) as CSSProperties;
}
