import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "@tanstack/react-router";
import { catalog, entryTo, kindLabel, searchCatalog } from "@/data/catalog";
import { entryKey, useArchiveStore } from "@/lib/archive-store";
import { Button } from "@/components/ui/button";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const bookmarks = useArchiveStore((s) => s.bookmarks);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const results = (q.trim() ? searchCatalog(q) : catalog).slice(0, 24);
  const saved = bookmarks
    .map((k) => {
      const [kind, ...rest] = k.split(":");
      const id = rest.join(":");
      return catalog.find((e) => e.kind === kind && e.id === id);
    })
    .filter(Boolean);

  function go(kind: typeof catalog[number]["kind"], id: string) {
    onOpenChange(false);
    void router.navigate({ to: entryTo(kind), params: { id } });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 p-4 pt-24">
      <button type="button" className="absolute inset-0" aria-label="Close search" onClick={() => onOpenChange(false)} />
      <Command className="relative z-10 w-full max-w-lg overflow-hidden rounded-md border border-border bg-surface shadow-paper" shouldFilter={false}>
        <Command.Input
          value={q}
          onValueChange={setQ}
          placeholder="Search the binder"
          className="h-12 w-full border-b border-border bg-transparent px-4 text-fg outline-none placeholder:text-subtle"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          {saved.length > 0 && !q ? (
            <Command.Group heading="Filed">
              {saved.map((e) =>
                e ? (
                  <Command.Item key={e.id} onSelect={() => go(e.kind, e.id)} className="cursor-pointer rounded-sm px-3 py-2 aria-selected:bg-elevated">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent">{e.code}</span> {e.name}
                  </Command.Item>
                ) : null,
              )}
            </Command.Group>
          ) : null}
          <Command.Group heading="Files">
            {results.map((e) => (
              <Command.Item key={`${e.kind}:${e.id}`} onSelect={() => go(e.kind, e.id)} className="cursor-pointer rounded-sm px-3 py-2 aria-selected:bg-elevated">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">{kindLabel[e.kind]}</span> {e.name}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="flex justify-end border-t border-border p-2">
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </Command>
    </div>
  );
}
