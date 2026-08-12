import type { ComputedRef, InjectionKey, Ref } from 'vue';
export type TabName = string | number;
export type TabsType = 'line' | 'card';
export interface TabsProps {
  modelValue?: TabName;
  type?: TabsType;
  animated?: boolean;
  ellipsis?: boolean;
  shrink?: boolean;
  sticky?: boolean;
  offsetTop?: number | string;
  duration?: number;
}
export interface TabProps {
  name?: TabName;
  title?: string;
  disabled?: boolean;
  badge?: string | number;
  dot?: boolean;
  lazyRender?: boolean;
}
interface TabRecord {
  id: symbol;
  title: Ref<string>;
  name: Ref<TabName | undefined>;
  disabled: Ref<boolean>;
  badge: Ref<string | number | undefined>;
  dot: Ref<boolean>;
  tabId: string;
  panelId: string;
}
interface TabsContext {
  activeName: ComputedRef<TabName | undefined>;
  animated: Ref<boolean>;
  duration: Ref<number>;
  register: (record: TabRecord) => void;
  unregister: (id: symbol) => void;
  resolveName: (id: symbol, explicit?: TabName) => TabName;
  select: (name: TabName, disabled?: boolean) => void;
}
export const TABS_KEY: InjectionKey<TabsContext> = Symbol('KyTabs');
export type { TabRecord };
