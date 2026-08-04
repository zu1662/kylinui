export interface StepperProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  readonly?: boolean;
  inputAllowed?: boolean;
  decimalPlaces?: number;
  label?: string;
}

export function normalizeStepper(
  value: number,
  min: number,
  max: number,
  step: number,
  decimalPlaces?: number,
) {
  const safeStep = Number.isFinite(step) && step > 0 ? step : 1;
  const safeValue = Number.isFinite(value) ? value : min;
  const aligned = min + Math.round((safeValue - min) / safeStep) * safeStep;
  const precision = decimalPlaces ?? Math.max(0, (String(safeStep).split('.')[1] ?? '').length);
  return Number(Math.min(max, Math.max(min, aligned)).toFixed(precision));
}
