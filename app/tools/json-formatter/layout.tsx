import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool",
  description: "Instantly format, validate, and beautify JSON online. Free browser-based tool — your data never leaves your device.",
  ...canonicalMeta("/tools/json-formatter"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
