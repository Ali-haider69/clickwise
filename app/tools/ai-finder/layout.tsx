import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Tool Finder — Find the Best AI for You | ClickWise",
  description: "Answer 3 questions and find the best AI tool for your needs. Matches from 50+ top AI tools. Free.",
  ...canonicalMeta("/tools/ai-finder", {
    title: "Free AI Tool Finder — Find the Best AI for You | ClickWise",
    description: "Answer 3 questions and find the best AI tool for your needs. Matches from 50+ top AI tools. Free.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
