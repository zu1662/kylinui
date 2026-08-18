<template>
  <form
    class="ky-form"
    novalidate
    :aria-busy="submitting"
    @submit.prevent="handleSubmit"
    @reset.prevent="resetFields()"
  >
    <slot
      :submitting="submitting"
      :submit="submit"
      :validate="validate"
      :reset-fields="resetFields"
      :clear-validate="clearValidate"
    />
  </form>
</template>

<script setup lang="ts">
import { computed, nextTick, provide, ref } from 'vue';
import { FORM_KEY, type RegisteredFormField } from './context';
import type {
  FormModel,
  FormProps,
  FormScrollIntoViewOptions,
  FormValidateError,
  FormValidateResult,
} from './form';

defineOptions({ name: 'KyForm' });

const props = withDefaults(defineProps<FormProps>(), {
  rules: () => ({}),
  validateTrigger: () => ['onBlur', 'onSubmit'],
  scrollToError: true,
  focusToError: true,
});
const emit = defineEmits<{
  submit: [values: FormModel];
  failed: [result: FormValidateResult];
  validate: [name: string, valid: boolean, message?: string];
  submitError: [error: unknown];
}>();

const fields = new Set<RegisteredFormField>();
const internalSubmitting = ref(false);
const submitting = computed(() => internalSubmitting.value);
let activeSubmit: Promise<FormValidateResult> | undefined;

provide(FORM_KEY, {
  model: computed(() => props.model),
  rules: computed(() => props.rules),
  validateTrigger: computed(() => props.validateTrigger),
  disabled: computed(() => props.disabled ?? false),
  readonly: computed(() => props.readonly ?? false),
  registerField: (field) => fields.add(field),
  unregisterField: (field) => fields.delete(field),
  emitValidate: (name, valid, message) => emit('validate', name, valid, message),
});

function selectFields(names?: string | string[]) {
  if (!names) return [...fields];
  const selected = new Set(Array.isArray(names) ? names : [names]);
  return [...fields].filter((field) => field.name.value && selected.has(field.name.value));
}

async function validate(names?: string | string[]): Promise<FormValidateResult> {
  const selectedFields = selectFields(names);
  const results = await Promise.all(
    selectedFields.map(async (field) => ({ field, error: await field.validate() })),
  );
  // 动态字段可能在异步校验期间卸载或改名，结算时只采纳仍注册且名称一致的结果。
  const errors = results.flatMap(({ field, error }) =>
    error && fields.has(field) && field.name.value === error.name ? [error] : [],
  );
  return { valid: errors.length === 0, errors, values: props.model };
}

function validateField(name: string) {
  return validate(name);
}

function resetFields(names?: string | string[]) {
  selectFields(names).forEach((field) => field.reset());
}

function clearValidate(names?: string | string[]) {
  selectFields(names).forEach((field) => field.clearValidate());
}

function scrollToField(name: string, options?: FormScrollIntoViewOptions) {
  selectFields(name)[0]?.scrollIntoView(options);
}

async function navigateToFirstError(errors: FormValidateError[]) {
  const first = errors[0];
  if (!first) return;
  const field = selectFields(first.name)[0];
  if (!field) return;
  await nextTick();
  if (props.scrollToError) field.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (props.focusToError) field.focus();
}

function submit() {
  if (activeSubmit) return activeSubmit;

  const task = (async () => {
    internalSubmitting.value = true;
    try {
      const result = await validate();
      if (!result.valid) {
        emit('failed', result);
        await navigateToFirstError(result.errors);
        return result;
      }
      if (props.submitter) await props.submitter(props.model, result);
      emit('submit', props.model);
      return result;
    } catch (error) {
      emit('submitError', error);
      throw error;
    } finally {
      internalSubmitting.value = false;
    }
  })();

  activeSubmit = task;
  const clearActiveTask = () => {
    if (activeSubmit === task) activeSubmit = undefined;
  };
  void task.then(clearActiveTask, clearActiveTask);
  return task;
}

function handleSubmit() {
  void submit().catch(() => undefined);
}

defineExpose({ validate, validateField, resetFields, clearValidate, scrollToField, submit });
</script>
