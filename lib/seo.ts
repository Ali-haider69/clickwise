import type { Metadata } from "next";

export const SITE_URL = "https://clickwise.website";

/**
 * Absolute canonical URL for a path (leading slash, no trailing slash except site root).
 */
export function canonicalUrl(path: string): string {
  if (path === "" || path === "/") return `${SITE_URL}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  const trimmed = p.replace(/\/+$/, "");
  return `${SITE_URL}${trimmed}`;
}

/** Use in page/layout `metadata` to set rel=canonical for indexable URLs. */
export function canonicalMeta(path: string): Pick<Metadata, "alternates"> {
  return { alternates: { canonical: canonicalUrl(path) } };
}
