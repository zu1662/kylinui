<template>
  <div class="sticky-usage">
    <header class="sticky-usage__intro">
      <span class="sticky-usage__eyebrow">LIVE SCROLL</span>
      <strong>滚动查看粘性边界</strong>
      <p>右侧配置会实时作用于下方内容，固定状态变化时同步更新提示。</p>
    </header>

    <div
      ref="scroller"
      class="sticky-usage__scroller"
      tabindex="0"
      aria-label="Sticky 配置预览滚动区域"
    >
      <div class="sticky-usage__cover">
        <span>SCROLL LAB</span>
        <strong>{{ positionLabel }}</strong>
        <small>{{ offsetLabel }} · 层级 {{ zIndexLabel }}</small>
      </div>

      <KySticky v-if="position === 'top'" v-bind="configProps" @change="stuck = $event">
        <div class="sticky-usage__bar" :class="{ 'is-stuck': stuck }" aria-live="polite">
          <span class="sticky-usage__status" aria-hidden="true" />
          <div>
            <strong>{{ stuck ? '已到达固定边界' : '等待进入固定区域' }}</strong>
            <small>{{ boundaryDescription }}</small>
          </div>
          <span class="sticky-usage__badge">{{ stuck ? 'FIXED' : 'SCROLL' }}</span>
        </div>
      </KySticky>

      <section class="sticky-usage__content" aria-label="模拟内容">
        <article v-for="item in contentItems" :key="item.title" class="sticky-usage__card">
          <span>{{ item.index }}</span>
          <div>
            <strong>{{ item.title }}</strong>
            <p>{{ item.description }}</p>
          </div>
        </article>
      </section>

      <KySticky v-if="position === 'bottom'" v-bind="configProps" @change="stuck = $event">
        <div class="sticky-usage__bar" :class="{ 'is-stuck': stuck }" aria-live="polite">
          <span class="sticky-usage__status" aria-hidden="true" />
          <div>
            <strong>{{ stuck ? '已到达固定边界' : '等待进入固定区域' }}</strong>
            <small>{{ boundaryDescription }}</small>
          </div>
          <span class="sticky-usage__badge">{{ stuck ? 'FIXED' : 'SCROLL' }}</span>
        </div>
      </KySticky>

      <div class="sticky-usage__tail">
        <span>END OF CONTENT</span>
        <strong>继续反向滚动可观察取消固定</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import KySticky from '../index';

const props = defineProps<{ configProps: Record<string, unknown> }>();
const scroller = ref<HTMLElement | null>(null);
const stuck = ref(false);
const contentItems = [
  { index: '01', title: '实时参数', description: '切换固定位置、边界距离和层级，预览会立即响应。' },
  {
    index: '02',
    title: '容器边界',
    description: '组件自动识别当前滚动区域，并以其内边界计算固定位置。',
  },
  {
    index: '03',
    title: '状态反馈',
    description: '固定状态变化时，提示条会更新颜色、文案和状态标记。',
  },
  {
    index: '04',
    title: '反向验证',
    description: '滚动回到起点或终点，检查内容是否正确退出固定状态。',
  },
];

const position = computed(() => (props.configProps.position === 'bottom' ? 'bottom' : 'top'));
const positionLabel = computed(() =>
  position.value === 'bottom' ? '底部固定模式' : '顶部固定模式',
);
const offsetLabel = computed(() => `边界距离 ${String(props.configProps.offset ?? 0)}px`);
const zIndexLabel = computed(() => String(props.configProps.zIndex ?? 20));
const boundaryDescription = computed(() =>
  position.value === 'bottom'
    ? `距离容器底部 ${String(props.configProps.offset ?? 0)}px`
    : `距离容器顶部 ${String(props.configProps.offset ?? 0)}px`,
);

watch(
  () => props.configProps.position,
  async () => {
    stuck.value = false;
    await nextTick();
    if (!scroller.value) return;
    scroller.value.scrollTop = 0;
  },
);
</script>

<style scoped>
.sticky-usage {
  display: grid;
  gap: var(--ky-space-3);
  width: 100%;
}

