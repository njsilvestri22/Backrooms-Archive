import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function routerBasepath() {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return base === "" ? "/" : base;
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    basepath: routerBasepath(),
  });
}
