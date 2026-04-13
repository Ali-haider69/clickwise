import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI LinkedIn Post Generator — ClickWise",
  description: "Generate professional LinkedIn posts in seconds. Choose your tone and industry. Free, no signup required.",
  ...canonicalMeta("/tools/ai-linkedin-post-generator", {
    title: "Free AI LinkedIn Post Generator — ClickWise",
    description: "Generate professional LinkedIn posts in seconds. Choose your tone and industry. Free, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
