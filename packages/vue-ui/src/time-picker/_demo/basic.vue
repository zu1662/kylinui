<template>
  <div class="time-picker-demo">
    <section>
      <h3>基础用法</h3>
      <KyTimePicker
        v-model="time"
        min-time="08:30:00"
        max-time="22:00:00"
        :minute-step="5"
        @confirm="timeMessage = `已选择 ${$event.value}`"
      />
      <p>{{ timeMessage }}</p>
    </section>

    <section>
      <h3>精确到秒</h3>
      <KyTimePicker
        v-model="preciseTime"
        title="设置提醒时间"
        :columns-type="['hour', 'minute', 'second']"
        :minute-step="5"
        :second-step="10"
        @confirm="preciseMessage = `已选择 ${$event.value}`"
      />
      <p>{{ preciseMessage }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KyTimePicker from '../index';

const time = ref('14:30');
const preciseTime = ref('09:15:30');
const timeMessage = ref('可设置一天内的起止时间');
const preciseMessage = ref('按业务需要展示秒列并设置步长');
</script>

<style scoped lang="less">
.time-picker-demo {
  display: grid;
  gap: var(--ky-space-6);
}

.time-picker-demo section {
  display: grid;
  gap: var(--ky-space-3);
}

.time-picker-demo h3,
.time-picker-demo p {
  margin: 0;
}

.time-picker-demo h3 {
  font-size: var(--ky-font-size-body-strong);
}

.time-picker-demo p {
  color: var(--ky-color-text-secondary);
  text-align: center;
}
</style>
