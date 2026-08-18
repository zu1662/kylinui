import type {
  FormItemRules,
  FormModel,
  FormRule,
  FormRuleTrigger,
  FormValidateTrigger,
} from './form';

export function normalizeFormRules(rules?: FormItemRules): FormRule[] {
  if (!rules) return [];
  return Array.isArray(rules) ? rules : [rules];
}

export function normalizeFormTriggers(trigger?: FormRuleTrigger): FormValidateTrigger[] {
  if (!trigger) return [];
  return Array.isArray(trigger) ? trigger : [trigger];
}

export function matchesFormTrigger(
  rule: FormRule,
  trigger: FormValidateTrigger,
  fallback: FormRuleTrigger,
) {
  const triggers = normalizeFormTriggers(rule.trigger ?? fallback);
  return triggers.includes(trigger);
}

export function getFormValue(model: FormModel, path: string): unknown {
  return parsePath(path).reduce<unknown>((current, segment) => {
    if (current === null || typeof current !== 'object') return undefined;
    return (current as Record<string, unknown>)[segment];
  }, model);
}

export function setFormValue(model: FormModel, path: string, value: unknown) {
  const segments = parsePath(path);
  if (!segments.length) return;

  let current: Record<string, unknown> = model;
  segments.slice(0, -1).forEach((segment, index) => {
    const existing = current[segment];
    if (existing && typeof existing === 'object') {
      current = existing as Record<string, unknown>;
      return;
    }
    const next: Record<string, unknown> | unknown[] = /^\d+$/.test(segments[index + 1] ?? '')
      ? []
      : {};
    current[segment] = next;
    current = next as Record<string, unknown>;
  });
  current[segments[segments.length - 1]] = value;
}

export function cloneFormValue<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  if (value === null || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value.getTime()) as T;
  if (seen.has(value)) return seen.get(value) as T;

  if (Array.isArray(value)) {
    const clone: unknown[] = [];
    seen.set(value, clone);
    value.forEach((item) => clone.push(cloneFormValue(item, seen)));
    return clone as T;
  }

  const clone: Record<string, unknown> = {};
  seen.set(value, clone);
  Object.entries(value).forEach(([key, item]) => {
    clone[key] = cloneFormValue(item, seen);
  });
  return clone as T;
}

export async function validateFormRule(
  value: unknown,
  rule: FormRule,
  name: string,
  label: string | undefined,
  model: FormModel,
): Promise<string | undefined> {
  const empty = isEmptyFormValue(value);
  const fieldName = label || name;

  if (rule.required && empty) return rule.message || '请填写' + fieldName;
  if (!empty && rule.minLength !== undefined && getValueLength(value) < rule.minLength) {
    return rule.message || fieldName + '不能少于 ' + rule.minLength + ' 个字符';
  }
  if (!empty && rule.maxLength !== undefined && getValueLength(value) > rule.maxLength) {
    return rule.message || fieldName + '不能超过 ' + rule.maxLength + ' 个字符';
  }
  if (!empty && rule.pattern) {
    rule.pattern.lastIndex = 0;
    if (!rule.pattern.test(String(value))) return rule.message || fieldName + '格式不正确';
  }
  if (rule.validator) {
    try {
      const result = await rule.validator(value, { name, model, rule });
      if (typeof result === 'string') return result;
      if (result === false) return rule.message || fieldName + '校验未通过';
    } catch (error) {
      if (rule.message) return rule.message;
      if (error instanceof Error && error.message) return error.message;
      return fieldName + '校验失败，请稍后重试';
    }
  }
  return undefined;
}

function parsePath(path: string) {
  return path
    .replace(/\[([^\]]+)\]/g, '.$1')
    .split('.')
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function isEmptyFormValue(value: unknown) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function getValueLength(value: unknown) {
  if (typeof value === 'string' || Array.isArray(value)) return value.length;
  return String(value).length;
}
