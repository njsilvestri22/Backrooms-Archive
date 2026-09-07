import { useEffect } from "react";
import { useArchiveStore } from "@/lib/archive-store";

/**
 * Fluorescent ballast: 120 Hz buzz (what laptop speakers can actually
 * reproduce) plus harmonics and a thin hiss. 60 Hz alone is inaudible on
 * most devices — that was why the old hum felt broken.
 */
type Engine = {
  ctx: AudioContext;
  master: GainNode;
};

let engine: Engine | null = null;

function audioContextCtor() {
  return window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
}

function ensureEngine(): Engine {
  if (engine && engine.ctx.state !== "closed") return engine;

  const ctx = new (audioContextCtor())();
  const mix = ctx.createGain();
  mix.gain.value = 1;
  const master = ctx.createGain();
  master.gain.value = 0;
  mix.connect(master);
  master.connect(ctx.destination);

  const tone = (freq: number, type: OscillatorType, level: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = level;
    o.connect(g);
    g.connect(mix);
    o.start();
  };

  // Mid buzz is the audible part; 60 Hz is only a little chest rumble.
  tone(60, "sine", 0.08);
  tone(120, "triangle", 0.28);
  tone(240, "sine", 0.18);
  tone(360, "sine", 0.09);
  tone(480, "sine", 0.04);

  const seconds = 2;
  const noiseBuf = ctx.createBuffer(1, seconds * ctx.sampleRate, ctx.sampleRate);
  const chan = noiseBuf.getChannelData(0);
  for (let i = 0; i < chan.length; i++) chan[i] = Math.random() * 2 - 1;
  const hiss = ctx.createBufferSource();
  hiss.buffer = noiseBuf;
  hiss.loop = true;
  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 2600;
  band.Q.value = 0.7;
  const hissGain = ctx.createGain();
  hissGain.gain.value = 0.055;
  hiss.connect(band);
  band.connect(hissGain);
  hissGain.connect(mix);
  hiss.start();

  const flicker = ctx.createOscillator();
  const flickerDepth = ctx.createGain();
  flicker.type = "sine";
  flicker.frequency.value = 8.3;
  flickerDepth.gain.value = 0.1;
  flicker.connect(flickerDepth);
  flickerDepth.connect(mix.gain);
  flicker.start();

  engine = { ctx, master };
  return engine;
}

const TARGET = 0.45;

export async function unlockHum() {
  if (typeof window === "undefined") return;
  const { ctx, master } = ensureEngine();
  if (ctx.state === "suspended") await ctx.resume();
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(Math.max(master.gain.value, 0.001), now);
  master.gain.linearRampToValueAtTime(TARGET, now + 0.35);
}

function muteHum() {
  if (!engine || engine.ctx.state === "closed") return;
  const { ctx, master } = engine;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(0, now + 0.2);
}

export function AmbientAudio() {
  const on = useArchiveStore((s) => s.audioOn);

  useEffect(() => {
    if (on) void unlockHum();
    else muteHum();
  }, [on]);

  useEffect(() => {
    const resume = () => {
      if (useArchiveStore.getState().audioOn) void unlockHum();
    };
    window.addEventListener("pointerdown", resume);
    window.addEventListener("keydown", resume);
    return () => {
      window.removeEventListener("pointerdown", resume);
      window.removeEventListener("keydown", resume);
    };
  }, []);

  return null;
}
