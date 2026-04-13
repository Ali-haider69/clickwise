import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Age Calculator — ClickWise",
  description: "Calculate your exact age in years, months, and days. Includes zodiac sign, birthstone, and birthday countdown.",
  ...canonicalMeta("/tools/age-calculator", {
    title: "Free Age Calculator — ClickWise",
    description: "Calculate your exact age in years, months, and days. Includes zodiac sign, birthstone, and birthday countdown.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
