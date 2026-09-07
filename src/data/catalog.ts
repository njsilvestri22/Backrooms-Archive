import type { ArchiveEntry, Kind, SurvivalClass } from "./types";
import { coreLevels } from "./levels";
import { moreLevels } from "./levels-extended";
import { deepLevels } from "./levels-deep";
import { massLevels } from "./levels-mass";
import { coreEntities } from "./entities";
import { massEntities } from "./entities-mass";
import { coreObjects } from "./objects";
import { massObjects } from "./objects-mass";
import { coreGroups } from "./groups";
import { massGroups } from "./groups-mass";
import { corePhenomena } from "./phenomena";
import { massPhenomena } from "./phenomena-mass";
import { corePersons } from "./persons";
import { massPersons } from "./persons-mass";

export const levels = [...coreLevels, ...moreLevels, ...deepLevels, ...massLevels];
export const entities = [...coreEntities, ...massEntities];
export const objects = [...coreObjects, ...massObjects];
export const groups = [...coreGroups, ...massGroups];
export const phenomena = [...corePhenomena, ...massPhenomena];
export const persons = [...corePersons, ...massPersons];
export const catalog: ArchiveEntry[] = [
  ...levels, ...entities, ...objects, ...groups, ...phenomena, ...persons,
];

export const kindPath = {
  level: "/archive/levels",
  entity: "/archive/entities",
  object: "/archive/objects",
  group: "/archive/groups",
  phenomenon: "/archive/phenomena",
  person: "/archive/persons",
} as const;

export const kindLabel: Record<Kind, string> = {
  level: "Level",
  entity: "Entity",
  object: "Object",
  group: "Group",
  phenomenon: "Phenomenon",
  person: "Person",
};

export const kindPlural: Record<Kind, string> = {
  level: "Levels",
  entity: "Entities",
  object: "Objects",
  group: "Groups",
  phenomenon: "Phenomena",
  person: "Persons",
};

export function getEntry(kind: Kind, id: string) {
  return catalog.find((e) => e.kind === kind && e.id === id);
}

export function searchCatalog(q: string) {
  const n = q.trim().toLowerCase();
  if (!n) return catalog;
  return catalog.filter((e) => {
    const blob = `${e.code} ${e.name} ${e.summary} ${(e.aliases ?? []).join(" ")} ${(e.tags ?? []).join(" ")}`.toLowerCase();
    return blob.includes(n);
  });
}

export function randomEntry() {
  return catalog[Math.floor(Math.random() * catalog.length)];
}

export const stats = {
  total: catalog.length,
  levels: levels.length,
  entities: entities.length,
  objects: objects.length,
  groups: groups.length,
  phenomena: phenomena.length,
  persons: persons.length,
};

export function classLabel(c: SurvivalClass) {
  if (c === "habitable") return "Habitable";
  if (c === "deadzone") return "Deadzone";
  if (c === "variable") return "Variable";
  if (c === "psi") return "Psi";
  if (c === "unknown") return "Unknown";
  return `Class ${c}`;
}

export function classTone(c: SurvivalClass) {
  if (c === "0" || c === "habitable") return "text-safe";
  if (c === "1") return "text-safe";
  if (c === "2") return "text-info";
  if (c === "3") return "text-warn";
  if (c === "4") return "text-warn";
  if (c === "5" || c === "deadzone") return "text-danger";
  if (c === "psi") return "text-accent";
  return "text-muted";
}

export function relatedEntries(e: ArchiveEntry): ArchiveEntry[] {
  return (e.related ?? [])
    .map((id) => catalog.find((x) => x.id === id))
    .filter((x): x is ArchiveEntry => Boolean(x));
}

export function entryTo(kind: Kind): "/archive/levels/$id" {
  return `${kindPath[kind]}/$id` as "/archive/levels/$id";
}
