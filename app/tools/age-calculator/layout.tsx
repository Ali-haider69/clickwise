import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Age Calculator — Find Your Exact Age in Seconds",
  description: "Free online age calculator. Enter your date of birth and instantly find out your exact age in years, months, and days.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
