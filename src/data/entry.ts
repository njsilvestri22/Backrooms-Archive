import { publicUrl } from "@/lib/public-url";
import type { ArchiveEntry, Cluster, SurvivalClass } from "./types";

export const IMG = {
  yellow: publicUrl("/images/level-0.jpg"),
  warehouse: publicUrl("/images/level-1.jpg"),
  pipes: publicUrl("/images/level-2.jpg"),
  electrical: publicUrl("/images/level-3.jpg"),
  office: publicUrl("/images/level-4.jpg"),
  hotel: publicUrl("/images/level-5.jpg"),
  dark: publicUrl("/images/level-6.jpg"),
  ocean: publicUrl("/images/level-7.jpg"),
  cave: publicUrl("/images/level-8.jpg"),
  suburbs: publicUrl("/images/level-9.jpg"),
  wheat: publicUrl("/images/level-10.jpg"),
  city: publicUrl("/images/level-11.jpg"),
  pool: publicUrl("/images/level-37.jpg"),
  fun: publicUrl("/images/fun.jpg"),
  arcade: publicUrl("/images/level-3999.jpg"),
  async: publicUrl("/images/async.jpg"),
  hub: publicUrl("/images/hub.jpg"),
  void: publicUrl("/images/void.jpg"),
  windows: publicUrl("/images/windows.jpg"),
  motion: publicUrl("/images/motion.jpg"),
  almond: publicUrl("/images/almond.jpg"),
  hive: publicUrl("/images/hive.jpg"),
  hospital: publicUrl("/images/hospital.jpg"),
  school: publicUrl("/images/school.jpg"),
  bang: publicUrl("/images/bang.jpg"),
  pain: publicUrl("/images/pain.jpg"),
  metro: publicUrl("/images/metro.jpg"),
  gold: publicUrl("/images/gold.jpg"),
  red: publicUrl("/images/red.jpg"),
  front: publicUrl("/images/front.jpg"),
  meg: publicUrl("/images/meg.jpg"),
  smiler: publicUrl("/images/smiler.jpg"),
} as const;

const CYCLE = [
  IMG.yellow, IMG.warehouse, IMG.pipes, IMG.electrical, IMG.office, IMG.hotel,
  IMG.dark, IMG.ocean, IMG.cave, IMG.suburbs, IMG.wheat, IMG.city, IMG.pool,
  IMG.fun, IMG.arcade, IMG.hub, IMG.hospital, IMG.school, IMG.metro, IMG.gold,
] as const;

export function imageForNumber(n: number): string {
  return CYCLE[((n % CYCLE.length) + CYCLE.length) % CYCLE.length];
}

type EntryInput = Omit<ArchiveEntry, "body" | "tags" | "related"> & {
  body?: string[];
  tags?: string[];
  related?: string[];
};

export function entry(opts: EntryInput): ArchiveEntry {
  return {
    kind: opts.kind,
    id: opts.id,
    code: opts.code,
    name: opts.name,
    class: opts.class,
    summary: opts.summary,
    image: opts.image,
    cluster: opts.cluster,
    body: opts.body ?? [],
    tags: opts.tags ?? [],
    related: opts.related ?? [],
    exits: opts.exits,
    aliases: opts.aliases,
    canon: opts.canon,
  };
}

type LvlExtra = Partial<
  Pick<ArchiveEntry, "cluster" | "image" | "related" | "tags" | "exits" | "canon" | "body" | "aliases">
>;

export function lvl(
  n: number | string,
  name: string,
  klass: string,
  summary: string,
  extra: LvlExtra = {},
): ArchiveEntry {
  const numeric = typeof n === "number";
  const id = numeric ? `level-${n}` : String(n);
  const resolvedCode = numeric
    ? `Level ${n}`
    : id.startsWith("level-")
      ? `Level ${id.slice(6)}`
      : extra.aliases?.[0] ?? name;
  let cluster: Cluster | undefined = extra.cluster;
  if (!cluster) {
    if (numeric && n >= 0 && n <= 8) cluster = "main-nine";
    else if (numeric && n < 0) cluster = "negative";
    else cluster = "normal";
  }
  return entry({
    kind: "level",
    id,
    code: resolvedCode,
    name,
    class: klass as SurvivalClass,
    summary,
    cluster,
    image: extra.image ?? (numeric ? imageForNumber(n) : IMG.yellow),
    body: extra.body,
    tags: extra.tags,
    related: extra.related,
    exits: extra.exits,
    aliases: extra.aliases,
    canon: extra.canon,
  });
}
