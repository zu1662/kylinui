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
import { computed, inject, onBeforeUnmount, provide, readonly, toRef, watch } from 'vue';
import {
  removeGlobalConfigProvider,
  syncGlobalConfigProvider,
} from '../shared/global-config-provider';
import { removeGlobalTheme, syncGlobalTheme } from '../shared/global-theme';
import { removeGlobalZIndex, syncGlobalZIndex } from '../shared/global-z-index';
import {
  CONFIG_PROVIDER_KEY,
  ZH_CN_LOCALE,
  mapThemeVarsToStyle,
  type ConfigProviderProps,
  type ConfigProviderServiceDefaults,
  type ConfigProviderTeleport,
} from './config-provider';

defineOptions({ name: 'KyConfigProvider' });

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  tag: 'div',
  theme: 'jade',
  zIndex: undefined,
  themeVars: () => ({}),
  themeVarsScope: 'local',
  locale: () => ({}),
  serviceDefaults: () => ({}),
  teleport: undefined,
});
const parent = inject(CONFIG_PROVIDER_KEY, undefined);
const themeStyle = computed(() => mapThemeVarsToStyle(props.themeVars));
const theme = toRef(props, 'theme');
const zIndex = toRef(props, 'zIndex');
const themeVars = toRef(props, 'themeVars');
const themeVarsScope = toRef(props, 'themeVarsScope');
const locale = computed(() => ({
  ...ZH_CN_LOCALE,
  ...parent?.locale.value,
  ...props.locale,
}));
const serviceDefaults = computed<ConfigProviderServiceDefaults>(() => ({
  toast: { ...parent?.serviceDefaults.value.toast, ...props.serviceDefaults.toast },
  dialog: { ...parent?.serviceDefaults.value.dialog, ...props.serviceDefaults.dialog },
  imagePreview: {
    ...parent?.serviceDefaults.value.imagePreview,
    ...props.serviceDefaults.imagePreview,
  },
}));
const teleport = computed<ConfigProviderTeleport>(
  () => props.teleport ?? parent?.teleport.value ?? 'body',
);
const globalThemeOwner = Symbol('ky-config-provider-theme');
const globalZIndexOwner = Symbol('ky-config-provider-z-index');
const globalConfigOwner = Symbol('ky-config-provider-runtime');

provide(CONFIG_PROVIDER_KEY, {
  theme: readonly(theme),
  zIndex: readonly(zIndex),
  themeVars: readonly(themeVars),
  themeVarsScope: readonly(themeVarsScope),
  locale,
  serviceDefaults,
  teleport,
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

watch(
  [teleport, serviceDefaults],
  ([currentTeleport, currentServiceDefaults]) => {
    syncGlobalConfigProvider(globalConfigOwner, currentTeleport, currentServiceDefaults);
  },
  { deep: true, immediate: true },
);

onBeforeUnmount(() => {
  removeGlobalTheme(globalThemeOwner);
  removeGlobalZIndex(globalZIndexOwner);
  removeGlobalConfigProvider(globalConfigOwner);
});
</script>
