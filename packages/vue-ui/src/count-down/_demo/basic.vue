<template>
  <div class="count-down-demo">
    <section>
      <h4>基础用法</h4>
      <KyCountDown :time="baseTime" />
    </section>

    <section>
      <h4>自定义格式</h4>
      <KyCountDown :time="baseTime" format="DD 天 HH 时 mm 分 ss 秒" />
    </section>

    <section>
      <h4>毫秒级渲染</h4>
      <KyCountDown millisecond :time="millisecondTime" format="ss:SSS" />
    </section>

    <section>
      <h4>自定义样式</h4>
      <KyCountDown :time="baseTime">
        <template #default="{ hours, minutes, seconds }">
          <span class="count-down-demo__block">{{ pad(hours) }}</span>
          <span class="count-down-demo__colon">:</span>
          <span class="count-down-demo__block">{{ pad(minutes) }}</span>
          <span class="count-down-demo__colon">:</span>
          <span class="count-down-demo__block">{{ pad(seconds) }}</span>
        </template>
      </KyCountDown>
    </section>

    <section>
      <h4>手动控制</h4>
      <KyCountDown
        ref="manualCountDown"
        :time="3000"
        :auto-start="false"
        millisecond
        format="ss:SSS"
        @finish="manualStatus = '倒计时结束'"
      />
      <div class="count-down-demo__actions">
        <button type="button" @click="start">开始</button>
        <button type="button" @click="pause">暂停</button>
        <button type="button" @click="reset">重置</button>
      </div>
      <p v-if="manualStatus" class="count-down-demo__status">{{ manualStatus }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyCountDown, { type CountDownInstance } from '../index';

const baseTime = 30 * 60 * 60 * 1000;
const millisecondTime = 3 * 1000;
const manualCountDown = ref<CountDownInstance | null>(null);
const manualStatus = ref('');
const pad = (value: number) => String(value).padStart(2, '0');

function start() {
  manualStatus.value = '';
  manualCountDown.value?.start();
}

function pause() {
  manualCountDown.value?.pause();
}

function reset() {
  manualStatus.value = '';
  manualCountDown.value?.reset();
}
</script>

<style scoped lang="less">
.count-down-demo {
  display: grid;
  gap: 24px;
}

.count-down-demo section {
  display: grid;
  gap: 12px;
}

.count-down-demo h4,
.count-down-demo p {
  margin: 0;
}

.count-down-demo__block {
  display: inline-grid;
  min-width: 30px;
  height: 30px;
  place-items: center;
  color: #fff;
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}

.count-down-demo__colon {
  margin: 0 4px;
  color: var(--ky-color-brand-strong);
}

.count-down-demo__actions {
  display: flex;
  gap: 8px;
}

.count-down-demo__actions button {
  min-height: 36px;
  padding: 0 14px;
  color: var(--ky-color-brand-strong);
  cursor: pointer;
  background: var(--ky-color-brand-soft);
  border: 0;
  border-radius: var(--ky-radius-sm);
}

.count-down-demo__status {
  color: var(--ky-color-text-secondary);
}
</style>
