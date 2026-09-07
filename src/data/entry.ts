import type { ArchiveEntry, Cluster, SurvivalClass } from "./types";

export const IMG = {
  yellow: "/images/level-0.jpg",
  warehouse: "/images/level-1.jpg",
  pipes: "/images/level-2.jpg",
  electrical: "/images/level-3.jpg",
  office: "/images/level-4.jpg",
  hotel: "/images/level-5.jpg",
  dark: "/images/level-6.jpg",
  ocean: "/images/level-7.jpg",
  cave: "/images/level-8.jpg",
  suburbs: "/images/level-9.jpg",
  wheat: "/images/level-10.jpg",
  city: "/images/level-11.jpg",
  pool: "/images/level-37.jpg",
  fun: "/images/fun.jpg",
  arcade: "/images/level-3999.jpg",
  async: "/images/async.jpg",
  hub: "/images/hub.jpg",
  void: "/images/void.jpg",
  windows: "/images/windows.jpg",
  motion: "/images/motion.jpg",
  almond: "/images/almond.jpg",
  hive: "/images/hive.jpg",
  hospital: "/images/hospital.jpg",
  school: "/images/school.jpg",
  bang: "/images/bang.jpg",
  pain: "/images/pain.jpg",
  metro: "/images/metro.jpg",
  gold: "/images/gold.jpg",
  red: "/images/red.jpg",
  front: "/images/front.jpg",
  meg: "/images/meg.jpg",
  smiler: "/images/smiler.jpg",
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
