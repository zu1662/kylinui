export type TabBarValue = string | number;

export interface TabBarItem {
  label?: string;
  title?: string;
  value?: TabBarValue;
  badge?: string | number;
  disabled?: boolean;
  icon?: string;
}

export interface TabBarProps {
  modelValue?: TabBarValue;
  current?: TabBarValue;
  data: TabBarItem[];
  fixedCount?: number;
  scrollable?: boolean;
  animated?: boolean;
  ariaLabel?: string;
}
