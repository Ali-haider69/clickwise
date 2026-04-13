import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Blog Intro Generator — ClickWise",
  description: "Generate compelling blog introductions in seconds. 4 hook styles, SEO-optimized. Free, no signup.",
  ...canonicalMeta("/tools/ai-blog-intro-generator", {
    title: "Free AI Blog Intro Generator — ClickWise",
    description: "Generate compelling blog introductions in seconds. 4 hook styles, SEO-optimized. Free, no signup.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
