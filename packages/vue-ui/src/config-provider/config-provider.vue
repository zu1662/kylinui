<template>
  <component
    :is="tag"
    class="ky-config-provider"
    :data-ky-theme="themeVarsScope === 'local' ? theme : undefined"
    :style="themeVarsScope === 'local' ? themeStyle : undefined"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, provide, readonly, toRef, watch } from 'vue';
import { removeGlobalTheme, syncGlobalTheme } from '../shared/global-theme';
import { removeGlobalZIndex, syncGlobalZIndex } from '../shared/global-z-index';
import {
  CONFIG_PROVIDER_KEY,
  mapThemeVarsToStyle,
  type ConfigProviderProps,
} from './config-provider';

defineOptions({ name: 'KyConfigProvider' });

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  tag: 'div',
  theme: 'jade',
  zIndex: undefined,
  themeVars: () => ({}),
  themeVarsScope: 'local',
});

const themeStyle = computed(() => mapThemeVarsToStyle(props.themeVars));
const theme = toRef(props, 'theme');
const zIndex = toRef(props, 'zIndex');
const themeVars = toRef(props, 'themeVars');
const themeVarsScope = toRef(props, 'themeVarsScope');
const globalThemeOwner = Symbol('ky-config-provider-theme');
const globalZIndexOwner = Symbol('ky-config-provider-z-index');

provide(CONFIG_PROVIDER_KEY, {
  theme: readonly(theme),
  zIndex: readonly(zIndex),
  themeVars: readonly(themeVars),
  themeVarsScope: readonly(themeVarsScope),
});

watch(
  () => [props.theme, props.themeVarsScope, props.themeVars] as const,
  ([currentTheme, scope]) => {
    if (scope === 'global') {
      syncGlobalTheme(
        globalThemeOwner,
        currentTheme,
        mapThemeVarsToStyle(props.themeVars) as Record<string, string>,
      );
    } else {
      removeGlobalTheme(globalThemeOwner);
    }
  },
  { deep: true, immediate: true },
);

watch(
  () => props.zIndex,
  (value) => syncGlobalZIndex(globalZIndexOwner, value),
  { immediate: true },
);

onBeforeUnmount(() => {
  removeGlobalTheme(globalThemeOwner);
  removeGlobalZIndex(globalZIndexOwner);
});
</script>
