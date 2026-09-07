import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { ClassBadge } from "@/components/class-badge";
import { Button } from "@/components/ui/button";
import { catalog, entryTo, kindPath, kindPlural, relatedEntries } from "@/data/catalog";
import type { ArchiveEntry, Kind } from "@/data/types";
import { entryKey, useArchiveStore } from "@/lib/archive-store";

export function EntryView({ entry }: { entry: ArchiveEntry }) {
  const key = entryKey(entry.kind, entry.id);
  const bookmarked = useArchiveStore((s) => s.bookmarks.includes(key));
  const toggle = useArchiveStore((s) => s.toggleBookmark);
  const mark = useArchiveStore((s) => s.markVisited);
  useEffect(() => {
    mark(key);
  }, [key, mark]);
  const related = relatedEntries(entry);
  const body = (entry.body ?? []).filter((p) => p && p !== entry.summary);

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        <Link to={kindPath[entry.kind]} className="hover:text-fg">
          {kindPlural[entry.kind]}
        </Link>
        {" / "}
        {entry.code}
      </p>
      <div className="overflow-hidden rounded-md bg-elevated shadow-border">
        <img src={entry.image} alt="" className="aspect-video w-full object-cover" />
      </div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{entry.code}</p>
          <h1 className="font-display text-4xl text-fg sm:text-5xl">{entry.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ClassBadge klass={entry.class} />
            {entry.cluster ? (
              <span className="font-mono text-xs uppercase tracking-wider text-subtle">{entry.cluster.replace("-", " ")}</span>
            ) : null}
          </div>
        </div>
        <Button variant={bookmarked ? "default" : "secondary"} onClick={() => toggle(key)} type="button">
          <Bookmark className="size-4" />
          {bookmarked ? "Filed" : "File this"}
        </Button>
      </header>
      <p className="text-lg text-muted">{entry.summary}</p>
      {body.map((p) => (
        <p key={p.slice(0, 24)} className="text-fg">
          {p}
        </p>
      ))}
      {entry.aliases && entry.aliases.length > 0 ? (
        <p className="font-mono text-xs uppercase tracking-wider text-subtle">Also filed as {entry.aliases.join(" · ")}</p>
      ) : null}
      {entry.exits && entry.exits.length > 0 ? (
        <section>
          <h2 className="mb-3 font-display text-2xl">Exits</h2>
          <ExitList ids={entry.exits} />
        </section>
      ) : null}
      {related.length > 0 ? (
        <section>
          <h2 className="mb-3 font-display text-2xl">See also</h2>
          <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-surface">
            {related.map((r) => (
              <li key={`${r.kind}:${r.id}`}>
                <Link
                  to={entryTo(r.kind)}
                  params={{ id: r.id }}
                  className="flex items-center justify-between gap-3 px-3 py-3 hover:bg-elevated"
                >
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-wider text-accent">{r.code}</span>
                    <span className="text-fg">{r.name}</span>
                  </span>
                  <ClassBadge klass={r.class} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {entry.tags && entry.tags.length > 0 ? (
        <p className="font-mono text-xs uppercase tracking-wider text-subtle">{entry.tags.join(" · ")}</p>
      ) : null}
    </article>
  );
}

function ExitList({ ids }: { ids: string[] }) {
  const found = ids.map((id) => catalog.find((e) => e.id === id)).filter(Boolean);
  if (found.length === 0) {
    return <p className="font-mono text-xs uppercase tracking-wider text-muted">{ids.join(" · ")}</p>;
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {found.map((r) =>
        r ? (
          <li key={r.id}>
            <Button variant="secondary" asChild>
              <Link to={entryTo(r.kind)} params={{ id: r.id }}>
                {r.code}
              </Link>
            </Button>
          </li>
        ) : null,
      )}
    </ul>
  );
}

export function MissingFile({ kind }: { kind: Kind }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-4 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-danger">File missing</p>
      <h1 className="font-display text-4xl">This folder is empty</h1>
      <p className="text-muted">The binder has a tab and no pages.</p>
      <Button asChild>
        <Link to={kindPath[kind]}>{kindPlural[kind]}</Link>
      </Button>
    </div>
  );
}
