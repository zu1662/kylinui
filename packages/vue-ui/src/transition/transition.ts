export const transitionNames = [
  'fade',
  'fade-up',
  'fade-down',
  'fade-left',
  'fade-right',
  'slide-up',
  'slide-down',
  'slide-left',
  'slide-right',
  'zoom',
  'punch',
  'bounce',
  'fly',
  'post-up',
] as const;

export type BuiltInTransitionName = (typeof transitionNames)[number];
export type TransitionName = BuiltInTransitionName | (string & {});
export type TransitionMode = 'default' | 'in-out' | 'out-in';
export type TransitionType = 'transition' | 'animation';

export interface TransitionDuration {
  enter?: number;
  leave?: number;
}

export interface TransitionProps {
  /** 内置动效短名称，或完整的自定义 Vue Transition 名称。 */
  name?: TransitionName;
  /** 首次挂载时是否执行进入动画。 */
  appear?: boolean;
  /** 多元素切换时的 Vue Transition 执行顺序。 */
  mode?: TransitionMode;
  /** 在自动识别不满足需求时，显式指定 CSS transition 或 animation。 */
  type?: TransitionType;
  /** 单个数字表示进出一致，也可分别配置进入和退出时长。 */
  duration?: number | TransitionDuration;
  /** 禁用后直接渲染插槽，不创建 Vue Transition。 */
  disabled?: boolean;
}

export const transitionDefaultDuration = Object.freeze({
  enter: 300,
  leave: 275,
});

/** 判断短名称是否属于组件库内置动效。 */
export function isBuiltInTransitionName(name: string): name is BuiltInTransitionName {
  return (transitionNames as readonly string[]).includes(name);
}

/** 内置短名称统一补充 ky- 前缀，自定义名称保持原样。 */
export function resolveTransitionName(name: TransitionName = 'fade') {
  if (name.startsWith('ky-')) return name;
  return isBuiltInTransitionName(name) ? `ky-${name}` : name;
}

function normalizeDurationPart(value: number | undefined, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : fallback;
}

/** 将局部时长配置补全，供组件内联 CSS 变量使用。 */
export function resolveTransitionDuration(duration?: number | TransitionDuration) {
  if (typeof duration === 'number') {
    const value = normalizeDurationPart(duration, transitionDefaultDuration.enter);
    return { enter: value, leave: value };
  }

  return {
    enter: normalizeDurationPart(duration?.enter, transitionDefaultDuration.enter),
    leave: normalizeDurationPart(duration?.leave, transitionDefaultDuration.leave),
  };
}
