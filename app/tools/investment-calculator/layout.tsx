import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Investment Calculator — See How Your Money Grows Over Time",
  description: "Free compound interest calculator. Enter your investment amount, rate, and years to see exactly how much your money will grow.",
  ...canonicalMeta("/tools/investment-calculator"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
