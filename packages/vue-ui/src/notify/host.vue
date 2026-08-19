<template>
  <KyNotify
    v-for="item in notifyQueue"
    :key="item.id"
    v-bind="item.options"
    :show="item.show"
    @update:show="setNotifyVisible(item.id, $event)"
    @opened="handleNotifyOpened(item.id)"
    @closed="handleNotifyClosed(item.id)"
  />
</template>

<script setup lang="ts">
import KyNotify from './notify.vue';
import { handleNotifyClosed, handleNotifyOpened, notifyQueue, setNotifyVisible } from './service';

defineOptions({ name: 'KyNotifyHost' });
</script>
