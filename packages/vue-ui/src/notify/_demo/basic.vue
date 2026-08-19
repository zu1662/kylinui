<template>
  <div class="notify-demo">
    <section class="notify-demo__section">
      <h4>通知类型</h4>
      <div class="notify-demo__list">
        <button type="button" @click="showPrimaryNotify('主要通知内容')">主要通知</button>
        <button type="button" @click="showSuccessNotify('操作已成功完成')">成功通知</button>
        <button type="button" @click="showWarningNotify('当前网络连接不稳定')">警告通知</button>
        <button type="button" @click="showDangerNotify('提交失败，请稍后重试')">危险通知</button>
      </div>
    </section>

    <section class="notify-demo__section">
      <h4>展示方式</h4>
      <div class="notify-demo__list">
        <button type="button" @click="showBottomNotify">底部展示</button>
        <button type="button" @click="showClosableNotify">常驻并允许关闭</button>
        <button type="button" @click="showTextNotify">隐藏图标</button>
      </div>
    </section>

    <section class="notify-demo__section">
      <h4>动态更新</h4>
      <div class="notify-demo__list">
        <button type="button" @click="showProgressNotify">更新通知内容</button>
      </div>
    </section>

    <section class="notify-demo__section">
      <h4>使用 Notify 组件</h4>
      <div class="notify-demo__list">
        <button type="button" @click="componentVisible = true">展示带操作的通知</button>
      </div>
      <KyNotify v-model:show="componentVisible" type="warning" :duration="0">
        请先完成身份验证
        <template #action="{ close }">
          <button class="notify-demo__action" type="button" @click.stop="close">知道了</button>
        </template>
      </KyNotify>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import KyNotify, {
  closeNotify,
  showDangerNotify,
  showNotify,
  showPrimaryNotify,
  showSuccessNotify,
  showWarningNotify,
} from '../index';

const componentVisible = ref(false);
let progressTimer: ReturnType<typeof setInterval> | undefined;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

function showBottomNotify() {
  showNotify({ message: '下载任务已加入队列', position: 'bottom', type: 'success' });
}

function showClosableNotify() {
  showNotify({
    message: '系统将在今晚 23:00 进行维护',
    duration: 0,
    closeable: true,
    type: 'warning',
  });
}

function showTextNotify() {
  showNotify({ message: '这是一条纯文本通知', showIcon: false });
}

function showProgressNotify() {
  if (progressTimer) clearInterval(progressTimer);
  if (closeTimer) clearTimeout(closeTimer);
  const notify = showNotify({ message: '正在同步 0%', duration: 0 });
  let progress = 0;
  progressTimer = setInterval(() => {
    progress += 25;
    notify.message = `正在同步 ${progress}%`;
    if (progress < 100) return;
    clearInterval(progressTimer);
    progressTimer = undefined;
    closeTimer = setTimeout(() => {
      closeTimer = undefined;
      closeNotify();
    }, 600);
  }, 400);
}

onBeforeUnmount(() => {
  if (progressTimer) clearInterval(progressTimer);
  if (closeTimer) clearTimeout(closeTimer);
  closeNotify();
});
</script>

<style scoped lang="less">
.notify-demo {
  display: grid;
  gap: var(--ky-space-4);
}

.notify-demo__section {
  overflow: hidden;
  background: var(--ky-color-surface);
  border-radius: var(--ky-radius-lg);
}

.notify-demo__section h4 {
  margin: 0;
  padding: var(--ky-space-4);
  font-size: var(--ky-font-size-body);
  color: var(--ky-color-text-secondary);
}

.notify-demo__list {
  display: grid;
}

.notify-demo__list button {
  padding: 14px var(--ky-space-4);
  font: inherit;
  color: var(--ky-color-text-primary);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-top: 1px solid var(--ky-color-divider);
}

.notify-demo__list button::after {
  float: right;
  color: var(--ky-color-text-tertiary);
  content: '›';
}

.notify-demo__action {
  padding: 4px 8px;
  font: inherit;
  font-weight: var(--ky-font-semibold);
  color: inherit;
  cursor: pointer;
  background: color-mix(in srgb, currentcolor 12%, transparent);
  border: 0;
  border-radius: var(--ky-radius-pill);
}
</style>
