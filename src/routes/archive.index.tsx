import { Link, createFileRoute } from "@tanstack/react-router";
import { MainNine } from "@/components/main-nine";
import { Button } from "@/components/ui/button";
import { kindPath, stats } from "@/data/catalog";

export const Route = createFileRoute("/archive/")({ component: Hub });

function Hub() {
  const drawers = [
    { to: kindPath.level, n: stats.levels, label: "Levels", blurb: "Numbered rooms, enigmatics, negatives." },
    { to: kindPath.entity, n: stats.entities, label: "Entities", blurb: "Bestiary. Smilers to Party Hosts." },
    { to: kindPath.object, n: stats.objects, label: "Objects", blurb: "Almond water, keys, Happyfiles." },
    { to: kindPath.group, n: stats.groups, label: "Groups", blurb: "M.E.G., traders, cults, Async." },
    { to: kindPath.phenomenon, n: stats.phenomena, label: "Phenomena", blurb: "Noclip, the hum, the Cycle." },
    { to: kindPath.person, n: stats.persons, label: "Persons", blurb: "Names that survived the files." },
  ];
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">M.E.G. recovered binder</p>
        <h1 className="font-display text-5xl">{stats.total} recovered files</h1>
        <p className="max-w-xl text-muted">
          Cluster I complete through Level 999, plus enigmatics, a bestiary, objects, groups, phenomena, and persons of interest. Nothing here is official. Everything here has been walked.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/archive/levels">Start here</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/archive/survival">Survival manual</Link>
          </Button>
        </div>
      </header>
      <section>
        <h2 className="mb-4 font-display text-2xl">Drawers</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 stagger">
          {drawers.map((d) => (
            <Link key={d.to} to={d.to} className="rounded-md border border-border bg-surface p-4 shadow-border hover:shadow-border-hover">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">{d.n} files</p>
              <h3 className="font-display text-2xl">{d.label}</h3>
              <p className="text-sm text-muted">{d.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 font-display text-2xl">The Main Nine</h2>
        <MainNine />
      </section>
      <section>
        <h2 className="mb-4 font-display text-2xl">Deeper files</h2>
        <ul className="flex flex-wrap gap-3">
          <li>
            <Button variant="secondary" asChild>
              <Link to="/archive/levels/$id" params={{ id: "the-hive" }}>
                The Hive
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="secondary" asChild>
              <Link to="/archive/levels/$id" params={{ id: "level-906" }}>
                Boiler Room
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="secondary" asChild>
              <Link to="/archive/objects/$id" params={{ id: "moth-jelly" }}>
                Moth Jelly
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="secondary" asChild>
              <Link to="/archive/entities/$id" params={{ id: "blanche" }}>
                Blanche
              </Link>
            </Button>
          </li>
        </ul>
      </section>
    </div>
  );
}
