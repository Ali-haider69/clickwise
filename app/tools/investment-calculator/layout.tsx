import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Investment Calculator — ClickWise",
  description: "Calculate investment growth with compound interest, inflation adjustment, and multiple scenarios. Free.",
  ...canonicalMeta("/tools/investment-calculator", {
    title: "Free Investment Calculator — ClickWise",
    description: "Calculate investment growth with compound interest, inflation adjustment, and multiple scenarios. Free.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
