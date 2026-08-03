/**
 * LESS 规则检查配置。
 * Prettier 负责换行与缩进，Stylelint 负责语法、可维护性以及属性顺序检查。
 */
export default {
  extends: ['stylelint-config-standard-less', 'stylelint-config-recess-order'],
  ignoreFiles: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  rules: {
    // 组件采用 ky- 前缀与 BEM 命名，不使用通用的短横线命名限制。
    'selector-class-pattern': null,
    // Design Token 同时包含组件名和状态名，因此不限制自定义属性名称格式。
    'custom-property-pattern': null,
    // BEM 状态类和文档站区域样式按业务分区维护，跨分区比较选择器顺序会产生误报。
    'no-descending-specificity': null,
  },
};
