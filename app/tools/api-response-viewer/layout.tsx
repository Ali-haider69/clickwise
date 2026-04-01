import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "API Response Viewer — Format & Debug JSON Online Free",
  description: "Paste any API response and instantly view it as clean, formatted JSON. Free browser-based tool, no data sent to servers.",
  ...canonicalMeta("/tools/api-response-viewer"),
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
