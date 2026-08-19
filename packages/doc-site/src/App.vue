<template>
  <div class="site-shell">
    <header class="topbar">
      <button
        class="mobile-menu"
        type="button"
        aria-label="打开组件导航"
        @click="menuOpen = !menuOpen"
      >
        ☰
      </button>
      <a class="brand" href="#button">
        <span class="brand__mark">K</span>
        <span>
          <strong>Kylin UI</strong>
          <small>{{ currentTheme.label }} · Vue 3 Mobile</small>
        </span>
      </a>
      <div class="topbar__actions">
        <button
          class="theme-switch"
          type="button"
          :aria-label="`当前主题：${currentTheme.label}。点击切换至${nextTheme.label}`"
          :title="`切换至${nextTheme.label}`"
          @click="cycleTheme"
        >
          <span class="theme-switch__swatch" aria-hidden="true" />
          <span class="theme-switch__copy">
            <small>主题</small>
            <strong>{{ currentTheme.label }}</strong>
          </span>
          <span class="theme-switch__arrow" aria-hidden="true">↻</span>
        </button>
        <div class="topbar__meta">
          <span>v0.1.0</span>
          <a :href="designDocumentUrl" target="_blank" rel="noreferrer">设计规范</a>
        </div>
      </div>
    </header>

    <aside class="sidebar" :class="{ 'is-open': menuOpen }">
      <div class="sidebar__intro">
        <span class="eyebrow">COMPONENTS</span>
        <strong>移动端组件</strong>
        <p>基于设计 Token、可访问语义和配置驱动示例构建。</p>
      </div>
      <nav aria-label="组件导航">
        <section v-for="group in groups" :key="group">
          <h2>{{ group }}</h2>
          <a
            v-for="item in grouped[group]"
            :key="item.slug"
            :href="'#' + item.slug"
            :class="{ 'is-active': item.slug === current.slug }"
            @click="select(item.slug)"
          >
            <span>{{ item.title }}</span>
            <small>{{ item.slug }}</small>
          </a>
        </section>
      </nav>
    </aside>

    <main>
      <ComponentPage :entry="current" :index="currentIndex" :theme="theme" />
    </main>
    <button
      v-if="menuOpen"
      class="menu-mask"
      type="button"
      aria-label="关闭组件导航"
      @click="menuOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { KYLIN_THEME_OPTIONS, getKylinTheme, setKylinTheme, type KylinTheme } from '@kylinui/vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import ComponentPage from './components/ComponentPage.vue';
import { components } from './registry';

const THEME_STORAGE_KEY = 'kylin-ui-theme';
const designDocumentUrl = `${import.meta.env.BASE_URL}design.md`;
const menuOpen = ref(false);
const theme = ref<KylinTheme>(getKylinTheme());
const currentThemeIndex = computed(() =>
  Math.max(
    0,
    KYLIN_THEME_OPTIONS.findIndex((item) => item.value === theme.value),
  ),
);
const currentTheme = computed(() => KYLIN_THEME_OPTIONS[currentThemeIndex.value]);
const nextTheme = computed(
  () => KYLIN_THEME_OPTIONS[(currentThemeIndex.value + 1) % KYLIN_THEME_OPTIONS.length],
);
const hash = ref(window.location.hash.slice(1) || components[0].slug);
const currentIndex = computed(() =>
  Math.max(
    0,
    components.findIndex((item) => item.slug === hash.value),
  ),
);
const current = computed(() => components[currentIndex.value]);
const groups = [...new Set(components.map((item) => item.group))];
const grouped = Object.fromEntries(
  groups.map((group) => [group, components.filter((item) => item.group === group)]),
);

// 统一响应浏览器前进、后退以及直接修改 hash 的场景。
function syncHash() {
  hash.value = window.location.hash.slice(1) || components[0].slug;
  menuOpen.value = false;
  window.scrollTo({ top: 0 });
}

function select(slug: string) {
  hash.value = slug;
  menuOpen.value = false;
}

/** 单击按预设顺序轮换主题，并持久化用户选择。 */
function cycleTheme() {
  theme.value = nextTheme.value.value;
  setKylinTheme(theme.value);
  window.localStorage.setItem(THEME_STORAGE_KEY, theme.value);
}

onMounted(() => window.addEventListener('hashchange', syncHash));
onBeforeUnmount(() => window.removeEventListener('hashchange', syncHash));
</script>
