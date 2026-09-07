import { EntryCard } from "@/components/entry-card";
import { levels } from "@/data/catalog";

export function MainNine() {
  const nine = levels.filter((e) => e.cluster === "main-nine").slice(0, 9);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {nine.map((e) => (
        <EntryCard key={e.id} entry={e} />
      ))}
    </div>
  );
}
