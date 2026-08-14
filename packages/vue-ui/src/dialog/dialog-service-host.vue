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
  const instanceId = dialogServiceState.instanceId;
  try {
    const result = dialogServiceState.options.onConfirm?.();
    if (result instanceof Promise) {
      dialogServiceState.loading = true;
      await result;
    }
    // 等待期间可能通过 showDialog 打开了新的实例，只关闭本次实例，避免串台关闭新弹窗。
    if (dialogServiceState.instanceId !== instanceId) return;
    closeDialog();
  } finally {
    if (dialogServiceState.instanceId === instanceId) dialogServiceState.loading = false;
  }
}

function cancel() {
  dialogServiceState.options.onCancel?.();
  closeDialog();
}
</script>
