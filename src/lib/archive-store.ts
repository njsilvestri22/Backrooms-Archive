import { create } from "zustand";
import { persist } from "zustand/middleware";

export function entryKey(kind: string, id: string) {
  return `${kind}:${id}`;
}

type ArchiveState = {
  bookmarks: string[];
  visited: string[];
  audioOn: boolean;
  introSeen: boolean;
  toggleBookmark: (key: string) => void;
  markVisited: (key: string) => void;
  setAudioOn: (on: boolean) => void;
  setIntroSeen: (seen: boolean) => void;
};

export const useArchiveStore = create<ArchiveState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      visited: [],
      audioOn: false,
      introSeen: false,
      toggleBookmark: (key) =>
        set({
          bookmarks: get().bookmarks.includes(key)
            ? get().bookmarks.filter((k) => k !== key)
            : [...get().bookmarks, key],
        }),
      markVisited: (key) =>
        set({
          visited: get().visited.includes(key) ? get().visited : [...get().visited, key],
        }),
      setAudioOn: (audioOn) => set({ audioOn }),
      setIntroSeen: (introSeen) => set({ introSeen }),
    }),
    { name: "liminal-archive" },
  ),
);
