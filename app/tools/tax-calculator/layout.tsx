import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Income Tax Calculator 2026 — USA, UK, Canada & More",
  description: "Calculate income tax for USA, UK, Canada, Australia, and more. Instant results, no signup required.",
  ...canonicalMeta("/tools/tax-calculator", {
    title: "Free Income Tax Calculator 2026 — USA, UK, Canada & More",
    description: "Calculate income tax for USA, UK, Canada, Australia, and more. Instant results, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
