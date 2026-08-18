import { shallowRef } from 'vue';
import type { ConfigProviderServiceDefaults, ConfigProviderTeleport } from '../config-provider';

interface GlobalConfigEntry {
  owner: symbol;
  teleport?: ConfigProviderTeleport;
  serviceDefaults: ConfigProviderServiceDefaults;
}

const entries = shallowRef<GlobalConfigEntry[]>([]);

export function getGlobalTeleport(fallback: ConfigProviderTeleport): ConfigProviderTeleport {
  return (
    [...entries.value].reverse().find((entry) => entry.teleport !== undefined)?.teleport ?? fallback
  );
}

export function getGlobalServiceDefaults<K extends keyof ConfigProviderServiceDefaults>(
  kind: K,
): NonNullable<ConfigProviderServiceDefaults[K]> {
  return Object.assign(
    {},
    ...entries.value.map((entry) => entry.serviceDefaults[kind] ?? {}),
  ) as NonNullable<ConfigProviderServiceDefaults[K]>;
}

export function syncGlobalConfigProvider(
  owner: symbol,
  teleport: ConfigProviderTeleport | undefined,
  serviceDefaults: ConfigProviderServiceDefaults,
) {
  const nextEntry = { owner, teleport, serviceDefaults };
  const index = entries.value.findIndex((entry) => entry.owner === owner);
  if (index < 0) {
    entries.value = [...entries.value, nextEntry];
    return;
  }
  entries.value = entries.value.map((entry, entryIndex) =>
    entryIndex === index ? nextEntry : entry,
  );
}

export function removeGlobalConfigProvider(owner: symbol) {
  entries.value = entries.value.filter((entry) => entry.owner !== owner);
}
