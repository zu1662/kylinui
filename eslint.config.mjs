import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * ESLint 只负责 JavaScript、TypeScript 与 Vue 的代码质量检查。
 * 排版工作统一交给 Prettier，避免同一条格式规则被两套工具重复处理。
 */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/*.tsbuildinfo',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['packages/**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2025,
      },
      parserOptions: {
        // Vue 文件外层由 vue-eslint-parser 解析，脚本块继续交给 TypeScript 解析器。
        parser: tseslint.parser,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // 组件库允许 Button、Tag 等符合领域语义的单词组件名。
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['packages/vue-ui/src/bottom-sheet/bottom-sheet.vue'],
    rules: {
      // BottomSheet 的内层过渡由外层显隐统一驱动，不要求重复声明 v-if 或 v-show。
      'vue/require-toggle-inside-transition': 'off',
    },
  },
  {
    files: ['*.{js,mjs,cjs,ts}', 'packages/*/vite.config.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
