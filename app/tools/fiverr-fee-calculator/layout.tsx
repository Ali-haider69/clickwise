import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Fiverr Fee Calculator — ClickWise",
  description: "Calculate exactly how much you earn after Fiverr fees. Seller and buyer modes with reverse calculation.",
  ...canonicalMeta("/tools/fiverr-fee-calculator", {
    title: "Free Fiverr Fee Calculator — ClickWise",
    description: "Calculate exactly how much you earn after Fiverr fees. Seller and buyer modes with reverse calculation.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
