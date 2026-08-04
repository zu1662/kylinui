<template>
  <KyDialog
    v-model="dialogServiceState.visible"
    v-bind="dialogServiceState.options"
    :loading="dialogServiceState.loading"
    @confirm="confirm"
    @cancel="cancel"
  />
</template>

<script setup lang="ts">
import KyDialog from './dialog.vue';
import { closeDialog, dialogServiceState } from './service';

async function confirm() {
  if (dialogServiceState.loading) return;
  try {
    const result = dialogServiceState.options.onConfirm?.();
    if (result instanceof Promise) {
      dialogServiceState.loading = true;
      await result;
    }
    closeDialog();
  } finally {
    dialogServiceState.loading = false;
  }
}

function cancel() {
  dialogServiceState.options.onCancel?.();
  closeDialog();
}
</script>
