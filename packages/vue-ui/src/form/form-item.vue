<template>
  <FieldShell
    ref="shellRef"
    class="ky-form-item"
    :class="'is-' + status"
    :label="label"
    :helper="helper"
    :error="errorMessage"
    :required="isRequired"
    :disabled="disabled"
    :control-id="controlId"
    :message-id="messageId"
  >
    <template #control>
      <div
        class="ky-form-item__control"
        @input="handleInput"
        @change="handleChange"
        @focusout="handleFocusout"
      >
        <slot :error="errorMessage" :status="status" />
      </div>
    </template>
  </FieldShell>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  useId,
  watch,
  type ComponentPublicInstance,
} from 'vue';
import FieldShell from './field-shell.vue';
import { FORM_ITEM_KEY, FORM_KEY, type RegisteredFormField } from './context';
import type {
  FormItemProps,
  FormRuleTrigger,
  FormScrollIntoViewOptions,
  FormValidateStatus,
  FormValidateTrigger,
} from './form';
import {
  cloneFormValue,
  getFormValue,
  matchesFormTrigger,
  normalizeFormRules,
  setFormValue,
  validateFormRule,
} from './utils';

defineOptions({ name: 'KyFormItem' });

const props = defineProps<FormItemProps>();
const form = inject(FORM_KEY, undefined);
const generatedId = useId();
const controlId = 'ky-form-control-' + generatedId;
const messageId = 'ky-form-message-' + generatedId;
const shellRef = ref<ComponentPublicInstance | null>(null);
const status = ref<FormValidateStatus>('idle');
const internalError = ref('');
const errorMessage = computed(() => internalError.value);
const name = computed(() => props.name);
const disabled = computed(() => form?.disabled.value ?? false);
const readonly = computed(() => form?.readonly.value ?? false);
const combinedRules = computed(() => {
  const rules = [
    ...normalizeFormRules(props.name ? form?.rules.value[props.name] : undefined),
    ...normalizeFormRules(props.rules),
  ];
  if (props.required && !rules.some((rule) => rule.required)) rules.unshift({ required: true });
  return rules;
});
const isRequired = computed(
  () => props.required || combinedRules.value.some((rule) => rule.required),
);
const triggerFallback = computed<FormRuleTrigger>(
  () => props.validateTrigger ?? form?.validateTrigger.value ?? ['onBlur', 'onSubmit'],
);
const hasMessage = computed(() => Boolean(errorMessage.value || props.helper));
const changeOnlyInputTypes = new Set([
  'checkbox',
  'radio',
  'file',
  'range',
  'color',
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
]);
let initialValue: unknown;
let validationSequence = 0;

const field: RegisteredFormField = {
  id: Symbol('ky-form-field'),
  name,
  validate,
  reset,
  clearValidate,
  focus,
  scrollIntoView,
};

provide(FORM_ITEM_KEY, {
  controlId,
  messageId,
  errorMessage,
  hasMessage,
  required: isRequired,
  disabled,
  readonly,
});

onMounted(() => {
  captureInitialValue();
  form?.registerField(field);
});

onBeforeUnmount(() => {
  validationSequence += 1;
  form?.unregisterField(field);
});

watch(name, () => {
  captureInitialValue();
  clearValidate();
});

async function validate(trigger?: FormValidateTrigger) {
  if (!form || !props.name) return undefined;
  const fieldName = props.name;
  const rules = trigger
    ? combinedRules.value.filter((rule) => matchesFormTrigger(rule, trigger, triggerFallback.value))
    : combinedRules.value;
  if (trigger && rules.length === 0) return currentError();

  const sequence = ++validationSequence;
  status.value = 'validating';
  const value = getFormValue(form.model.value, fieldName);
  let error: { name: string; message: string } | undefined;

  for (const rule of rules) {
    const message = await validateFormRule(value, rule, fieldName, props.label, form.model.value);
    if (message) {
      error = { name: fieldName, message };
      break;
    }
  }

  // 过期任务仍返回自身快照的结果供调用方判断，但不能覆盖较新的字段状态。
  if (sequence !== validationSequence) return error;
  internalError.value = error?.message ?? '';
  status.value = error ? 'error' : 'success';
  form.emitValidate(fieldName, !error, error?.message);
  return error;
}

function currentError() {
  return props.name && internalError.value
    ? { name: props.name, message: internalError.value }
    : undefined;
}

function captureInitialValue() {
  initialValue =
    props.name && form ? cloneFormValue(getFormValue(form.model.value, props.name)) : undefined;
}

function reset() {
  if (props.name && form) setFormValue(form.model.value, props.name, cloneFormValue(initialValue));
  clearValidate();
}

function clearValidate() {
  validationSequence += 1;
  internalError.value = '';
  status.value = 'idle';
}

function getShellElement() {
  return shellRef.value?.$el instanceof HTMLElement ? shellRef.value.$el : undefined;
}

function focus() {
  const target = getShellElement()?.querySelector<HTMLElement>(
    '[data-ky-field-control]:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  if (!target) return;
  try {
    target.focus({ preventScroll: true });
  } catch {
    target.focus();
  }
}

function scrollIntoView(options?: FormScrollIntoViewOptions) {
  getShellElement()?.scrollIntoView(options ?? { behavior: 'smooth', block: 'center' });
}

function runTriggeredValidation(trigger: FormValidateTrigger) {
  void nextTick().then(() => validate(trigger));
}

function handleInput() {
  runTriggeredValidation('onChange');
}

function handleChange(event: Event) {
  const target = event.target;
  if (target instanceof HTMLSelectElement) {
    runTriggeredValidation('onChange');
    return;
  }
  if (!(target instanceof HTMLInputElement)) return;
  if (changeOnlyInputTypes.has(target.type)) runTriggeredValidation('onChange');
}

function handleFocusout(event: FocusEvent) {
  const nextTarget = event.relatedTarget;
  const shell = getShellElement();
  if (nextTarget instanceof Node && shell?.contains(nextTarget)) return;
  runTriggeredValidation('onBlur');
}
</script>
