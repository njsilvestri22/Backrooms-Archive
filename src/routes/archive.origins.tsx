import { createFileRoute } from "@tanstack/react-router";
import { originBeats } from "@/data/origins";

export const Route = createFileRoute("/archive/origins")({ component: OriginsPage });

function OriginsPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-4 py-10">
      <header>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Canon</p>
        <h1 className="font-display text-4xl">Origins</h1>
        <p className="mt-2 text-muted">The wiki is not Kane Pixels. Kane Pixels is not the copypasta. Multiple canons coexist on purpose.</p>
      </header>
      <ol className="flex flex-col gap-8">
        {originBeats.map((b) => (
          <li key={b.year} className="border-l border-accent pl-4">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{b.year}</p>
            <h2 className="font-display text-2xl">{b.title}</h2>
            <p className="text-muted">{b.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
