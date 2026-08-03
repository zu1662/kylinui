<template>
  <section class="playground">
    <div class="playground__stage">
      <MobileSimulator
        ref="simulator"
        :src="previewUrl"
        :title="`${entry.title}配置预览`"
        @load="syncPreview"
      />
    </div>

    <aside class="playground__controls">
      <div class="playground__controls-head">
        <div>
          <span class="eyebrow">CONFIGURATOR</span>
          <h2>配置实验台</h2>
        </div>
        <button type="button" @click="reset">恢复默认</button>
      </div>

      <label v-for="item in entry.config.props" :key="item.name" class="control-row">
        <span>
          <strong>{{ item.label }}</strong>
          <code>{{ item.name }}</code>
        </span>
        <input
          v-if="item.type === 'boolean'"
          v-model="values[item.name]"
          type="checkbox"
        />
        <select v-else-if="item.type === 'select'" v-model="values[item.name]">
          <option
            v-for="option in item.options"
            :key="String(option)"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <input
          v-else-if="item.type === 'number'"
          v-model.number="values[item.name]"
          type="number"
          :min="item.min"
          :max="item.max"
          :step="item.step"
        />
        <input v-else v-model="values[item.name]" type="text" />
      </label>

      <div class="code-preview">
        <div class="code-preview__head">
          <span>{{ entry.config.codeTitle || 'Vue Template' }}</span>
          <button type="button" @click="copyCode">
            {{ copied ? '已复制' : '复制代码' }}
          </button>
        </div>
        <pre><code>{{ code }}</code></pre>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { ComponentEntry } from '../types';
import { createPreviewPropsMessage, createPreviewUrl } from '../preview';
import MobileSimulator from './MobileSimulator.vue';

const props = defineProps<{ entry: ComponentEntry }>();
const values = reactive<Record<string, unknown>>({});
const copied = ref(false);
const simulator = ref<InstanceType<typeof MobileSimulator> | null>(null);
const slotContent: Record<string, string> = {
  KyButton: '主要操作',
  KyTag: '标签',
};
const previewUrl = computed(() => createPreviewUrl(props.entry.slug, 'usage'));

// 配置定义是唯一数据源，预览控件与代码片段始终保持一致。
function reset() {
  Object.keys(values).forEach((key) => delete values[key]);
  props.entry.config.props.forEach((item) => {
    values[item.name] = item.defaultValue;
  });
}

/** 将响应式配置转换为可结构化克隆的普通对象，再发送给手机预览页。 */
function syncPreview() {
  const payload = Object.fromEntries(
    props.entry.config.props.map((item) => [item.name, values[item.name]]),
  );
  simulator.value?.postMessage(createPreviewPropsMessage(props.entry.slug, payload));
}

watch(() => props.entry.slug, reset, { immediate: true });
watch(values, syncPreview, { deep: true, flush: 'post' });

function formatAttribute(name: string, type: string, value: unknown) {
  // 始终输出当前配置值，避免组件默认值与实验台默认值不一致时生成错误示例。
  if (type === 'boolean') return value ? name : `:${name}="false"`;
  if (type === 'number') return `:${name}="${String(value)}"`;
  return `${name}="${String(value).replaceAll('"', '&quot;')}"`;
}

const code = computed(() => {
  // Toast 等服务式组件使用自定义生成器，普通组件则生成 Vue 模板。
  if (props.entry.config.generateCode) return props.entry.config.generateCode(values);
  const attrs = props.entry.config.props.map((item) =>
    formatAttribute(item.name, item.type, values[item.name]),
  );
  const component = props.entry.config.component;
  const content = slotContent[component];

  // 属性按行缩进展示，复制后可以直接粘贴到 Vue 模板中继续编辑。
  if (attrs.length === 0) {
    return content ? `<${component}>${content}</${component}>` : `<${component} />`;
  }
  const openingLines = [`<${component}`, ...attrs.map((attr) => `  ${attr}`)];
  if (!content) return [...openingLines, '/>'].join('\n');
  return [...openingLines, '>', `  ${content}`, `</${component}>`].join('\n');
});

async function copyCode() {
  await navigator.clipboard?.writeText(code.value);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1200);
}
</script>
