import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare AI Tools & Gadgets Side by Side — ClickWise",
  description: "Compare the best AI tools, gadgets, and products side by side. Honest specs, pricing, and real-world performance to help you decide.",
  ...canonicalMeta("/compare"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
