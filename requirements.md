基于 [design.md](design.md) 创建移动端组件库，技术栈为 vue3,。使用 vue template setup + hooks 形式，不用jsx。
文档说明参考 https://tdesign.tencent.com/vue-next/components/button ，需要可以切换配置展示不同效果
具体代码实现可以先查找github已比较成熟的框架，找出更清晰、更完善的方案，然后再做实现。

每个组件的文件夹内部要拆分为：
index.ts 入口
xx.vue 核心代码，按照复杂度可以拆分多个
style/index.less 样式入口,style/token.less 当前组件特定token变量
xx.ts 一些方法或者hooks封装，按需生成ts文件
_demo/xx.vue 配置切换需要展示对应效果时的vue组件
_doc/xx.md 当前组件说明文档，后续可以转化为 doc 页面说明文档
_usage/config.ts 可切换配置 _usage/index.vue 基础展示组件

具体可以参考 D:\mycode\kylin-ui-vue\packages\kylin-ui-vue\src 对应目录功能处理

此项目下应该新增 packages/doc-site(文档展示网站) packages/vue-ui(核心组件代码)
