/** 移动端气泡优先采用四个基础方位，避免复杂自动定位增加不可预期跳动。 */
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  modelValue?: boolean;
  placement?: PopoverPlacement;
  trigger?: 'click' | 'manual';
  closeOnOutside?: boolean;
}
