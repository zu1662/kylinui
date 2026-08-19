<template>
  <section class="action-sheet-demo">
    <header class="action-sheet-demo__intro">
      <strong>动作面板场景</strong>
      <p>查看操作项状态、选项卡、自定义内容与多层弹窗能力。</p>
    </header>

    <div class="action-sheet-demo__triggers">
      <KyButton block @click="actionsVisible = true">操作项与状态</KyButton>
      <KyButton block variant="secondary" @click="tabsVisible = true">选项卡与双操作</KyButton>
      <KyButton block variant="gradient" @click="customVisible = true">自定义内容</KyButton>
      <KyButton block variant="secondary" @click="promotionVisible = true">透明溢出顶栏</KyButton>
      <KyButton block variant="gradient" @click="nestedParentVisible = true">弹窗内再弹窗</KyButton>
    </div>

    <p class="action-sheet-demo__result" aria-live="polite">{{ feedback }}</p>

    <KyActionSheet
      v-model="actionsVisible"
      title="选择服务操作"
      :actions="actions"
      cancel-text="取消"
      @select="handleActionSelect"
      @cancel="feedback = '已取消操作项选择'"
    />

    <KyActionSheet
      v-model="tabsVisible"
      v-model:active-tab="activeTab"
      title="选择服务方案"
      :tabs="tabs"
      confirm-text="确认方案"
      cancel-text="稍后决定"
      @confirm="confirmPlan"
      @cancel="feedback = '已暂存方案选择'"
    >
      <article class="action-sheet-demo__plan">
        <span class="action-sheet-demo__badge">{{ currentPlan.badge }}</span>
        <strong>{{ currentPlan.title }}</strong>
        <p>{{ currentPlan.description }}</p>
        <ul>
          <li v-for="feature in currentPlan.features" :key="feature">{{ feature }}</li>
        </ul>
      </article>
    </KyActionSheet>

    <KyActionSheet v-model="promotionVisible" :show-close="false" :close-on-swipe="false" height="60vh">
      <template #header>
        <div class="action-sheet-demo__promotion-header">
          <div class="action-sheet-demo__promotion-copy">
            <strong>弹窗头部自定义</strong>
            <span>右侧透明装饰可越过面板顶部展示</span>
          </div>
          <img
            class="action-sheet-demo__promotion-art"
            :src="headerDecorationUrl"
            alt=""
            aria-hidden="true"
          />
        </div>
      </template>

      <article class="action-sheet-demo__promotion-content">
        <p>自定义顶栏负责自身布局，透明图片不会被 Popup 或 Action Sheet 圆角裁剪。</p>
      </article>

      <template #footer>
        <KyButton block @click="promotionVisible = false">下一步</KyButton>
      </template>
    </KyActionSheet>

    <KyActionSheet
      v-model="nestedParentVisible"
      title="管理出行提醒"
      @hide="nestedChildVisible = false"
    >
      <article class="action-sheet-demo__nested-panel">
        <span class="action-sheet-demo__badge">第一层动作面板</span>
        <strong>选择后续操作</strong>
        <p>父级动作面板保持打开，点击按钮后会在其上方继续弹出第二层动作面板。</p>
        <KyButton block variant="secondary" @click="nestedChildVisible = true">
          打开第二层动作面板
        </KyButton>
      </article>

      <KyActionSheet
        v-model="nestedChildVisible"
        title="选择提醒方式"
        height="60vh"
        :actions="nestedActions"
        cancel-text="返回上一层"
        @select="handleNestedSelect"
      />
    </KyActionSheet>

    <KyActionSheet v-model="customVisible" :show-close="false" height="62vh">
      <template #header>
        <div class="action-sheet-demo__custom-header">
          <strong>消息接收方式</strong>
          <span>自定义头部、内容与底部操作区</span>
        </div>
      </template>

      <div class="action-sheet-demo__channels">
        <button
          v-for="channel in channels"
          :key="channel.value"
          type="button"
          :class="{ 'is-selected': selectedChannel === channel.value }"
          :aria-pressed="selectedChannel === channel.value"
          @click="selectedChannel = channel.value"
        >
          <span>
            <strong>{{ channel.name }}</strong>
            <small>{{ channel.description }}</small>
          </span>
          <span
            class="action-sheet-demo__check"
            :class="{ 'is-selected': selectedChannel === channel.value }"
            aria-hidden="true"
          >
            {{ selectedChannel === channel.value ? '✓' : '' }}
          </span>
        </button>
      </div>

      <template #footer>
        <KyButton block variant="secondary" @click="cancelCustom">取消</KyButton>
        <KyButton block @click="confirmChannel">保存设置</KyButton>
      </template>
    </KyActionSheet>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import KyButton from '../../button';
