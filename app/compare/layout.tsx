import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Compare Products Side by Side — ClickWise",
  description: "Compare laptops, smartphones, and earbuds side by side. Detailed specs, pros, cons, and ClickWise scores.",
  ...canonicalMeta("/compare", {
    title: "Compare Products Side by Side — ClickWise",
    description: "Compare laptops, smartphones, and earbuds side by side. Detailed specs, pros, cons, and ClickWise scores.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
