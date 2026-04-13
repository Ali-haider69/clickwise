import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Side Hustle Earnings Calculator — ClickWise",
  description: "Estimate your side hustle income across 20+ hustles with real earnings projections. Free, no signup.",
  ...canonicalMeta("/tools/side-hustle-calculator", {
    title: "Free Side Hustle Earnings Calculator — ClickWise",
    description: "Estimate your side hustle income across 20+ hustles with real earnings projections. Free, no signup.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
