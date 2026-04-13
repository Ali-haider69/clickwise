import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Instagram Caption Generator — ClickWise",
  description: "Generate engaging Instagram captions with hashtags instantly. 7 niches, free to use, no account needed.",
  ...canonicalMeta("/tools/ai-instagram-caption-generator", {
    title: "Free AI Instagram Caption Generator — ClickWise",
    description: "Generate engaging Instagram captions with hashtags instantly. 7 niches, free to use, no account needed.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
