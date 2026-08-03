<template>
  <header
    class="ky-system-bar"
    :class="[`ky-system-bar--${theme}`, { 'is-safe-top': safeTop, 'is-sticky': sticky }]"
  >
    <div class="ky-system-bar__inner">
      <button
        v-if="showBack"
        type="button"
        class="ky-system-bar__action"
        aria-label="返回"
        @click="$emit('back')"
      >
        ‹
      </button>
      <span v-else class="ky-system-bar__placeholder" />
      <h1>{{ title }}</h1>
      <div class="ky-system-bar__right"><slot name="right" /></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { SystemBarProps } from './system-bar';

defineOptions({ name: 'KySystemBar' });
// 顶部安全区通过 env() Token 处理，三列网格确保标题保持视觉居中。
withDefaults(defineProps<SystemBarProps>(), { theme: 'light', showBack: true, safeTop: true });
defineEmits<{ back: [] }>();
</script>
