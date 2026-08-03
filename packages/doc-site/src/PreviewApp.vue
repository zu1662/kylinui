<template>
  <div class="preview-page" :class="`preview-page--${entry.slug}`">
    <section class="preview-page__content" :aria-label="`${entry.title}移动端预览`">
      <component
        :is="entry.usage"
        v-if="mode === 'usage'"
        :config-props="values"
      />
      <component :is="entry.demo" v-else />
    </section>
    <!-- Toast 示例需要在 iframe 内挂载承载节点，固定定位才会受手机视口约束。 -->
    <KyToast v-if="entry.slug === 'toast'" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { KyToast } from '@kylin-design/vue-ui';
import { components } from './registry';
import { isPreviewPropsMessage, type PreviewMode } from './preview';

const search = new URLSearchParams(window.location.search);
const requestedSlug = search.get('component');
const entry = components.find((item) => item.slug === requestedSlug) ?? components[0];
const mode: PreviewMode = search.get('preview') === 'demo' ? 'demo' : 'usage';
const values = reactive<Record<string, unknown>>({});

/** 配置预览首次进入时使用组件声明的默认值。 */
function resetValues() {
  Object.keys(values).forEach((key) => delete values[key]);
  entry.config.props.forEach((item) => {
    values[item.name] = item.defaultValue;
  });
}

function handlePreviewMessage(event: MessageEvent) {
  // 只接受当前父窗口发送的同源消息，避免其他页面修改预览状态。
  if (event.source !== window.parent || event.origin !== window.location.origin) return;
  if (!isPreviewPropsMessage(event.data) || event.data.slug !== entry.slug) return;

  Object.keys(values).forEach((key) => delete values[key]);
  Object.assign(values, event.data.payload);
}

resetValues();
onMounted(() => window.addEventListener('message', handlePreviewMessage));
onBeforeUnmount(() => window.removeEventListener('message', handlePreviewMessage));
</script>
