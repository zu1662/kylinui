import type { Component } from 'vue';
import type { UsageConfig } from '@vue-ui/usage';

/** 文档站渲染一个组件页面所需的完整描述。 */
export interface ComponentEntry {
  slug: string;
  group: string;
  title: string;
  config: UsageConfig;
  usage: Component;
  demo: Component;
  doc: string;
}
