import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { GridDirection, GridProps } from './grid';

export interface GridContext {
  gutter: Ref<NonNullable<GridProps['gutter']>>;
  hasGutter: ComputedRef<boolean>;
  border: Ref<boolean>;
  square: Ref<boolean>;
  center: Ref<boolean>;
  clickable: Ref<boolean>;
  direction: Ref<GridDirection>;
  reverse: Ref<boolean>;
  iconSize: Ref<NonNullable<GridProps['iconSize']>>;
}

export const GRID_KEY: InjectionKey<GridContext> = Symbol('ky-grid');