import headerDecorationUrl from './assets/header-decoration.png';
import KyActionSheet from '../index';
import type { ActionSheetAction } from '../action-sheet';

const actionsVisible = ref(false);
const tabsVisible = ref(false);
const customVisible = ref(false);
const promotionVisible = ref(false);
const nestedParentVisible = ref(false);
const nestedChildVisible = ref(false);
const activeTab = ref(1);
const selectedChannel = ref('app');
const feedback = ref('请选择一个场景查看效果');

const actions: ActionSheetAction[] = [
  { name: '立即启用', value: 'enable', description: '操作项支持补充说明' },
  { name: '等待资源', value: 'loading', description: '加载状态会阻止重复点击', loading: true },
  { name: '暂不可用', value: 'disabled', description: '禁用状态不可选择', disabled: true },
  { name: '删除当前方案', value: 'delete', description: '危险操作使用警示样式', danger: true },
];

const nestedActions: ActionSheetAction[] = [
  { name: '仅重要状态', value: 'important', description: '只提醒出票、变更和取消结果' },
  { name: '全部行程动态', value: 'all', description: '接收行程各阶段的完整提醒' },
];

const tabs = [
  { title: '基础版', subTitle: '轻量' },
  { title: '进阶版', subTitle: '推荐' },
  { title: '专业版', subTitle: '完整' },
];

const plans = [
  {
    title: '基础服务方案',
    badge: '快速开始',
    description: '适合需求明确、希望快速上线的场景。',
    features: ['标准服务流程', '工作日在线支持'],
  },
  {
    title: '进阶服务方案',
    badge: '推荐选择',
    description: '在基础能力之上提供更多配置与响应保障。',
    features: ['灵活配置能力', '优先问题响应', '阶段进度回顾'],
  },
  {
    title: '专业服务方案',
    badge: '完整能力',
    description: '适合复杂业务和需要专属协作的长期项目。',
    features: ['专属服务支持', '完整能力开放', '定期方案复盘'],
  },
];

const channels = [
  { name: '应用内通知', value: 'app', description: '在消息中心接收全部进度' },
  { name: '短信提醒', value: 'sms', description: '仅接收关键状态变化' },
  { name: '邮件摘要', value: 'email', description: '每日汇总发送到绑定邮箱' },
];

const currentPlan = computed(() => plans[activeTab.value] ?? plans[0]);

function handleActionSelect(action: ActionSheetAction) {
  feedback.value = `已选择：${action.name}`;
}

function handleNestedSelect(action: ActionSheetAction) {
  feedback.value = `已在第二层选择：${action.name}`;
}

function confirmPlan() {
  feedback.value = `已确认：${currentPlan.value.title}`;
  tabsVisible.value = false;
}

function cancelCustom() {
  feedback.value = '已取消消息设置';
  customVisible.value = false;
}

function confirmChannel() {
  const channel = channels.find((item) => item.value === selectedChannel.value);
  feedback.value = `消息方式已保存：${channel?.name ?? ''}`;
  customVisible.value = false;
}
</script>

<style scoped lang="less">
.action-sheet-demo {
  display: grid;
  gap: var(--ky-space-4);
  width: 100%;
}

.action-sheet-demo__intro {
  display: grid;
  gap: var(--ky-space-1);
}

.action-sheet-demo__intro strong {
  font-size: var(--ky-font-size-body-strong);
  color: var(--ky-color-text-primary);
}

.action-sheet-demo__intro p,
.action-sheet-demo__result,
.action-sheet-demo__plan p {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}

.action-sheet-demo__triggers {
  display: grid;
  gap: var(--ky-space-3);
}

.action-sheet-demo__result {
  padding: var(--ky-space-3);
  text-align: center;
  background: var(--ky-color-subtle-bg);
  border-radius: var(--ky-radius-md);
}

