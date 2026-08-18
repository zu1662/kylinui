import type { App, AppContext, VNode } from 'vue';

let serviceAppContext: AppContext | undefined;

/** 记录最近安装 Kylin 组件的 Vue 应用上下文，供命令式服务宿主继承全局 provide。 */
export function setServiceAppContext(app: App) {
  serviceAppContext = app._context;
}

/** 服务宿主通过 render() 独立挂载时不会自动继承业务应用，需要显式补上 appContext。 */
export function applyServiceAppContext(vnode: VNode) {
  if (serviceAppContext) vnode.appContext = serviceAppContext;
  return vnode;
}
