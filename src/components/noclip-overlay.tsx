import { useEffect, useState } from "react";

const PASTA =
  "If you're not careful and you noclip out of reality in the wrong areas, you'll end up in the Backrooms, where it's nothing but the stink of old moist carpet, the madness of mono-yellow, the endless background noise of fluorescent lights at maximum hum-buzz, and approximately six hundred million square miles of randomly segmented empty rooms to be trapped in. God save you if you hear something wandering around nearby, because it sure as hell has heard you.";

export function NoclipOverlay({ clipping, onDone }: { clipping: boolean; onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (clipping) return;
    const id = window.setInterval(() => {
      setN((x) => {
        if (x >= PASTA.length) {
          window.clearInterval(id);
          return x;
        }
        return x + 1;
      });
    }, 18);
    return () => window.clearInterval(id);
  }, [clipping]);
  useEffect(() => {
    if (!clipping) return;
    const t = window.setTimeout(onDone, 520);
    return () => window.clearTimeout(t);
  }, [clipping, onDone]);
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end p-6 sm:p-10">
      {clipping ? <div className="noclip-flash absolute inset-0 bg-accent" /> : null}
      <p className="max-w-xl font-display text-lg text-paper sm:text-xl">{PASTA.slice(0, n)}</p>
    </div>
  );
}
