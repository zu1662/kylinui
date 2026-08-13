<template>
  <section class="action-sheet-demo">
    <header class="action-sheet-demo__intro">
      <strong>动作面板场景</strong>
      <p>查看操作项状态、选项卡与自定义内容能力。</p>
    </header>

    <div class="action-sheet-demo__triggers">
      <KyButton block @click="actionsVisible = true">操作项与状态</KyButton>
      <KyButton block variant="secondary" @click="tabsVisible = true">选项卡与双操作</KyButton>
      <KyButton block variant="gradient" @click="customVisible = true">自定义内容</KyButton>
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
import KyActionSheet from '../index';
import type { ActionSheetAction } from '../action-sheet';

const actionsVisible = ref(false);
const tabsVisible = ref(false);
const customVisible = ref(false);
const activeTab = ref(1);
const selectedChannel = ref('app');
const feedback = ref('请选择一个场景查看效果');

const actions: ActionSheetAction[] = [
  { name: '立即启用', value: 'enable', description: '操作项支持补充说明' },
  { name: '等待资源', value: 'loading', description: '加载状态会阻止重复点击', loading: true },
  { name: '暂不可用', value: 'disabled', description: '禁用状态不可选择', disabled: true },
  { name: '删除当前方案', value: 'delete', description: '危险操作使用警示样式', danger: true },
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
