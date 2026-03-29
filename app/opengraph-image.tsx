import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ClickWise — Smart Picks. Real Reviews. Best Deals.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 50%, #0a1628 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #9333ea, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: "48px", fontWeight: 900, color: "white" }}>ClickWise</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            background: "linear-gradient(90deg, #9333ea, #3b82f6)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Smart Picks. Real Reviews. Best Deals.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "18px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          AI tools, gadgets, side hustles, finance & trending news — all in one place.
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
          {["AI & Tech", "Gadgets", "Make Money", "News"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(147,51,234,0.2)",
                border: "1px solid rgba(147,51,234,0.4)",
                borderRadius: "999px",
                padding: "8px 20px",
                color: "#c084fc",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
