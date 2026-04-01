import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tax Calculator 2026 — US, UK, Canada, Australia & More",
  description: "Calculate your income tax for 2026 across multiple countries. Free tax estimator for the US, UK, Canada, Australia, Pakistan, and India.",
  ...canonicalMeta("/tools/tax-calculator"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
