<template>
  <div
    class="ky-field"
    :class="{
      'is-error': Boolean(error),
      'is-disabled': disabled,
      'is-embedded': embedded,
    }"
  >
    <label v-if="!embedded && label" class="ky-field__label" :for="controlId">
      {{ label }}
      <span v-if="required" class="ky-field__required" aria-hidden="true">*</span>
    </label>
    <slot name="control" />
    <div v-if="(!embedded && (error || helper)) || showExtra" class="ky-field__footer">
      <span
        v-if="!embedded && (error || helper)"
        :id="messageId"
        class="ky-field__message"
        :aria-live="error ? 'polite' : undefined"
      >
        {{ error || helper }}
      </span>
      <span v-if="showExtra" class="ky-field__extra"><slot name="extra" /></span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'KyFieldShell' });

withDefaults(
  defineProps<{
    label?: string;
    helper?: string;
    error?: string;
    controlId?: string;
    messageId?: string;
    required?: boolean;
    disabled?: boolean;
    embedded?: boolean;
    showExtra?: boolean;
  }>(),
  {
    label: undefined,
    helper: undefined,
    error: undefined,
    controlId: undefined,
    messageId: undefined,
  },
);
</script>
