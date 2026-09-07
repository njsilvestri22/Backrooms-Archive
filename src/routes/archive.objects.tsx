import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/archive/objects")({ component: Layout });

function Layout() {
  return <Outlet />;
}
