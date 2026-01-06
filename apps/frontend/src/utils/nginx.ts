export interface Directive {
  key: string;
  value: string;
}

export interface Location {
  path: string;
  directives: Directive[];
}

export interface Upstream {
  name: string;
  servers: string[];
}

export function parseConfig(text: string): {
  locs: Location[];
  upstrs: Upstream[];
} {
  const locs: Location[] = [];
  const upstrs: Upstream[] = [];

  // Parse Upstreams
  const upstreamRegex = /upstream\s+([^{]+)\s*{([^}]*)}/g;
  let match = upstreamRegex.exec(text);
  while (match !== null) {
    const name = match[1].trim();
    const body = match[2].trim();
    const servers = body
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.startsWith("server"))
      .map((s) => s.replace("server", "").trim());
    upstrs.push({ name, servers });
    match = upstreamRegex.exec(text);
  }

  // Parse Locations (Simplified)
  const locRegex = /location\s+([^{]+)\s*{([^}]*)}/g;
  match = locRegex.exec(text);
  while (match !== null) {
    const path = match[1].trim();
    const body = match[2].trim();
    const lines = body
      .split(";")
      .map((l) => l.trim())
      .filter((l) => l);
    const directives: Directive[] = [];
    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length >= 2) {
        const k = parts[0];
        const v = parts.slice(1).join(" ");
        directives.push({ key: k, value: v });
      }
    }
    locs.push({ path, directives });
    match = locRegex.exec(text);
  }

  return { locs, upstrs };
}

export function generateUpstreamsBlock(upstrs: Upstream[]): string {
  return upstrs
    .map(
      (u) =>
        `upstream ${u.name} {\n${u.servers.map((s) => `    server ${s};`).join("\n")}\n}`
    )
    .join("\n\n");
}

export function generateLocationsBlock(locs: Location[]): string {
  return locs
    .map(
      (l) =>
        `location ${l.path} {\n${l.directives.map((d) => `    ${d.key} ${d.value};`).join("\n")}\n}`
    )
    .join("\n\n");
}

export function extractUpstreamsRaw(text: string): string {
  const upstreamRegex = /upstream\s+([^{]+)\s*{([^}]*)}/g;
  const matches = text.match(upstreamRegex);
  return matches ? matches.join("\n\n") : "";
}

export function extractLocationsRaw(text: string): string {
  const locRegex = /location\s+([^{]+)\s*{([^}]*)}/g;
  const matches = text.match(locRegex);
  return matches ? matches.join("\n\n") : "";
}
