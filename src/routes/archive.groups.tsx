import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/archive/groups")({ component: Layout });

function Layout() {
  return <Outlet />;
}
