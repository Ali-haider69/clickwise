import type { Metadata } from "next";
import { canonicalMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free JWT Decoder — ClickWise",
  description: "Decode and inspect JWT tokens instantly. See header, payload, and expiry. Free, client-side only.",
  ...canonicalMeta("/tools/jwt-decoder", {
    title: "Free JWT Decoder — ClickWise",
    description: "Decode and inspect JWT tokens instantly. See header, payload, and expiry. Free, client-side only.",
  }),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
