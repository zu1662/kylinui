<template>
  <div class="toast-demo">
    <section class="toast-demo__section">
      <h4>基础用法</h4>
      <div class="toast-demo__list">
        <button type="button" @click="showToast('提示内容')">文字提示</button>
        <button
          type="button"
          @click="showLoadingToast({ message: '加载中...', forbidClick: true })"
        >
          加载提示
        </button>
        <button type="button" @click="showSuccessToast('成功文案')">成功提示</button>
        <button type="button" @click="showFailToast('失败文案')">失败提示</button>
      </div>
    </section>

    <section class="toast-demo__section">
      <h4>自定义图标</h4>
      <div class="toast-demo__list">
        <button type="button" @click="showIconToast">自定义图标</button>
        <button type="button" @click="showImageToast">自定义图片</button>
        <button
          type="button"
          @click="showLoadingToast({ message: '加载中...', loadingType: 'spinner' })"
        >
          自定义加载图标
        </button>
      </div>
    </section>

    <section class="toast-demo__section">
      <h4>自定义位置</h4>
      <div class="toast-demo__list">
        <button type="button" @click="showToast({ message: '顶部展示', position: 'top' })">
          顶部展示
        </button>
        <button type="button" @click="showToast({ message: '底部展示', position: 'bottom' })">
          底部展示
        </button>
      </div>
    </section>

    <section class="toast-demo__section">
      <h4>文字换行方式</h4>
      <div class="toast-demo__list">
        <button type="button" @click="showWordBreakToast('break-all')">换行时截断单词</button>
        <button type="button" @click="showWordBreakToast('break-word')">换行时不截断单词</button>
      </div>
    </section>

    <section class="toast-demo__section">
      <h4>动态更新提示</h4>
      <div class="toast-demo__list">
        <button type="button" @click="showCountdown">动态更新提示</button>
      </div>
    </section>

    <section class="toast-demo__section">
      <h4>使用 Toast 组件</h4>
      <div class="toast-demo__list">
        <button type="button" @click="componentVisible = true">自定义内容</button>
      </div>
      <KyToast v-model:show="componentVisible" :duration="0" class-name="toast-demo__custom-toast">
        <template #message>
          <div class="toast-demo__custom-content">
            <KyIcon name="like" source="iconfont" :size="28" />
            <strong>已收藏到常用</strong>
          </div>
        </template>
      </KyToast>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import KyIcon from '../../icon';
import KyToast, {
  closeToast,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  showToast,
  type ToastWordBreak,
} from '../index';

const componentVisible = ref(false);
const customImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%2306c584'/%3E%3Cpath d='M18 33l9 9 19-21' fill='none' stroke='white' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
let countdownTimer: ReturnType<typeof setInterval> | undefined;

function showIconToast() {
  showToast({ message: '自定义图标', icon: 'like' });
}

function showImageToast() {
  showToast({ message: '自定义图片', icon: customImage });
}

function showWordBreakToast(wordBreak: ToastWordBreak) {
  showToast({
    message: 'This message contains an incomprehensibilities long word.',
    wordBreak,
  });
}

function showCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  const toast = showLoadingToast({
    duration: 0,
    forbidClick: true,
    message: '倒计时 3 秒',
  });
  let second = 3;
  countdownTimer = setInterval(() => {
    second -= 1;
    if (second > 0) {
      toast.message = `倒计时 ${second} 秒`;
      return;
    }
    clearInterval(countdownTimer);
    countdownTimer = undefined;
    closeToast();
  }, 1000);
}

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
  closeToast(true);
});
</script>

<style scoped lang="less">
.toast-demo {
  display: grid;
  gap: 16px;
}

.toast-demo__section {
  overflow: hidden;
  background: var(--ky-color-surface);
  border-radius: var(--ky-radius-lg);
}

.toast-demo__section h4 {
  margin: 0;
  padding: 16px;
  font-size: var(--ky-font-size-body);
  color: var(--ky-color-text-secondary);
}

.toast-demo__list {
  display: grid;
}

.toast-demo__list button {
  padding: 14px 16px;
  font: inherit;
  color: var(--ky-color-text-primary);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-top: 1px solid var(--ky-color-divider);
}

.toast-demo__list button::after {
  float: right;
  color: var(--ky-color-text-tertiary);
  content: '›';
}

.toast-demo__custom-content {
  display: grid;
  gap: 10px;
  justify-items: center;
  min-width: 132px;
}
</style>
