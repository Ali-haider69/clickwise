import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free AI Text Humanizer — Humanize AI Text Instantly | ClickWise",
  description:
    "Humanize AI text free. Remove robotic AI phrases, add contractions, and make ChatGPT content sound human. No signup, no word limit, 100% private.",
  ...canonicalMeta("/tools/ai-text-humanizer", {
    title: "Free AI Text Humanizer — Humanize AI Text Instantly | ClickWise",
    description:
      "Humanize AI text free. Remove robotic AI phrases, add contractions, and make ChatGPT content sound human. No signup, no word limit, 100% private.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
