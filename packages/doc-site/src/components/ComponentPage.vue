<template>
  <article class="component-page">
    <header class="component-hero">
      <div>
        <span class="eyebrow">MOBILE COMPONENT</span>
        <h1>{{ entry.title }}</h1>
        <p>{{ entry.config.description }}</p>
      </div>
      <span class="component-hero__index">{{ String(index + 1).padStart(2, '0') }}</span>
    </header>

    <ConfigPlayground :entry="entry" :theme="theme" />

    <section class="doc-section">
      <div class="doc-section__main markdown-body" v-html="html" />
      <aside class="demo-card">
        <div class="demo-card__head">
          <span>基础示例</span>
          <small>Touch Preview</small>
        </div>
        <div class="demo-card__body">
          <MobileSimulator compact :src="demoPreviewUrl" :title="`${entry.title}基础示例`" />
        </div>
      </aside>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { KylinTheme } from '@kylin-design/vue-ui';
import { computed } from 'vue';
import { renderMarkdown } from '../markdown';
import type { ComponentEntry } from '../types';
import { createPreviewUrl } from '../preview';
import ConfigPlayground from './ConfigPlayground.vue';
import MobileSimulator from './MobileSimulator.vue';

const props = defineProps<{ entry: ComponentEntry; index: number; theme: KylinTheme }>();
// Markdown 文档与配置实验台分离，后续可以替换成独立的文档路由页面。
const html = computed(() => renderMarkdown(props.entry.doc));
const demoPreviewUrl = computed(() => createPreviewUrl(props.entry.slug, 'demo', props.theme));
</script>
