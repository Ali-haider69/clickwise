import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Freelancer Earnings Calculator — ClickWise",
  description: "Calculate your freelance earnings across 6 platforms and 5 currencies. Monthly projections instantly. Free.",
  ...canonicalMeta("/tools/freelancer-earnings-calculator", {
    title: "Free Freelancer Earnings Calculator — ClickWise",
    description: "Calculate your freelance earnings across 6 platforms and 5 currencies. Monthly projections instantly. Free.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
