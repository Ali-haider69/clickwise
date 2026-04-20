import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Password Generator — ClickWise",
  description: "Generate strong, secure passwords instantly. Customize length, characters, and complexity. Free, no signup required.",
  ...canonicalMeta("/tools/password-generator", {
    title: "Free Password Generator — ClickWise",
    description: "Generate strong, secure passwords instantly. Customize length, characters, and complexity. Free, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
