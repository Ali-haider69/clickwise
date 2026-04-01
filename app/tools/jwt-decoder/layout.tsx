import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode & Inspect JSON Web Tokens Free",
  description: "Paste any JWT and instantly decode the header, payload, and signature. Free, browser-only — your tokens stay private.",
  ...canonicalMeta("/tools/jwt-decoder"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
