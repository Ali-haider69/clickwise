import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free API Response Viewer — ClickWise",
  description: "View and format API responses in JSON, XML, or plain text. Free online tool, no signup required.",
  ...canonicalMeta("/tools/api-response-viewer", {
    title: "Free API Response Viewer — ClickWise",
    description: "View and format API responses in JSON, XML, or plain text. Free online tool, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
