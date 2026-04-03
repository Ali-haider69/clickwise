import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fiverr Fee Calculator: See Your Earnings",
  description: "Instantly calculate how much you actually earn after Fiverr's 20% service fee. Free calculator for freelancers.",
  ...canonicalMeta("/tools/fiverr-fee-calculator"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
