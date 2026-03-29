import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI Blog Intro Generator — Write Hooks That Get Clicks Free",
  description: "Generate compelling blog introductions instantly with AI. Free tool — no signup required.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
