import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us — ClickWise",
  description: "Get in touch with the ClickWise team. Questions, feedback, partnerships, or press inquiries — we'd love to hear from you.",
  ...canonicalMeta("/contact"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
