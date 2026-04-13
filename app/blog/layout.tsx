import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

/** Default for /blog; individual posts override via generateMetadata. */
export const metadata: Metadata = {
  ...canonicalMeta("/blog", {
    title: "Blog — AI Tools, Make Money, Gadgets & More",
    description: "Guides, comparisons, and reviews on AI tools, side hustles, gadgets, and finance. Smarter decisions in 2026.",
  }),
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
