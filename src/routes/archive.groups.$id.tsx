import { createFileRoute } from "@tanstack/react-router";
import { EntryView, MissingFile } from "@/components/entry-view";
import { getEntry } from "@/data/catalog";

export const Route = createFileRoute("/archive/groups/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const entry = getEntry("group", id);
  if (!entry) return <MissingFile kind="group" />;
  return <EntryView entry={entry} />;
}
