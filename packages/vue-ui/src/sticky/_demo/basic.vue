<template>
  <div class="sticky-demo">
    <p class="sticky-demo__tip">请在下方区域上下滚动，观察不同边界下的粘性效果。</p>

    <div class="sticky-demo__scroller" tabindex="0" aria-label="Sticky 示例滚动区域">
      <h3 class="sticky-demo__title">基础用法</h3>
      <KySticky class="sticky-demo__sticky sticky-demo__sticky--start">
        <KyButton size="small">基础用法</KyButton>
      </KySticky>

      <div class="sticky-demo__space sticky-demo__space--medium" />
      <h3 class="sticky-demo__title">吸顶距离</h3>
      <KySticky :offset="50" class="sticky-demo__sticky sticky-demo__sticky--center">
        <KyButton size="small" variant="gradient">吸顶距离 50px</KyButton>
      </KySticky>

      <div class="sticky-demo__space sticky-demo__space--large" />
      <h3 class="sticky-demo__title">滚动容器</h3>
      <div class="sticky-demo__container" tabindex="0" aria-label="Sticky 独立滚动容器示例">
        <div class="sticky-demo__container-lead">在容器内继续向下滚动</div>
        <KySticky :offset="8" class="sticky-demo__sticky sticky-demo__sticky--end">
          <KyButton size="small" variant="secondary">容器内吸顶</KyButton>
        </KySticky>
        <div class="sticky-demo__container-space" />
      </div>

      <div class="sticky-demo__space sticky-demo__space--large" />
      <h3 class="sticky-demo__title">吸底距离</h3>
      <div class="sticky-demo__bottom-lead" />
      <KySticky
        position="bottom"
        :offset="50"
        class="sticky-demo__sticky sticky-demo__sticky--start"
      >
        <KyButton size="small">吸底距离 50px</KyButton>
      </KySticky>
      <div class="sticky-demo__bottom-tail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import KyButton from '../../button';
import KySticky from '../index';
</script>

<style scoped>
.sticky-demo {
  display: grid;
  gap: var(--ky-space-3);
  width: 100%;
}

.sticky-demo__tip {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  line-height: 1.6;
  color: var(--ky-color-text-secondary);
}

.sticky-demo__scroller,
.sticky-demo__container {
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  background: var(--ky-color-page-bg);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-lg);
}

.sticky-demo__scroller {
  height: 480px;
  padding: var(--ky-space-4) 0;
}

.sticky-demo__title {
  padding: 0 var(--ky-space-4) var(--ky-space-3);
  margin: 0;
  font-size: var(--ky-font-size-body);
  font-weight: var(--ky-font-medium);
  color: var(--ky-color-text-primary);
}

.sticky-demo__sticky {
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: var(--ky-space-1) var(--ky-space-3);
  background: var(--ky-color-page-bg);
}

.sticky-demo__sticky--start {
  justify-content: flex-start;
}

.sticky-demo__sticky--center {
  justify-content: center;
}

.sticky-demo__sticky--end {
  justify-content: flex-end;
}

.sticky-demo__space--medium {
  height: 180px;
}

.sticky-demo__space--large {
  height: 220px;
}

.sticky-demo__container {
  position: relative;
  z-index: 0;
  height: 180px;
  margin: 0 var(--ky-space-4);
  background: var(--ky-color-surface);
}

.sticky-demo__container-lead {
  height: 72px;
  padding: var(--ky-space-4);
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}

.sticky-demo__container-space {
  height: 260px;
}

.sticky-demo__bottom-lead {
  height: 180px;
}

.sticky-demo__bottom-tail {
  height: 220px;
}
</style>
