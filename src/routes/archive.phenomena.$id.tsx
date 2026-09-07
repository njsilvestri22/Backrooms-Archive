import { createFileRoute } from "@tanstack/react-router";
import { EntryView, MissingFile } from "@/components/entry-view";
import { getEntry } from "@/data/catalog";

export const Route = createFileRoute("/archive/phenomena/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const entry = getEntry("phenomenon", id);
  if (!entry) return <MissingFile kind="phenomenon" />;
  return <EntryView entry={entry} />;
}