.sticky-usage__intro {
  display: grid;
  gap: var(--ky-space-1);
  padding: var(--ky-space-4);
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.sticky-usage__eyebrow {
  font-size: var(--ky-font-size-caption);
  font-weight: var(--ky-font-semibold);
  color: var(--ky-color-brand-strong);
  letter-spacing: 0.12em;
}

.sticky-usage__intro strong {
  font-size: var(--ky-font-size-body-strong);
  color: var(--ky-color-text-primary);
}

.sticky-usage__intro p {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  line-height: 1.6;
  color: var(--ky-color-text-secondary);
}

.sticky-usage__scroller {
  height: 420px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  background: var(--ky-color-page-bg);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.sticky-usage__cover {
  display: grid;
  align-content: end;
  min-height: 176px;
  padding: var(--ky-space-5);
  color: var(--ky-color-on-brand);
  background: var(--ky-gradient-brand);
}

.sticky-usage__cover span,
.sticky-usage__cover small {
  font-size: var(--ky-font-size-assist);
  opacity: 0.78;
}

.sticky-usage__cover span {
  font-weight: var(--ky-font-semibold);
  letter-spacing: 0.12em;
}

.sticky-usage__cover strong {
  margin: var(--ky-space-2) 0 var(--ky-space-1);
  font-size: var(--ky-font-size-page-title);
}

.sticky-usage__bar {
  display: flex;
  gap: var(--ky-space-3);
  align-items: center;
  min-height: 64px;
  padding: var(--ky-space-3) var(--ky-space-4);
  color: var(--ky-color-text-primary);
  background: var(--ky-color-surface);
  border-bottom: 1px solid var(--ky-color-divider);
  transition:
    color var(--ky-duration-fast),
    background var(--ky-duration-fast),
    border-color var(--ky-duration-fast);
}

.sticky-usage__bar.is-stuck {
  color: var(--ky-color-on-brand);
  background: var(--ky-color-brand-strong);
  border-color: transparent;
}

.sticky-usage__status {
  flex: none;
  width: 10px;
  height: 10px;
  background: var(--ky-color-warning);
  border: 2px solid var(--ky-color-surface);
  border-radius: var(--ky-radius-pill);
  box-shadow: 0 0 0 3px var(--ky-color-warning-soft);
}

.sticky-usage__bar.is-stuck .sticky-usage__status {
  background: var(--ky-color-on-brand);
  box-shadow: 0 0 0 3px var(--ky-color-surface-42);
}

.sticky-usage__bar > div {
  display: grid;
  flex: 1;
  gap: var(--ky-space-1);
  min-width: 0;
}

.sticky-usage__bar strong,
.sticky-usage__bar small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sticky-usage__bar strong {
  font-size: var(--ky-font-size-body);
}

.sticky-usage__bar small {
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}

.sticky-usage__bar.is-stuck small {
  color: var(--ky-color-surface-58);
}

.sticky-usage__badge {
  flex: none;
  padding: var(--ky-space-1) var(--ky-space-2);
  font-size: var(--ky-font-size-caption);
  font-weight: var(--ky-font-semibold);
  color: var(--ky-color-brand-strong);
  letter-spacing: 0.08em;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-pill);
}

.sticky-usage__bar.is-stuck .sticky-usage__badge {
  color: var(--ky-color-brand-strong);
  background: var(--ky-color-surface);
}

.sticky-usage__content {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-4);
}

.sticky-usage__card {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: var(--ky-space-3);
  align-items: start;
  padding: var(--ky-space-4);
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}

.sticky-usage__card > span {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  font-size: var(--ky-font-size-assist);
  font-weight: var(--ky-font-semibold);
  color: var(--ky-color-brand-strong);
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-md);
}

.sticky-usage__card strong {
  font-size: var(--ky-font-size-body);
  color: var(--ky-color-text-primary);
}

.sticky-usage__card p {
  margin: var(--ky-space-1) 0 0;
  font-size: var(--ky-font-size-assist);
  line-height: 1.6;
  color: var(--ky-color-text-secondary);
}

.sticky-usage__tail {
  display: grid;
  gap: var(--ky-space-2);
  min-height: 200px;
  padding: var(--ky-space-5);
  color: var(--ky-color-text-secondary);
  background: var(--ky-color-subtle-bg);
  border-top: 1px solid var(--ky-color-divider);
}

.sticky-usage__tail span {
  font-size: var(--ky-font-size-caption);
  font-weight: var(--ky-font-semibold);
  color: var(--ky-color-brand-strong);
  letter-spacing: 0.12em;
}

.sticky-usage__tail strong {
  font-size: var(--ky-font-size-body);
  color: var(--ky-color-text-primary);
}
</style>
