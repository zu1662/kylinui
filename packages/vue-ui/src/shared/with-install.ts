import type { App, Component } from 'vue';
import { setServiceAppContext } from './service-app-context';

export type WithInstall<T> = T & { install(app: App): void };

/** 为单个 Vue 组件补充 install 方法，同时保留按需导入能力。 */
export function withInstall<T extends Component>(component: T, name: string) {
  (component as WithInstall<T>).install = (app: App) => {
    setServiceAppContext(app);
    app.component(name, component);
  };
  return component as WithInstall<T>;
}
