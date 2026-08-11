<template>
  <section class="transition-demo">
    <header class="transition-demo__head">
      <div>
        <strong>内置动效</strong>
        <span>点击卡片分别查看进入和退出效果</span>
      </div>
      <KyButton size="small" variant="secondary" @click="toggleAll">
        {{ allVisible ? '全部退出' : '全部进入' }}
      </KyButton>
    </header>

    <div class="transition-demo__grid">
      <button
        v-for="name in transitionNames"
        :key="name"
        class="transition-demo__item"
        type="button"
        :aria-label="`${visible[name] ? '退出' : '进入'} ${name} 动画`"
        @click="visible[name] = !visible[name]"
      >
        <span class="transition-demo__stage">
          <KyTransition :name="name">
            <span v-if="visible[name]" class="transition-demo__shape" aria-hidden="true">
              {{ effectMarks[name] }}
            </span>
          </KyTransition>
        </span>
        <strong>{{ name }}</strong>
        <small>{{ visible[name] ? '点击退出' : '点击进入' }}</small>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import KyButton from '../../button';
import KyTransition from '../index';
import { transitionNames, type BuiltInTransitionName } from '../transition';

const effectMarks: Record<BuiltInTransitionName, string> = {
  fade: 'F',
  'fade-up': '↑',
  'fade-down': '↓',
  'fade-left': '←',
  'fade-right': '→',
  'slide-up': '↑',
  'slide-down': '↓',
  'slide-left': '←',
  'slide-right': '→',
  zoom: '+',
  punch: '−',
  bounce: 'B',
  fly: '↟',
  'post-up': '⇧',
};
const visible = reactive(
  transitionNames.reduce(
    (state, name) => {
      state[name] = true;
      return state;
    },
    {} as Record<BuiltInTransitionName, boolean>,
  ),
);
const allVisible = computed(() => transitionNames.every((name) => visible[name]));

function toggleAll() {
  const nextValue = !allVisible.value;
  transitionNames.forEach((name) => {
    visible[name] = nextValue;
  });
}
</script>

<style scoped lang="less">
.transition-demo {
  display: grid;
  gap: var(--ky-space-4);
  width: 100%;
}

.transition-demo__head {
  display: flex;
  gap: var(--ky-space-3);
  align-items: center;
  justify-content: space-between;
}

.transition-demo__head div {
  display: grid;
  gap: var(--ky-space-1);
}

.transition-demo__head strong {
  color: var(--ky-color-text-primary);
  font-size: var(--ky-font-size-body-strong);
}

.transition-demo__head span {
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-assist);
}

.transition-demo__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--ky-space-3);
}

.transition-demo__item {
  display: grid;
  gap: var(--ky-space-1);
  min-width: 0;
  padding: var(--ky-space-3);
  color: var(--ky-color-text-primary);
  text-align: left;
  appearance: none;
  cursor: pointer;
  background: var(--ky-color-surface);
  border: 1px solid var(--ky-color-divider);
  border-radius: var(--ky-radius-md);
}

.transition-demo__item:focus-visible {
  outline: 2px solid var(--ky-color-brand-strong);
  outline-offset: 2px;
}

.transition-demo__stage {
  display: grid;
  height: 82px;
  overflow: hidden;
  place-items: center;
  background: var(--ky-gradient-brand-soft);
  border-radius: var(--ky-radius-sm);
}

.transition-demo__shape {
  display: grid;
  width: 48px;
  height: 48px;
  color: var(--ky-color-surface);
  font-weight: var(--ky-font-semibold);
  background: var(--ky-gradient-brand);
  border-radius: 15px;
  box-shadow: var(--ky-shadow-brand);
  transform-origin: center;
  place-items: center;
}

.transition-demo__item strong {
  overflow: hidden;
  font-size: var(--ky-font-size-body);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transition-demo__item small {
  color: var(--ky-color-text-secondary);
  font-size: var(--ky-font-size-caption);
}
</style>
