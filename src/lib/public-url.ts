/** Prefix a public-root path with Vite's `BASE_URL` (needed on GitHub Pages). */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${trimmed}`;
}
