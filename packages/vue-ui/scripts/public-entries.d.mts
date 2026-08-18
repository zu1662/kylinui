export interface PublicEntry {
  name: string;
  source: string;
  styleSource?: string;
}

export function discoverPublicEntries(packageRoot: string): Promise<PublicEntry[]>;
