import { createFileRoute } from "@tanstack/react-router";
import { EntryView, MissingFile } from "@/components/entry-view";
import { getEntry } from "@/data/catalog";

export const Route = createFileRoute("/archive/objects/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const entry = getEntry("object", id);
  if (!entry) return <MissingFile kind="object" />;
  return <EntryView entry={entry} />;
}
