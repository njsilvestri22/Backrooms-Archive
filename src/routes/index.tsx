import { useCallback, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Grain } from "@/components/grain";
import { NoclipOverlay } from "@/components/noclip-overlay";
import { Button } from "@/components/ui/button";
import { useArchiveStore } from "@/lib/archive-store";
import { publicUrl } from "@/lib/public-url";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const router = useRouter();
  const setIntroSeen = useArchiveStore((s) => s.setIntroSeen);
  const [clipping, setClipping] = useState(false);

  const goArchive = useCallback(() => {
    setIntroSeen(true);
    void router.navigate({ to: "/archive" });
  }, [router, setIntroSeen]);

  function enter() {
    setClipping(true);
    window.setTimeout(goArchive, 520);
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <Grain />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${publicUrl("/images/level-0.jpg")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col justify-end gap-6 px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Recovered · 2019–</p>
        <h1 className="font-display text-5xl sm:text-6xl">The Liminal Archive</h1>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={enter} className="hum-glow">
            Noclip
          </Button>
          <Button type="button" variant="secondary" onClick={goArchive}>
            Skip
          </Button>
        </div>
        <p className="text-sm text-muted">A field manual of yellow halls, numbered rooms, and things that learned your name.</p>
      </div>
      <NoclipOverlay clipping={clipping} onDone={() => {}} />
    </main>
  );
}
