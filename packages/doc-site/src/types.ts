import type { Component } from 'vue';
import type { UsageConfig } from '@vue-ui/usage';

/** 手机端组件列表与基础示例渲染所需的轻量描述。 */
export interface DemoEntry {
  slug: string;
  group: string;
  title: string;
  demo: Component;
}

/** 文档站渲染一个组件页面所需的完整描述。 */
export interface ComponentEntry extends DemoEntry {
  config: UsageConfig;
  usage: Component;
  doc: string;
}
