import { createFileRoute } from "@tanstack/react-router";
import { EntryView, MissingFile } from "@/components/entry-view";
import { getEntry } from "@/data/catalog";

export const Route = createFileRoute("/archive/persons/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const entry = getEntry("person", id);
  if (!entry) return <MissingFile kind="person" />;
  return <EntryView entry={entry} />;
}
