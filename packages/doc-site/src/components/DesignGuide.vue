<template>
  <article class="design-page">
    <header class="design-page__intro">
      <span class="eyebrow">DESIGN SYSTEM</span>
      <p>Kylin UI 的视觉、交互与工程实现约束。</p>
    </header>
    <div class="design-page__content markdown-body" v-html="html" />
  </article>
</template>

<script setup lang="ts">
import designDocument from '../../../../design.md?raw';
import { renderMarkdown } from '../markdown';

const html = renderMarkdown(designDocument);
</script>