.action-sheet-demo__plan {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-5) var(--ky-space-2);
}

.action-sheet-demo__plan > strong {
  font-size: var(--ky-font-size-title);
}

.action-sheet-demo__badge {
  justify-self: start;
  padding: var(--ky-space-1) var(--ky-space-2);
  font-size: var(--ky-font-size-caption);
  color: var(--ky-color-brand-strong);
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-pill);
}

.action-sheet-demo__plan ul {
  display: grid;
  gap: var(--ky-space-2);
  padding-left: var(--ky-space-5);
  margin: 0;
  color: var(--ky-color-text-primary);
}

.action-sheet-demo__nested-panel {
  display: grid;
  gap: var(--ky-space-4);
  padding: var(--ky-space-5) var(--ky-space-4);
}

.action-sheet-demo__nested-panel > strong {
  font-size: var(--ky-font-size-title);
  color: var(--ky-color-text-primary);
}

.action-sheet-demo__nested-panel p {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  line-height: 1.6;
  color: var(--ky-color-text-secondary);
}

.action-sheet-demo__promotion-header {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 96px;
  padding: var(--ky-space-5) 48% var(--ky-space-4) var(--ky-space-5);
  text-align: left;
  background:
    radial-gradient(
      circle at 80% 0%,
      color-mix(in srgb, var(--ky-color-warning) 24%, transparent),
      transparent 58%
    ),
    var(--ky-color-surface);
  border-radius: var(--ky-action-sheet-radius) var(--ky-action-sheet-radius) 0 0;
}

.action-sheet-demo__promotion-copy {
  position: relative;
  z-index: 2;
  display: grid;
  gap: var(--ky-space-2);
}

.action-sheet-demo__promotion-copy strong {
  font-size: var(--ky-font-size-title);
  color: var(--ky-color-warning);
}

.action-sheet-demo__promotion-copy span,
.action-sheet-demo__promotion-content span,
.action-sheet-demo__promotion-content p {
  margin: 0;
  font-size: var(--ky-font-size-assist);
  color: var(--ky-color-text-secondary);
}

.action-sheet-demo__promotion-art {
  position: absolute;
  z-index: 1;
  top: -12px;
  right: -8px;
  width: min(58%, 220px);
  pointer-events: none;
  user-select: none;
}

.action-sheet-demo__promotion-content {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-5);
  text-align: center;
}

.action-sheet-demo__promotion-content strong {
  font-size: var(--ky-font-size-display);
  color: var(--ky-color-warning);
}

.action-sheet-demo__custom-header {
  display: grid;
  gap: var(--ky-space-1);
  padding: var(--ky-space-3) 0;
  text-align: center;
}

.action-sheet-demo__custom-header span {
  font-size: var(--ky-font-size-caption);
  color: var(--ky-color-text-secondary);
}

.action-sheet-demo__channels {
  display: grid;
  gap: var(--ky-space-3);
  padding: var(--ky-space-3) 0;
}

.action-sheet-demo__channels button {
  display: flex;
  gap: var(--ky-space-3);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--ky-space-4);
  color: var(--ky-color-text-primary);
  text-align: left;
  background: var(--ky-color-subtle-bg);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}

.action-sheet-demo__channels button.is-selected {
  color: var(--ky-color-brand-strong);
  background: var(--ky-color-brand-soft);
  border-color: var(--ky-color-brand-strong);
}

.action-sheet-demo__channels button:focus-visible {
  outline: 2px solid var(--ky-color-brand-strong);
  outline-offset: 2px;
}

.action-sheet-demo__channels button > span:first-child {
  display: grid;
  gap: var(--ky-space-1);
}

.action-sheet-demo__channels small {
  font-size: var(--ky-font-size-caption);
  color: var(--ky-color-text-secondary);
}

.action-sheet-demo__check {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: var(--ky-space-6);
  height: var(--ky-space-6);
  color: transparent;
  background: transparent;
  border: 1px solid var(--ky-color-divider-strong);
  border-radius: var(--ky-radius-pill);
}

.action-sheet-demo__check.is-selected {
  color: var(--ky-color-on-brand);
  background: var(--ky-color-brand-strong);
  border-color: var(--ky-color-brand-strong);
}
</style>
