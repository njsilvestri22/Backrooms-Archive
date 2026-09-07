import { useState, type ReactNode } from "react";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { Landmark, Menu, Search, Shuffle, Volume2, VolumeX, X } from "lucide-react";
import { AmbientAudio, unlockHum } from "@/components/ambient-audio";
import { Grain } from "@/components/grain";
import { SearchDialog } from "@/components/search-dialog";
import { Button } from "@/components/ui/button";
import { entryTo, kindPath, randomEntry } from "@/data/catalog";
import { useArchiveStore } from "@/lib/archive-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/archive", label: "Hub" },
  { to: kindPath.level, label: "Levels" },
  { to: kindPath.entity, label: "Entities" },
  { to: kindPath.object, label: "Objects" },
  { to: kindPath.group, label: "Groups" },
  { to: kindPath.phenomenon, label: "Phenomena" },
  { to: kindPath.person, label: "Persons" },
  { to: "/archive/origins", label: "Origins" },
  { to: "/archive/survival", label: "Survival" },
] as const;

export function ArchiveShell({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const audioOn = useArchiveStore((s) => s.audioOn);
  const setAudioOn = useArchiveStore((s) => s.setAudioOn);
  const router = useRouter();

  function wander() {
    const e = randomEntry();
    void router.navigate({ to: entryTo(e.kind), params: { id: e.id } });
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Grain />
      <AmbientAudio />
      <SearchDialog open={search} onOpenChange={setSearch} />
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2">
          <Link to="/archive" className="flex size-11 items-center gap-2 sm:w-auto sm:px-2">
            <Landmark className="size-5 text-accent" />
            <span className="hidden font-display text-lg sm:inline">
              M.E.G.
              <span className="ml-2 text-muted">The Liminal Archive</span>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="inline-flex h-11 items-center px-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-fg"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-2">
            <Button type="button" variant="ghost" className="size-11" onClick={() => setSearch(true)} aria-label="Search">
              <Search className="size-5" />
            </Button>
            <Button type="button" variant="ghost" className="size-11 sm:w-auto sm:px-3" onClick={wander}>
              <Shuffle className="size-5" />
              <span className="hidden sm:inline">Wander</span>
            </Button>
            <Button
              type="button"
              variant={audioOn ? "default" : "ghost"}
              className={cn("size-11 sm:w-auto sm:px-3", audioOn && "hum-glow")}
              aria-pressed={audioOn}
              aria-label={audioOn ? "Mute fluorescent hum" : "Play fluorescent hum"}
              onClick={() => {
                const next = !audioOn;
                setAudioOn(next);
                if (next) void unlockHum();
              }}
            >
              {audioOn ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
              <span className="hidden sm:inline">{audioOn ? "Hum on" : "Hum"}</span>
            </Button>
            <Button type="button" variant="ghost" className="size-11 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open ? (
          <nav className="flex flex-col border-t border-border bg-surface px-3 py-2 lg:hidden">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center font-mono text-xs uppercase tracking-wider text-muted hover:text-fg"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <main className={cn("relative")}>{children ?? <Outlet />}</main>
      <footer className="border-t border-border px-4 py-8 text-center font-mono text-xs uppercase tracking-widest text-subtle">
        Recovered files · not official · multiple canons
      </footer>
    </div>
  );
}
