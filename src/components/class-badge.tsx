import { classLabel, classTone } from "@/data/catalog";
import type { SurvivalClass } from "@/data/types";
import { cn } from "@/lib/utils";

export function ClassBadge({ klass, className }: { klass: SurvivalClass; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-bg/80 px-2 py-1 font-mono text-xs uppercase tracking-wider",
        classTone(klass),
        className,
      )}
    >
      {classLabel(klass)}
    </span>
  );
}
