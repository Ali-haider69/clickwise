import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fiverr Fee Calculator — See Your Actual Earnings After Fees",
  description: "Instantly calculate how much you actually earn after Fiverr's 20% service fee. Free calculator for freelancers.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
