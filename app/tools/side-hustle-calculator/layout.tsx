import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Side Hustle Calculator — Find Your Earning Potential",
  description: "Discover how much you could earn from popular side hustles. Enter your available hours and get a realistic monthly income estimate.",
  ...canonicalMeta("/tools/side-hustle-calculator"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
