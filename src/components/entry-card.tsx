import { Link } from "@tanstack/react-router";
import { ClassBadge } from "@/components/class-badge";
import { entryTo } from "@/data/catalog";
import type { ArchiveEntry } from "@/data/types";
import { entryKey, useArchiveStore } from "@/lib/archive-store";
import { cn } from "@/lib/utils";

export function EntryCard({ entry }: { entry: ArchiveEntry }) {
  const visited = useArchiveStore((s) => s.visited.includes(entryKey(entry.kind, entry.id)));
  return (
    <Link
      to={entryTo(entry.kind)}
      params={{ id: entry.id }}
      className="group block overflow-hidden rounded-md bg-surface shadow-border transition-shadow hover:shadow-border-hover"
    >
      <div className="relative aspect-video overflow-hidden bg-elevated">
        <img src={entry.image} alt="" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <ClassBadge klass={entry.class} className="absolute top-2 left-2" />
      </div>
      <div className="flex flex-col gap-1 p-3">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          {entry.code}
          {visited ? " · seen" : ""}
        </p>
        <h3 className="font-display text-lg text-fg">{entry.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{entry.summary}</p>
      </div>
    </Link>
  );
}

export function EntryRow({ entry }: { entry: ArchiveEntry }) {
  const visited = useArchiveStore((s) => s.visited.includes(entryKey(entry.kind, entry.id)));
  return (
    <Link
      to={entryTo(entry.kind)}
      params={{ id: entry.id }}
      className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-sm px-2 py-2 hover:bg-elevated sm:grid-cols-[7rem_1fr_auto]")}
    >
      <span className="font-mono text-xs uppercase tracking-wider text-accent">{entry.code}</span>
      <span>
        <span className="block text-fg">{entry.name}</span>
        <span className="line-clamp-1 text-sm text-muted">{entry.summary}</span>
      </span>
      <span className="hidden sm:flex items-center gap-2">
        {visited ? <span className="font-mono text-xs uppercase tracking-wider text-subtle">seen</span> : null}
        <ClassBadge klass={entry.class} />
      </span>
    </Link>
  );
}
