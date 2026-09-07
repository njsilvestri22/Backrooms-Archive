import { createFileRoute } from "@tanstack/react-router";
import { EntryView, MissingFile } from "@/components/entry-view";
import { getEntry } from "@/data/catalog";

export const Route = createFileRoute("/archive/levels/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const entry = getEntry("level", id);
  if (!entry) return <MissingFile kind="level" />;
  return <EntryView entry={entry} />;
}
