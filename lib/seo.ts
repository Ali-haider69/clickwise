import type { Metadata } from "next";

export const SITE_URL = "https://clickwise.website";
const DEFAULT_OG_IMAGE = "/opengraph-image";

/**
 * Absolute canonical URL for a path (leading slash, no trailing slash except site root).
 */
export function canonicalUrl(path: string): string {
  if (path === "" || path === "/") return `${SITE_URL}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  const trimmed = p.replace(/\/+$/, "");
  return `${SITE_URL}${trimmed}`;
}

interface OgOptions {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Use in page/layout `metadata` to set canonical URL + complete Open Graph + Twitter tags.
 * Always pass title and description so OG tags are never incomplete.
 */
export function canonicalMeta(
  path: string,
  og: OgOptions
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const url = canonicalUrl(path);
  const image = og.image ?? DEFAULT_OG_IMAGE;
  return {
    alternates: { canonical: url },
    openGraph: {
      url,
      type: og.type ?? "website",
      siteName: "ClickWise",
      title: og.title,
      description: og.description,
      images: [{ url: image, width: 1200, height: 630, alt: og.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@clickwise",
      title: og.title,
      description: og.description,
      images: [image],
    },
  };
}
