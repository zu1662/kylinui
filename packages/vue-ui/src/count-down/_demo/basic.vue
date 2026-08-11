<template>
  <KyCountDown :time="2 * 60 * 60 * 1000" format="HH:mm:ss"
    ><template #default="{ current }"
      ><span class="demo-count"
        ><b>{{ current.hours.toString().padStart(2, '0') }}</b
        >:<b>{{ current.minutes.toString().padStart(2, '0') }}</b
        >:<b>{{ current.seconds.toString().padStart(2, '0') }}</b></span
      ></template
    ></KyCountDown
  >
</template>
<script setup lang="ts">
import KyCountDown from '../index';
</script>
<style scoped>
.demo-target {
  display: inline-grid;
  min-width: 64px;
  height: 40px;
  padding: 0 12px;
  place-items: center;
  background: var(--ky-color-brand-soft);
  border-radius: var(--ky-radius-sm);
}
.ky-demo-stack {
  display: grid;
  gap: 20px;
}
.demo-count b {
  display: inline-grid;
  min-width: 30px;
  height: 30px;
  place-items: center;
  color: #fff;
  background: var(--ky-color-brand-strong);
  border-radius: 6px;
}
</style>
