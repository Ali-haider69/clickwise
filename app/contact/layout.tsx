import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact ClickWise — Get in Touch",
  description: "Have a question, partnership inquiry, or want to suggest a review? We respond within 24-48 hours.",
  ...canonicalMeta("/contact", {
    title: "Contact ClickWise — Get in Touch",
    description: "Have a question, partnership inquiry, or want to suggest a review? We respond within 24-48 hours.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
