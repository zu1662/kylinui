<template>
  <div class="highlight-demo">
    <section>
      <h4>基础用法</h4>
      <KyHighlight text="组件规范让设计与开发保持一致。" keywords="规范" tag="p" />
    </section>

    <section>
      <h4>多个关键词</h4>
      <KyHighlight
        :keywords="['语义化 Token', '公共组件']"
        text="优先使用语义化 Token 和公共组件，减少重复实现。"
        tag="p"
      />
    </section>

    <section>
      <h4>重叠匹配</h4>
      <KyHighlight :keywords="['移动端组件', '组件体验']" text="持续优化移动端组件体验。" tag="p" />
    </section>

    <section>
      <h4>正则匹配</h4>
      <KyHighlight
        :literal="false"
        keywords="KY-\\d+"
        text="需求编号 KY-2048 已进入验证阶段。"
        tag="p"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import KyHighlight from '../index';
</script>

<style scoped lang="less">
.highlight-demo {
  display: grid;
  gap: var(--ky-space-6);
}

.highlight-demo section {
  display: grid;
  gap: var(--ky-space-3);
}

.highlight-demo h4,
.highlight-demo p {
  margin: 0;
}
</style>
