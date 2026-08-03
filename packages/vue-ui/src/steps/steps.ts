export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'disabled';
export interface StepItem {
  title: string;
  description?: string;
  status?: StepStatus;
}
export interface StepsProps {
  items: StepItem[];
  current?: number;
  direction?: 'horizontal' | 'vertical';
}
export function resolveStepStatus(
  index: number,
  current: number,
  explicit?: StepStatus,
): StepStatus {
  if (explicit) return explicit;
  if (index < current) return 'finish';
  if (index === current) return 'process';
  return 'wait';
}
