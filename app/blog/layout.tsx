import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

/** Default for /blog; individual posts override via generateMetadata. */
export const metadata: Metadata = {
  ...canonicalMeta("/blog"),
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
