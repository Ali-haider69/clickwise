import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Freelancer Earnings Calculator — Hourly Rate to Annual Income",
  description: "Calculate your real freelance income after taxes and expenses. Find out what hourly rate you need to hit your income goal.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
