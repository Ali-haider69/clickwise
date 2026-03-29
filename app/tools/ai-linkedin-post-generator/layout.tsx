import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI LinkedIn Post Generator — Write Viral Posts Free",
  description: "Create high-engagement LinkedIn posts with AI. Free generator — no login needed. Works for any industry or topic.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
