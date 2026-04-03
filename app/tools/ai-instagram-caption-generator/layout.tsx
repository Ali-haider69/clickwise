import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Instagram Caption Generator (Free)",
  description: "Generate scroll-stopping Instagram captions with AI in seconds. Free tool with hashtag suggestions included.",
  ...canonicalMeta("/tools/ai-instagram-caption-generator"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
