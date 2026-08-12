import type { ComputedRef, InjectionKey, Ref } from 'vue';
export type CollapseName = string | number;
export interface CollapseProps {
  modelValue?: CollapseName | CollapseName[] | null;
  accordion?: boolean;
  border?: boolean;
}
export interface CollapseItemProps {
  name?: CollapseName;
  title?: string;
  value?: string;
  icon?: string;
  disabled?: boolean;
  readonly?: boolean;
  border?: boolean;
}
interface CollapseContext {
  activeNames: ComputedRef<CollapseName[]>;
  accordion: Ref<boolean>;
  register: (id: symbol) => void;
  unregister: (id: symbol) => void;
  resolveName: (id: symbol, explicit?: CollapseName) => CollapseName;
  toggle: (name: CollapseName, expanded: boolean) => void;
}
export const COLLAPSE_KEY: InjectionKey<CollapseContext> = Symbol('KyCollapse');
