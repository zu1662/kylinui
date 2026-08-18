import type { ComputedRef, InjectionKey, Ref } from 'vue';

export type SidebarName = string | number;
export interface SidebarProps {
  modelValue?: SidebarName;
  safeAreaInsetTop?: boolean;
  safeAreaInsetBottom?: boolean;
  scrollToActive?: boolean;
  ariaLabel?: string;
}
export interface SidebarItemProps {
  name?: SidebarName;
  title?: string;
  disabled?: boolean;
  badge?: string | number;
  dot?: boolean;
  icon?: string;
  activeIcon?: string;
  inactiveIcon?: string;
  href?: string;
  target?: string;
  rel?: string;
}
interface SidebarItemRecord {
  id: symbol;
  name: Ref<SidebarName | undefined>;
  disabled: Ref<boolean>;
  element: Ref<HTMLElement | null>;
}
interface SidebarContext {
  activeName: ComputedRef<SidebarName | undefined>;
  register: (record: SidebarItemRecord) => void;
  unregister: (id: symbol) => void;
  resolveName: (id: symbol, explicit?: SidebarName) => SidebarName;
  select: (name: SidebarName, disabled?: boolean) => void;
}
export const SIDEBAR_KEY: InjectionKey<SidebarContext> = Symbol('KySidebar');
export type { SidebarItemRecord };
