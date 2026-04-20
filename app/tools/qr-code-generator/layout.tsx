import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free QR Code Generator — ClickWise",
  description: "Generate custom QR codes instantly. Add colors, change size, and download as PNG. Free, no signup required.",
  ...canonicalMeta("/tools/qr-code-generator", {
    title: "Free QR Code Generator — ClickWise",
    description: "Generate custom QR codes instantly. Add colors, change size, and download as PNG. Free, no signup required.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
