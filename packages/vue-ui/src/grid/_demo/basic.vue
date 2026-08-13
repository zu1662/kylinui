<template>
  <div class="grid-demo">
    <section class="grid-demo__section">
      <h3 class="grid-demo__title">基础用法</h3>
      <KyGrid>
        <KyGridItem
          v-for="item in basicItems"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
        />
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">自定义列数</h3>
      <KyGrid :column-num="3">
        <KyGridItem v-for="item in sixItems" :key="item.text" :icon="item.icon" :text="item.text" />
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">自定义内容</h3>
      <KyGrid :border="false" :column-num="3" :gutter="8">
        <KyGridItem v-for="(label, index) in customItems" :key="label">
          <div class="grid-demo__art" :class="`grid-demo__art--${index + 1}`">
            <KyIcon name="image-line" source="iconfont" :size="28" />
            <span>{{ label }}</span>
          </div>
        </KyGridItem>
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">正方形格子</h3>
      <KyGrid square>
        <KyGridItem
          v-for="item in eightItems"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
        />
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">格子间距</h3>
      <KyGrid :gutter="10">
        <KyGridItem
          v-for="item in eightItems"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
        />
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">内容横排</h3>
      <KyGrid direction="horizontal" :column-num="3" :icon-size="22">
        <KyGridItem
          v-for="item in horizontalItems"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
        />
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">反转内容</h3>
      <KyGrid reverse :column-num="3">
        <KyGridItem
          v-for="item in horizontalItems"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
        />
      </KyGrid>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">页面导航</h3>
      <KyGrid clickable :column-num="2">
        <KyGridItem icon="home-line" text="返回首页" @click="handleNavigate('首页')" />
        <KyGridItem icon="magnifier" text="访问链接" url="https://github.com" />
      </KyGrid>
      <p class="grid-demo__feedback" aria-live="polite">{{ feedback }}</p>
    </section>

    <section class="grid-demo__section">
      <h3 class="grid-demo__title">徽标提示</h3>
      <KyGrid :column-num="2">
        <KyGridItem icon="home-line" text="待处理" dot />
        <KyGridItem icon="smallbell-line" text="新消息" badge="99+" />
      </KyGrid>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { KyGrid, KyGridItem } from '../index';
import KyIcon from '../../icon';

const basicItems = [
  { icon: 'home-line', text: '首页' },
  { icon: 'calendar-line', text: '日程' },
  { icon: 'smallbell-line', text: '消息' },
  { icon: 'mine-line', text: '我的' },
];
const sixItems = [
  ...basicItems,
  { icon: 'enshrine-line', text: '收藏' },
  { icon: 'general-line', text: '设置' },
];
const eightItems = [
  ...sixItems,
  { icon: 'camera-line', text: '相机' },
  { icon: 'more-line', text: '更多' },
];
const horizontalItems = [
  { icon: 'phone-line', text: '联系' },
  { icon: 'position-line', text: '位置' },
  { icon: 'share-line', text: '分享' },
];
const customItems = ['相册', '旅行', '灵感'];
const feedback = ref('点击宫格项查看反馈');

function handleNavigate(target: string) {
  feedback.value = `已点击“${target}”`;
}
</script>

<style scoped>
.grid-demo {
  display: grid;
  gap: var(--ky-space-6);
  width: 100%;
}

.grid-demo__section {
  display: grid;
  gap: var(--ky-space-3);
}

.grid-demo__title {
  margin: 0;
  font-size: var(--ky-font-size-body);
  font-weight: 600;
  color: var(--ky-color-text-secondary);
}

.grid-demo__art {
  display: grid;
  gap: var(--ky-space-2);
  min-height: 96px;
  color: var(--ky-color-text-secondary);
  place-content: center;
  place-items: center;
  background: var(--ky-color-subtle-bg);
  border-radius: var(--ky-radius-md);
}

.grid-demo__art--1 {
  color: var(--ky-color-brand-strong);
  background: var(--ky-color-brand-soft);
}

.grid-demo__art--2 {
  color: var(--ky-color-warning);
  background: var(--ky-color-warning-soft);
}

.grid-demo__art--3 {
  color: var(--ky-color-success);
  background: var(--ky-color-success-soft);
}

.grid-demo__feedback {
  min-height: 18px;
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-tertiary);
  text-align: center;
}
</style>
