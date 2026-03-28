import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ClickWise — Smart Picks. Real Reviews. Best Deals.",
    template: "%s | ClickWise",
  },
  description:
    "Unbiased reviews, honest comparisons, and smart picks for AI tools, gadgets, side hustles, finance, and everything trending in 2026.",
  keywords: ["reviews", "best products", "AI tools", "gadgets", "make money online", "affiliate", "deals"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ClickWise",
  },
  twitter: {
    card: "summary_large_image",
    site: "@clickwise",
  },
  verification: {
    google: "YVpLTQ-H6wMTR3aOH41HGGSXK5IXnliZGOX4KXyJlJY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QGRPNT8SRQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QGRPNT8SRQ');
        `}</Script>
      </head>
      <body className="min-h-screen page-bg">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
