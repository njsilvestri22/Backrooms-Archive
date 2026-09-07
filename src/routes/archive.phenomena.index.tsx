import { createFileRoute } from "@tanstack/react-router";
import { CatalogIndex } from "@/components/catalog-index";

export const Route = createFileRoute("/archive/phenomena/")({ component: Page });

function Page() {
  return <CatalogIndex kind="phenomenon" />;
}
