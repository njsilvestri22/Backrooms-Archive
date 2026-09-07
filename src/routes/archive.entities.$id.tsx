import { createFileRoute } from "@tanstack/react-router";
import { EntryView, MissingFile } from "@/components/entry-view";
import { getEntry } from "@/data/catalog";

export const Route = createFileRoute("/archive/entities/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const entry = getEntry("entity", id);
  if (!entry) return <MissingFile kind="entity" />;
  return <EntryView entry={entry} />;
}
