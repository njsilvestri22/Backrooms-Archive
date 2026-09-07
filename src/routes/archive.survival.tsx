import { createFileRoute } from "@tanstack/react-router";
import { survivalRules } from "@/data/survival";

export const Route = createFileRoute("/archive/survival")({ component: SurvivalPage });

function SurvivalPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-10">
      <header>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Field manual</p>
        <h1 className="font-display text-4xl">Survival</h1>
        <p className="mt-2 text-muted">Rules that keep you a person instead of a file.</p>
      </header>
      <ol className="flex flex-col gap-6">
        {survivalRules.map((r, i) => (
          <li key={r.title} className="rounded-md border border-border bg-surface p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h2 className="font-display text-2xl">{r.title}</h2>
            <p className="text-muted">{r.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
