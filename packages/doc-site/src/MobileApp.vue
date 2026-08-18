<template>
  <div class="mobile-site">
    <template v-if="!current">
      <header class="mobile-hero">
        <div class="mobile-brand" aria-label="Kylin Design">
          <span class="mobile-brand__mark" aria-hidden="true">K</span>
          <span class="mobile-brand__copy">
            <strong>Kylin Design</strong>
            <small>Vue 3 Mobile Components</small>
          </span>
        </div>
        <h1>组件示例</h1>
        <p>选择组件，直接查看基础示例。</p>
      </header>

      <main class="mobile-home">
        <section v-for="section in groupedComponents" :key="section.group" class="mobile-group">
          <h2>{{ section.group }}</h2>
          <div class="mobile-component-list">
            <a
              v-for="item in section.components"
              :key="item.slug"
              class="mobile-component-link"
              :href="`#${item.slug}`"
            >
              <span>
                <strong>{{ item.title }}</strong>
                <small>{{ item.slug }}</small>
              </span>
              <span class="mobile-component-link__arrow" aria-hidden="true">›</span>
            </a>
          </div>
        </section>
      </main>
    </template>

    <template v-else>
      <header class="mobile-detail-header">
        <button type="button" class="mobile-back" aria-label="返回组件列表" @click="goHome">
          <span aria-hidden="true">‹</span>
        </button>
        <h1>{{ current.title }}</h1>
        <span class="mobile-detail-header__spacer" aria-hidden="true" />
      </header>
      <main class="mobile-detail">
        <section class="mobile-demo" :aria-label="`${current.title}基础示例`">
          <component :is="current.demo" :key="current.slug" />
        </section>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { demoComponents } from './demo-registry';

const activeSlug = ref('');
let homeScrollTop = 0;
let pendingScrollId = 0;
let scrollFrame: number | undefined;
const groupedComponents = [...new Set(demoComponents.map((item) => item.group))].map((group) => ({
  group,
  components: demoComponents.filter((item) => item.group === group),
}));
const current = computed(() => demoComponents.find((item) => item.slug === activeSlug.value));

function readHash() {
  const hash = window.location.hash.slice(1);
  try {
    return decodeURIComponent(hash);
  } catch {
    return hash;
  }
}

function updateDocumentTitle() {
  document.title = current.value
    ? `${current.value.title} - Kylin Design`
    : 'Kylin Design 移动端组件';
}

function scheduleScroll(top: number) {
  const scrollId = ++pendingScrollId;

  if (scrollFrame !== undefined) {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = undefined;
  }

  void nextTick().then(() => {
    if (scrollId !== pendingScrollId) return;

    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = undefined;
      if (scrollId !== pendingScrollId) return;

      window.scrollTo({ top });
    });
  });
}

function syncRoute() {
  const wasHome = !activeSlug.value;
  const slug = readHash();
  const matched = demoComponents.some((item) => item.slug === slug);
  const nextSlug = matched ? slug : '';

  if (wasHome && nextSlug) {
    homeScrollTop = window.scrollY;
  }

  if (slug && !matched) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }

  activeSlug.value = nextSlug;
  updateDocumentTitle();

  if (nextSlug) {
    scheduleScroll(0);
  } else if (!wasHome) {
    scheduleScroll(homeScrollTop);
  }
}

function goHome() {
  window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
  syncRoute();
}

onMounted(() => {
  syncRoute();
  window.addEventListener('hashchange', syncRoute);
});
onBeforeUnmount(() => {
  pendingScrollId += 1;
  if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
  window.removeEventListener('hashchange', syncRoute);
});
</script>
