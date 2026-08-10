<template>
  <div class="icon-demo">
    <p class="icon-demo__summary">
      Iconfont 共 {{ iconfontNames.length }} 个图标 · 点击卡片复制名称
    </p>
    <div class="icon-demo__grid">
      <button
        v-for="name in iconfontNames"
        :key="name"
        type="button"
        class="icon-demo__item"
        :class="{ 'is-copied': copiedName === name }"
        :title="`点击复制 ${name}`"
        @click="copyName(name)"
      >
        <KyIcon :name="name" source="iconfont" :size="28" color="var(--ky-color-brand-strong)" />
        <code>{{ name }}</code>
        <span v-if="copiedName === name" class="icon-demo__hint" aria-live="polite">已复制</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyIcon, { iconfontNames } from '../index';

const copiedName = ref<string | null>(null);
let resetTimer: ReturnType<typeof setTimeout> | null = null;

async function copyName(name: string) {
  let success = false;
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(name);
      success = true;
    } catch {
      success = fallbackCopy(name);
    }
  } else {
    success = fallbackCopy(name);
  }
  if (!success) return;
  copiedName.value = name;
  if (resetTimer) clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    copiedName.value = null;
  }, 1200);
}

function fallbackCopy(text: string) {
  if (typeof document === 'undefined') return false;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}
</script>

<style scoped lang="less">
.icon-demo {
  display: grid;
  gap: 12px;
}

.icon-demo__summary {
  margin: 0;
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.icon-demo__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.icon-demo__item {
  position: relative;
  display: grid;
  gap: 8px;
  min-width: 0;
  place-items: center;
  padding: 14px 8px;
  text-align: center;
  font: inherit;
  color: inherit;
  cursor: pointer;
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.icon-demo__item:hover {
  border-color: var(--ky-color-brand);
}

.icon-demo__item:active {
  transform: scale(0.98);
}

.icon-demo__item.is-copied {
  border-color: var(--ky-color-brand);
  background: var(--ky-color-brand-soft, rgba(8, 121, 90, 0.08));
}

.icon-demo__item code {
  max-width: 100%;
  overflow: hidden;
  color: var(--ky-color-text-secondary);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-demo__hint {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 2px 6px;
  font-size: 10px;
  color: var(--ky-color-brand-strong, #08795a);
  background: var(--ky-color-surface, #fff);
  border: 1px solid var(--ky-color-brand, #08795a);
  border-radius: 999px;
}
</style>
