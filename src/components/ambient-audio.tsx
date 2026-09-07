import { useEffect, useRef } from "react";
import { useArchiveStore } from "@/lib/archive-store";

export function AmbientAudio() {
  const on = useArchiveStore((s) => s.audioOn);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ o1: OscillatorNode; o2: OscillatorNode; g: GainNode } | null>(null);

  useEffect(() => {
    if (!on) {
      nodesRef.current?.o1.stop();
      nodesRef.current?.o2.stop();
      void ctxRef.current?.close();
      ctxRef.current = null;
      nodesRef.current = null;
      return;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o1.type = "sine";
    o2.type = "sine";
    o1.frequency.value = 60;
    o2.frequency.value = 120;
    g.gain.value = 0.03;
    o1.connect(g);
    o2.connect(g);
    g.connect(ctx.destination);
    o1.start();
    o2.start();
    ctxRef.current = ctx;
    nodesRef.current = { o1, o2, g };
    return () => {
      try {
        o1.stop();
        o2.stop();
        void ctx.close();
      } catch {
        /* already stopped */
      }
    };
  }, [on]);

  return null;
}
