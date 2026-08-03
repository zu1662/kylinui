<template>
  <section class="ky-form-card" :class="{ 'is-borderless': !bordered }">
    <header v-if="title || description || $slots.header">
      <slot name="header"><div><h2 v-if="title">{{ title }}</h2><p v-if="description">{{ description }}</p></div></slot>
      <slot name="action" />
    </header>
    <div class="ky-form-card__body"><slot /></div>
  </section>
</template>

<script setup lang="ts">
import type { FormCardProps } from './form-card';

defineOptions({ name: 'KyFormCard' });
// 卡片只负责分组和层级，不接管内部字段的校验与提交状态。
withDefaults(defineProps<FormCardProps>(), { bordered: true });
</script>
