import { createFileRoute } from "@tanstack/react-router";
import { CatalogIndex } from "@/components/catalog-index";

export const Route = createFileRoute("/archive/objects/")({ component: Page });

function Page() {
  return <CatalogIndex kind="object" />;
}
