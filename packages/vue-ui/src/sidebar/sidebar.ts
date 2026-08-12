import type { ComputedRef, InjectionKey, Ref } from 'vue';
export type SidebarName = string | number;
export interface SidebarProps {
  modelValue?: SidebarName;
}
export interface SidebarItemProps {
  name?: SidebarName;
  title?: string;
  disabled?: boolean;
  badge?: string | number;
  dot?: boolean;
}
interface SidebarItemRecord {
  id: symbol;
  name: Ref<SidebarName | undefined>;
  disabled: Ref<boolean>;
  element: Ref<HTMLButtonElement | null>;
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
