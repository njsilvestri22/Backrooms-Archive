import { useMemo, useState, type ReactNode } from "react";
import { LayoutGrid, List } from "lucide-react";
import { EntryCard, EntryRow } from "@/components/entry-card";
import { Button } from "@/components/ui/button";
import { catalog, classLabel, kindPlural, searchCatalog } from "@/data/catalog";
import type { Cluster, Kind, SurvivalClass } from "@/data/types";
import { cn } from "@/lib/utils";

const LIST_PAGE = 36;
const CARD_PAGE = 24;
const CLASSES: Array<SurvivalClass | "all"> = ["all", "0", "1", "2", "3", "4", "5", "habitable", "deadzone", "variable", "psi"];
const CLUSTERS: Array<Cluster | "all"> = ["all", "main-nine", "inhabited", "normal", "sublevel", "enigmatic", "negative", "anomalous"];

export function CatalogIndex({ kind }: { kind: Kind }) {
  const source = useMemo(() => catalog.filter((e) => e.kind === kind), [kind]);
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState<SurvivalClass | "all">("all");
  const [cluster, setCluster] = useState<Cluster | "all">("all");
  const [view, setView] = useState<"list" | "cards">(kind === "level" ? "list" : "cards");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let rows = q.trim() ? searchCatalog(q).filter((e) => e.kind === kind) : source;
    if (klass !== "all") rows = rows.filter((e) => e.class === klass);
    if (cluster !== "all") rows = rows.filter((e) => e.cluster === cluster);
    return rows;
  }, [q, klass, cluster, kind, source]);

  const per = view === "list" ? LIST_PAGE : CARD_PAGE;
  const pages = Math.max(1, Math.ceil(filtered.length / per));
  const safePage = Math.min(page, pages - 1);
  const slice = filtered.slice(safePage * per, safePage * per + per);

  function resetPage() {
    setPage(0);
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl">{kindPlural[kind]}</h1>
          <p className="font-mono text-xs uppercase tracking-wider text-subtle">
            {filtered.length} of {source.length} files
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant={view === "list" ? "default" : "secondary"} onClick={() => { setView("list"); resetPage(); }}>
            <List className="size-4" /> List
          </Button>
          <Button type="button" variant={view === "cards" ? "default" : "secondary"} onClick={() => { setView("cards"); resetPage(); }}>
            <LayoutGrid className="size-4" /> Cards
          </Button>
        </div>
      </header>
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); resetPage(); }}
        placeholder="Filter files"
        className="h-11 w-full rounded-md border border-border bg-surface px-3 text-fg placeholder:text-subtle"
      />
      <div className="flex flex-wrap gap-2">
        {CLASSES.map((c) => (
          <FilterChip key={c} active={klass === c} onClick={() => { setKlass(c); resetPage(); }}>
            {c === "all" ? "All classes" : classLabel(c)}
          </FilterChip>
        ))}
      </div>
      {kind === "level" ? (
        <div className="flex flex-wrap gap-2">
          {CLUSTERS.map((c) => (
            <FilterChip key={c} active={cluster === c} onClick={() => { setCluster(c); resetPage(); }}>
              {c === "all" ? "All clusters" : c.replace("-", " ")}
            </FilterChip>
          ))}
        </div>
      ) : null}
      {slice.length === 0 ? (
        <p className="py-16 text-center text-muted">No files match. The binder is silent.</p>
      ) : view === "list" ? (
        <div className="flex flex-col divide-y divide-border rounded-md border border-border bg-surface">
          {slice.map((e) => (
            <EntryRow key={`${e.kind}:${e.id}`} entry={e} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slice.map((e) => (
            <EntryCard key={`${e.kind}:${e.id}`} entry={e} />
          ))}
        </div>
      )}
      <Pager page={safePage} pages={pages} onPage={setPage} />
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-sm px-3 font-mono text-xs uppercase tracking-wider",
        active ? "bg-accent text-bg" : "bg-elevated text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Pager({ page, pages, onPage }: { page: number; pages: number; onPage: (n: number) => void }) {
  if (pages <= 1) return null;
  const window = 5;
  const start = Math.max(0, Math.min(page - 2, pages - window));
  const nums = Array.from({ length: Math.min(window, pages) }, (_, i) => start + i);
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button type="button" variant="secondary" disabled={page === 0} onClick={() => onPage(page - 1)}>
        Prev
      </Button>
      {nums.map((n) => (
        <Button key={n} type="button" variant={n === page ? "default" : "secondary"} onClick={() => onPage(n)}>
          {n + 1}
        </Button>
      ))}
      <Button type="button" variant="secondary" disabled={page >= pages - 1} onClick={() => onPage(page + 1)}>
        Next
      </Button>
      <span className="font-mono text-xs uppercase tracking-wider text-subtle">
        Page {page + 1}/{pages}
      </span>
    </div>
  );
}
