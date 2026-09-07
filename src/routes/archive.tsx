import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ArchiveShell } from "@/components/archive-shell";

export const Route = createFileRoute("/archive")({ component: ArchiveLayout });

function ArchiveLayout() {
  return (
    <ArchiveShell>
      <Outlet />
    </ArchiveShell>
  );
}
