import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Tool Finder — Find the Best AI for Your Needs in 2026",
  description: "Answer 3 quick questions and get matched to the best AI tools for your use case. Free, instant, no signup.",
  ...canonicalMeta("/tools/ai-finder"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
