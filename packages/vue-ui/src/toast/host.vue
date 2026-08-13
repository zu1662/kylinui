<template>
  <KyToast
    v-for="item in toastQueue"
    :key="item.id"
    v-bind="item.options"
    :show="item.show"
    :duration="item.options.duration"
    @update:show="setToastVisible(item.id, $event)"
    @opened="handleToastOpened(item.id)"
    @closed="handleToastClosed(item.id)"
  />
</template>

<script setup lang="ts">
import KyToast from './toast.vue';
import { handleToastClosed, handleToastOpened, setToastVisible, toastQueue } from './service';

defineOptions({ name: 'KyToastHost' });
</script>
