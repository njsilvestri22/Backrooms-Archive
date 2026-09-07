import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/archive/levels")({ component: Layout });

function Layout() {
  return <Outlet />;
}
