import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Blog Intro Generator — Write Hooks That Get Clicks Free",
  description: "Generate compelling, SEO-optimized blog introductions instantly with our free AI Blog Intro Generator. Hook your readers in seconds—no signup required.",
  ...canonicalMeta("/tools/ai-blog-intro-generator"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
