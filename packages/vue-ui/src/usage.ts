export type UsageControlType = 'boolean' | 'select' | 'text' | 'number';

/** 文档站单个可切换属性的控件定义。 */
export interface UsagePropConfig {
  name: string;
  label: string;
  type: UsageControlType;
  defaultValue: unknown;
  options?: Array<string | number>;
  min?: number;
  max?: number;
  step?: number;
}

/** 组件配置实验台的元数据。 */
export interface UsageConfig {
  name: string;
  component: string;
  description: string;
  props: UsagePropConfig[];
  /** 代码区标题，默认展示 Vue Template。 */
  codeTitle?: string;
  /** 服务式组件可以根据当前配置生成可执行的调用代码。 */
  generateCode?: (values: Record<string, unknown>) => string;
}
