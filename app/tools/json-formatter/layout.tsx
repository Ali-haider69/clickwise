import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator — ClickWise",
  description: "Format, validate, and minify JSON instantly in your browser. Free online JSON tool, no signup needed.",
  ...canonicalMeta("/tools/json-formatter", {
    title: "Free JSON Formatter & Validator — ClickWise",
    description: "Format, validate, and minify JSON instantly in your browser. Free online JSON tool, no signup needed.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
