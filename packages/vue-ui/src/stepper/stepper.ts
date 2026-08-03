export interface StepperProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
}
export function normalizeStepper(value: number, min: number, max: number, step: number) {
  const next = Math.round(value / step) * step;
  return Math.min(max, Math.max(min, next));
}
